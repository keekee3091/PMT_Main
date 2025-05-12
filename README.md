Project Management Tool (PMT) - Backend
📦 Introduction
Ce projet est une application de gestion de projet (PMT) backend développé en Java Spring Boot.
Le backend est disponible en tant qu'image Docker sur Docker Hub : keekee3091/pmt-backend.
Ce fichier README.md documente les étapes pour lancer le backend et l'utilisation des endpoints API.

Prérequis
Docker et Docker Compose installés
Compte Docker Hub

Lancer le projet depuis Docker Hub
Récupérer l'image :

docker pull keekee3091/pmt-backend
docker pull keekee3091/pmt-frontend

Créer le fichier docker-compose.yml :
version: '3.8'

services:
  db:
    image: postgres:15
    container_name: pmt_postgres
    restart: always
    environment:
      POSTGRES_DB: pmt_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: Papamaman01$
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backup_pmt_db.sql:/docker-entrypoint-initdb.d/backup_pmt_db.sql
    networks:
      pmt_net:
        ipv4_address: 172.20.112.2

  backend:
    build:
      context: ./pmt-backend
      dockerfile: Dockerfile
    container_name: pmt_backend
    depends_on:
      - db
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/pmt_db
      SPRING_DATASOURCE_USERNAME: postgres
      SPRING_DATASOURCE_PASSWORD: Papamaman01$
    ports:
      - "8080:8080"
    restart: always
    networks:
      pmt_net:
        ipv4_address: 172.20.112.3

  frontend:
    build:
      context: ./pmt-frontend
      dockerfile: Dockerfile
    container_name: pmt_frontend
    ports:
      - "4200:80"
    restart: always
    depends_on:
      - backend
    networks:
      pmt_net:
        ipv4_address: 172.20.112.10

volumes:
  postgres_data:

networks:
  pmt_net:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.112.0/24

Monter le projet :
docker-compose up -d