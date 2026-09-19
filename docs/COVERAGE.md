# Test Coverage

## Current coverage status

The backend coverage was generated with Jest and the results are intentionally reported as measured values rather than invented targets.

### Backend coverage at last run

- Statements: 24.02%
- Branches: 20.9%
- Functions: 26.66%
- Lines: 24.02%

## Critical areas already covered

- Auth middleware behavior
- Signup/login validation and response shape
- API error envelope logic
- Core BMR/TDEE calculation logic

## Remaining gaps

The following modules remain under-tested and are still high-risk:

- `backend/controllers/mealController.js`
- `backend/controllers/foodController.js`
- `backend/routes/recipes.js`
- `backend/utils/RecipeManager.js`
- `backend/server.js` startup and route integration
- `backend/controllers/aiController.js`
- `frontend/frontend/src/components/Dashboard.jsx` and other UI flows

## Why those gaps matter

These modules are responsible for food search, datalogging, AI-generated meal plans, and production bootstrap. Because they touch network, database, and external API boundaries, they deserve direct tests and should be expanded before broader release confidence is claimed.

## Recommended path forward

1. Add route-level tests for `/api/meals` and `/api/food`.
2. Mock Gemini responses in tests instead of invoking external APIs.
3. Add a small set of UI tests around the dashboard meal generation flow.
4. Increase coverage gradually in areas with business risk and actual user impact.
