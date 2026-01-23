import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InvestigationTip } from '@/types/game';
import { BookOpen, Lightbulb, Gamepad2, Star } from 'lucide-react';

interface TipBookProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tips: InvestigationTip[];
}

export const TipBook = ({ open, onOpenChange, tips }: TipBookProps) => {
  const categories = ['Strategy', 'Mechanics', 'Tips'];
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Strategy': return <Lightbulb className="h-4 w-4" />;
      case 'Mechanics': return <Gamepad2 className="h-4 w-4" />;
      case 'Tips': return <Star className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-border bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-serif text-xl text-foreground">
            <BookOpen className="h-5 w-5 text-primary" />
            Detective's Handbook
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="Strategy" className="w-full">
          <TabsList className="w-full bg-muted/50">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {getCategoryIcon(category)}
                <span className="ml-2">{category}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-4 space-y-3">
              {tips
                .filter((tip) => tip.category === category)
                .map((tip) => (
                  <Card key={tip.id} className="border-border bg-muted/30">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base text-foreground">{tip.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">{tip.content}</p>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
