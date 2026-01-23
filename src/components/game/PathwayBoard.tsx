import { Clue, Pathway } from '@/types/game';
import { ClueCard } from './ClueCard';
import { Button } from '@/components/ui/button';
import { ChevronRight, Lock } from 'lucide-react';

interface PathwayBoardProps {
  pathways: Pathway[];
  clues: Clue[];
  currentStage: number;
  credits: number;
  onInvestigate: (id: string) => void;
  onDiscard: (id: string) => void;
  onDeepInvestigate: (id: string) => void;
  onAdvanceStage: () => void;
}

export const PathwayBoard = ({ 
  pathways, 
  clues, 
  currentStage, 
  credits,
  onInvestigate, 
  onDiscard, 
  onDeepInvestigate,
  onAdvanceStage 
}: PathwayBoardProps) => {
  const getPathwayClues = (pathwayId: string, stage: number) => {
    return clues.filter(c => c.pathway === pathwayId && c.stage === stage && c.discovered);
  };

  const canAdvance = clues.some(c => c.stage === currentStage && c.investigated);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-bold text-foreground">Investigation Board</h2>
        {currentStage < 3 && (
          <Button 
            onClick={onAdvanceStage}
            disabled={!canAdvance}
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10"
          >
            Advance to Stage {currentStage + 1}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {pathways.map((pathway) => (
          <div key={pathway.id} className="space-y-3">
            <div className="rounded-lg border border-border bg-card/50 p-3">
              <h3 className="font-semibold text-foreground">{pathway.name}</h3>
              <p className="text-xs text-muted-foreground">{pathway.description}</p>
            </div>
            
            <div className="space-y-3">
              {[1, 2, 3].map((stage) => {
                const stageClues = getPathwayClues(pathway.id, stage);
                const isLocked = stage > currentStage;
                
                return (
                  <div key={stage} className="relative">
                    {isLocked ? (
                      <div className="flex h-32 items-center justify-center rounded-lg border border-border/50 bg-muted/20">
                        <div className="text-center">
                          <Lock className="mx-auto h-5 w-5 text-muted-foreground/50" />
                          <span className="text-xs text-muted-foreground/50">Stage {stage}</span>
                        </div>
                      </div>
                    ) : stageClues.length > 0 ? (
                      <div className="space-y-2">
                        {stageClues.map((clue) => (
                          <ClueCard
                            key={clue.id}
                            clue={clue}
                            credits={credits}
                            onInvestigate={onInvestigate}
                            onDiscard={onDiscard}
                            onDeepInvestigate={onDeepInvestigate}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-border/50">
                        <span className="text-xs text-muted-foreground">No clues yet</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
