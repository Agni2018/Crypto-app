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

        stage('Push to Docker Hub') {
            steps {
                dockerPush(
                    IMAGE_NAME,
                    'dockerhub-creds'
                )
            }
        }

        stage('Deploy') {
            steps {
                dockerDeploy()
            }
        }
    }

    post {

        success {
            echo "Pipeline completed successfully for ${env.BRANCH_NAME}"
        }

        failure {
            echo "Pipeline failed for ${env.BRANCH_NAME}"
        }
    }
}
