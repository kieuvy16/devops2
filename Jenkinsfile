// // // // pipeline {
// // // //     agent any

// // // //     environment {
// // // //         IMAGE_NAME = "simple-backend"
// // // //         SERVER_HOST = "54.204.224.149"
// // // //         SERVER_USER = "root"
// // // //     }

// // // //     stages {

// // // //         stage('Checkout') {
// // // //             steps {
// // // //                 checkout([$class: 'GitSCM',
// // // //                     branches: [[name: '*/main']],
// // // //                     userRemoteConfigs: [[
// // // //                         url: 'https://github.com/kieuvy16/devops2.git',
// // // //                         credentialsId: 'github-pat'
// // // //                     ]]
// // // //                 ])
// // // //             }
// // // //         }

// // // //         stage('Docker Build') {
// // // //             steps {
// // // //                 withCredentials([usernamePassword(
// // // //                     credentialsId: 'dockerhub-cred',
// // // //                     usernameVariable: 'DOCKERHUB_USERNAME',
// // // //                     passwordVariable: 'DOCKERHUB_ACCESS_TOKEN'
// // // //                 )]) {
// // // //                     sh """
// // // //                     echo "🚧 Building Docker image..."
// // // //                     docker build -t docker.io/$DOCKERHUB_USERNAME/${IMAGE_NAME}:latest .
// // // //                     """
// // // //                 }
// // // //             }
// // // //         }

// // // //         stage('Push to Docker Hub') {
// // // //             steps {
// // // //                 withCredentials([usernamePassword(
// // // //                     credentialsId: 'dockerhub-cred',
// // // //                     usernameVariable: 'DOCKERHUB_USERNAME',
// // // //                     passwordVariable: 'DOCKERHUB_ACCESS_TOKEN'
// // // //                 )]) {
// // // //                     sh """
// // // //                     echo "🔑 Logging in to Docker Hub..."
// // // //                     echo \$DOCKERHUB_ACCESS_TOKEN | docker login -u \$DOCKERHUB_USERNAME --password-stdin

// // // //                     echo "📦 Pushing image to Docker Hub..."
// // // //                     docker push docker.io/\$DOCKERHUB_USERNAME/${IMAGE_NAME}:latest
// // // //                     """
// // // //                 }
// // // //             }
// // // //         }

// // // //         stage('Deploy to Server') {
// // // //             steps {
// // // //                 sshagent (credentials: ['server-ssh-key']) {
// // // //                     withCredentials([usernamePassword(
// // // //                         credentialsId: 'dockerhub-cred',
// // // //                         usernameVariable: 'DOCKERHUB_USERNAME',
// // // //                         passwordVariable: 'DOCKERHUB_ACCESS_TOKEN'
// // // //                     )]) {
// // // //                         sh """
// // // //                         echo "🚀 Deploying to remote server..."

// // // //                         # Copy docker-compose file từ repo lên server
// // // //                         scp -o StrictHostKeyChecking=no docker-compose.prod.yml ${SERVER_USER}@${SERVER_HOST}:/root/project/docker-compose.yml

// // // //                         # SSH vào server để deploy
// // // //                         ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_HOST} "
// // // //                             cd /root/project && \
// // // //                             echo \$DOCKERHUB_ACCESS_TOKEN | docker login -u \$DOCKERHUB_USERNAME --password-stdin && \
// // // //                             docker compose pull && \
// // // //                             docker compose down && \
// // // //                             docker compose up -d && \
// // // //                             docker image prune -f
// // // //                         "
// // // //                         """
// // // //                     }
// // // //                 }
// // // //             }
// // // //         }
// // // //     }
// // // // }
// // // pipeline {
// // //     agent any

// // //     environment {
// // //         IMAGE_NAME = "simple-backend"
// // //         SERVER_HOST = "54.204.224.149"
// // //         SERVER_USER = "ubuntu"
        
// // //     }

// // //     stages {

// // //         stage('Checkout') {
// // //             steps {
// // //                 checkout([$class: 'GitSCM',
// // //                     branches: [[name: '*/main']],
// // //                     userRemoteConfigs: [[
// // //                         url: 'https://github.com/kieuvy16/devops2.git',
// // //                         credentialsId: 'github-pat'
// // //                     ]]
// // //                 ])
// // //             }
// // //         }

