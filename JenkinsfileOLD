// Jenkinsfile
pipeline {
    agent any

    environment {
        // 'expo-token' est l'ID que vous avez créé dans Jenkins
        EXPO_TOKEN = credentials('expo-token')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // MODIFICATION : 'sh' est devenu 'bat'
                bat 'npm install'
            }
        }

        stage('Install EAS CLI') {
            steps {
                // MODIFICATION : 'sh' est devenu 'bat'
                bat 'npm install -g eas-cli'
            }
        }

        stage('Build Android App (via EAS)') {
            steps {
                script {
                    echo 'Connexion à Expo...'

                    echo 'Lancement du build Android sur les serveurs EAS...'
                    // MODIFICATION : 'sh' est devenu 'bat'
                    bat 'eas build --platform android --non-interactive --profile production'

                    echo 'Le build est en cours sur les serveurs dExpo.'
                    echo 'Vous pouvez voir la progression sur https://expo.dev/builds'
                }
            }
        }
    }
}