@Library('docker-shared-library1') _

pipeline {

    agent {
        label 'roman-agent'
    }

    environment {
        IMAGE_NAME = 'agni730/jenkins-docker-demo'
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Building branch: ${env.BRANCH_NAME}"
                checkout scm
            }
        }

        stage('Build') {
            steps {
                dockerBuild(IMAGE_NAME)
            }
        }

        stage('Push') {
            steps {
                dockerPush(
                    IMAGE_NAME,
                    'dockerhub-creds'
                )
            }
        }

        stage('Production Deployment') {

            when {
                branch 'main'
            }

            steps {
                echo "This stage runs ONLY for main"
                dockerDeploy()
            }
        }
    }

    post {

        success {
            echo "Pipeline completed successfully"
        }

        failure {
            echo "Pipeline failed"
        }
    }
}
