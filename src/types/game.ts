export interface Clue {
  id: string;
  name: string;
  description: string;
  pathway: string;
  stage: number;
  discovered: boolean;
  investigated: boolean;
  discarded: boolean;
  deepInvestigated: boolean;
  linkedClues: string[];
  icon: string;
}

export interface Suspect {
  id: string;
  name: string;
  role: string;
  relationship: string;
  alibi: string;
  motive: string;
  image: string;
  isGuilty: boolean;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  creditCost: number;
  icon: string;
}

export interface InvestigationTip {
  id: string;
  title: string;
  content: string;
  category: string;
}

export interface GameState {
  credits: number;
  maxCredits: number;
  currentStage: number;
  discoveredClues: string[];
  investigatedClues: string[];
  discardedClues: string[];
  deepInvestigatedClues: string[];
  departmentHelp: string[];
  selectedSuspect: string | null;
  gameOver: boolean;
  solved: boolean;
}

export interface Pathway {
  id: string;
  name: string;
  description: string;
  stages: number;
  color: string;
}
