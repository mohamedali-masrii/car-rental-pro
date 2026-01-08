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
    stage('Trivy Report (HTML)') {
  steps {
    sh '''
      set -e
      mkdir -p trivy-reports

      # Télécharger le template HTML officiel Trivy
      curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/html.tpl -o html.tpl

      echo "Generate BACKEND report..."
      trivy image --no-progress --format template --template "@html.tpl" \
        -o trivy-reports/backend.html farahmasrii/car-rental-backend:latest

      echo "Generate FRONTEND report..."
      trivy image --no-progress --format template --template "@html.tpl" \
        -o trivy-reports/frontend.html farahmasrii/car-rental-frontend:latest
    '''
  }
  post {
    always {
      archiveArtifacts artifacts: 'trivy-reports/*.html', fingerprint: true
    }
  }
}



   stage('Trivy Report (HTML)') {
  steps {
    sh '''
      set -e
      mkdir -p trivy-reports

      # Télécharger le template HTML officiel Trivy
      curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/html.tpl -o html.tpl

      echo "Generate BACKEND report..."
      trivy image --no-progress --format template --template "@html.tpl" \
        -o trivy-reports/backend.html farahmasrii/car-rental-backend:latest

      echo "Generate FRONTEND report..."
      trivy image --no-progress --format template --template "@html.tpl" \
        -o trivy-reports/frontend.html farahmasrii/car-rental-frontend:latest
    '''
  }
  post {
    always {
      archiveArtifacts artifacts: 'trivy-reports/*.html', fingerprint: true
    }
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
