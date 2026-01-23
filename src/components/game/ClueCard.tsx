import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clue } from '@/types/game';
import { Search, Trash2, Sparkles, Link } from 'lucide-react';

interface ClueCardProps {
  clue: Clue;
  onInvestigate: (id: string) => void;
  onDiscard: (id: string) => void;
  onDeepInvestigate: (id: string) => void;
  credits: number;
}

export const ClueCard = ({ clue, onInvestigate, onDiscard, onDeepInvestigate, credits }: ClueCardProps) => {
  const pathwayColors: Record<string, string> = {
    financial: 'bg-primary/20 text-primary border-primary/30',
    personal: 'bg-secondary/20 text-secondary border-secondary/30',
    forensic: 'bg-accent/20 text-accent-foreground border-accent/30',
    digital: 'bg-chart-3/20 text-chart-3 border-chart-3/30',
    witness: 'bg-chart-4/20 text-chart-4 border-chart-4/30',
  };

  if (clue.discarded) {
    return (
      <Card className="border-border/50 bg-muted/30 opacity-60">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl">{clue.icon}</span>
            <Badge variant="outline" className="border-muted-foreground/50 text-muted-foreground">Discarded</Badge>
          </div>
          <CardTitle className="text-sm text-muted-foreground line-through">{clue.name}</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="group relative overflow-hidden border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
      {clue.deepInvestigated && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
      )}

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <span className="text-3xl">{clue.icon}</span>
          <Badge className={pathwayColors[clue.pathway]}>
            {clue.pathway.charAt(0).toUpperCase() + clue.pathway.slice(1)}
          </Badge>
        </div>
        <CardTitle className="text-base text-foreground">{clue.name}</CardTitle>
      </CardHeader>

      <CardContent className="pb-2">
        {clue.investigated ? (
          <p className="text-sm text-muted-foreground">{clue.description}</p>
        ) : (
          <p className="text-sm text-muted-foreground italic">Investigate to reveal details...</p>
        )}

        {clue.investigated && clue.linkedClues.length > 0 && (
          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <Link className="h-3 w-3" />
            <span>{clue.linkedClues.length} linked clues</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 pt-2">
        {!clue.investigated ? (
          <>
            <Button
              size="sm"
              variant="default"
              className="flex-1"
              onClick={() => onInvestigate(clue.id)}
              disabled={credits < 2}
            >
              <Search className="h-4 w-4 mr-1" />
              Investigate (2 credits)
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDiscard(clue.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Badge variant="outline" className="w-full justify-center border-primary/50 text-primary">
            ✓ Investigated
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};
