import { USERS_DB } from '../config/db.js';

// Customer Login
export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email address is required' });
  }

  const user = USERS_DB.find(u => u.email === email) || {
    id: 1,
    full_name: email.split('@')[0].toUpperCase(),
    email
  };

  res.json({
    success: true,
    message: 'Logged in successfully',
    user,
    token: `ahf_jwt_token_${Date.now()}`
  });
};

// Customer Register
export const register = (req, res) => {
  const { fullName, email, phone, password } = req.body;

  if (!email || !fullName) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }

  const newUser = {
    id: USERS_DB.length + 1,
    full_name: fullName,
    email,
    phone
  };

  USERS_DB.push(newUser);

  res.status(201).json({
    success: true,
    message: 'Account registered successfully',
    user: newUser,
    token: `ahf_jwt_token_${Date.now()}`
  });
};
