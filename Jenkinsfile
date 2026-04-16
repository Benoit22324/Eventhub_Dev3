pipeline {
    agent any

    tools {
        nodejs 'Node-20'
    }

    environment {
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Install Dependencies') {
            parallel {
                stage('Backend Deps') {
                    steps {
                        dir('Eventhub') { sh 'npm ci' }
                    }
                }
                stage('Frontend Deps') {
                    steps {
                        dir('EventhubFront') { sh 'npm ci' }
                    }
                }
            }
        }

        stage('Fix Prisma dependencies') {
            steps {
                dir('Eventhub') {
                    sh 'echo DATABASE_URL=postgresql://user:password@postgres:5432/eventhub > .env'
                    sh 'npx prisma generate'
                }
            }
        }

        stage('Backend Unit Tests') {
            steps {
                dir('Eventhub') { sh 'npm run test' }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                dir('Eventhub') {
                    withSonarQubeEnv('SonarQube') {
                        sh "${tool('SonarScanner')}/bin/sonar-scanner"
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('Eventhub') { sh 'npm run build' }
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t eventhub-backend:${IMAGE_TAG} ./Eventhub"
                sh "docker build -t eventhub-frontend:${IMAGE_TAG} ./EventhubFront"
            }
        }
    }

    post {
        always { echo "Build #${env.BUILD_NUMBER} terminé" }
        success { echo 'Tous les tests passent !' }
        failure { echo 'Des tests ont échoué.' }
    }
}