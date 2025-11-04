// components/GoalCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BoltIcon } from 'react-native-heroicons/solid';

// Importer le type centralisé
import { Goal } from '../types';

type GoalCardProps = {
  goal: Goal;
  onUpdateStatus: (id: string, status: 'in-progress' | 'completed') => void;
  onDelete: (id: string) => void;
  onPress: () => void; // Rendre 'onPress' obligatoire (supprimer le '?')
};

const statusStyles = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
  'in-progress': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'In Progress' },
  completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
};

export default function GoalCard({ goal, onUpdateStatus, onDelete, onPress }: GoalCardProps) {
  const styles = statusStyles[goal.status] || statusStyles.pending;

  return (
      <View className="mb-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-md">

        {/* 👇 MODIFICATION : AJOUTER CE COMPOSANT "TouchableOpacity" 👇 */}
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          <View className="mb-3 flex-row items-start justify-between">
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-900">{goal.player_name}</Text>
              <Text className="mt-1 text-gray-600">{goal.goal}</Text>
            </View>
            <View className={`rounded-full px-3 py-1 ${styles.bg} ml-3`}>
              <Text className={`text-xs font-semibold ${styles.text}`}>{styles.label}</Text>
            </View>
          </View>
          <View className="mb-4 flex-row items-center space-x-2 rounded-xl bg-blue-50 p-3">
            <BoltIcon size={20} color="#2563eb" />
            <Text className="font-medium text-blue-900">{goal.drill_name}</Text>
          </View>
        </TouchableOpacity>
        {/* 👆 FIN DE LA ZONE CLIQUABLE 👆 */}


        {/* Les boutons du bas restent en dehors pour avoir leurs propres clics */}
        <View className="flex-row justify-between space-x-2">
          <TouchableOpacity
              onPress={() => onUpdateStatus(goal.id, 'in-progress')}
              className="flex-1 items-center rounded-xl bg-blue-100 px-3 py-2">
            <Text className="text-sm font-medium text-blue-700">Start</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => onUpdateStatus(goal.id, 'completed')}
              className="flex-1 items-center rounded-xl bg-green-100 px-3 py-2">
            <Text className="text-sm font-medium text-green-700">Complete</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => onDelete(goal.id)}
              className="flex-1 items-center rounded-xl bg-red-100 px-3 py-2">
            <Text className="text-sm font-medium text-red-700">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}