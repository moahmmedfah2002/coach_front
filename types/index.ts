// types/index.ts
export type Goal = {
  id: string;
  player_name: string;
  goal: string;
  drill_name: string;
  status: 'pending' | 'in-progress' | 'completed';
};