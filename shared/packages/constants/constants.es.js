const E = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  USERS: "/users",
  PRODUCTS: "/products"
}, R = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
}, O = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile"
};
export {
  E as API_ENDPOINTS,
  R as HTTP_STATUS,
  O as ROUTES
};
