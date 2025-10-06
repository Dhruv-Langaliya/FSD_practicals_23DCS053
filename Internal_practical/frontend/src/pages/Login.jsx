// frontend/src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function Login(){
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email:'', password:'' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!form.email || !form.password) {
      setErrorMsg('Please fill all fields.');
      return;
    }
    setLoading(true);
    try{
      await login(form);
    }catch(err){
      setErrorMsg(err?.response?.data?.msg || 'Login failed.');
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p className="lead">Log in to continue to the portal.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="input-label">Email</label>
            <input className="input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
          </div>

          <div className="form-group">
            <label className="input-label">Password</label>
            <div className="password-row">
              <input className="input" name="password" type={showPass ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Your password" />
              <button type="button" className="show-pass" onClick={() => setShowPass(s => !s)}>{showPass ? 'Hide' : 'Show'}</button>
            </div>
          </div>

          {errorMsg && <div className="error">{errorMsg}</div>}

          <div style={{marginTop:14}}>
            <button className="btn btn-primary" disabled={loading} type="submit">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="small-muted">Don't have an account? <a href="/register">Register</a></div>
        </form>
      </div>
    </div>
  );
}
