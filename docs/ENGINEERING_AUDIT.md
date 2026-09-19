# Engineering Audit

## Summary

NutriHub is a lightweight MERN-style application with a Node.js/Express backend and a React frontend served by Vite. The repo contains a real nutrition planner and calorie tracker with a Gemini-powered meal generator, but the codebase currently has several engineering gaps: inconsistent API envelopes, missing validation on auth data, lack of centralized error handling, and no project-wide CI or Docker configuration.

## Current architecture

### Frontend

- React app located under `frontend/frontend`
- Route-based UI with a custom `AuthProvider` and React Router
- Core pages: Home, Login, Signup, Dashboard, Calculator
- Navigation and app shell are present, with the dashboard working around BMR/TDEE and AI meal plan generation
- State persists in browser `localStorage` for profile and selected recipe data

### Backend

- Express server in `backend/server.js`
- Route modules: auth, meals, food, AI, recipes
- Mongoose models: `User` and `Meal`
- Auth middleware JWT verification in `backend/middleware/auth.js`
- Gemini integration is implemented directly in the server and in the recipe manager utility

## Important modules

- `backend/server.js`: app bootstrap, environment warnings, CORS, request logging, AI route, Mongo bootstrapping
- `backend/controllers/authController.js`: signup/login endpoints
- `backend/middleware/auth.js`: Bearer token verification
- `backend/controllers/mealController.js`: meal logging and retrieval
- `backend/utils/RecipeManager.js`: recipe generation with Gemini fallback logic
- `frontend/frontend/src/services/api.js`: central API client wrapper
- `frontend/frontend/src/services/auth.jsx`: localStorage-based auth context
- `frontend/frontend/src/utils/bmr.js`: BMR/TDEE and calorie target calculations

## Technical debt and risky areas

- The backend startup currently warns instead of failing on missing JWT secret, yet auth endpoints depend on it at runtime.
- Authentication responses are inconsistent across endpoints and some code paths still return raw `{ message }` objects instead of a consistent `success`/`error` envelope.
- The repo includes a hardcoded leaked Gemini key in a previously committed file; this was removed from the active route code path.
- The app bootstraps even when Mongo is not configured, which is acceptable for demo mode but should be explicit and documented.
- The AI route accepts unvalidated text input and returns raw backend errors without centralization.
- Some route-level logic still assumes a successful Mongo connection and a working AI key; this is not production-safe.

## Missing tests

The repo had no automated test infrastructure before the changes. The most important untested areas were:

- authentication middleware behavior
- API error envelope consistency
- nutrition calculation formulas
- frontend form interactions
- app shell render paths

## Security concerns

- Secrets were previously checked into local files; these were removed from code and replaced with env-driven config.
- JWT configuration is required but not validated consistently at server startup.
- Input validation on auth endpoints was minimal.
- CORS is permissive and intended for local development but should remain explicit.

## Performance concerns

- The AI route is synchronous in terms of request flow and can block for slow Gemini responses.
- Frontend uses localStorage across sessions with no TTL or normalization.
- Some large objects are stored locally without sanitization in the browser.

## Recommended improvements

1. Add consistent API error helpers and central middleware across the backend.
2. Keep env validation strict and fail early for production-style configurations.
3. Add CI checks for frontend/backend test runs and build outputs.
4. Add Docker and Compose support for local dev parity.
5. Expand tests around meal and AI route integrations.
6. Add a proper issue workflow and regression documentation for maintainability.
