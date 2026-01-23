import { Badge } from '@/components/ui/badge';
import { Coins, FileText, Users } from 'lucide-react';

interface HeaderProps {
  credits: number;
  maxCredits: number;
  stage: number;
  discoveredClues: number;
  onOpenTipBook: () => void;
}

export const Header = ({ credits, maxCredits, stage, discoveredClues, onOpenTipBook }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-serif text-2xl font-bold text-primary">Blockchain Detective</h1>
            <Badge variant="outline" className="border-primary/50 text-primary">
              Case #1: The $2.5M DeFi Heist
            </Badge>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-primary" />
              <span className="font-mono text-lg font-bold text-primary">{credits}</span>
              <span className="text-muted-foreground">/ {maxCredits}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent-foreground" />
              <span className="text-sm text-foreground">Stage {stage}/3</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-secondary" />
              <span className="text-sm text-foreground">{discoveredClues} Clues</span>
            </div>
            
            <button 
              onClick={onOpenTipBook}
              className="rounded-md border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
            >
              📖 Tip Book
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
