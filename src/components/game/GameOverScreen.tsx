import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Suspect } from '@/types/game';
import { Trophy, XCircle, RotateCcw, Target } from 'lucide-react';

interface GameOverScreenProps {
  solved: boolean;
  selectedSuspect: Suspect | undefined;
  correctSuspect: Suspect | undefined;
  onRestart: () => void;
  onContinue: () => void;
}

export const GameOverScreen = ({ solved, selectedSuspect, correctSuspect, onRestart, onContinue }: GameOverScreenProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur">
      <Card className="max-w-lg border-border bg-card">
        <CardContent className="p-8 text-center">
          {solved ? (
            <>
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                <Trophy className="h-10 w-10 text-primary" />
              </div>
              <Badge className="mb-4 bg-primary/20 text-primary">Case Solved</Badge>
              <h2 className="mb-4 font-serif text-3xl font-bold text-foreground">
                Excellent Detective Work!
              </h2>
              <p className="mb-6 text-muted-foreground">
                You correctly identified <strong className="text-foreground">{selectedSuspect?.name}</strong> as the perpetrator.
                {selectedSuspect && (
                  <span className="mt-2 block text-sm">
                    The {selectedSuspect.role.toLowerCase()}'s motive: {selectedSuspect.motive}
                  </span>
                )}
              </p>
              <Button onClick={onRestart} size="lg" className="mt-4 w-full">
                <RotateCcw className="mr-2 h-4 w-4" />
                Play Again
              </Button>
            </>
          ) : (
            <>
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/20">
                <XCircle className="h-10 w-10 text-destructive" />
              </div>
              <Badge className="mb-4 bg-destructive/20 text-destructive">Incorrect Accusation</Badge>
              <h2 className="mb-4 font-serif text-3xl font-bold text-foreground">
                Case Unsolved
              </h2>
              <p className="mb-2 text-muted-foreground">
                You accused <strong className="text-foreground">{selectedSuspect?.name}</strong>, but they were innocent.
              </p>
              <p className="mb-6 text-muted-foreground font-medium">
                Someone else is the culprit.
              </p>

              <div className="space-y-3">
                <Button onClick={onContinue} size="lg" variant="default" className="w-full">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button onClick={onRestart} variant="ghost" className="w-full">
                  Restart Case
                </Button>
              </div>
            </>
          )}

          <Button onClick={onRestart} size="lg" className="mt-4">
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Another Case
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
