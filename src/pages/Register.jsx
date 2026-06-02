import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrar, setMostrar] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validar = () => {
    if (contraseña.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
    if (!/[A-Z]/.test(contraseña)) return 'Debe tener al menos una letra mayúscula';
    if (!/[0-9]/.test(contraseña)) return 'Debe tener al menos un número';
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); setExito('');

    const errorValidacion = validar();
    if (errorValidacion) { setError(errorValidacion); return; }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, contrasena: contraseña }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.mensaje); return; }

      setExito('¡Usuario registrado! Redirigiendo...');
      setTimeout(() => navigate('/login'), 1500);

    } catch (_err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const fortaleza = () => {
    if (contraseña.length === 0) return null;
    if (contraseña.length < 6) return { texto: 'Débil', color: '#C00000', ancho: '33%' };
    if (contraseña.length < 8 || !/[A-Z]/.test(contraseña) || !/[0-9]/.test(contraseña))
      return { texto: 'Media', color: '#FF8C00', ancho: '66%' };
    return { texto: 'Fuerte', color: '#375623', ancho: '100%' };
  };

  const f = fortaleza();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>📝 Crear Cuenta</h1>
        <p style={styles.subtitle}>Regístrate gratis</p>

        {error && <div style={styles.error}>{error}</div>}
        {exito && <div style={styles.exito}>{exito}</div>}

        <form onSubmit={handleRegister}>
          <div style={styles.field}>
            <label style={styles.label}>Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={styles.input}
              placeholder="Tu nombre"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Contraseña</label>
            <div style={styles.inputWrapper}>
              <input
                type={mostrar ? 'text' : 'password'}
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                style={styles.inputIcon}
                placeholder="Mín. 8 caracteres, 1 mayúscula, 1 número"
                required
              />
              <button
                type="button"
                onClick={() => setMostrar(!mostrar)}
                style={styles.eyeBtn}
              >
                {mostrar ? '🙈' : '👁️'}
              </button>
            </div>
            {f && (
              <div style={{ marginTop: '8px' }}>
                <div style={{ background: '#eee', borderRadius: '4px', height: '6px' }}>
                  <div style={{
                    width: f.ancho, background: f.color,
                    height: '6px', borderRadius: '4px',
                    transition: 'width 0.3s'
                  }} />
                </div>
                <span style={{ fontSize: '12px', color: f.color, fontWeight: '600' }}>
                  Contraseña {f.texto}
                </span>
              </div>
            )}
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>

        <p style={styles.link}>
          ¿Ya tienes cuenta? <Link to="/login" style={styles.linkText}>Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh', display: 'flex', alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1F4E79 0%, #2E75B6 100%)',
  },
  card: {
    background: '#fff', borderRadius: '16px', padding: '40px',
    width: '100%', maxWidth: '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  title: { textAlign: 'center', color: '#1F4E79', marginBottom: '8px', fontSize: '28px' },
  subtitle: { textAlign: 'center', color: '#666', marginBottom: '28px' },
  error: {
    background: '#FCE4D6', color: '#C00000', padding: '12px',
    borderRadius: '8px', marginBottom: '16px', fontSize: '14px',
  },
  exito: {
    background: '#E2EFDA', color: '#375623', padding: '12px',
    borderRadius: '8px', marginBottom: '16px', fontSize: '14px',
  },
  field: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '6px', color: '#333', fontWeight: '600', fontSize: '14px' },
  input: {
    width: '100%', padding: '12px', borderRadius: '8px',
    border: '2px solid #BDD7EE', fontSize: '15px',
    outline: 'none', boxSizing: 'border-box',
  },
  inputWrapper: {
    display: 'flex', alignItems: 'center',
    border: '2px solid #BDD7EE', borderRadius: '8px', overflow: 'hidden',
  },
  inputIcon: {
    flex: 1, padding: '12px', border: 'none',
    fontSize: '15px', outline: 'none',
  },
  eyeBtn: {
    padding: '0 12px', background: 'none',
    border: 'none', cursor: 'pointer', fontSize: '18px',
  },
  button: {
    width: '100%', padding: '14px', background: '#1F4E79',
    color: '#fff', border: 'none', borderRadius: '8px',
    fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginTop: '8px',
  },
  link: { textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '14px' },
  linkText: { color: '#2E75B6', fontWeight: '700', textDecoration: 'none' },
};