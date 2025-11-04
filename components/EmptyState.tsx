// components/EmptyState.tsx
import React from 'react';
// 1. Importer les composants de base
import { View, Text } from 'react-native';
import { ClipboardIcon } from 'react-native-heroicons/outline';
// 2. SUPPRIMER la ligne : import { StyledView, StyledText } from './Styled';

export default function EmptyState() {
  return (
    // 3. Utiliser <View> et <Text> directement
    <View className="text-center py-12 items-center">
      <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mx-auto mb-4">
        <ClipboardIcon size={40} color="#9ca3af" />
      </View>
      <Text className="font-semibold text-gray-900 mb-2 text-base">No training goals yet</Text>
      <Text className="text-sm text-gray-500 text-center px-4">
        Tap the + button to add your first training goal!
      </Text>
    </View>
  );
}