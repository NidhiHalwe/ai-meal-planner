# 🥗 NutriHub: AI-Powered Full-Stack Fitness & Nutrition Platform

NutriHub is a full-stack MERN web application designed to help users manage their nutrition and fitness goals through personalized meal planning, calorie tracking, macronutrient analysis, and AI-powered meal recommendations.

The application combines React, Node.js, Express.js, MongoDB, JWT-based authentication, and Google Gemini API with Docker-based containerization to provide a reproducible and maintainable development environment.


## ✨ Features

- 🥗 **Personalized Nutrition Tracking**
  - Set daily calorie and nutrition goals.
  - Track calories, protein, carbohydrates, and fats.
  - Monitor daily nutrition progress.

- 🤖 **AI-Powered Meal Recommendations**
  - Uses Google Gemini API to generate personalized meal suggestions.
  - Recommendations can be based on calorie targets and nutritional requirements.

- 🧮 **BMR & Calorie Calculation**
  - Calculate Basal Metabolic Rate.
  - Estimate daily calorie requirements based on user information and activity level.

- 🍽️ **Meal & Diet Logging**
  - Add and manage meals.
  - Track nutritional information throughout the day.

- 📊 **Macronutrient Tracking**
  - Monitor protein, carbohydrates, and fat intake.
  - Compare nutrition intake against configured goals.

- 🔐 **Secure Authentication**
  - JWT-based authentication.
  - Password hashing using bcrypt.
  - Protected API routes.

- 🔄 **RESTful API**
  - Structured Express.js backend.
  - Separation of routes, controllers, models, and services.

- 🐳 **Docker Containerization**
  - Docker configuration for reproducible application environments.
  - Docker Compose support for running application services.

- 📱 **Responsive Interface**
  - Designed for desktop, tablet, and mobile screens.

---

## 🏗️ System Architecture

NutriHub follows a client-server architecture with separate frontend, backend, database, and AI service layers.

```text
                         ┌──────────────────────┐
                         │        User          │
                         │      Browser         │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React + Vite       │
                         │   Frontend           │
                         └──────────┬───────────┘
                                    │
                               REST API
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Node.js + Express  │
                         │   Backend API        │
                         │                      │
                         │ Authentication       │
                         │ Business Logic       │
                         │ Nutrition Services   │
                         └───────┬───────┬──────┘
                                 │       │
                    ┌────────────┘       └─────────────┐
                    ▼                                  ▼
          ┌──────────────────┐               ┌──────────────────┐
          │     MongoDB      │               │   Google Gemini  │
          │                  │               │       API        │
          │ Users / Meals    │               │                  │
          │ Nutrition Data   │               │ AI Recommendations│
          └──────────────────┘               └──────────────────┘
````

---

## 🔄 Application Workflow

```text
User Registration / Login
          │
          ▼
     JWT Authentication
          │
          ▼
   User Profile & Goals
          │
          ├───────────────────┐
          ▼                   ▼
   BMR / Calorie         Nutrition Goals
   Calculation                 │
          │                    │
          └──────────┬─────────┘
                     ▼
                Meal Planning
                     │
            ┌────────┴─────────┐
            ▼                  ▼
       Meal Logging       AI Suggestions
            │                  │
            └────────┬─────────┘
                     ▼
            Daily Nutrition Data
                     │
                     ▼
             Dashboard & Progress
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* CSS / Tailwind CSS
* Responsive UI

### Backend

* Node.js
* Express.js
* REST APIs
* JavaScript

### Database

* MongoDB
* Mongoose

### Authentication

* JSON Web Tokens (JWT)
* bcrypt

### AI Integration

* Google Gemini API

### DevOps & Development

* Docker
* Docker Compose
* Git
* GitHub
* GitHub Actions
* Postman
* VS Code
* npm

---

## 📁 Project Structure

```text
NutriHub/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .gitignore
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js 18+
* npm
* MongoDB or MongoDB Atlas
* Git

For Docker-based setup:

* Docker
* Docker Compose

---

## 1. Clone the Repository

```bash
git clone https://github.com/NidhiHalwe/Nutrihub.git
cd Nutrihub
```

---

# ⚙️ Environment Configuration

Create a `.env` file inside the `backend` directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

### Environment Variables

| Variable         | Description                      |
| ---------------- | -------------------------------- |
| `PORT`           | Port used by the Express backend |
| `MONGO_URI`      | MongoDB connection string        |
| `JWT_SECRET`     | Secret used to sign JWT tokens   |
| `GEMINI_API_KEY` | Google Gemini API key            |

> Never commit `.env` files or expose API credentials publicly.

---

# 💻 Manual Local Setup

## Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

## Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🐳 Running with Docker

NutriHub includes Docker configuration to provide a consistent and reproducible application environment.

The repository includes:

* `Dockerfile`
* `docker-compose.yml`
* `.dockerignore`

## Start the Application

From the project root:

```bash
docker compose up --build
```

The configured services will be built and started.

Application:

```text
Frontend:
http://localhost:5173

