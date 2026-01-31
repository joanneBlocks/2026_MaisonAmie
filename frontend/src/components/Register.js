import React, { useState } from 'react';
import { registerUser } from '../services/api';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await registerUser(form);
    console.log('Register response:', data);
    alert(data.message || 'Registration successful!');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required /><br/>
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required /><br/>
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required /><br/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
