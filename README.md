# DevHub

A collaborative coding platform that brings real-time chat, video calling, and shared workspaces together for developers who want to code, communicate, and collaborate in one place.

## ✨ Features

- **Real-time chat & video calling** powered by Stream, enabling seamless communication inside collaboration rooms.
- **Secure authentication & user syncing** using Clerk for auth and Inngest for reliable, event-driven background jobs.
- **Event-driven user management** — MongoDB and Inngest work together to keep user data consistent and reliable across events.
- **RESTful API** for managing users, collaboration rooms, and application data, with proper validation and error handling.
- **Modern full-stack architecture** with a React/Vite frontend and a Node.js/Express backend.

## 🛠️ Tech Stack

**Frontend:** React, Vite
**Backend:** Node.js, Express
**Database:** MongoDB
**Auth & Events:** Clerk, Inngest
**Real-time Communication:** Stream (chat & video)
**Deployment:** Vercel (frontend), Render (backend)

## 📂 Project Structure

```
DevHub/
├── backend/    # Express API, auth middleware, Inngest event functions
├── frontend/   # React + Vite client
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB instance (local or Atlas)
- Clerk account & API keys
- Stream account & API keys
- Inngest account & API keys

### Installation

```bash
# Clone the repository
git clone https://github.com/rishantsingh0707/DevHub.git
cd DevHub

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `backend` directory with the following:

```
MONGODB_URI=your_mongodb_connection_string
STREAM_API_SECRET=your_stream_api_secret
CLERK_SECRET_KEY=your_clerk_secret_key
CLIENT_URL= your_client_url
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY= your_inngest_signing_key
STREAM_API_KEY=your_stream_api_key
PORT= 3000

```

Create a `.env` file in the `frontend` directory with the following:

```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_STREAM_API_KEY=your_stream_api_key
VITE_API_URL=your_backend_url
```

### Running Locally

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🌐 Live Demo

[dev-hub-nu-ten.vercel.app](https://dev-hub-nu-ten.vercel.app)

## 👤 Author

**Rishant Singh**
[GitHub](https://github.com/rishantsingh0707) · [LinkedIn](https://www.linkedin.com/in/rishant-singh1408)