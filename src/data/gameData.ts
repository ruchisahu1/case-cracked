import { Clue, Suspect, Department, InvestigationTip, Pathway } from '@/types/game';

export const pathways: Pathway[] = [
  { id: 'blockchain', name: 'Blockchain Analysis', description: 'Trace wallet transactions', stages: 3, color: 'primary' },
  { id: 'network', name: 'Network Forensics', description: 'Track IP addresses & logins', stages: 3, color: 'secondary' },
  { id: 'social', name: 'Social Engineering', description: 'Phishing & insider threats', stages: 3, color: 'accent' },
  { id: 'exchange', name: 'Exchange Records', description: 'CEX withdrawal patterns', stages: 3, color: 'chart-3' },
  { id: 'insider', name: 'Insider Intel', description: 'Team & access logs', stages: 3, color: 'chart-4' },
];

export const clues: Clue[] = [
  // Blockchain Analysis Pathway
  { id: 'wallet-drain', name: 'Wallet Drain TX', description: '2.5M USDT transferred to unknown wallet 0x7f3...8a2 at 3:47 AM UTC', pathway: 'blockchain', stage: 1, discovered: false, investigated: false, discarded: false, deepInvestigated: false, linkedClues: ['mixer-trail', 'bridge-hop'], icon: '💸' },
  { id: 'mixer-trail', name: 'Tornado Cash Trace', description: 'Funds routed through mixer with 4-hour delay pattern', pathway: 'blockchain', stage: 2, discovered: false, investigated: false, discarded: false, deepInvestigated: false, linkedClues: ['cex-deposit'], icon: '🌪️' },
  { id: 'bridge-hop', name: 'Cross-Chain Bridge', description: 'Assets bridged from Ethereum to Arbitrum, then to Polygon', pathway: 'blockchain', stage: 3, discovered: false, investigated: false, discarded: false, deepInvestigated: false, linkedClues: ['final-wallet'], icon: '🌉' },

  // Network Forensics Pathway
  { id: 'login-anomaly', name: 'Suspicious Login', description: 'Admin login from IP 185.220.101.42 (Moscow) at 3:41 AM - 6 mins before drain', pathway: 'network', stage: 1, discovered: false, investigated: false, discarded: false, deepInvestigated: false, linkedClues: ['vpn-trace', 'device-fingerprint'], icon: '🔐' },
  { id: 'vpn-trace', name: 'VPN Provider Logs', description: 'IP traced to NordVPN exit node, account paid with stolen credit card', pathway: 'network', stage: 2, discovered: false, investigated: false, discarded: false, deepInvestigated: false, linkedClues: ['real-ip'], icon: '🛡️' },
  { id: 'device-fingerprint', name: 'Browser Fingerprint', description: 'Canvas fingerprint matches device used by team member 3 weeks ago', pathway: 'network', stage: 3, discovered: false, investigated: false, discarded: false, deepInvestigated: false, linkedClues: ['smart-contract-dev'], icon: '🖥️' },

  // Social Engineering Pathway
  { id: 'phishing-email', name: 'Spear Phishing Email', description: 'Fake Ledger support email sent to CFO 2 days before hack', pathway: 'social', stage: 1, discovered: false, investigated: false, discarded: false, deepInvestigated: false, linkedClues: ['email-headers', 'keylogger'], icon: '🎣' },
  { id: 'email-headers', name: 'Email Header Analysis', description: 'Originating server hosted in Romania, domain registered 1 week prior', pathway: 'social', stage: 2, discovered: false, investigated: false, discarded: false, deepInvestigated: false, linkedClues: ['domain-registrant'], icon: '📧' },
  { id: 'keylogger', name: 'Keylogger Malware', description: 'Trojan installed via fake PDF, exfiltrated seed phrase to C2 server', pathway: 'social', stage: 3, discovered: false, investigated: false, discarded: false, deepInvestigated: false, linkedClues: ['smart-contract-dev'], icon: '🦠' },

  // Exchange Records Pathway
  { id: 'cex-deposit', name: 'Binance Deposit', description: '500 ETH deposited to verified account, KYC shows Nigerian passport', pathway: 'exchange', stage: 1, discovered: false, investigated: false, discarded: false, deepInvestigated: false, linkedClues: ['kyc-mismatch', 'withdrawal-pattern'], icon: '🏦' },
  { id: 'kyc-mismatch', name: 'Fake KYC Documents', description: 'Passport flagged as synthetic - AI-generated face detected', pathway: 'exchange', stage: 2, discovered: false, investigated: false, discarded: false, deepInvestigated: false, linkedClues: ['document-creator'], icon: '🪪' },
  { id: 'withdrawal-pattern', name: 'P2P Cash Out', description: 'Multiple P2P trades converting to fiat, linked to Telegram OTC group', pathway: 'exchange', stage: 3, discovered: false, investigated: false, discarded: false, deepInvestigated: false, linkedClues: ['telegram-otc'], icon: '💱' },

  // Insider Intel Pathway
  { id: 'access-log', name: 'AWS Access Logs', description: 'Private key accessed from new IAM role created 24 hours before hack', pathway: 'insider', stage: 1, discovered: false, investigated: false, discarded: false, deepInvestigated: false, linkedClues: ['iam-creator', 'git-history'], icon: '☁️' },
  { id: 'git-history', name: 'Git Commit History', description: 'Suspicious commit removed 2FA requirement for treasury wallet', pathway: 'insider', stage: 2, discovered: false, investigated: false, discarded: false, deepInvestigated: false, linkedClues: ['smart-contract-dev'], icon: '📝' },
  { id: 'discord-leak', name: 'Discord DM Leak', description: 'Anonymous tip: team member seen discussing "big payday" in private server', pathway: 'insider', stage: 3, discovered: false, investigated: false, discarded: false, deepInvestigated: false, linkedClues: ['smart-contract-dev', 'community-mod'], icon: '💬' },
];

