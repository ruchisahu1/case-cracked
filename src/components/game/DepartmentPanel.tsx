import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Department } from '@/types/game';
import { Phone, Check, Coins } from 'lucide-react';

interface DepartmentPanelProps {
  departments: Department[];
  usedDepartments: string[];
  credits: number;
  onUseDepartment: (id: string, cost: number) => boolean;
}

export const DepartmentPanel = ({ departments, usedDepartments, credits, onUseDepartment }: DepartmentPanelProps) => {
  const departmentResults: Record<string, string> = {
    chainalysis: 'Wallet clustering reveals the final destination wallet is linked to previous hacks attributed to a known developer address.',
    'exchange-liaison': 'Binance confirms the KYC documents were synthetic. Real user accessed from IP range consistent with Eastern Europe VPN exits.',
    'interpol-cyber': 'Cross-referencing with international database shows device fingerprint matches a suspect previously investigated for DeFi exploits.',
    'security-audit': 'Code review reveals a backdoor in the 2FA bypass commit. Git blame points to a specific team member\'s account.',
    'osint-team': 'Social media analysis found deleted tweets from team member discussing "financial freedom" days before the hack.',
  };

  return (
    <div className="space-y-4">
      <h2 className="font-serif text-xl font-bold text-foreground flex items-center gap-2">
        <Phone className="h-5 w-5 text-accent-foreground" />
        Request Specialist Help
      </h2>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        {departments.map((dept) => {
          const isUsed = usedDepartments.includes(dept.id);
          const canAfford = credits >= dept.creditCost;

          return (
            <Card 
              key={dept.id}
              className={`transition-all ${
                isUsed 
                  ? 'border-accent/50 bg-accent/10' 
                  : 'border-border bg-card hover:border-accent/30'
              }`}
            >
              <CardHeader className="p-3 pb-1">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{dept.icon}</span>
                  <Badge variant="outline" className="border-primary/50 text-primary">
                    <Coins className="mr-1 h-3 w-3" />
                    {dept.creditCost}
                  </Badge>
                </div>
                <CardTitle className="text-sm text-foreground">{dept.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <p className="mb-3 text-xs text-muted-foreground">{dept.description}</p>
                
                {isUsed ? (
                  <div className="space-y-2">
                    <Badge className="w-full justify-center bg-accent/20 text-accent-foreground">
                      <Check className="mr-1 h-3 w-3" />
                      Report Received
                    </Badge>
                    <p className="text-xs text-accent-foreground italic">
                      "{departmentResults[dept.id]}"
                    </p>
                  </div>
                ) : (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full border-accent/50 text-accent-foreground hover:bg-accent/10"
                    disabled={!canAfford}
                    onClick={() => onUseDepartment(dept.id, dept.creditCost)}
                  >
                    Request Help
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
