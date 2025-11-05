pipeline {
    agent any

    environment {
        // Expo access token stored in Jenkins credentials
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
                bat 'npm install'
            }
        }

        stage('Install EAS CLI') {
            steps {
                bat 'npm install -g eas-cli'
            }
        }

        stage('Login to Expo (non-interactive)') {
            steps {
                bat 'eas whoami || eas login --token %EXPO_TOKEN%'
            }
        }

        stage('Build iOS App (via EAS)') {
            steps {
                script {
                    echo '🔗 Lancement du build iOS sur les serveurs EAS...'
                    bat 'eas build --platform ios --non-interactive --profile production'
                    echo '🚀 Le build iOS est en cours sur Expo. Consultez la progression sur https://expo.dev/builds'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build iOS déclenché avec succès !'
        }
        failure {
            echo '❌ Échec du build iOS.'
        }
    }
}
