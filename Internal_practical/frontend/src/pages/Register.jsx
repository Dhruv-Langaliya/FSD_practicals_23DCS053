// frontend/src/pages/Register.jsx
import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function Register(){
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ name:'', email:'', password:'', confirm:'' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setErrorMsg('Please fill all fields.');
      return;
    }
    if (form.password !== form.confirm) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      // AuthContext handles navigation
    } catch (err) {
      setErrorMsg(err?.response?.data?.msg || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create an account</h2>
        <p className="lead">Sign up to access the portal — secure and simple.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="input-label">Full name</label>
            <input className="input" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
          </div>

          <div className="form-group">
            <label className="input-label">Email</label>
            <input className="input" name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@example.com"/>
          </div>

          <div className="form-group">
            <label className="input-label">Password</label>
            <div className="password-row">
              <input className="input" name="password" type={showPass ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Choose a secure password" />
              <button type="button" className="show-pass" onClick={() => setShowPass(s => !s)}>{showPass ? 'Hide' : 'Show'}</button>
            </div>
          </div>

          <div className="form-group">
            <label className="input-label">Confirm password</label>
            <input className="input" name="confirm" type={showPass ? 'text' : 'password'} value={form.confirm} onChange={handleChange} placeholder="Repeat password" />
          </div>

          {errorMsg && <div className="error">{errorMsg}</div>}

          <div style={{marginTop:14}}>
            <button className="btn btn-primary" disabled={loading} type="submit">
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>

          <div className="small-muted">
            Already have an account? <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}
