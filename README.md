# 🚐 VanRent - Van Renting Platform Under construction 🚧🚧🚧🚧🚧🚧

VanRent is a modern van rental web application built with a **microfrontend architecture**. It allows users to browse, reserve, and manage van rentals with a seamless experience across different frontend modules. The backend is powered by **FastAPI** and **SQLAlchemy**, while the frontend is built with **React**, **Redux**, and **Webpack Module Federation** for scalable and independent deployments.

---

## ✨ Tech Stack

- **Frontend**
  - React (with functional components & hooks)
  - Redux (for global state management)
  - Webpack 5 (with Module Federation for microfrontends)
  
- **Backend**
  - FastAPI (high-performance async API)
  - SQLAlchemy (ORM for database interactions)
  - PostgreSQL / SQLite (or any SQL database)

- **Tooling**
  - Poetry (Python dependency management)
  - Webpack Dev Server (for microfrontend integration)
  - Docker (optional for production deployment)

---

## 📁 Project Structure

```
/frontend
  /app-shell        # Main container app
  /van-listing      # Microfrontend for listing vans
  /user-dashboard   # Microfrontend for user reservations

/backend
  /api              # FastAPI routes and services
  /models           # SQLAlchemy models
  /schemas          # Pydantic schemas
  /database         # Database configuration

/docker
  docker-compose.yml (optional setup)

README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- Python >= 3.11
- Poetry

### Backend Setup

```bash
cd backend
poetry install
poetry run uvicorn api.main:app --reload
```

This will start the FastAPI server on [http://localhost:8000](http://localhost:8000).

### Frontend Setup

Each frontend microfrontend is a separate React project:

```bash
cd frontend/app-shell
pnpm install
pnpm start

cd frontend/van-listing
pnpm install
pnpm start

cd frontend/user-dashboard
pnpm install
pnpm start
```

- The App Shell hosts the microfrontends and provides global state (e.g., authentication).
- Each microfrontend exposes its own module using Webpack Module Federation.

### Database Setup

By default, the project uses SQLite for simplicity:

---

## 📦 Features

- User registration and login
- Van browsing and filtering
- Booking and reservation management
- Real-time availability updates
- Modular microfrontend architecture (separate deployable frontends)
- Scalable and clean backend APIs

---

## 🛠️ Microfrontend Architecture

We use **Webpack Module Federation** to:

- Allow independent deployment of microfrontends
- Share common libraries like React and Redux between apps
- Improve maintainability and team scaling

The App Shell acts as the "host" and dynamically loads remote microfrontends at runtime.

---



## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Built with ❤️ by Theodore.
