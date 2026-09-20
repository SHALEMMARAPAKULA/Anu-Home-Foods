import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    const res = await login({ email, password });
    if (res.success) {
      navigate('/shop');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="ahf-badge">AHF</div>
          <span className="brand-name" style={{ fontSize: '1.4rem' }}>ANU HOME FOODS</span>
        </div>

        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your account to manage your pickle orders</p>

        {error && (
          <div style={{ background: 'rgba(184, 24, 32, 0.1)', color: 'var(--chili-red)', padding: '10px', borderRadius: '4px', fontSize: '0.88rem', marginBottom: '15px' }}>
            {error}
          </div>
        )}

        <button className="btn-google" type="button" onClick={() => login({ email: 'user@anuhomefoods.com' }).then(() => navigate('/shop'))}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px', height: '18px' }} />
          Continue with Google
        </button>

        <div className="divider-text">OR SIGN IN WITH EMAIL</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#888" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                required
                className="form-input"
                style={{ paddingLeft: '40px' }}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#888" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                required
                className="form-input"
                style={{ paddingLeft: '40px' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <a href="#forgot" style={{ fontSize: '0.85rem', color: 'var(--chili-red)' }}>Forgot Password?</a>
          </div>

          <button type="submit" className="btn-primary-gradient" style={{ width: '100%', padding: '12px', justifyContent: 'center' }}>
            Sign In to Account
          </button>
        </form>

        <div className="auth-footer-link">
          Don't have an account? <Link to="/register">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
