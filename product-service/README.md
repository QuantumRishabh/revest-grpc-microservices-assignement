# 📦 Product Service (gRPC Microservice)

This service handles product-related operations and exposes them over gRPC.

### 🚀 Tech Stack
- [NestJS](https://docs.nestjs.com/)
- [gRPC](https://grpc.io/)
- [Prisma](https://www.prisma.io/)
- PostgreSQL (or your preferred DB)

---

### 🛠️ Features
- Create, Get, Update, Delete Products
- gRPC endpoint for `getProductByName`
- Health check: `ping`

---

### 📁 Folder Structure


src/
├── product/
│ ├── product.controller.ts
│ ├── product.service.ts
│ └── product.grpc.ts <-- gRPC methods
├── prisma/
└── grpc-proto/
└── product.proto


---

### 🧪 Sample gRPC Method

```proto
rpc GetProductByName(GetProductByNameRequest) returns (ProductResponse);


⚙️ Run Locally

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate
npx prisma db push

# Start gRPC + REST server
npm run start:dev
