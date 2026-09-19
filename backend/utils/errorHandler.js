export function apiErrorResponse(statusCode, code, message, details = undefined) {
  const error = new Error(message);
  error.status = statusCode;
  error.code = code;
  if (details) {
    error.details = details;
  }
  return error;
}

export function asyncHandler(fn) {
  return function wrappedHandler(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export function sendErrorResponse(res, statusCode, code, message, details) {
  const payload = {
    success: false,
    error: {
      code,
      message,
    },
  };

  if (details) {
    payload.error.details = details;
  }

  return res.status(statusCode).json(payload);
}
