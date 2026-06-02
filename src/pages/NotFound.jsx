import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.code}>404</h1>
        <p style={styles.title}>Página no encontrada</p>
        <p style={styles.subtitle}>La ruta que buscas no existe.</p>
        <Link to="/login" style={styles.button}>Volver al inicio</Link>
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
    background: '#fff', borderRadius: '16px', padding: '60px 40px',
    width: '100%', maxWidth: '420px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)', textAlign: 'center',
  },
  code: { fontSize: '80px', color: '#1F4E79', margin: '0 0 8px' },
  title: { fontSize: '22px', color: '#333', fontWeight: '700', marginBottom: '8px' },
  subtitle: { color: '#666', marginBottom: '32px' },
  button: {
    display: 'inline-block', padding: '14px 32px', background: '#1F4E79',
    color: '#fff', borderRadius: '8px', textDecoration: 'none',
    fontWeight: '700', fontSize: '16px',
  },
};