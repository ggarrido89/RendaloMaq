# Mongo

Base de datos Mongo contenida en docker

## Requisitos
Tener instalado docker en el sistema operativo

## Inicialización

### Descarga de imagen
docker pull mongo

### Ejecutar imagen
docker run --name mongo-rendalomaq -d mongo:latest -p 27017:27017