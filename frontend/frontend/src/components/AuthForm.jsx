import React, { useState } from 'react';

export default function AuthForm({ mode, onSubmit, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailId = 'auth-email';
  const passwordId = 'auth-password';

  return (
    <form
      onSubmit={e => { e.preventDefault(); onSubmit(email, password); }}
      className="container"
      style={{marginTop:'3rem'}}
    >
      <h2 style={{color:'var(--color-primary)'}}>{mode === 'signup' ? 'Sign Up' : 'Login'}</h2>
      <div style={{marginTop:'1.2rem'}}>
        <label htmlFor={emailId}>Email</label>
        <input id={emailId} required value={email} type="email" onChange={e=>setEmail(e.target.value)} style={{width:'100%',marginTop:2}}/>
      </div>
      <div style={{marginTop:'.8rem'}}>
        <label htmlFor={passwordId}>Password</label>
        <input id={passwordId} required value={password} type="password" minLength={6} onChange={e=>setPassword(e.target.value)} style={{width:'100%',marginTop:2}}/>
      </div>
      <button type="submit" style={{marginTop:'1.8rem'}} disabled={loading}>
        {loading? 'Loading...' : (mode==='signup'? 'Create Account' : 'Login')}
      </button>
    </form>
  );
}










