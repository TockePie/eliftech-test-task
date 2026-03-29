# ElifTech Test Task

This repository contains a full-stack food delivery application built for the ElifTech IT School. It has a monorepo containing a Next.js frontend and a NestJS backend.

Demo: <https://eliftech-test-task-tockepie-web.vercel.app/>

## Accomplished Level

Level: **Middle**

## Project Structure

The project is organized into two main workspaces:

- **`/frontend`**: A Next.js application using React and Tailwind CSS 4.
- **`/backend`**: A NestJS application using TypeORM.

## Tech Stack

### Frontend

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation

### Backend

- **Framework**: NestJS
- **Database**: **Neon (Serverless PostgreSQL)**
- **ORM**: TypeORM
- **Validation**: Class-validator and Class-transformer

## Setup

### Installation

From the root directory, install all dependencies:

```bash
npm i
```

### Environment Setup

Create a `.env` file in the `backend` directory and add your Neon connection string:

```env
DATABASE_URL=postgres://[user]:[password]@[neon-hostname]/neondb?channel_binding=require&sslmode=verify-full
PORT=4000
```

And the same file in the `frontend`

```env
API_URL="https://example.com"
```

## Development Mode

**Start Backend:**

```bash
cd backend
npm run start:dev
```

**Start Frontend:**

```bash
cd frontend
npm run dev
```

## Key Features (Middle Level)

- **Shop Selection**: Dynamic routing and sidebar navigation for different shops.
- **Product Filtering**: Ability to filter products by category and shops by rating.
- **Shopping Cart**: Full cart functionality including adding/removing items and quantity adjustment.
- **Persistent Cart**: User's shopping cart state is maintained across sessions using Zustand.
- **Checkout System**: Integrated form with validation for order submission.
- **Database Persistence**: All shop and product data is served from a remote Neon PostgreSQL instance.
