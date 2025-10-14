pipeline {
    agent any

    environment {
        IMAGE_NAME = "simple-backend"
        REGISTRY = "docker.io/${DOCKERHUB_USERNAME}"
        SERVER_HOST = "139.59.224.31"   // Đổi sang IP thật của bạn
        SERVER_USER = "root"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/Joycee23/simple_backend.git',
                        credentialsId: 'github-pat'
                    ]]
                ])
            }
        }

        stage('Docker Build') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-cred',
                    usernameVariable: 'DOCKERHUB_USERNAME',
                    passwordVariable: 'DOCKERHUB_ACCESS_TOKEN'
                )]) {
                    sh '''
                    echo "🚧 Building Docker image..."
                    docker build -t ${REGISTRY}/${IMAGE_NAME}:latest .
                    '''
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-cred',
                    usernameVariable: 'DOCKERHUB_USERNAME',
                    passwordVariable: 'DOCKERHUB_ACCESS_TOKEN'
                )]) {
                    sh '''
                    echo "🔑 Logging in to Docker Hub..."
                    echo $DOCKERHUB_ACCESS_TOKEN | docker login -u $DOCKERHUB_USERNAME --password-stdin

                    echo "📦 Pushing image to Docker Hub..."
                    docker push ${REGISTRY}/${IMAGE_NAME}:latest
                    '''
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                withCredentials([
                    file(credentialsId: 'docker-compose-file', variable: 'DOCKER_COMPOSE_PATH'),
                    sshUserPrivateKey(credentialsId: 'server-ssh-key', keyFileVariable: 'SSH_KEY')
                ]) {
                    sh '''
                    echo "🚀 Deploying to remote server..."

                    # Copy docker-compose file
                    scp -i $SSH_KEY -o StrictHostKeyChecking=no $DOCKER_COMPOSE_PATH $SERVER_USER@$SERVER_HOST:/root/project/docker-compose.yml

                    # SSH vào server và chạy lệnh deploy
                    ssh -i $SSH_KEY -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST "
                        cd /root/project && \
                        echo $DOCKERHUB_ACCESS_TOKEN | docker login -u $DOCKERHUB_USERNAME --password-stdin && \
                        docker compose pull && \
                        docker compose down && \
                        docker compose up -d && \
                        docker image prune -f
                    "
                    '''
                }
            }
        }
    }
}
