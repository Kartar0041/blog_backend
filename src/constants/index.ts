// ============= ENUMS ====================

export const USER_ROLES = {
  ADMIN: 'admin',
  AUTHOR: 'author',
  READER: 'reader'
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

// ================= HTTP CODES ================
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  ALREADY_EXIST: 409
};

// =============== COMMAN REGEX ================
export const COMMAN_REGEX = {
  EMAIL_REGEX: /^\S+@\S+\.\S+$/,
  PASSWORD_REGEX: "^[a-zA-Z0-9]{3,30}$"
}



// ================== MESSAGES ================== 

export const ERROR_MESSAGES = {
  EMAIL_REQUIRED: 'Email is required.',
  INVALID_EMAIL: 'Please use a valid email address.',
  PASSWORD_MIN: 'Password must be at least 6 characters.',
  USER_EXISTS: 'User already exists.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  SOMETHING_WENT_WRONG: 'Something Went Wrong',
  USER_NOT_FOUND: 'User not found',
  INCORRECT_PASSWORD: 'Incorrect Password',
};

export const SUCCESS_MESSAGES = {
  USER_REGISTERED: 'User registered successfully.',
  USER_LOGGED_IN: 'User logged in successfully.'
};

