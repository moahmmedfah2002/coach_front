// screens/AnalysisScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import { useCameraPermissions, CameraView } from 'expo-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AnalysisScreen() {
  const insets = useSafeAreaInsets();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState('Tap "Start Video Analysis" to begin.');

  // 1. OBTENIR LE STATUT DE PERMISSION ET LA FONCTION DE DEMANDE
  const [permission, requestPermission] = useCameraPermissions();
  const analysisInterval = useRef<NodeJS.Timeout | null>(null);
  // --- Logique (inchangée) ---
  useEffect(() => {
    if (isAnalyzing) {
      setFeedback('Analyzing movement...'); // Mettre à jour le feedback
      analysisInterval.current = setInterval(() => {
        const analyses = [
          "✅ Good posture detected",
          "⚠️ Ball control needs improvement",
          "✅ Excellent footwork",
        ];
        const randomIndex = Math.floor(Math.random() * analyses.length);
        setFeedback(analyses[randomIndex]);
      }, 3000);
    } else if (analysisInterval.current) {
      clearInterval(analysisInterval.current);
    }
    return () => {
      if (analysisInterval.current) {
        clearInterval(analysisInterval.current);
      }
    };
  }, [isAnalyzing]);
  // --- Fin de la Logique ---


  // 2. CORRECTION DE LA FONCTION startAnalysis
  const startAnalysis = async () => {
    let currentPermission = permission;

    // Demander la permission si elle n'est pas déjà accordée
    if (!currentPermission?.granted) {
      currentPermission = await requestPermission();
    }

    // Si la permission est refusée, arrêter ici
    if (!currentPermission?.granted) {
      setFeedback('Camera permission is required to start analysis.');
      return;
    }

    // Si la permission est accordée, démarrer l'analyse
    setIsAnalyzing(true);
  };

  const stopAnalysis = () => {
    setIsAnalyzing(false);
    setFeedback('Analysis stopped. Click "Start" to begin again.');
  };


  // --- Écran de chargement ou de demande de permission ---
  if (!permission) {
    // Les permissions se chargent
    return <View />;
  }

  if (!permission.granted) {
    // L'utilisateur n'a pas encore accordé la permission
    return (
      <View style={{paddingTop: insets.top}} className="flex-1 justify-center items-center bg-gray-50 p-4">
        <Text className="text-lg text-center text-gray-700 mb-4">
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          className="bg-blue-600 px-4 py-2 rounded-lg"
          onPress={requestPermission}
        >
          <Text className="text-white font-medium">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- Écran principal (Permission accordée) ---
  return (
    <View style={{paddingTop: insets.top}} className="flex-1 bg-gray-50 p-4">
      <Text className="text-xl font-bold text-gray-900 mb-6 text-center">
        Real-Time Movement Analysis
      </Text>

      {/* 3. CORRECTION DU JSX : La caméra est TOUJOURS rendue */}
      <View className="h-80 mb-6 mx-auto w-full max-w-sm rounded-2xl overflow-hidden bg-blue-800">
        <CameraView style={StyleSheet.absoluteFill} facing="back" />

        {/* L'overlay ne s'affiche que si on N'ANALYSE PAS */}
        {!isAnalyzing && (
          <View className="absolute inset-0 bg-black/30 justify-center items-center">
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text className="text-lg text-white font-bold mt-4">Press Start to Analyze</Text>
          </View>
        )}
      </View>

      {/* Boutons de contrôle */}
      <View className="space-y-3 mb-6">
        <TouchableOpacity
          onPress={startAnalysis}
          disabled={isAnalyzing}
          className={`w-full bg-green-600 py-4 px-6 rounded-2xl flex-row items-center justify-center space-x-2 ${isAnalyzing ? 'bg-gray-400' : 'bg-green-700'}`}
        >
          <Text className="text-white font-semibold text-lg">Start Video Analysis</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={stopAnalysis}
          disabled={!isAnalyzing}
          className={`w-full bg-red-600 py-4 px-6 rounded-2xl flex-row items-center justify-center space-x-2 ${!isAnalyzing ? 'bg-gray-400' : 'bg-red-700'}`}
        >
          <Text className="text-white font-semibold text-lg">Stop Analysis</Text>
        </TouchableOpacity>
      </View>

      {/* Carte de Feedback */}
      <View className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
        <Text className="font-bold text-gray-900 mb-3 text-lg">Live Feedback</Text>
        <Text className="text-gray-700">{feedback}</Text>
      </View>
    </View>
  );
}