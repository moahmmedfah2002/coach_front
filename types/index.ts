// types/index.ts

// Vous avez déjà cette ligne
export type Goal = {
  id: string;
  player_name: string;
  goal: string;
  drill_name: string;
  status: 'pending' | 'in-progress' | 'completed';
};


// 👇👇 AJOUTEZ CE NOUVEAU TYPE 👇👇
// Il liste tous les écrans de votre Stack (défini dans App.tsx)
// et les paramètres qu'ils attendent.
export type RootStackParamList = {
  MainTabs: undefined;      // L'écran "MainTabs" (vos onglets) ne reçoit aucun paramètre
  Statistics: { goal: Goal }; // L'écran "Statistics" reçoit un objet avec une clé 'goal'
};