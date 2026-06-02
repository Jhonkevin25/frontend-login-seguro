import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');

    if (!token) {
      navigate('/login');
      return;
    }

    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }

    fetch('http://localhost:3000/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.mensaje === 'Perfil obtenido correctamente') {
          setUsuario((prev) => ({ ...prev, ...data.usuario }));
        } else {
          setError(data.mensaje);
        }
      })
      .catch(() => setError('Error al conectar con el servidor'));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.avatar}>
          {usuario?.nombre?.charAt(0).toUpperCase() || '?'}
        </div>

        <h1 style={styles.title}>¡Bienvenido!</h1>

        {error && <div style={styles.error}>{error}</div>}

        {usuario && (
          <div style={styles.info}>
            <div style={styles.row}>
              <span style={styles.label}>👤 Nombre</span>
              <span style={styles.value}>{usuario.nombre}</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>📧 Email</span>
              <span style={styles.value}>{usuario.email}</span>
            </div>
            <div style={styles.row}>
              <span style={styles.label}>🔒 Estado</span>
              <span style={{...styles.value, color: '#375623', fontWeight: '700'}}>
                ✅ Autenticado
              </span>
            </div>
          </div>
        )}

        <button onClick={handleLogout} style={styles.button}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1F4E79 0%, #2E75B6 100%)',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    textAlign: 'center',
  },
  avatar: {
    width: '80px', height: '80px', borderRadius: '50%',
    background: '#1F4E79', color: '#fff',
    fontSize: '36px', fontWeight: '700',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 20px',
  },
  title: { color: '#1F4E79', marginBottom: '24px', fontSize: '26px' },
  error: {
    background: '#FCE4D6', color: '#C00000', padding: '12px',
    borderRadius: '8px', marginBottom: '16px', fontSize: '14px',
  },
  info: {
    background: '#F2F2F2', borderRadius: '12px',
    padding: '20px', marginBottom: '24px', textAlign: 'left',
  },
  row: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '10px 0',
    borderBottom: '1px solid #BDD7EE',
  },
  label: { color: '#666', fontSize: '14px' },
  value: { color: '#1F4E79', fontWeight: '600', fontSize: '14px' },
  button: {
    width: '100%', padding: '14px', background: '#C00000',
    color: '#fff', border: 'none', borderRadius: '8px',
    fontSize: '16px', fontWeight: '700', cursor: 'pointer',
  },
};