Backend API:
http://localhost:5000
```

---

## Run Containers in Background

```bash
docker compose up --build -d
```

---

## Check Running Containers

```bash
docker compose ps
```

---

## View Logs

```bash
docker compose logs -f
```

---

## Stop the Application

```bash
docker compose down
```

---

## Rebuild Containers

```bash
docker compose up --build
```

---

## 🐳 Docker Architecture

```text
                    ┌──────────────────────┐
                    │    User / Browser    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Frontend Container   │
                    │                      │
                    │ React + Vite         │
                    │ Port: 5173           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Backend Container    │
                    │                      │
                    │ Node.js + Express    │
                    │ Port: 5000           │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴───────────┐
                    ▼                      ▼
             ┌──────────────┐      ┌────────────────┐
             │   MongoDB    │      │   Gemini API   │
             │   Database   │      │  AI Services   │
             └──────────────┘      └────────────────┘
```

Docker helps keep application dependencies and service configuration consistent across development environments.

---

# 🔑 Authentication Flow

NutriHub uses JWT-based authentication.

```text
User
 │
 ▼
Register / Login
 │
 ▼
Backend Authentication
 │
 ▼
Password Verification
 │
 ▼
JWT Token Generated
 │
 ▼
Authenticated Request
 │
 ▼
JWT Verification Middleware
 │
 ▼
Protected API Access
```

Passwords are hashed using bcrypt before being stored.

Protected routes require valid authentication.

---

# 🤖 AI Integration

NutriHub integrates Google Gemini API for AI-assisted meal recommendations.

```text
User Nutrition Goals
        │
        ▼
Calories / Macros / Preferences
        │
        ▼
Backend AI Service
        │
        ▼
Google Gemini API
        │
        ▼
AI-Generated Meal Suggestions
        │
        ▼
Backend Response
        │
        ▼
React Nutrition Dashboard
```

The backend handles communication with the Gemini API so that API credentials are not exposed directly to the frontend.

---

# 🧮 BMR & Calorie Calculation

NutriHub includes a BMR and calorie estimation workflow.

The calculation can consider:

* Age
* Height
* Weight
* Activity level
* Fitness goal

The resulting calorie target can be used by the nutrition tracking and meal-planning features.

---

# 📊 Nutrition Tracking

Users can monitor important nutritional metrics including:

```text
Daily Calories
      │
      ├── Protein
      ├── Carbohydrates
      └── Fats
```

The application provides a dashboard for viewing nutrition progress against configured goals.

---

# 🍽️ Meal Logging

Users can record meals and track nutritional information.

Example:

```text
Breakfast
 ├── Calories
 ├── Protein
 ├── Carbohydrates
 └── Fats

Lunch
 ├── Calories
 ├── Protein
 ├── Carbohydrates
 └── Fats

Dinner
 ├── Calories
 ├── Protein
 ├── Carbohydrates
 └── Fats
```

---

# 🔌 REST API Architecture

The backend follows a RESTful API structure.

```text
Authentication
      │
      ├── Register
      ├── Login
      └── Protected Routes

Nutrition
      │
      ├── Nutrition Goals
      ├── Meal Logging
      └── Nutrition Data

AI
      │
      └── Meal Recommendations
```

The backend separates API responsibilities across routes, controllers, models, middleware, and services.

---

# 🧪 Testing

NutriHub is designed to support automated and manual testing.

Important testing areas include:

* User registration
* User login
* JWT authentication
* Protected routes
* Meal creation
* Nutrition calculations
* API validation
* AI API error handling
* Database interactions

If the corresponding scripts are configured in the project, tests can be executed using:

```bash
npm test
```

Coverage can be generated using:

```bash
npm run test:coverage
```

> Test and coverage commands should only be used when the corresponding testing configuration is present in the repository.

---

# 🔄 CI/CD

The project includes GitHub Actions configuration for automated validation.

Typical workflow:

```text
Push / Pull Request
        │
        ▼
