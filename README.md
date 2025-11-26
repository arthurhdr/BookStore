# BookStore

A modern, responsive web application for managing your personal book collection. With secure authentication and an intuitive interface, you can organize your books efficiently.

## Table of Contents
- [Tech stack](#tech-stack)
- [How to run](#how-to-run)
    - [Prerequisites](#prerequisites)
    - [Running with Docker (Recommended)](#running-with-docker-recommended)
    - [Manual Execution (Development)](#manual-execution-development)
- [Configuration](#configuration)
    - [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [App images](#app-images)
- [License](#license)
 


## Tech stack
<div align="left">
  <img src="https://icon.icepanel.io/Technology/svg/MongoDB.svg" height="40" alt="mongodb logo"  />
  <img width="12" />
  <img src="https://icon.icepanel.io/Technology/png-shadow-512/Express.png" height="40" alt="express js"  />
  <img width="12" />
  <img src="https://icon.icepanel.io/Technology/svg/Node.js.svg" height="40" alt="node logo"  />
  <img width="12" />
  <img src="https://icon.icepanel.io/Technology/svg/Git.svg" height="40" alt="git logo"  />
  <img width="12" />
  <img src="https://icon.icepanel.io/Technology/svg/Nodemon.svg" height="40" alt="nodemon logo"  />
  <img width="12" />
  <img src="https://icon.icepanel.io/Technology/svg/React.svg" height="40" alt="react logo"  />
  <img width="12" />
  <img src="https://icon.icepanel.io/Technology/svg/Bootstrap.svg" height="40" alt="bootstrap logo"  />
  <img width="12" />
  <img src="https://icon.icepanel.io/Technology/svg/Tailwind-CSS.svg" height="40" alt="tailwind logo"  />
  <img width="12" />
  <img src="https://icon.icepanel.io/Technology/svg/Vite.js.svg" height="40" alt="vite logo"  />
  <img width="12" />
  <img src="https://icon.icepanel.io/Technology/svg/Docker.svg" height="40" alt="docker logo"  />
  <img width="12" />
  <img src="https://icon.icepanel.io/Technology/svg/Visual-Studio-Code-%28VS-Code%29.svg" height="40" alt="vscode logo"  />
  <img width="12" />
</div>

## How to Run

### Prerequisites
- Docker
- MongoDB Cluster

### Running with Docker (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/arthurhdr/BookStore
   cd BookStore
   ```

2. **Run docker-compose:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:5555

### Manual Execution (Development)

#### Backend
```bash
cd backend
npm install
npm start
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

##  Configuration

### Environment Variables

The project uses the following default configurations:

- **Backend Port:** 5555
- **Frontend Port:** 3000
- **MongoDB:** MongoDB Atlas or local
- **JWT Secret:** Configured in backend

##  API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Books (JWT Protected)
- `GET /books` - List user's books
- `GET /books/:id` - Get specific book
- `POST /books` - Create new book
- `PUT /books/:id` - Update book
- `DELETE /books/:id` - Delete book

## App images
**Login page**
![Login page](https://raw.githubusercontent.com/arthurhdr/artie-imgs/refs/heads/main/bookstores/Screenshot%202025-11-25%20at%2020-18-17%20Vite%20React.png?token=GHSAT0AAAAAADMFNHDM44JFJAD7DYTMGODA2JGJPMQ)


**Register page**
![Register page](https://raw.githubusercontent.com/arthurhdr/artie-imgs/refs/heads/main/bookstores/Screenshot%202025-11-25%20at%2020-18-29%20Vite%20React.png?token=GHSAT0AAAAAADMFNHDNW5XT5N4UFBJEJ23Y2JGJP7A)


**Empty book page**
![Empty book page](https://raw.githubusercontent.com/arthurhdr/artie-imgs/refs/heads/main/bookstores/Screenshot%202025-11-25%20at%2020-19-05%20Vite%20React.png?token=GHSAT0AAAAAADMFNHDMO3FOPPCRNADPC2JC2JGJQVA)


**Add new book**
![Add new book](https://raw.githubusercontent.com/arthurhdr/artie-imgs/refs/heads/main/bookstores/Screenshot%202025-11-25%20at%2020-19-50%20Vite%20React.png?token=GHSAT0AAAAAADMFNHDN766NQ5UFR7BKIZLE2JGJRVQ)


**Book page with books**
![Book page](https://raw.githubusercontent.com/arthurhdr/artie-imgs/refs/heads/main/bookstores/Screenshot%202025-11-25%20at%2020-21-31%20Vite%20React.png?token=GHSAT0AAAAAADMFNHDMJG4TLTNWCETKUJ6E2JGJSIA)


**Card view**
![Card view](https://raw.githubusercontent.com/arthurhdr/artie-imgs/refs/heads/main/bookstores/Screenshot%202025-11-25%20at%2020-21-39%20Vite%20React.png?token=GHSAT0AAAAAADMFNHDNENMIKYCWVT4YXTYA2JGJTAA)


**Modal View**
![Modal view](https://raw.githubusercontent.com/arthurhdr/artie-imgs/refs/heads/main/bookstores/Screenshot%202025-11-25%20at%2020-22-06%20Vite%20React.png?token=GHSAT0AAAAAADMFNHDNHPSK43KFV665J5TW2JGJTRQ)


**Full description**
![Full description](https://raw.githubusercontent.com/arthurhdr/artie-imgs/refs/heads/main/bookstores/Screenshot%202025-11-25%20at%2020-22-23%20Vite%20React.png?token=GHSAT0AAAAAADMFNHDNOSDG7XOGDYDRMIRQ2JGJUBQ)


**Delete book page**
![Delete book](https://raw.githubusercontent.com/arthurhdr/artie-imgs/refs/heads/main/bookstores/Screenshot%202025-11-25%20at%2020-22-36%20Vite%20React.png?token=GHSAT0AAAAAADMFNHDNPPPT7XQUO2HJ4ALQ2JGJU7A)

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.