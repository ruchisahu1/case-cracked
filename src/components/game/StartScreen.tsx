import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import investigationBg from '@/assets/investigation-board-bg.jpg';
import { Play, Wallet, Users, Target } from 'lucide-react';

interface StartScreenProps {
  onStartGame: () => void;
}

export const StartScreen = ({ onStartGame }: StartScreenProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${investigationBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <div className="max-w-3xl text-center">
          <Badge className="mb-4 border-primary/50 bg-primary/10 text-primary">
            Crypto Theft Investigation Game
          </Badge>
          
          <h1 className="mb-6 font-serif text-6xl font-bold text-foreground md:text-7xl">
            Blockchain<br />
            <span className="text-primary">Detective</span>
          </h1>
          
          <p className="mb-8 text-lg text-muted-foreground">
            A major crypto heist just occurred. Trace blockchain transactions, analyze IP logs, 
            investigate insider threats, and follow the digital breadcrumbs to recover stolen assets.
          </p>

          <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="border-border bg-card/80 backdrop-blur">
              <CardContent className="p-4 text-center">
                <Wallet className="mx-auto mb-2 h-8 w-8 text-primary" />
                <h3 className="font-semibold text-foreground">5 Investigation Paths</h3>
                <p className="text-sm text-muted-foreground">Blockchain, Network, Social Engineering, Exchange & Insider trails</p>
              </CardContent>
            </Card>
            
            <Card className="border-border bg-card/80 backdrop-blur">
              <CardContent className="p-4 text-center">
                <Users className="mx-auto mb-2 h-8 w-8 text-secondary" />
                <h3 className="font-semibold text-foreground">10 Suspects</h3>
                <p className="text-sm text-muted-foreground">Devs, executives, hackers, and anonymous entities</p>
              </CardContent>
            </Card>
            
            <Card className="border-border bg-card/80 backdrop-blur">
              <CardContent className="p-4 text-center">
                <Target className="mx-auto mb-2 h-8 w-8 text-accent-foreground" />
                <h3 className="font-semibold text-foreground">Limited Credits</h3>
                <p className="text-sm text-muted-foreground">Budget your resources to crack the case</p>
              </CardContent>
            </Card>
          </div>

          <Button 
            size="lg" 
            onClick={onStartGame}
            className="h-14 px-10 text-lg font-semibold"
          >
            <Play className="mr-2 h-5 w-5" />
            Start Investigation
          </Button>

          <p className="mt-6 text-sm text-muted-foreground">
            Case #1: The $2.5M DeFi Treasury Heist
          </p>
        </div>
      </div>
    </div>
  );
};
