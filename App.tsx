// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from './navigation/TabNavigator';

// Importer le CSS global (TRÈS IMPORTANT)
import "./global.css";

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <TabNavigator />
                <StatusBar style="auto" />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}