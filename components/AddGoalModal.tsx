
// components/AddGoalModal.tsx
import React, { useState, useEffect } from 'react';
// Importer 'Platform' pour gérer les différences iOS/Android
import { View, Text, TextInput, TouchableOpacity, Modal, Pressable, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Importer le type 'Goal'
import { Goal } from '../types';

// Définir les props que ce composant reçoit
type AddGoalModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSave: (goalData: Omit<Goal, 'id' | 'status'>) => void;
};

// Map des recommandations d'exercices
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

  // Mettre à jour l'exercice recommandé lorsque l'objectif change
  useEffect(() => {
    setDrillName(drillRecommendations[selectedGoal] || '');
  }, [selectedGoal]);

  // Gérer la sauvegarde
  const handleSave = () => {
    if (!playerName || !selectedGoal) return; // Validation simple
    onSave({
      player_name: playerName,
      goal: selectedGoal,
      drill_name: drillName,
    });
    // Réinitialiser le formulaire après la sauvegarde
    setPlayerName('');
    setSelectedGoal('');
  };

  // Composant Picker réutilisable avec les corrections de style
  const GoalPicker = () => (
    <Picker
      selectedValue={selectedGoal}
      onValueChange={(itemValue: string) => setSelectedGoal(itemValue)}
      
      // Style pour Android (couleur de l'item sélectionné)
      style={{ width: '100%', color: '#000000' }} 
      
      // Style pour iOS (couleur des items dans le "tambour")
      itemStyle={{ 
        color: '#000000', // Force le texte en NOIR
        fontSize: 18,
        height: 150 
      }}
    >
      {/* Ajouter la prop 'color' à chaque item garantit
        que le texte est visible sur Android et iOS.
      */}
      <Picker.Item label="Select a goal" value="" color="#888888" />
      <Picker.Item label="Improve Dribbling" value="dribbling" color="#000000" />
      <Picker.Item label="Shooting Accuracy" value="shooting" color="#000000" />
      <Picker.Item label="Passing Precision" value="passing" color="#000000" />
      <Picker.Item label="Defensive Skills" value="defending" color="#000000" />
      <Picker.Item label="Physical Fitness" value="fitness" color="#000000" />
    </Picker>
  );

  return (
    // Utiliser le composant <Modal> pour s'afficher par-dessus
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      {/* Fond sombre cliquable pour fermer la modale */}
      <Pressable onPress={onClose} className="flex-1 items-center justify-center bg-black/50 p-4">
        
        {/* Conteneur blanc (non cliquable pour ne pas fermer) */}
        <Pressable onPress={() => {}} className="bg-white rounded-xl p-6 w-full max-w-md">
          
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Add New Training Goal
          </Text>
          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">Player Name</Text>
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
              
              {/* Logique d'affichage spécifique à la plateforme */}
              {Platform.OS === 'android' ? (
                // Sur Android, on garde la bordure autour
                <View className="border border-gray-300 rounded-lg">
                  <GoalPicker />
                </View>
              ) : (
                // Sur iOS, on affiche le tambour directement
                <GoalPicker />
              )}
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
