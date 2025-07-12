


## ✅ `order-service/README.md`


# 🛒 Order Service (REST + gRPC Client)

This service handles order creation and management. It communicates with the Product Service via gRPC to get product details.



### 🛠️ Tech Stack

- NestJS
- gRPC (Client only)
- Prisma
- PostgreSQL (or preferred DB)

### Folder Structure

src/
├── order/
│ ├── order.controller.ts
│ ├── order.service.ts
│ └── order.repository.ts
├── grpc-proto/
│ └── product.proto
├── prisma/



---

### Features

- Create Order (with gRPC product validation)
- Get All / Single Order
- Update / Delete Order
- Health check to Product Service



### Run Locally


npm install
npx prisma generate
npx prisma db push
npm run start:dev
