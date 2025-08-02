# Doctor Appointment Booking System

## 🛠️ Tech Stack

- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Validation**: Class-validator & Class-transformer
- **Documentation**: Swagger/OpenAPI

## ⚡ Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### 1. Clone & Install

```bash
git clone https://github.com/PratikMane09/doctor_appointment.git
cd doctor_appointment
npm install
```

### 2. Database Setup

```bash
Ensure that your PostgreSQL (e.g., pgAdmin) is running and create a database named "doctor_appointment".
```

Generate migration file:

```bash
npm run migration:generate src/database/migrations/InitialSchema
```

Run migration:

```bash
npm run migration:run
```

### 3. Environment Configuration

```bash
cp .env.example .env
```

Update `.env` with your database credentials:

```
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=Pass@123
DB_NAME=doctor_appointment
```

> 🔒 Make sure to replace `Pass@123` with your actual database password.

### 4. Run Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

### 5. Access API

- **API Base URL**: [http://localhost:3000](http://localhost:3000)
- **Swagger Docs**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
