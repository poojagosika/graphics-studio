// ICC image base URLs
const ICC_FLAGS = 'https://images.icc-cricket.com/image/upload/t_q-good/prd/assets/flags';
const ICC_PLAYERS = 'https://images.icc-cricket.com/image/upload/t_player-headshot-portrait-lg-webp/prd/assets/players';

// Team colors and metadata for ICC Women's T20 World Cup 2026 + IPL
export const TEAMS = {
  // International Teams
  'India': {
    name: 'India',
    short: 'IND',
    colors: ['#0066B3', '#FF9933'],
    gradient: 'from-blue-600 to-orange-500',
    bg: '#0066B3',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
    flag: `${ICC_FLAGS}/ind.png`,
  },
  'Australia': {
    name: 'Australia',
    short: 'AUS',
    colors: ['#006241', '#FFCD00'],
    gradient: 'from-green-800 to-yellow-400',
    bg: '#006241',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
  },
  'England': {
    name: 'England',
    short: 'ENG',
    colors: ['#1A237E', '#C62828'],
    gradient: 'from-indigo-900 to-red-700',
    bg: '#1A237E',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
  },
  'South Africa': {
    name: 'South Africa',
    short: 'SA',
    colors: ['#007749', '#FFB81C'],
    gradient: 'from-green-700 to-yellow-500',
    bg: '#007749',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
  },
  'New Zealand': {
    name: 'New Zealand',
    short: 'NZ',
    colors: ['#000000', '#FFFFFF'],
    gradient: 'from-gray-900 to-gray-600',
    bg: '#000000',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
  },
  'West Indies': {
    name: 'West Indies',
    short: 'WI',
    colors: ['#7B0041', '#FFD700'],
    gradient: 'from-rose-900 to-yellow-400',
    bg: '#7B0041',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
  },
  'Sri Lanka': {
    name: 'Sri Lanka',
    short: 'SL',
    colors: ['#0A1172', '#FFD700'],
    gradient: 'from-blue-950 to-yellow-400',
    bg: '#0A1172',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
  },
  'Pakistan': {
    name: 'Pakistan',
    short: 'PAK',
    colors: ['#006400', '#FFFFFF'],
    gradient: 'from-green-800 to-green-500',
    bg: '#006400',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
  },
  'Bangladesh': {
    name: 'Bangladesh',
    short: 'BAN',
    colors: ['#006633', '#F42A41'],
    gradient: 'from-green-800 to-red-500',
    bg: '#006633',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
  },
  'Ireland': {
    name: 'Ireland',
    short: 'IRE',
    colors: ['#169B62', '#FF8C00'],
    gradient: 'from-green-600 to-orange-500',
    bg: '#169B62',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
  },
  'Netherlands': {
    name: 'Netherlands',
    short: 'NED',
    colors: ['#FF6600', '#FFFFFF'],
    gradient: 'from-orange-600 to-white',
    bg: '#FF6600',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
  },
  'Scotland': {
    name: 'Scotland',
    short: 'SCO',
    colors: ['#003087', '#FFFFFF'],
    gradient: 'from-blue-800 to-blue-500',
    bg: '#003087',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
  },

  // IPL Teams
  'Chennai Super Kings': {
    name: 'Chennai Super Kings',
    short: 'CSK',
    colors: ['#FCCA06', '#0081E9'],
    gradient: 'from-yellow-400 to-blue-600',
    bg: '#FCCA06',
    accent: '#F7FF00',
    textColor: '#000000',
  },
  'Mumbai Indians': {
    name: 'Mumbai Indians',
    short: 'MI',
    colors: ['#004BA0', '#D4A867'],
    gradient: 'from-blue-800 to-yellow-600',
    bg: '#004BA0',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
  },
  'Royal Challengers Bengaluru': {
    name: 'Royal Challengers Bengaluru',
    short: 'RCB',
    colors: ['#EC1C24', '#2B2A29'],
    gradient: 'from-red-600 to-gray-900',
    bg: '#EC1C24',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
  },
  'Kolkata Knight Riders': {
    name: 'Kolkata Knight Riders',
    short: 'KKR',
    colors: ['#3A225D', '#D4A867'],
    gradient: 'from-purple-900 to-yellow-600',
    bg: '#3A225D',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
  },
  'Rajasthan Royals': {
    name: 'Rajasthan Royals',
    short: 'RR',
    colors: ['#EA1A85', '#254AA5'],
    gradient: 'from-pink-600 to-blue-700',
    bg: '#EA1A85',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
  },
  'Delhi Capitals': {
    name: 'Delhi Capitals',
    short: 'DC',
    colors: ['#004C93', '#EF1B23'],
    gradient: 'from-blue-800 to-red-600',
    bg: '#004C93',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
  },
  'Punjab Kings': {
    name: 'Punjab Kings',
    short: 'PBKS',
    colors: ['#ED1B24', '#A7A9AC'],
    gradient: 'from-red-600 to-gray-400',
    bg: '#ED1B24',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
  },
  'Sunrisers Hyderabad': {
    name: 'Sunrisers Hyderabad',
    short: 'SRH',
    colors: ['#FF822A', '#000000'],
    gradient: 'from-orange-500 to-gray-900',
    bg: '#FF822A',
    accent: '#F7FF00',
    textColor: '#000000',
  },
  'Gujarat Titans': {
    name: 'Gujarat Titans',
    short: 'GT',
    colors: ['#1C1C1C', '#A0D2DB'],
    gradient: 'from-gray-900 to-cyan-400',
    bg: '#1C1C1C',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
  },
  'Lucknow Super Giants': {
    name: 'Lucknow Super Giants',
    short: 'LSG',
    colors: ['#A72056', '#FFCC00'],
    gradient: 'from-rose-800 to-yellow-400',
    bg: '#A72056',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
  },
};

// Lookup team by short name or full name
export function getTeam(nameOrShort) {
  if (!nameOrShort) return null;
  const key = nameOrShort.trim();

  // Direct match
  if (TEAMS[key]) return TEAMS[key];

  // Match by short name
  const byShort = Object.values(TEAMS).find(
    t => t.short.toLowerCase() === key.toLowerCase()
  );
  if (byShort) return byShort;

  // Partial match
  const byPartial = Object.values(TEAMS).find(
    t => t.name.toLowerCase().includes(key.toLowerCase()) ||
         key.toLowerCase().includes(t.short.toLowerCase())
  );
  if (byPartial) return byPartial;

  // Default colors for unknown teams
  return {
    name: key,
    short: key.substring(0, 3).toUpperCase(),
    colors: ['#374151', '#6B7280'],
    gradient: 'from-gray-700 to-gray-500',
    bg: '#374151',
    accent: '#F7FF00',
    textColor: '#FFFFFF',
  };
}
