// Jenkinsfile
pipeline {
    // 1. Agent
    // L'agent n'a besoin que de Node.js et npm
    agent any

    // 2. Variables d'Environnement
    // Nous allons stocker le token Expo dans les credentials de Jenkins
    environment {
        // 'expo-token' est l'ID que nous allons créer dans Jenkins
        FRONT_TOKEN = credentials('expo-token')
    }

    // 3. Étapes du Pipeline
    stages {

        stage('Checkout') {
            steps {
                // Récupère le code depuis votre repository Git
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Install EAS CLI') {
            steps {
                // Installe l'outil de ligne de commande d'Expo
                sh 'npm install -g eas-cli'
            }
        }

        stage('Build Android App (via EAS)') {
            steps {
                script {
                    echo 'Connexion à Expo...'
                    // EXPO_TOKEN est injecté par 'environment'

                    echo 'Lancement du build Android sur les serveurs EAS...'
                    // --non-interactive : essentiel pour un pipeline CI/CD
                    // --platform android : ne construit que pour Android
                    // --profile production : utilise le profil 'production' de eas.json
                    sh 'eas build --platform android --non-interactive --profile production'

                    echo 'Le build est en cours sur les serveurs dExpo.'
                    echo 'Vous pouvez voir la progression sur https://expo.dev/builds'
                }
            }
        }

        // Étape optionnelle si vous voulez aussi construire pour iOS
        /*
        stage('Build iOS App (via EAS)') {
            steps {
                script {
                    echo 'Lancement du build iOS sur les serveurs EAS...'
                    sh 'eas build --platform ios --non-interactive --profile production'
                }
            }
        }
        */
    }
}