// // //         stage('Docker Build') {
// // //             steps {
// // //                 withCredentials([usernamePassword(
// // //                     credentialsId: 'dockerhub-cred',
// // //                     usernameVariable: 'DOCKERHUB_USERNAME',
// // //                     passwordVariable: 'DOCKERHUB_ACCESS_TOKEN'
// // //                 )]) {
// // //                     sh """
// // //                     docker build -t \$DOCKERHUB_USERNAME/${IMAGE_NAME}:latest .
// // //                     """
// // //                 }
// // //             }
// // //         }

// // //         stage('Push to Docker Hub') {
// // //             steps {
// // //                 withCredentials([usernamePassword(
// // //                     credentialsId: 'dockerhub-cred',
// // //                     usernameVariable: 'DOCKERHUB_USERNAME',
// // //                     passwordVariable: 'DOCKERHUB_ACCESS_TOKEN'
// // //                 )]) {
// // //                     sh """
// // //                     echo \$DOCKERHUB_ACCESS_TOKEN | docker login -u \$DOCKERHUB_USERNAME --password-stdin
// // //                     docker push \$DOCKERHUB_USERNAME/${IMAGE_NAME}:latest
// // //                     """
// // //                 }
// // //             }
// // //         }

// // //         stage('Deploy to Server') {
// // //             steps {
// // //                 sshagent(['server-ssh-key']) {
// // //                     sh """
// // //                     scp -o StrictHostKeyChecking=no docker-compose.prod.yml ${SERVER_USER}@${SERVER_HOST}:/home/${SERVER_USER}/project/docker-compose.yml

// // //                     ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_HOST} "
// // //                         cd /home/${SERVER_USER}/project &&
// // //                         echo '${IMAGE_NAME} Deploy starting..' &&
// // //                         docker-compose pull &&
// // //                         docker-compose down &&
// // //                         docker-compose up -d &&
// // //                         docker image prune -f
// // //                     "
// // //                     """
// // //                 }
// // //             }
// // //         }
// // //     }
// // // }
// // pipeline {
// //     agent any

// //     environment {
// //         IMAGE_NAME = "simple-backend"
// //         SERVER_HOST = "54.204.224.149"
// //         SERVER_USER = "ubuntu"
// //         SSH_KEY = "server-ssh-key"
// //     }

// //     stages {

// //         stage('Checkout') {
// //             steps {
// //                 checkout([$class: 'GitSCM',
// //                     branches: [[name: '*/main']],
// //                     userRemoteConfigs: [[
// //                         url: 'https://github.com/kieuvy16/devops2.git',
// //                         credentialsId: 'github-pat'
// //                     ]]
// //                 ])
// //             }
// //         }

// //         stage('Docker Build') {
// //             steps {
// //                 withCredentials([usernamePassword(
// //                     credentialsId: 'dockerhub-cred',
// //                     usernameVariable: 'DOCKERHUB_USERNAME',
// //                     passwordVariable: 'DOCKERHUB_ACCESS_TOKEN'
// //                 )]) {
// //                     sh """
// //                     docker build -t \$DOCKERHUB_USERNAME/${IMAGE_NAME}:latest .
// //                     """
// //                 }
// //             }
// //         }

// //         stage('Push to Docker Hub') {
// //             steps {
// //                 withCredentials([usernamePassword(
// //                     credentialsId: 'dockerhub-cred',
// //                     usernameVariable: 'DOCKERHUB_USERNAME',
// //                     passwordVariable: 'DOCKERHUB_ACCESS_TOKEN'
// //                 )]) {
// //                     sh """
// //                     echo \$DOCKERHUB_ACCESS_TOKEN | docker login -u \$DOCKERHUB_USERNAME --password-stdin
// //                     docker push \$DOCKERHUB_USERNAME/${IMAGE_NAME}:latest
// //                     """
// //                 }
// //             }
// //         }

// //         stage('Deploy to Server') {
// //             steps {
// //                 sshagent(['server-ssh-key']) {
// //                     sh """
// //                     ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_HOST} "mkdir -p /home/${SERVER_USER}/project"

// //                     scp -o StrictHostKeyChecking=no docker-compose.prod.yml ${SERVER_USER}@${SERVER_HOST}:/home/${SERVER_USER}/project/docker-compose.yml

