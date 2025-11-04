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
};

const statusStyles = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
  'in-progress': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'In Progress' },
  completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
};

export default function GoalCard({ goal, onUpdateStatus, onDelete }: GoalCardProps) {
  const styles = statusStyles[goal.status] || statusStyles.pending;

  return (
    <View className="bg-white rounded-2xl p-5 shadow-md border border-gray-200 mb-4">
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-1">
          <Text className="font-bold text-gray-900 text-lg">{goal.player_name}</Text>
          <Text className="text-gray-600 mt-1">{goal.goal}</Text>
        </View>
        <View className={`px-3 py-1 rounded-full ${styles.bg} ml-3`}>
          <Text className={`text-xs font-semibold ${styles.text}`}>{styles.label}</Text>
        </View>
      </View>
      <View className="bg-blue-50 rounded-xl p-3 mb-4 flex-row items-center space-x-2">
        <BoltIcon size={20} color="#2563eb" />
        <Text className="font-medium text-blue-900">{goal.drill_name}</Text>
      </View>
      <View className="flex-row justify-between space-x-2">
        <TouchableOpacity onPress={() => onUpdateStatus(goal.id, 'in-progress')} className="flex-1 bg-blue-100 py-2 px-3 rounded-xl items-center">
          <Text className="text-blue-700 text-sm font-medium">Start</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onUpdateStatus(goal.id, 'completed')} className="flex-1 bg-green-100 py-2 px-3 rounded-xl items-center">
          <Text className="text-green-700 text-sm font-medium">Complete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(goal.id)} className="flex-1 bg-red-100 py-2 px-3 rounded-xl items-center">
          <Text className="text-red-700 text-sm font-medium">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}