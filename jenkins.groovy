pipeline {
    agent any

    stages {
        stage('Get Code') {
            steps {
                git branch: 'master', url: 'https://github.com/surajmandalcell/devops2.git'
            }
        }

        stage('Build & Push PROD') {
            steps {
                script {
                    def dockerImage = docker.build("cruelplatypus67/devops2:${env.BUILD_ID}", "-f Dockerfile .")
                    env.IMAGE_NAME = "cruelplatypus67/devops2:${env.BUILD_ID}"
                    sh "docker image push cruelplatypus67/devops2:${env.BUILD_ID}"
                    sh "docker tag cruelplatypus67/devops2:${env.BUILD_ID} cruelplatypus67/devops2:latest"
                    sh "docker image push cruelplatypus67/devops2:latest"
                }
            }
        }

        stage('Build & Push PENDING') {
            steps {
                script {
                    def dockerImage = docker.build("cruelplatypus67/devops3:${env.BUILD_ID}", "-f Dockerfile.Pending .")
                    env.IMAGE_NAME = "cruelplatypus67/devops3:${env.BUILD_ID}"
                    sh "docker image push cruelplatypus67/devops3:${env.BUILD_ID}"
                    sh "docker tag cruelplatypus67/devops3:${env.BUILD_ID} cruelplatypus67/devops3:latest"
                    sh "docker image push cruelplatypus67/devops3:latest"
                }
            }
        }
    }
}