Install Dependencies
        │
        ▼
Run Tests
        │
        ▼
Generate Coverage
        │
        ▼
Build Application
        │
        ▼
CI Result
```

Workflow configuration:

```text
.github/workflows/ci.yml
```

---

# 🛡️ Security

NutriHub follows basic application security practices:

* Passwords are hashed using bcrypt.
* Authentication uses JWT.
* Protected routes validate authentication tokens.
* API credentials are stored in environment variables.
* `.env` files are excluded from Git.
* Backend input validation is used where required.
* Gemini API credentials are not exposed to the frontend.
* Sensitive credentials should never be committed to GitHub.

---

# ⚡ Error Handling

The backend handles common application failures such as:

* Invalid authentication
* Invalid request data
* Unauthorized requests
* Database errors
* AI API failures
* Missing environment variables
* Unexpected server errors

The goal is to provide meaningful API responses without exposing sensitive implementation details.

---

# 📱 Responsive Design

NutriHub is designed to provide a consistent experience across:

* Desktop
* Laptop
* Tablet
* Mobile

The interface focuses on clear navigation and accessible presentation of nutrition information.

---

# 🎯 Real-World Use Cases

NutriHub can be used for:

* Personal nutrition tracking
* Calorie management
* Meal planning
* Macronutrient tracking
* AI-assisted meal recommendations
* Fitness goal management
* Daily diet logging
* Nutrition progress monitoring

---

# 💡 Why NutriHub?

Managing nutrition manually can involve calculating calorie requirements, tracking macros, planning meals, and finding suitable food options.

NutriHub brings these workflows together into a single full-stack application.

```text
Nutrition Tracking
        +
Meal Planning
        +
AI Assistance
        +
User Authentication
        +
Data Persistence
        +
Dockerized Environment
        =
NutriHub
```

---

# 🧠 Engineering Concepts Demonstrated

This project demonstrates practical software engineering concepts including:

* Full-stack MERN development
* React component architecture
* REST API development
* Node.js backend development
* Express.js routing
* MongoDB data modeling
* Mongoose
* JWT authentication
* Password hashing
* API integration
* LLM/Gemini integration
* Input validation
* Error handling
* Environment configuration
* Responsive frontend development
* Docker containerization
* Docker Compose
* Git/GitHub workflow
* CI/CD with GitHub Actions

---

# 🚧 Future Improvements

* [ ] Advanced unit and integration testing
* [ ] Improved test coverage
* [ ] Nutrition analytics dashboard
* [ ] Weekly and monthly nutrition reports
* [ ] Food database integration
* [ ] Meal recommendation history
* [ ] Improved AI response validation
* [ ] Performance optimization
* [ ] Enhanced accessibility
* [ ] Progressive Web App support
* [ ] Production monitoring
* [ ] Advanced CI/CD deployment pipeline

---

# 📈 Future Vision

The long-term goal of NutriHub is to evolve into a more intelligent nutrition management platform.

```text
User Profile
     │
     ▼
Nutrition Goals
     │
     ▼
Daily Tracking
     │
     ▼
Historical Data
     │
     ▼
AI Analysis
     │
     ▼
Personalized Recommendations
     │
     ▼
Progress Monitoring
```

Future versions can use historical nutrition data to provide more personalized insights and recommendations.

---

# 🌟 Project Highlights

```text
✔ Full-Stack MERN Application
✔ React + Vite Frontend
✔ Node.js + Express Backend
✔ MongoDB + Mongoose
✔ JWT Authentication
✔ bcrypt Password Hashing
✔ RESTful APIs
✔ Google Gemini AI Integration
✔ AI-Powered Meal Recommendations
✔ BMR & Calorie Calculation
✔ Macronutrient Tracking
✔ Meal Logging
✔ Responsive UI
✔ Docker Containerization
✔ Docker Compose
✔ Reproducible Development Environment
✔ GitHub Actions CI/CD
✔ Real-World Application
```

---

# 👨‍💻 Author

**Nidhi Halwe**

Software Engineer | Full Stack Developer | AI Applications

---

# 🔗 Repository

GitHub:

[https://github.com/NidhiHalwe/Nutrihub](https://github.com/NidhiHalwe/Nutrihub)

---

# ⭐ Support

If you find NutriHub useful, consider giving the repository a ⭐ on GitHub.

---

# 📄 License

This project is available for educational and development purposes.

