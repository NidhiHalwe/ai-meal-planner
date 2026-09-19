
# 🥗 NutriHub: AI-Powered Nutrition & Meal Planning Platform

NutriHub is a full-stack MERN application designed to help users manage their nutrition and fitness goals through personalized meal planning, calorie tracking, macronutrient analysis, and AI-powered meal recommendations.

The application combines a React frontend, Node.js/Express backend, MongoDB database, JWT-based authentication, and Google Gemini API to provide an interactive nutrition management experience.

---

## ✨ Features

- 🥗 **Personalized Nutrition Tracking**
  - Set daily calorie and nutrition goals.
  - Track calories, protein, carbohydrates, and fats.
  - Monitor daily nutrition progress.

- 🤖 **AI-Powered Meal Recommendations**
  - Uses Google Gemini API to generate personalized meal suggestions.
  - Recommendations can be tailored according to calorie and nutrition requirements.

- 📊 **Macronutrient Tracking**
  - Track daily protein, carbohydrates, and fat intake.
  - Calculate nutritional requirements based on user goals.

- 🔐 **Secure User Authentication**
  - JWT-based authentication.
  - Password hashing using bcrypt.
  - Protected API routes for authenticated users.

- 🧮 **BMR & Calorie Calculation**
  - Calculate Basal Metabolic Rate.
  - Estimate calorie requirements based on user information and fitness goals.

- 🍽️ **Diet Logging**
  - Add and manage consumed meals.
  - Track nutritional values throughout the day.

- 📱 **Responsive User Interface**
  - Designed for desktop and mobile screens.
  - Interactive and user-friendly nutrition dashboard.

- 🔄 **RESTful Backend**
  - Structured Express.js APIs.
  - MongoDB persistence using Mongoose.

---

## 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │       User           │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React Frontend     │
                         │                      │
                         │ Dashboard / Meals    │
                         │ Nutrition / Profile  │
                         └──────────┬───────────┘
                                    │
                              REST API
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Node.js + Express    │
                         │                      │
                         │ Authentication       │
                         │ Business Logic       │
                         │ Nutrition APIs       │
                         └───────┬───────┬──────┘
                                 │       │
                    ┌────────────┘       └─────────────┐
                    ▼                                  ▼
          ┌──────────────────┐               ┌──────────────────┐
          │    MongoDB       │               │   Gemini API     │
          │                  │               │                  │
          │ Users / Meals    │               │ AI Meal          │
          │ Nutrition Data   │               │ Recommendations  │
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
          ├───────────────┐
          ▼               ▼
   Calorie / BMR       Nutrition Goals
   Calculation              │
          │                 │
          └────────┬────────┘
                   ▼
             Meal Planning
                   │
          ┌────────┴─────────┐
          ▼                  ▼
     Manual Logging      AI Suggestions
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
* AI-powered meal recommendations

### Development Tools

* Git
* GitHub
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
├── README.md
└── .gitignore
```

---

## 🚀 Getting Started

Follow the steps below to run NutriHub locally.

---

## 1. Clone the Repository

```bash
git clone https://github.com/NidhiHalwe/Nutrihub.git
cd Nutrihub
```

---

## 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

## 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

The backend requires the following environment variables:

| Variable         | Description                     |
| ---------------- | ------------------------------- |
| `PORT`           | Port used by the Express server |
| `MONGO_URI`      | MongoDB connection string       |
| `JWT_SECRET`     | Secret used to sign JWT tokens  |
| `GEMINI_API_KEY` | Google Gemini API key           |

> Never commit `.env` files or expose API credentials publicly.

---

## 🔑 Authentication Flow

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
Client Stores Authentication State
 │
 ▼
Protected API Requests
 │
 ▼
JWT Verification Middleware
 │
 ▼
Authorized Request
```

Passwords are hashed using bcrypt before being stored.

Protected routes require a valid authentication token.

---

## 🤖 AI Meal Recommendation Flow

NutriHub integrates Google Gemini to provide AI-powered meal recommendations.

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

The AI layer is designed to assist users with meal ideas based on their nutritional requirements.

---

## 🧮 BMR & Calorie Calculation

NutriHub includes a calorie and BMR calculation workflow that can help estimate a user's daily energy requirements.

The calculation can consider factors such as:

* Age
* Height
* Weight
* Activity level
* Fitness goal

The resulting calorie target can then be used by the meal-planning and nutrition-tracking features.

---

## 📊 Nutrition Tracking

Users can track important nutritional metrics including:

```text
Daily Calories
      │
      ├── Protein
      ├── Carbohydrates
      └── Fats
```

The dashboard provides an overview of nutrition progress against the user's goals.

---

## 🍽️ Meal Logging

Users can record meals and track their nutritional information.

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

This data can be used to understand daily nutrition intake and progress.

---

## 🔌 API Architecture

The backend follows a RESTful API architecture.

Typical API responsibilities include:

```text
Authentication
      │
      ├── Register
      ├── Login
      └── Protected User Routes

Nutrition
      │
      ├── Nutrition Goals
      ├── Meal Logging
      └── Nutrition Data

AI
      │
      └── Meal Recommendations
```

---

## 🧪 Testing

The project can be tested using:

* API testing with Postman
* Backend unit tests
* Integration tests
* Frontend component tests
* Manual user-flow testing

Important areas to test include:

* User registration
* User login
* JWT authentication
* Protected routes
* Meal creation
* Nutrition calculations
* AI API error handling
* Invalid request handling

---

## 🛡️ Security

NutriHub follows basic application security practices:

* Passwords are hashed using bcrypt.
* Authentication is handled using JWT.
* Protected routes validate authentication tokens.
* API credentials are stored using environment variables.
* Sensitive credentials are excluded from Git.
* Backend validation is used for incoming requests.

---

## ⚡ Error Handling

The backend handles common application failures such as:

* Invalid authentication
* Invalid request data
* Unauthorized requests
* Database errors
* AI API failures
* Missing environment variables
* Unexpected server errors

The goal is to provide meaningful responses without exposing sensitive implementation details.

---

## 📱 Responsive Design

NutriHub is designed to provide a consistent experience across:

* Desktop
* Laptop
* Tablet
* Mobile

The interface focuses on simple navigation and clear presentation of nutrition information.

---

## 🎯 Real-World Use Cases

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

## 💡 Why NutriHub?

Managing nutrition manually often requires calculating calories, tracking macros, planning meals, and repeatedly searching for suitable food options.

NutriHub brings these workflows together into a single application.

The project combines:

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
        =
NutriHub
```

---

## 🧠 Engineering Concepts Demonstrated

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
* Git/GitHub workflow

---

## 🚧 Future Improvements

Planned improvements include:

* [ ] Automated unit and integration testing
* [ ] Dockerized development environment
* [ ] GitHub Actions CI/CD
* [ ] Nutrition analytics dashboard
* [ ] Weekly and monthly nutrition reports
* [ ] More advanced meal recommendations
* [ ] Food database integration
* [ ] Meal recommendation history
* [ ] Improved AI response validation
* [ ] Automatic test coverage reporting
* [ ] Performance optimization
* [ ] Enhanced accessibility
* [ ] Progressive Web App support

---

## 📈 Future Vision

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

## 🌟 Project Highlights

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
✔ Real-World Nutrition Use Case
```

---

## 👨‍💻 Author

**Nidhi Halwe**

Software Engineer | Full Stack Developer | AI Applications

---

## 🔗 Repository

GitHub: [https://github.com/NidhiHalwe/Nutrihub](https://github.com/NidhiHalwe/Nutrihub)

---

## ⭐ Support

If you find NutriHub useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is available for educational and development purposes.


