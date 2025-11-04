// screens/GoalsScreen.tsx
import React, { useState, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PlusIcon } from 'react-native-heroicons/solid';

import GoalCard from '../components/GoalCard';
import EmptyState from '../components/EmptyState';
import AddGoalModal from '../components/AddGoalModal';

// Importer le type centralisé
import { Goal } from '../types';

const GOALS_STORAGE_KEY = '@coach_goals';

export default function GoalsScreen() {
  const insets = useSafeAreaInsets();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // --- Logique ---
  useFocusEffect(
    useCallback(() => {
      loadGoals();
    }, [])
  );

  const loadGoals = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(GOALS_STORAGE_KEY);
      setGoals(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) { console.error('Failed to load goals.', e); }
  };

  const saveGoals = async (newGoals: Goal[]) => {
    try {
      const jsonValue = JSON.stringify(newGoals);
      await AsyncStorage.setItem(GOALS_STORAGE_KEY, jsonValue);
      setGoals(newGoals);
    } catch (e) { console.error('Failed to save goals.', e); }
  };

  const handleAddGoal = (newGoalData: Omit<Goal, 'id' | 'status'>) => {
    const newGoal: Goal = {
      ...newGoalData,
      id: Date.now().toString(),
      status: 'pending',
    };
    saveGoals([...goals, newGoal]);
    setIsModalVisible(false);
  };

  const handleUpdateStatus = (goalId: string, newStatus: 'in-progress' | 'completed') => {
    const newGoals = goals.map(goal =>
      goal.id === goalId ? { ...goal, status: newStatus } : goal
    );
    saveGoals(newGoals);
  };

  const handleDeleteGoal = (goalId: string) => {
    const newGoals = goals.filter(goal => goal.id !== goalId);
    saveGoals(newGoals);
  };
  // --- Fin de la Logique ---

  return (
    <View style={{paddingTop: insets.top}} className="flex-1 bg-gray-50">

      <View className="flex-row items-center justify-between p-4 bg-white border-b border-gray-200">
        <Text className="text-xl font-bold text-gray-900">Training Goals</Text>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          className="bg-blue-600 p-2 rounded-full shadow-lg"
        >
          <PlusIcon size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GoalCard
            goal={item}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDeleteGoal}
          />
        )}
        ListEmptyComponent={<EmptyState />}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="px-4 pt-6"
      />

      <AddGoalModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleAddGoal}
      />
    </View>
  );
}