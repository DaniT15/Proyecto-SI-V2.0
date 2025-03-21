import React, { useState } from 'react';
import '../estilos/registrarse.css'
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, app } from '../config/firebaseConfig';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const db = getFirestore(app)

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden ❌');
      setLoading(false);
      return;
    }

    try {
      const nombreRegistrado = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", nombreRegistrado.user.uid), {
        email: email,
        uid: nombreRegistrado.user.uid,
        name: name,
        tipo: "estudiante",
        imagen:"",
        telefono:""
      })
      alert('Registro exitoso ✅');

      navigate('/');
    } catch (err) {
      console.log(err)
      setError('Error al registrar el usuario ❌');
    }

    setLoading(false);
  };







  return (
    <div className="margen">
      <div className="registrar-container">
        <h2>Registrarse</h2>
        <form onSubmit={handleRegister}>
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contraseña:</label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            placeholder="Confirma tu contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Registrarse'}
          </button>
        </form>

        <Link to="/login">
          <button className="login-btn">
            Iniciar Sesión
          </button>
        </Link>
      </div>
    </div>
  );
}

