import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clue, Pathway } from '@/types/game';
import { Search, ArrowRight } from 'lucide-react';

interface InitialCluesProps {
  pathways: Pathway[];
  initialClues: Clue[];
  onSelectClue: (clueId: string) => void;
  onComplete: () => void;
  selectedCount: number;
}

export const InitialClues = ({ pathways, initialClues, onSelectClue, onComplete, selectedCount }: InitialCluesProps) => {
  const pathwayColors: Record<string, string> = {
    financial: 'border-primary/50 bg-primary/10',
    personal: 'border-secondary/50 bg-secondary/10',
    forensic: 'border-accent/50 bg-accent/10',
    digital: 'border-chart-3/50 bg-chart-3/10',
    witness: 'border-chart-4/50 bg-chart-4/10',
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <Badge className="mb-4 border-primary/50 bg-primary/10 text-primary">
            Begin Your Investigation
          </Badge>
          <h2 className="mb-2 font-serif text-3xl font-bold text-foreground">
            Choose Your Starting Clues
          </h2>
          <p className="text-muted-foreground">
            Select clues to begin investigating. You've selected {selectedCount} clue{selectedCount !== 1 ? 's' : ''}.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          {pathways.map((pathway) => {
            const clue = initialClues.find(c => c.pathway === pathway.id);
            if (!clue) return null;

            return (
              <Card 
                key={pathway.id}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  clue.discovered 
                    ? pathwayColors[pathway.id] + ' ring-2 ring-offset-2 ring-offset-background' 
                    : 'border-border bg-card hover:border-muted-foreground/50'
                }`}
                onClick={() => onSelectClue(clue.id)}
              >
                <CardHeader className="p-4 pb-2">
                  <div className="text-center text-4xl">{clue.icon}</div>
                  <CardTitle className="text-center text-sm text-foreground">{pathway.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                  <p className="text-sm font-medium text-foreground">{clue.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{pathway.description}</p>
                  {clue.discovered && (
                    <Badge className="mt-2 bg-primary/20 text-primary">Selected</Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Button 
            size="lg" 
            onClick={onComplete}
            disabled={selectedCount < 1}
          >
            Begin Investigation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="mt-2 text-sm text-muted-foreground">
            Select at least one clue to start
          </p>
        </div>
      </div>
    </div>
  );
};