export const suspects: Suspect[] = [
  { id: 'smart-contract-dev', name: 'Alex Chen', role: 'Smart Contract Developer', relationship: 'Core team - 2 years', alibi: 'Claims was asleep, no witnesses', motive: 'Recently passed over for CTO role', image: '👨‍💻', isGuilty: true },
  { id: 'cfo', name: 'Sarah Mitchell', role: 'CFO', relationship: 'Core team - 3 years', alibi: 'On vacation in Bali, verified', motive: 'Full treasury access', image: '👩‍💼', isGuilty: false },
  { id: 'ceo', name: 'Marcus Wei', role: 'CEO & Founder', relationship: 'Founded company', alibi: 'At crypto conference, on stage', motive: 'Rug pull for failing project?', image: '🧔', isGuilty: false },
  { id: 'community-mod', name: 'Jake "CryptoKing" Torres', role: 'Community Manager', relationship: 'Discord mod - 1 year', alibi: 'Streaming on Twitch, recorded', motive: 'Underpaid, vocal about it', image: '🎮', isGuilty: false },
  { id: 'ex-dev', name: 'Nina Volkov', role: 'Former Developer', relationship: 'Fired 3 months ago', alibi: 'Working at new job, verified', motive: 'Bitter about termination', image: '👩‍🔬', isGuilty: false },
  { id: 'telegram-otc', name: 'Unknown OTC Dealer', role: 'Telegram Trader', relationship: 'No direct connection', alibi: 'Anonymous, location unknown', motive: 'Financial gain', image: '🕴️', isGuilty: false },
  { id: 'domain-registrant', name: 'Dmitri Kozlov', role: 'Known Hacker', relationship: 'No known connection', alibi: 'Based in Russia, untraceable', motive: 'Professional hacker for hire', image: '🦹', isGuilty: false },
  { id: 'document-creator', name: 'Fake ID Network', role: 'Criminal Syndicate', relationship: 'Dark web service', alibi: 'Distributed operation', motive: 'Paid service provider', image: '🎭', isGuilty: false },
  { id: 'iam-creator', name: 'DevOps Bot Account', role: 'Compromised Service', relationship: 'Automated system', alibi: 'N/A - automated', motive: 'Exploited credentials', image: '🤖', isGuilty: false },
  { id: 'final-wallet', name: 'Mystery Whale', role: 'Unknown Entity', relationship: 'Final fund recipient', alibi: 'Wallet dormant since hack', motive: 'Unknown', image: '🐋', isGuilty: false },
];

export const departments: Department[] = [
  { id: 'chainalysis', name: 'Chainalysis', description: 'Professional blockchain forensics & wallet clustering', creditCost: 3, icon: '🔗' },
  { id: 'exchange-liaison', name: 'Exchange Liaison', description: 'Freeze requests & KYC data access', creditCost: 2, icon: '🏛️' },
  { id: 'interpol-cyber', name: 'INTERPOL Cyber', description: 'International law enforcement coordination', creditCost: 4, icon: '🌐' },
  { id: 'security-audit', name: 'Security Auditors', description: 'Smart contract & infrastructure review', creditCost: 2, icon: '🔒' },
  { id: 'osint-team', name: 'OSINT Specialists', description: 'Open source intelligence & social tracking', creditCost: 3, icon: '🕵️' },
];

export const tips: InvestigationTip[] = [
  { id: '1', title: 'Follow the Blockchain', content: 'Every transaction leaves a trace. Track fund flows through mixers, bridges, and exchanges to find cash-out points.', category: 'Strategy' },
  { id: '2', title: 'IP ≠ Identity', content: 'VPNs and Tor can mask true locations. Look for slip-ups - browser fingerprints, timezone mismatches, or language settings.', category: 'Strategy' },
  { id: '3', title: 'Insider Threat is Common', content: 'Over 60% of crypto hacks involve insider access. Check access logs, recent permission changes, and disgruntled employees.', category: 'Strategy' },
  { id: '4', title: 'Deep Investigation', content: 'Some clues require deep investigation (2 credits) to reveal hidden connections. Use wisely on high-value evidence.', category: 'Mechanics' },
  { id: '5', title: 'Specialist Help', content: 'Chainalysis and exchange liaisons can provide crucial data. Budget credits for key breakthroughs.', category: 'Mechanics' },
  { id: '6', title: 'CEX is Your Friend', content: 'Most hackers need to cash out eventually. Exchange KYC data and freeze requests are powerful tools.', category: 'Tips' },
  { id: '7', title: 'Timeline Everything', content: 'Create a timeline of logins, transactions, and communications. Correlate timestamps across evidence.', category: 'Strategy' },
  { id: '8', title: 'Trust No One', content: 'Even team members with alibis could be accomplices. Follow the evidence, not assumptions.', category: 'Tips' },
];

export const initialGameState = {
  credits: 25,
  maxCredits: 25,
  currentStage: 1,
  discoveredClues: [],
  investigatedClues: [],
  discardedClues: [],
  deepInvestigatedClues: [],
  departmentHelp: [],
  selectedSuspect: null,
  gameOver: false,
  solved: false,
};
