# POS System (Public)

A **Point of Sale (POS) web application** built with **React**.  
Supports **cashier and manager roles**, demo data, and can be run via **Docker** or locally with Node.js.

This repository contains a **dockerized frontend** version ready to run on **Linux, macOS, and Windows**.

---

## Table of Contents

1. [Features](#features)  
2. [Demo Users](#demo-users)  
3. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Run Locally](#run-locally)  
   - [Run with Docker](#run-with-docker)  
4. [Windows One-Click Run](#windows-one-click-run)  
5. [Contributing](#contributing)  
6. [License](#license)  

---

## Features

- Secure login for **cashier, manager, and admin** (demo credentials included)  
- Add items to cart, compute **subtotal, tax, and total**  
- Print sales receipt  
- Manager dashboard (product management coming soon)  
- Fully **dockerized** for consistent deployment  

---

## Demo Users

| Role    | Username | Password |
| ------- | -------- | -------- |
| Cashier | cashier  | cash123  |
| Manager | manager  | mgr123   |
| Admin   | admin    | admin123 |

---

## Getting Started

### Prerequisites

- Node.js (v18+) and npm installed  
- Docker installed (optional, for containerized run)  

---

### Run Locally

```bash
# Clone the repository
git clone https://github.com/hayetmd/POS_Public.git
cd POS_Public

# Install dependencies
npm install

# Start the app
npm start

# Build the Docker image
docker build -t pos-system .

# Run the container
docker run -p 3000:3000 pos-system

Windows One-Click Run

You can create a run.bat file in the repository root:
@echo off
docker build -t pos-system .
docker run -p 3000:3000 pos-system
pause


