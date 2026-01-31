import React, { useState } from 'react';
import { loginUser } from '../services/api';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(form);
    console.log('Login response:', data);
    if (data.token) {
      localStorage.setItem('token', data.token);
      alert('Login successful!');
    } else {
      alert(data.message || 'Login failed!');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required /><br/>
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required /><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
