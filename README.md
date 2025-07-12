# gRPC Microservices - NestJS Example

This repository contains two microservices built with NestJS using gRPC for inter-service communication.

## 🧩 Services

### 1. Product Service (`product-service/`)
Handles product-related logic like create, update, get product by name, etc.

### 2. Order Service (`order-service/`)
Handles order creation, uses gRPC to get product info from `product-service`.

## 📦 Technologies
- NestJS
- gRPC
- Prisma
- PostgreSQL
- Docker (optional)

## 🚀 How to Run

```bash
cd product-service
npm install
npx prisma generate
npx prisma db push
npm run start:dev


cd order-service
npm install
npx prisma generate
npx prisma db push
npm run start:dev

