import { useState, useCallback } from 'react';
import { GameState, Clue } from '@/types/game';
import { initialGameState, clues } from '@/data/gameData';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [allClues, setAllClues] = useState<Clue[]>(clues);

  const discoverClue = useCallback((clueId: string) => {
    setAllClues(prev => prev.map(clue =>
      clue.id === clueId ? { ...clue, discovered: true } : clue
    ));
    setGameState(prev => ({
      ...prev,
      discoveredClues: [...prev.discoveredClues, clueId]
    }));
  }, []);

  const investigateClue = useCallback((clueId: string) => {
    if (gameState.credits < 2) return;

    setAllClues(prev => prev.map(clue =>
      clue.id === clueId ? { ...clue, investigated: true } : clue
    ));
    setGameState(prev => ({
      ...prev,
      credits: prev.credits - 2,
      investigatedClues: [...prev.investigatedClues, clueId]
    }));

    // Discover linked clues
    const clue = allClues.find(c => c.id === clueId);
    if (clue) {
      clue.linkedClues.forEach(linkedId => {
        const linkedClue = allClues.find(c => c.id === linkedId);
        if (linkedClue && !linkedClue.discovered) {
          discoverClue(linkedId);
        }
      });
    }
  }, [allClues, discoverClue, gameState.credits]);

  const discardClue = useCallback((clueId: string) => {
    setAllClues(prev => prev.map(clue =>
      clue.id === clueId ? { ...clue, discarded: true } : clue
    ));
    setGameState(prev => ({
      ...prev,
      discardedClues: [...prev.discardedClues, clueId]
    }));
  }, []);

  const deepInvestigateClue = useCallback((clueId: string) => {
    if (gameState.credits < 2) return false;

    setAllClues(prev => prev.map(clue =>
      clue.id === clueId ? { ...clue, deepInvestigated: true } : clue
    ));
    setGameState(prev => ({
      ...prev,
      credits: prev.credits - 2,
      deepInvestigatedClues: [...prev.deepInvestigatedClues, clueId]
    }));
    return true;
  }, [gameState.credits]);

  const useDepartment = useCallback((departmentId: string, cost: number) => {
    if (gameState.credits < cost) return false;

    setGameState(prev => ({
      ...prev,
      credits: prev.credits - cost,
      departmentHelp: [...prev.departmentHelp, departmentId]
    }));
    return true;
  }, [gameState.credits]);

  const selectSuspect = useCallback((suspectId: string) => {
    setGameState(prev => ({
      ...prev,
      selectedSuspect: suspectId
    }));
  }, []);

  const submitAccusation = useCallback((suspectId: string, isCorrect: boolean) => {
    setGameState(prev => ({
      ...prev,
      gameOver: true,
      solved: isCorrect,
      selectedSuspect: suspectId
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialGameState);
    setAllClues(clues.map(clue => ({
      ...clue,
      discovered: false,
      investigated: false,
      discarded: false,
      deepInvestigated: false
    })));
  }, []);

  const continuePlaying = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameOver: false,
      selectedSuspect: null
    }));
  }, []);

  const advanceStage = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentStage: Math.min(prev.currentStage + 1, 3)
    }));
  }, []);

  return {
    gameState,
    allClues,
    discoverClue,
    investigateClue,
    discardClue,
    deepInvestigateClue,
    useDepartment,
    selectSuspect,
    submitAccusation,
    resetGame,
    continuePlaying,
    advanceStage
  };
};
