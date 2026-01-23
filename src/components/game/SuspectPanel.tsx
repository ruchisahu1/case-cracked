import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Suspect } from '@/types/game';
import { AlertTriangle, Target, User } from 'lucide-react';

interface SuspectPanelProps {
  suspects: Suspect[];
  selectedSuspect: string | null;
  onSelectSuspect: (id: string) => void;
  onSubmitAccusation: (id: string, isCorrect: boolean) => void;
  investigatedClues: number;
}

export const SuspectPanel = ({
  suspects,
  selectedSuspect,
  onSelectSuspect,
  onSubmitAccusation,
  investigatedClues
}: SuspectPanelProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [accusedSuspect, setAccusedSuspect] = useState<Suspect | null>(null);

  const handleAccuse = (suspect: Suspect) => {
    setAccusedSuspect(suspect);
    setShowConfirm(true);
  };

  const confirmAccusation = () => {
    if (accusedSuspect) {
      onSubmitAccusation(accusedSuspect.id, accusedSuspect.isGuilty);
    }
    setShowConfirm(false);
  };

  const canAccuse = investigatedClues >= 5;

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-foreground flex items-center gap-2">
            <Target className="h-5 w-5 text-secondary" />
            Suspects
          </h2>
          {!canAccuse && (
            <Badge variant="outline" className="border-muted-foreground/50">
              Investigate {5 - investigatedClues} more clues to accuse
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {suspects.map((suspect) => (
            <Card
              key={suspect.id}
              className={`cursor-pointer transition-all duration-200 hover:border-secondary/50 border-border bg-card`}
              onClick={() => onSelectSuspect(suspect.id)}
            >
              <CardHeader className="p-3 pb-1">
                <div className="text-center">
                  <span className="text-4xl">{suspect.image}</span>
                </div>
                <CardTitle className="text-center text-sm text-foreground">{suspect.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <Badge variant="outline" className="w-full justify-center text-xs">
                  {suspect.role}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedSuspect} onOpenChange={(open) => !open && onSelectSuspect('')}>
        <DialogContent className="border-secondary bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <User className="h-5 w-5 text-secondary" />
              Suspect Profile
            </DialogTitle>
          </DialogHeader>

          {selectedSuspect && (() => {
            const suspect = suspects.find(s => s.id === selectedSuspect);
            if (!suspect) return null;

            return (
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="relative">
                    <span className="text-6xl">{suspect.image}</span>
                    <Badge variant="secondary" className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      {suspect.role}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{suspect.name}</h3>
                    <p className="text-sm text-muted-foreground">{suspect.relationship}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 rounded-lg border border-border/50 bg-muted/20 p-4 text-sm">
                  <div>
                    <span className="font-semibold text-foreground flex items-center gap-2 mb-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Alibi
                    </span>
                    <p className="text-muted-foreground pl-3.5">{suspect.alibi}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground flex items-center gap-2 mb-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                      Potential Motive
                    </span>
                    <p className="text-muted-foreground pl-3.5">{suspect.motive}</p>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    variant="destructive"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      onSelectSuspect(''); // Close details dialog
                      handleAccuse(suspect); // Open accusation confirm
                    }}
                    disabled={!canAccuse}
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Accuse Suspect
                  </Button>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="border-secondary bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <AlertTriangle className="h-5 w-5 text-secondary" />
              Confirm Accusation
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              You are about to accuse <strong className="text-foreground">{accusedSuspect?.name}</strong> of the crypto theft.
              This action cannot be undone and will end the investigation.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              Continue Investigating
            </Button>
            <Button variant="destructive" onClick={confirmAccusation}>
              Confirm Accusation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
