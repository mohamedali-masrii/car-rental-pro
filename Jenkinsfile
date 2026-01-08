pipeline {
  agent any

  environment {
    DOCKERHUB_CREDS = 'dockerhub-creds'
    DOCKERHUB_USER  = 'farahmasrii'
    BACKEND_IMAGE   = "${DOCKERHUB_USER}/car-rental-backend"
    FRONTEND_IMAGE  = "${DOCKERHUB_USER}/car-rental-frontend"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Images') {
      steps {
        sh 'docker build -t car-rental-pro-backend:latest ./backend'
        sh 'docker build -t car-rental-pro-frontend:latest ./frontend'
      }
    }

    stage('Tag Images') {
      steps {
        sh "docker tag car-rental-pro-backend:latest ${BACKEND_IMAGE}:latest"
        sh "docker tag car-rental-pro-frontend:latest ${FRONTEND_IMAGE}:latest"
      }
    }

    stage('Trivy Scan (Images)') {
  steps {
    sh '''
      set -e
      trivy --version

      echo "Scan BACKEND..."
      trivy image --no-progress --severity HIGH,CRITICAL --exit-code 1 farahmasrii/car-rental-backend:latest

      echo "Scan FRONTEND..."
      trivy image --no-progress --severity HIGH,CRITICAL --exit-code 1 farahmasrii/car-rental-frontend:latest
    '''
  }
}


    stage('Login & Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDS}", usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
          sh 'echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin'
          sh "docker push ${BACKEND_IMAGE}:latest"
          sh "docker push ${FRONTEND_IMAGE}:latest"
        }
      }
    }
  }

  post {
    always {
      sh 'docker logout || true'
    }
  }
}
