# WWHR Web App
The Waste Water Heat Radar (WWHR) frontend application shows potentials that are based on waste water heat in the Berlin sewer system.
These potentials are visualized on a map and can be matched with estimated consumptions for houses or areas in the respective region of Berlin.

## Table of Contents
***
1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Deployment](#deployment)

## Installation
***
1. Clone repo
2. Install dependencies
```bash
npm install
```
3. Run the application
```bash
npm run serve
```

## Run application in Docker
***
1. Build image
```bash
docker build . -t wwhr_frontend
```
2. Run image
```bash
docker run -d -p 8080:8080 wwhr_frontend
```

## Deployment
***
Deployment should be done using [Docker](https://www.docker.com/) containers.
Changes to the `develop` branch are deployed automatically to server X.
View the `.gitlab-ci.yml` file for details.