// //                     ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_HOST} "
// //                         cd /home/${SERVER_USER}/project &&
// //                         echo '${IMAGE_NAME} Deploy starting..' &&
// //                         echo \$DOCKERHUB_ACCESS_TOKEN | docker login -u \$DOCKERHUB_USERNAME --password-stdin &&
// //                         docker compose pull &&
// //                         docker compose down &&
// //                         docker compose up -d &&
// //                         docker image prune -f
// //                     "
// //                     """
// //                 }
// //             }
// //         }
// //     }
// // }
// pipeline {
//     agent any

//     environment {
//         IMAGE_NAME = "simple-backend"
//         SERVER_HOST = "54.204.224.149"
//         SERVER_USER = "ubuntu"
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
//                     docker build -t \$DOCKERHUB_USERNAME/${IMAGE_NAME}:latest .
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
//                     echo \$DOCKERHUB_ACCESS_TOKEN | docker login -u \$DOCKERHUB_USERNAME --password-stdin
//                     docker push \$DOCKERHUB_USERNAME/${IMAGE_NAME}:latest
//                     """
//                 }
//             }
//         }

//        stage('Deploy to Server') {
//     steps {
//         withCredentials([sshUserPrivateKey(
//             credentialsId: 'server-ssh-key',
//             keyFileVariable: 'SSH_KEY'
//         )]) {
//             sh """
//             scp -o StrictHostKeyChecking=no -i \$SSH_KEY docker-compose.prod.yml ${SERVER_USER}@${SERVER_HOST}:/home/${SERVER_USER}/project/docker-compose.yml

//             ssh -o StrictHostKeyChecking=no -i \$SSH_KEY ${SERVER_USER}@${SERVER_HOST} "
//                 cd /home/${SERVER_USER}/project &&
//                 docker-compose pull &&
//                 docker-compose down &&
//                 docker-compose up -d &&
//                 docker image prune -f
//             "
//             """
//         }
//     }
// }

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

        stage('Docker Build & Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-cred',
                    usernameVariable: 'DOCKERHUB_USERNAME',
                    passwordVariable: 'DOCKERHUB_ACCESS_TOKEN'
                )]) {
                    sh """
                        echo "🏗️ Building Docker image..."
                        docker build -t \$DOCKERHUB_USERNAME/${IMAGE_NAME}:latest .
                        echo "📤 Logging in to Docker Hub..."
                        echo \$DOCKERHUB_ACCESS_TOKEN | docker login -u \$DOCKERHUB_USERNAME --password-stdin
                        echo "📤 Pushing image..."
                        docker push \$DOCKERHUB_USERNAME/${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'server-ssh-key',
                    keyFileVariable: 'SSH_KEY'
                )]) {
                    sh """
                        echo "🔍 Testing SSH connection..."
                        ssh -v -o StrictHostKeyChecking=no -i \$SSH_KEY ${SERVER_USER}@${SERVER_HOST} "echo ✅ SSH connected!"

                        echo "📁 Ensuring project directory exists..."
                        ssh -o StrictHostKeyChecking=no -i \$SSH_KEY ${SERVER_USER}@${SERVER_HOST} "mkdir -p /home/${SERVER_USER}/project"

                        echo "🔧 Checking Docker and docker-compose on server..."
                        ssh -o StrictHostKeyChecking=no -i \$SSH_KEY ${SERVER_USER}@${SERVER_HOST} "
                            command -v docker >/dev/null 2>&1 || { echo '❌ Docker not installed!'; exit 1; }
                            command -v docker-compose >/dev/null 2>&1 || { echo '❌ docker-compose not installed!'; exit 1; }
                            echo '✅ Docker & docker-compose found'
                        "

                        echo "📦 Uploading docker-compose..."
                        scp -o StrictHostKeyChecking=no -i \$SSH_KEY docker-compose.prod.yml ${SERVER_USER}@${SERVER_HOST}:/home/${SERVER_USER}/project/docker-compose.yml

                        echo "🚀 Deploying Docker containers..."
                        ssh -o StrictHostKeyChecking=no -i \$SSH_KEY ${SERVER_USER}@${SERVER_HOST} "
                            set -e
                            cd /home/${SERVER_USER}/project
                            docker-compose pull
                            docker-compose down
                            docker-compose up -d
                            docker image prune -f
                            echo '✅ Deployment completed!'
                        "
                    """
                }
            }
        }
    }

    post {
        success {
            echo "🎉 Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed! Check logs."
        }
    }
}
