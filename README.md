# 🚗 Car Rental Pro

Car Rental Pro est une application **full-stack** de gestion de location de voitures, conçue avec une architecture moderne basée sur **Docker**, **Kubernetes**, **CI/CD Jenkins**, et **monitoring Grafana/Prometheus**.

---

## 🧱 Architecture du projet

car-rental-pro/
│
├── backend/ # API Node.js / Express / MongoDB
│├── controllers/
│├── models/
│├── routes/
│├── middleware/
│├── uploads/
│├── seedAdmin.js # Script de création de l’admin
│├── server.js
│├── Dockerfile
│
├── frontend/ # Frontend (React)
│
├── k8s/ # Manifests Kubernetes
│├── 00-namespace.yml
│├── 01-mongo.yaml
│├── 02-configmap.yaml
│├── 03-backend.yaml
│├── 04-frontend.yaml
│
├── docker-compose.yml # Environnement local
├── docker-compose.prod.yml # Environnement production
│
├── Jenkinsfile # Pipeline CI/CD
├── README.md


---

## 🚀 Technologies utilisées

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication

### Frontend
- React
- Axios

### DevOps & Cloud
- Docker & Docker Compose
- Kubernetes (Docker Desktop)
- Jenkins (CI/CD)
- Helm
- Grafana
- Prometheus

---

## 🔐 Authentification Admin

Un **compte administrateur** est créé via un script de seed.

### Variables d’environnement backend :
```env
ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=Admin123!
JWT_SECRET=supersecret
Lancer le seed admin :

node seedAdmin.js
🐳 Lancer le projet avec Docker Compose (local)

docker-compose up --build
Backend : http://localhost:5000

Frontend : http://localhost:3000

☸️ Déploiement Kubernetes
Créer le namespace :

bash
Copier le code
kubectl apply -f k8s/00-namespace.yml
Déployer MongoDB, backend et frontend :

kubectl apply -f k8s/
Vérifier :

kubectl get pods -n car-rental
kubectl get svc -n car-rental
📊 Monitoring avec Grafana
Installation Grafana via Helm

helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

kubectl create namespace monitoring

helm install grafana grafana/grafana \
  --namespace monitoring \
  --set service.type=NodePort
Accès Grafana

kubectl get svc -n monitoring grafana
URL :

arduino
Copier le code
http://localhost:<NODE_PORT>
Identifiants :

User: admin

Password:

kubectl get secret -n monitoring grafana -o jsonpath="{.data.admin-password}" | base64 --decode
📈 Dashboards Grafana recommandés
Importer depuis Grafana.com :

Kubernetes Cluster Monitoring

Node Exporter Full

Pod / Namespace Monitoring

⚠️ Nécessite Prometheus comme datasource.

🔁 CI/CD Jenkins
Le pipeline Jenkins :

Build images Docker

Push vers Docker Hub

Déploiement Kubernetes

Fichier :

nginx
Copier le code
Jenkinsfile
✅ Statut du projet
✔ Backend fonctionnel

✔ Frontend fonctionnel

✔ Kubernetes OK

✔ Auth Admin OK

✔ Grafana OK

⏳ Alerting (à venir)

👤 Auteur
Mohamed Ali Masrii
📌 GitHub : https://github.com/mohamedali-masrii

📜 Licence
Projet académique / pédagogique.
 ### 👉 Prochaine étape possible
- Ajouter des **badges GitHub**
- Ajouter une section **Screenshots**
- Ajouter **Alertmanager**
- Ajouter **Ingress + HTTPS**


