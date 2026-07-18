# Next.js Production DevOps Stack

A production-ready DevOps infrastructure for a full-stack Next.js application, configured with Docker containerization, Nginx load balancing, caching, Gzip compression, and GitHub Actions CI/CD.

## 🏗️ Repository Structure

```text
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions CI/CD Workflow
├── app/                        # Next.js pages/routes
├── public/                     # Static assets
├── Dockerfile                  # Multi-stage production Dockerfile
├── nginx/
│   ├── nginx.conf              # Nginx proxy, load balancer, cache config
│   └── Dockerfile              # Custom Nginx container
├── docker-compose.yml          # Container Orchestration
├── .env.example                # Local environment template
├── .dockerignore               # Docker ignore config
└── README.md                   # Setup & Deployment Guide
```

---

## ⚙️ Architecture Overview

```
                      Internet
                          │
                          ▼
                    EC2 Public IP
                          │
                          ▼
                        Nginx (Port 80)
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
      next1 (Port 3000)       next2 (Port 3000)
              │                       │
              └───────────┬───────────┘
                          ▼
                  Turso DB (LibSQL)
```

1. **Reverse Proxy / Load Balancer**: Nginx sits in front, terminating requests on port 80. It uses the `least_conn` algorithm to balance traffic across the Next.js replicas (`next1` and `next2`).
2. **Caching**: Nginx caches static resources (`_next/static`, public assets) for speed, bypassing the Next.js server for these requests.
3. **Gzip**: Compresses text/html/css/json payloads on-the-fly.
4. **Health Checks**: Containers have active health check configurations. Docker Compose only exposes replicas to Nginx when they report healthy on `/api/health`.

---

## 🚀 Getting Started

### 1. Local Development (No Docker)

Run the standard Next.js development server:

```bash
# Copy env variables template and fill them out
cp .env.local.example .env.local
npm install
npm run dev
```

### 2. Running Locally with Docker Compose

To test the containerized multi-instance setup locally:

1. Create a `.env` file in the **root** folder based on `.env.example`.
2. Build and run:
   ```bash
   docker compose up -d --build
   ```
3. Nginx will bind to `http://localhost`. Open it in your browser.
4. Check container health status:
   ```bash
   docker compose ps
   ```

---

## 🛠️ Production Deployment Guide

### Step 1: Prepare EC2 Instance

1. Spin up an Ubuntu EC2 instance.
2. Allow incoming traffic on ports **80** (HTTP) and **443** (HTTPS) in the security group.
3. Connect via SSH and install Docker:
   ```bash
   sudo apt update
   sudo apt install docker.io docker-compose-v2 git -y
   sudo systemctl enable docker
   sudo systemctl start docker
   sudo usermod -aG docker ubuntu
   ```
   *Disconnect and reconnect to update group memberships.*

### Step 2: Clone the Project

```bash
cd /home/ubuntu
git clone https://github.com/your-username/your-repository.git project
cd project
```

Create the `.env` file on the server in the `/home/ubuntu/project` folder.

### Step 3: Configure CI/CD Secrets

On GitHub, navigate to **Settings > Secrets and variables > Actions** and create:

1. `HOST`: Your EC2 public IP or domain.
2. `SSH_KEY`: The contents of your private key file (`.pem`).

The GitHub Actions workflow will:
1. Compile and build optimized Docker images inside GitHub runners (leveraging Docker caching).
2. Tag and push images to GitHub Container Registry (GHCR).
3. SSH into EC2, log into GHCR, pull the fresh images, and run `docker compose up -d` with zero downtime.

---

## 🛡️ SSL Configuration (Let's Encrypt)

Once your domain name is pointed to the EC2 IP address, set up SSL using Certbot on the EC2 host:

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx
```
Follow the interactive prompts to enable automatic HTTP-to-HTTPS redirect.
