// components/AddGoalModal.tsx
import React, { useState, useEffect } from 'react';
// Importer les composants de base
import { View, Text, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Importer Omit de Goal
import { Goal } from '../types';

type AddGoalModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSave: (goalData: Omit<Goal, 'id' | 'status'>) => void;
};

const drillRecommendations: { [key: string]: string } = {
  'dribbling': 'Cone Weaving Drill',
  'shooting': 'Target Practice Drill',
  'passing': 'Wall Pass Drill',
  'defending': '1v1 Defending Drill',
  'fitness': 'Sprint Intervals'
};

export default function AddGoalModal({ isVisible, onClose, onSave }: AddGoalModalProps) {
  const [playerName, setPlayerName] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [drillName, setDrillName] = useState('');

  useEffect(() => {
    setDrillName(drillRecommendations[selectedGoal] || '');
  }, [selectedGoal]);

  const handleSave = () => {
    if (!playerName || !selectedGoal) return;
    onSave({
      player_name: playerName,
      goal: selectedGoal,
      drill_name: drillName,
    });
    setPlayerName('');
    setSelectedGoal('');
  };

  return (
    // Utiliser <Modal>
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      {/* Utiliser <Pressable> */}
      <Pressable onPress={onClose} className="flex-1 items-center justify-center bg-black/50 p-4">
        {/* Utiliser <Pressable> */}
        <Pressable onPress={() => {}} className="bg-white rounded-xl p-6 w-full max-w-md">
          {/* Utiliser <Text> */}
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Add New Training Goal
          </Text>
          {/* Utiliser <View> */}
          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">Player Name</Text>
              {/* Utiliser <TextInput> */}
              <TextInput
                value={playerName}
                onChangeText={setPlayerName}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base"
                placeholder="Enter player name"
                placeholderTextColor="#9ca3af"
              />
            </View>
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">Training Goal</Text>
              <View className="border border-gray-300 rounded-lg">
                {/* Utiliser <Picker> */}
                <Picker
                  selectedValue={selectedGoal}
                  onValueChange={(itemValue: string) => setSelectedGoal(itemValue)}
                >
                  <Picker.Item label="Select a goal" value="" />
                  <Picker.Item label="Improve Dribbling" value="dribbling" />
                  <Picker.Item label="Shooting Accuracy" value="shooting" />
                  <Picker.Item label="Passing Precision" value="passing" />
                  <Picker.Item label="Defensive Skills" value="defending" />
                  <Picker.Item label="Physical Fitness" value="fitness" />
                </Picker>
              </View>
            </View>
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">Recommended Drill</Text>
              <TextInput
                value={drillName}
                editable={false}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 text-base"
              />
            </View>
            <View className="flex-row space-x-3 pt-4">
              {/* Utiliser <TouchableOpacity> */}
              <TouchableOpacity
                onPress={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg items-center"
              >
                <Text className="text-gray-700 font-medium text-base">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSave}
                className="flex-1 bg-blue-600 px-4 py-3 rounded-lg items-center"
              >
                <Text className="text-white font-medium text-base">Save Goal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}