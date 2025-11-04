// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './navigation/TabNavigator';
import StatisticsScreen from './screens/StatisticsScreen';
import "./global.css";

// 1. Importer votre nouvelle "Param List"
import { RootStackParamList } from './types';

// 2. Appliquer la "Param List" ici
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="MainTabs" // Doit correspondre à la clé dans RootStackParamList
                        component={TabNavigator}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Statistics" // Doit correspondre à la clé dans RootStackParamList
                        component={StatisticsScreen}
                        options={{
                            title: 'Statistiques du joueur',
                            headerBackTitle: 'Retour',
                        }}
                    />
                </Stack.Navigator>

                <StatusBar style="auto" />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}