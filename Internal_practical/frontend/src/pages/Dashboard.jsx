// frontend/src/pages/Dashboard.jsx
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function Dashboard(){
  const { user, logout } = useContext(AuthContext);
  const initials = user?.name?.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase() || 'U';

  return (
    <div style={{padding:'18px'}}>
      <div className="app-container">
        <div style={{marginBottom:18}}>
          <h1 style={{fontFamily:'Poppins, sans-serif', marginBottom:6}}>Dashboard</h1>
          <p style={{color:'var(--muted)'}}>Welcome to your account area</p>
        </div>

        <div style={{display:'grid', gap:16}}>
          <div className="profile-card">
            <div className="avatar">{initials}</div>
            <div className="profile-info">
              <h3>{user?.name}</h3>
              <p>{user?.email}</p>
            </div>
            <div style={{marginLeft:'auto'}}>
              <button className="btn" onClick={logout} style={{background:'#fff', border:'1px solid #eee'}}>Logout</button>
            </div>
          </div>

          <div className="auth-card" style={{padding:20}}>
            <h3 style={{fontFamily:'Poppins, sans-serif'}}>Quick actions</h3>
            <p style={{color:'var(--muted)'}}>You can extend this area to add user settings, profile edit, or other features.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
