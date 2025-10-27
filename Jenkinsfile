// pipeline {
//     agent any

//     environment {
//         IMAGE_NAME = "simple-backend"
//         SERVER_HOST = "54.204.224.149"
//         SERVER_USER = "root"
//     }

//     stages {

//         stage('Checkout') {
//             steps {
//                 checkout([$class: 'GitSCM',
//                     branches: [[name: '*/main']],
//                     userRemoteConfigs: [[
//                         url: 'https://github.com/kieuvy16/devops2.git',
//                         credentialsId: 'github-pat'
//                     ]]
//                 ])
//             }
//         }

//         stage('Docker Build') {
//             steps {
//                 withCredentials([usernamePassword(
//                     credentialsId: 'dockerhub-cred',
//                     usernameVariable: 'DOCKERHUB_USERNAME',
//                     passwordVariable: 'DOCKERHUB_ACCESS_TOKEN'
//                 )]) {
//                     sh """
//                     echo "🚧 Building Docker image..."
//                     docker build -t docker.io/$DOCKERHUB_USERNAME/${IMAGE_NAME}:latest .
//                     """
//                 }
//             }
//         }

//         stage('Push to Docker Hub') {
//             steps {
//                 withCredentials([usernamePassword(
//                     credentialsId: 'dockerhub-cred',
//                     usernameVariable: 'DOCKERHUB_USERNAME',
//                     passwordVariable: 'DOCKERHUB_ACCESS_TOKEN'
//                 )]) {
//                     sh """
//                     echo "🔑 Logging in to Docker Hub..."
//                     echo \$DOCKERHUB_ACCESS_TOKEN | docker login -u \$DOCKERHUB_USERNAME --password-stdin

//                     echo "📦 Pushing image to Docker Hub..."
//                     docker push docker.io/\$DOCKERHUB_USERNAME/${IMAGE_NAME}:latest
//                     """
//                 }
//             }
//         }

//         stage('Deploy to Server') {
//             steps {
//                 sshagent (credentials: ['server-ssh-key']) {
//                     withCredentials([usernamePassword(
//                         credentialsId: 'dockerhub-cred',
//                         usernameVariable: 'DOCKERHUB_USERNAME',
//                         passwordVariable: 'DOCKERHUB_ACCESS_TOKEN'
//                     )]) {
//                         sh """
//                         echo "🚀 Deploying to remote server..."

//                         # Copy docker-compose file từ repo lên server
//                         scp -o StrictHostKeyChecking=no docker-compose.prod.yml ${SERVER_USER}@${SERVER_HOST}:/root/project/docker-compose.yml

//                         # SSH vào server để deploy
//                         ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_HOST} "
//                             cd /root/project && \
//                             echo \$DOCKERHUB_ACCESS_TOKEN | docker login -u \$DOCKERHUB_USERNAME --password-stdin && \
//                             docker compose pull && \
//                             docker compose down && \
//                             docker compose up -d && \
//                             docker image prune -f
//                         "
//                         """
//                     }
//                 }
//             }
//         }
//     }
// }
pipeline {
    agent any

    environment {
        IMAGE_NAME = "simple-backend"
        SERVER_HOST = "54.204.224.149"
        SERVER_USER = "ubuntu"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/kieuvy16/devops2.git',
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
                    sh """
                    docker build -t \$DOCKERHUB_USERNAME/${IMAGE_NAME}:latest .
                    """
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
                    sh """
                    echo \$DOCKERHUB_ACCESS_TOKEN | docker login -u \$DOCKERHUB_USERNAME --password-stdin
                    docker push \$DOCKERHUB_USERNAME/${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                sshagent(['server-ssh-key']) {
                    sh """
                    scp -o StrictHostKeyChecking=no docker-compose.prod.yml ${SERVER_USER}@${SERVER_HOST}:/home/${SERVER_USER}/project/docker-compose.yml

                    ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_HOST} "
                        cd /home/${SERVER_USER}/project &&
                        echo '${IMAGE_NAME} Deploy starting..' &&
                        docker-compose pull &&
                        docker-compose down &&
                        docker-compose up -d &&
                        docker image prune -f
                    "
                    """
                }
            }
        }
    }
}
