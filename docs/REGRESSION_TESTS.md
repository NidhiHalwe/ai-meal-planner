# Regression Tests

## 1. Authentication validation and middleware

### Original behavior
Auth requests accepted invalid inputs and the middleware returned raw `message` payloads without a consistent error code.

### Risk
Users could hit ambiguous failures and the app lacked consistent security responses.

### Regression test
`backend/__tests__/auth.test.js`

### Fix implemented
- standardized error responses
- validation for email/password format and length
- middleware checks `Authorization` scheme and rejects missing or invalid tokens

## 2. API error envelope consistency

### Original behavior
Error handling was dispersed across route logic and did not standardize payloads.

### Risk
Client code could fail unpredictably when server errors happened.

### Regression test
`backend/__tests__/api-quality.test.js`

### Fix implemented
`backend/utils/errorHandler.js` centralizes the payload and `asyncHandler` catches promise rejections.

## 3. Nutrition calculations

### Original behavior
The app’s BMR/TDEE helpers were used by the dashboard and calculator flows, but there were no automated checks for them.

### Risk
A single formula bug could silently mislead calorie planning.

### Regression test
`frontend/frontend/src/test/bmr.test.js`

### Fix implemented
The tests lock the repository’s actual formulas and the targeted value floor used for weight-loss goals.

## 4. Frontend form interaction

### Original behavior
The auth form submitted data only when the user interacted with the fields, but no component-level regression test existed.

### Risk
A UI regression could break login or signup without failing in the repository test suite.

### Regression test
`frontend/frontend/src/test/AuthForm.test.jsx`

### Fix implemented
The test validates form submission payloads and accessible labels.
