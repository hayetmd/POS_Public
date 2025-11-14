POS System (Public)

A Point of Sale (POS) web application built with React. Supports cashier and manager roles, demo data, and can be run via Docker or locally with Node.js.

This repository contains a dockerized frontend version ready to run on Linux, macOS, and Windows.

Features

Secure login for cashier, manager, and admin (demo credentials included).

Add items to cart, compute subtotal, tax, and total.

Print sales receipt.

Manager dashboard (product management coming soon).

Fully dockerized for consistent deployment.

Demo Users
Role	Username	Password
Cashier	cashier	cash123
Manager	manager	mgr123
Admin	admin	admin123
Getting Started
Option 1: Run via Docker (Recommended)
Linux / macOS

Clone the repository:

git clone https://github.com/hayetmd/POS_Public.git
cd POS_Public


Build Docker image:

docker build -t pos-frontend:latest .


Run Docker container:

docker run -p 3000:80 pos-frontend:latest


Open browser:

http://localhost:3000

Windows (with Docker Desktop)

Install Docker Desktop (download
).

For Windows 10 Home → WSL 2 backend is required

For Windows Pro/Enterprise → Hyper-V backend is supported

Clone the repository:

git clone https://github.com/hayetmd/POS_Public.git
cd POS_Public


Build Docker image:

docker build -t pos-frontend:latest .


Run Docker container:

docker run -p 3000:80 pos-frontend:latest


Open browser:

http://localhost:3000

One-Click Windows Execution

You can create a .bat file to start the POS app with one click:

Open Notepad and save as run-pos.bat in the POS_Public folder:

@echo off
cd /d C:\path\to\POS_Public

REM Stop and remove any previous container
for /f "tokens=*" %%i in ('docker ps -q -f "name=pos-frontend"') do docker stop %%i
for /f "tokens=*" %%i in ('docker ps -a -q -f "name=pos-frontend"') do docker rm %%i

docker build -t pos-frontend:latest .
docker run -p 3000:80 --name pos-frontend pos-frontend:latest
pause


Double-click run-pos.bat to run the app.

Open browser: http://localhost:3000

✅ Benefits: No need to manually type Docker commands every time.

Option 2: Run Locally with Node.js (Development Only)

Install Node.js & npm (download
).

Clone the repository:

git clone https://github.com/hayetmd/POS_Public.git
cd POS_Public


Install dependencies:

npm install


Start development server:

npm start


Open browser:

http://localhost:3000


⚠️ Notes:

Use PowerShell or Terminal as Administrator on Windows if permission issues occur.

This method is for development only; production is recommended via Docker.

Folder Structure
POS_Public/
├── src/               # React source code
├── public/            # Static files
├── package.json       # Node dependencies
├── package-lock.json
├── Dockerfile         # Docker instructions
├── .dockerignore      # Files to ignore for Docker build
├── README.md          # Documentation

Building & Updating Docker Image
docker build -t pos-frontend:latest .
docker run -p 3000:80 pos-frontend:latest


To rebuild after changes, repeat the above commands.

To stop container:

docker ps           # list running containers
docker stop <id>    # stop container
docker rm <id>      # remove container

Future Features

Manager dashboard enhancements (add/edit/delete products).

Reports and analytics.

Multi-user concurrency support.

Backend integration for authentication and persistent data.
