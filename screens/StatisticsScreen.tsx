// screens/StatisticsScreen.tsx
import React from 'react';
// 1. Importer View, Text, et ScrollView (pour défiler)
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// 2. Importer le LineChart
import { LineChart } from 'react-native-chart-kit';

// 3. Importer vos types
import { Goal, RootStackParamList } from '../types';

// Le composant StatRow (inchangé)
const StatRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between items-center py-4 border-b border-gray-200">
    <Text className="text-base text-gray-600">{label}</Text>
    <Text className="text-base font-semibold text-gray-900">{value}</Text>
  </View>
);

// Définir le type de la 'route' (inchangé)
type StatisticsScreenRouteProp = RouteProp<RootStackParamList, 'Statistics'>;

export default function StatisticsScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<StatisticsScreenRouteProp>();
  const { goal } = route.params;

  // 4. Obtenir la largeur de l'écran pour le graphique
  const screenWidth = Dimensions.get("window").width;

  // 5. Données fictives pour le graphique de progression
  // (Plus tard, vous pourrez les charger depuis votre base de données)
  const progressData = {
    labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5"],
    datasets: [
      {
        data: [ 65, 70, 78, 75, 82 ], // Précision en %
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, // Couleur (bleu)
        strokeWidth: 2
      }
    ],
    legend: ["Progression de la précision (%)"] // optionnel
  };

  // 6. Configuration du style du graphique
  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0, // pas de décimales
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#3b82f6" // bleu
    }
  };

  return (
    // 7. Remplacer <View> par <ScrollView> pour permettre le défilement
    <ScrollView
      style={{paddingTop: insets.top}}
      className="flex-1 bg-gray-50"
      contentContainerStyle={{ padding: 16 }}
    >
      {/* Titre (inchangé) */}
      <View className="mb-6">
        <Text className="text-2xl font-bold text-gray-900">{goal.player_name}</Text>
        <Text className="text-lg text-blue-600">{goal.drill_name}</Text>
      </View>

      {/* Carte de statistiques (inchangée) */}
      <View className="bg-white rounded-2xl shadow-md border border-gray-200 mb-6">
        <View className="p-5">
          <Text className="text-lg font-semibold text-gray-900 mb-2">Statistiques de l'objectif</Text>
          <StatRow label="Statut actuel" value={goal.status} />
          <StatRow label="Objectif" value={goal.goal} />
          <StatRow label="Précision (simulée)" value="82%" />
          <StatRow label="Répétitions" value="120" />
          <StatRow label="Temps de jeu" value="45 min" />
        </View>
      </View>

      {/* 8. NOUVELLE CARTE : Graphique de Progression */}
      <View className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 items-center">
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Progression hebdomadaire
        </Text>
        <LineChart
          data={progressData}
          width={screenWidth - 64} // Largeur (largeur écran - padding total)
          height={220}
          chartConfig={chartConfig}
          bezier // Donne un effet de courbe
          style={{
            borderRadius: 16
          }}
        />
      </View>
    </ScrollView>
  );
}