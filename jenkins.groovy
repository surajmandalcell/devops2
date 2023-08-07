pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/surajmandalcell/devops2.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build("cruelplatypus67/devops2:${env.BUILD_ID}", "-f Dockerfile .")
                    env.IMAGE_NAME = "cruelplatypus67/devops2:${env.BUILD_ID}"
                }
            }
        }

        stage('Test Docker Image') {
            steps {
                script {
                    sh "docker run --rm ${env.IMAGE_NAME}"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withDockerRegistry([url: "https://index.docker.io/v1/", credentialsId: "dockerhub_credential"]) {
                        sh "docker push ${env.IMAGE_NAME}"
                    }
                }
            }
        }
    }
}
