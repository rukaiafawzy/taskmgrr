# System Monitoring Project

## Description
This project monitors system resources using a Bash script and visualizes
the data using a Node.js web dashboard.

## Features
- CPU and RAM monitoring
- Disk and network statistics
- Live web dashboard
- Historical logging
- Dockerized server

## Architecture
The monitoring script runs on the host system to access hardware metrics.
The Node.js server and dashboard run inside Docker for portability.

## How to Run
1. Start monitoring:
   ./taskmgrr.sh

2. Start Docker services:
   docker compose up --build

3. Open browser:
   http://localhost:3000

## Notes
GPU temperature and some disk metrics are limited in WSL environments.
