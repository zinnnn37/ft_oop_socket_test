import Home from './Home.js';
import Test from './Test.js';

export const BASE_URL = 'http://localhost:5173/';

export const routes = [
  { path: /^\/$/, element: Home },
  { path: /^\/test$/, element: Test },
];
