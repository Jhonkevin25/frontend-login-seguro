import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [usuario, setUsuario] = useState(null);
  const [nombre, setNombre] = useState('');
  const [contrasenaActual, setContrasenaActual] = useState('');
  const [contrasenaNueva, setContrasenaNueva] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [loading, setLoading] = useState(false);
  const [editando, setEditando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');

    if (!token) { navigate('/login'); return; }
    if (usuarioGuardado) {
      const u = JSON.parse(usuarioGuardado);
      setUsuario(u);
      setNombre(u.nombre);
    }

    fetch('http://localhost:3000/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.mensaje === 'Perfil obtenido correctamente') {
          setUsuario(prev => ({ ...prev, ...data.usuario }));
          setNombre(data.usuario.nombre || '');
        }
      })
      .catch(() => setError('Error al conectar con el servidor'));
  }, [navigate]);

  const handleActualizar = async (e) => {
    e.preventDefault();
    setError(''); setExito(''); setLoading(true);

    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:3000/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, contrasenaActual, contrasenaNueva }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.mensaje); return; }

      setExito('¡Perfil actualizado correctamente!');
      setUsuario(data.usuario);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      setContrasenaActual(''); setContrasenaNueva('');
      setEditando(false);

    } catch (_err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

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
        {exito && <div style={styles.exito}>{exito}</div>}

        {!editando ? (
          <>
            <div style={styles.info}>
              <div style={styles.row}>
                <span style={styles.label}>👤 Nombre</span>
                <span style={styles.value}>{usuario?.nombre}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>📧 Email</span>
                <span style={styles.value}>{usuario?.email}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>🔒 Estado</span>
                <span style={{ ...styles.value, color: '#375623', fontWeight: '700' }}>
                  ✅ Autenticado
                </span>
              </div>
            </div>

            <button onClick={() => setEditando(true)} style={styles.btnEditar}>
              ✏️ Editar Perfil
            </button>
            <button onClick={handleLogout} style={styles.btnCerrar}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          <form onSubmit={handleActualizar}>
            <div style={styles.field}>
              <label style={styles.labelForm}>Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.labelForm}>Contraseña actual</label>
              <input
                type="password"
                value={contrasenaActual}
                onChange={e => setContrasenaActual(e.target.value)}
                style={styles.input}
                placeholder="Solo si quieres cambiarla"
              />
            </div>

            <div style={styles.field}>
              <label style={styles.labelForm}>Nueva contraseña</label>
              <input
                type="password"
                value={contrasenaNueva}
                onChange={e => setContrasenaNueva(e.target.value)}
                style={styles.input}
                placeholder="Mín. 8 caracteres"
              />
            </div>

            <button type="submit" style={styles.btnEditar} disabled={loading}>
              {loading ? 'Guardando...' : '💾 Guardar Cambios'}
            </button>
            <button type="button" onClick={() => { setEditando(false); setError(''); }} style={styles.btnCerrar}>
              Cancelar
            </button>
          </form>
        )}
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
    width: '100%', maxWidth: '420px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)', textAlign: 'center',
  },
  avatar: {
    width: '80px', height: '80px', borderRadius: '50%',
    background: '#1F4E79', color: '#fff', fontSize: '36px', fontWeight: '700',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 20px',
  },
  title: { color: '#1F4E79', marginBottom: '24px', fontSize: '26px' },
  error: {
    background: '#FCE4D6', color: '#C00000', padding: '12px',
    borderRadius: '8px', marginBottom: '16px', fontSize: '14px',
  },
  exito: {
    background: '#E2EFDA', color: '#375623', padding: '12px',
    borderRadius: '8px', marginBottom: '16px', fontSize: '14px',
  },
  info: {
    background: '#F2F2F2', borderRadius: '12px',
    padding: '20px', marginBottom: '20px', textAlign: 'left',
  },
  row: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '10px 0',
    borderBottom: '1px solid #BDD7EE',
  },
  label: { color: '#666', fontSize: '14px' },
  value: { color: '#1F4E79', fontWeight: '600', fontSize: '14px' },
  field: { marginBottom: '16px', textAlign: 'left' },
  labelForm: { display: 'block', marginBottom: '6px', color: '#333', fontWeight: '600', fontSize: '14px' },
  input: {
    width: '100%', padding: '12px', borderRadius: '8px',
    border: '2px solid #BDD7EE', fontSize: '15px',
    outline: 'none', boxSizing: 'border-box',
  },
  btnEditar: {
    width: '100%', padding: '14px', background: '#1F4E79',
    color: '#fff', border: 'none', borderRadius: '8px',
    fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginBottom: '10px',
  },
  btnCerrar: {
    width: '100%', padding: '14px', background: '#C00000',
    color: '#fff', border: 'none', borderRadius: '8px',
    fontSize: '16px', fontWeight: '700', cursor: 'pointer',
  },
};