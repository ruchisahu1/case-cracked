import { useState, useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { Header } from './Header';
import { PathwayBoard } from './PathwayBoard';
import { SuspectPanel } from './SuspectPanel';
import { DepartmentPanel } from './DepartmentPanel';
import { TipBook } from './TipBook';
import { StartScreen } from './StartScreen';
import { GameOverScreen } from './GameOverScreen';
import { InitialClues } from './InitialClues';
import { pathways, suspects, departments, tips, clues as initialClueData } from '@/data/gameData';
import { Separator } from '@/components/ui/separator';
import investigationBg from '@/assets/investigation-board-bg.jpg';

type GamePhase = 'start' | 'select-clues' | 'investigating' | 'game-over';

export const GameContainer = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>('start');
  const [tipBookOpen, setTipBookOpen] = useState(false);

  const {
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
  } = useGameState();

  // Start the game
  const handleStartGame = () => {
    // Automatically select all Stage 1 clues
    const stage1Clues = initialClueData.filter(c => c.stage === 1);
    stage1Clues.forEach(clue => {
      discoverClue(clue.id);
    });
    setGamePhase('investigating');
  };

  // Complete initial clue selection
  const handleCompleteSelection = () => {
    setGamePhase('investigating');
  };

  // Handle initial clue selection
  const handleSelectInitialClue = (clueId: string) => {
    const clue = allClues.find(c => c.id === clueId);
    if (clue && !clue.discovered) {
      discoverClue(clueId);
    }
  };

  // Reset and go back to start
  const handleRestart = () => {
    resetGame();
    setGamePhase('start');
  };

  // Continue investing after wrong guess
  const handleContinue = () => {
    continuePlaying();
    setGamePhase('investigating');
  };

  // Handle accusation
  const handleAccusation = (suspectId: string, isCorrect: boolean) => {
    submitAccusation(suspectId, isCorrect);
    setGamePhase('game-over');
  };

  // Get initial clues (stage 1 clues from each pathway)
  const initialClues = initialClueData.filter(c => c.stage === 1);
  const selectedInitialCount = allClues.filter(c => c.stage === 1 && c.discovered).length;

  if (gamePhase === 'start') {
    return <StartScreen onStartGame={handleStartGame} />;
  }

  if (gamePhase === 'select-clues') {
    return (
      <InitialClues
        pathways={pathways}
        initialClues={allClues.filter(c => c.stage === 1)}
        onSelectClue={handleSelectInitialClue}
        onComplete={handleCompleteSelection}
        selectedCount={selectedInitialCount}
      />
    );
  }

  const selectedSuspect = suspects.find(s => s.id === gameState.selectedSuspect);
  const correctSuspect = suspects.find(s => s.isGuilty);

  return (
    <div className="min-h-screen bg-background">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: `url(${investigationBg})` }}
      />

      {/* Header */}
      <Header
        credits={gameState.credits}
        maxCredits={gameState.maxCredits}
        stage={gameState.currentStage}
        discoveredClues={gameState.discoveredClues.length}
        onOpenTipBook={() => setTipBookOpen(true)}
      />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 pt-20 pb-8">
        <div className="space-y-8 mt-4">
          {/* Investigation Board */}
          <PathwayBoard
            pathways={pathways}
            clues={allClues}
            currentStage={gameState.currentStage}
            credits={gameState.credits}
            onInvestigate={investigateClue}
            onDiscard={discardClue}
            onDeepInvestigate={deepInvestigateClue}
            onAdvanceStage={advanceStage}
          />

          <Separator className="bg-border" />

          {/* Department Panel */}
          <DepartmentPanel
            departments={departments}
            usedDepartments={gameState.departmentHelp}
            credits={gameState.credits}
            onUseDepartment={useDepartment}
          />

          <Separator className="bg-border" />

          {/* Suspect Panel */}
          <SuspectPanel
            suspects={suspects}
            selectedSuspect={gamePhase === 'game-over' ? null : gameState.selectedSuspect}
            onSelectSuspect={selectSuspect}
            onSubmitAccusation={handleAccusation}
            investigatedClues={gameState.investigatedClues.length}
          />
        </div>
      </main>

      {/* Tip Book Dialog */}
      <TipBook
        open={tipBookOpen}
        onOpenChange={setTipBookOpen}
        tips={tips}
      />

      {/* Game Over Screen */}
      {gamePhase === 'game-over' && (
        <GameOverScreen
          solved={gameState.solved}
          selectedSuspect={selectedSuspect}
          correctSuspect={correctSuspect}
          onRestart={handleRestart}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
};
