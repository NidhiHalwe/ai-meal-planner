# Issue Workflow

## Standard issue lifecycle

1. Open a GitHub issue describing the user-visible defect or engineering problem.
2. Reproduce the issue locally with the smallest possible setup.
3. Identify the affected module, request path, or UI route.
4. Create a minimal failing test or reproduction script.
5. Implement the fix at the root cause.
6. Run the targeted test suite and relevant build commands.
7. Review the diff for unintended side effects.
8. Open a pull request with a clear summary and reproduction details.
9. Wait for CI and code review before merge.

## Example issue templates

### Example 1: invalid auth responses

- Symptom: login and signup return inconsistent error shapes.
- Affected area: `backend/controllers/authController.js`
- Fix: normalize all auth errors into `success: false` with an `error` object.
- Regression guard: auth API tests covering invalid password and missing token.

### Example 2: Gemini failures break unrelated flows

- Symptom: AI failures crash or block unrelated requests.
- Affected area: `backend/server.js`
- Fix: isolate AI request handling and add graceful error messages without impacting rest of app.
- Regression guard: test response status and message for missing Gemini key and API error case.

### Example 3: nutrition calculation mismatch

- Symptom: BMR or calorie target calculations differ from the UI formula.
- Affected area: `frontend/frontend/src/utils/bmr.js`
- Fix: align formulas and validate against expected values.
- Regression guard: unit tests for male/female BMR and weight target floor.

### Example 4: missing route-level validation

- Symptom: empty request body gets accepted and fails later in unexpected ways.
- Affected area: route handlers, especially auth and meal endpoints.
- Fix: add validation at the controller boundary.
- Regression guard: tests for validation errors and `400` responses.
