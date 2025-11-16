import React, { useState } from 'react';
import './LoginForm.css';
import { FaGoogle, FaUser } from 'react-icons/fa'; 
import cineImage from '../../../assets/cine.jpg'; 

interface LoginFormProps {
  onToggle: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggle }) => {
  const [cedula, setCedula] = useState('');
  const [clave, setClave] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ajusta las rutas a las del backend cuando sea necesario
  const LOGIN_URL = '/api/auth/login';
  const GUEST_URL = '/api/auth/guest';
  const GOOGLE_AUTH_URL = '/api/auth/google';
  // --- Rutas / constantes ---
  // - LOGIN_URL: endpoint que valida credenciales y devuelve { token, user }
  // - GUEST_URL: endpoint opcional para crear sesión de invitado
  // - GOOGLE_AUTH_URL: ruta que inicia el flujo OAuth de Google (normalmente redirige)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

  // Validación básica en cliente
    if (!cedula.trim() || !clave.trim()) {
      setError('Por favor complete la cédula y la clave.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cedula, clave }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data?.message || 'Credenciales inválidas o error del servidor.';
        setError(msg);
        setLoading(false);
        return;
      }

      const data = await res.json();
      // Expecting { token, user }
      if (data?.token) {
        // For demo we store token in localStorage. Prefer httpOnly cookie in production.
        localStorage.setItem('authToken', data.token);
        // redirect to home or protected route
        window.location.href = '/';
      } else {
        setError('Respuesta inesperada del servidor.');
      }
    } catch (err) {
      setError('No se pudo conectar al servidor. Intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };
    // --- Handler: envío del formulario ---
    // Se espera un objeto con { token, user }
    // ---------- Almacenamiento del token ----------
    // Por simplicidad en este proyecto se guarda en localStorage.
    // En producción es preferible usar cookies httpOnly para proteger contra XSS.

  const handleGuest = async () => {
    setError(null);
    setLoading(true);
    try {
      // If you have a guest endpoint, call it. Otherwise simulate a guest token.
      const res = await fetch(GUEST_URL, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data?.token) {
          localStorage.setItem('authToken', data.token);
          window.location.href = '/';
          return;
        }
      }
      // fallback: simulate guest token
      localStorage.setItem('authToken', 'guest-token');
      window.location.href = '/';
    } catch (e) {
      // fallback simulation
      localStorage.setItem('authToken', 'guest-token');
      window.location.href = '/';
    } finally {
      setLoading(false);
    }
  };
    // --- Handler: entrar como invitado ---
    // Intentamos obtener un token de invitado desde el backend si existe
    // Si no existe endpoint de guest o falla, creamos un token simulado en cliente.
    // Esto permite continuar en modo demo; no es seguro para producción.

  const handleGoogle = () => {
    // Redirect to backend route that starts Google OAuth flow
    window.location.href = GOOGLE_AUTH_URL;
  };
    // --- Handler: iniciar OAuth con Google ---
    // Redirige a la ruta del backend que inicia el flujo OAuth de Google.
    // El backend debe manejar client_id/secret y redirecciones.

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-input-container">
            <label htmlFor="cedula">Cédula</label>
            <input
              type="text"
              id="cedula"
              className="login-input"
              placeholder="V-12.345.678"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              aria-label="Cédula"
            />
          </div>
          <div className="login-input-container">
            <label htmlFor="clave">Clave</label>
            <input
              type="password"
              id="clave"
              className="login-input"
              placeholder="Introduzca contraseña"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              aria-label="Clave"
            />
          </div>

          {error && <div className="login-error" role="alert">{error}</div>}

          <button className="login-btn login-btn-submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>

          <hr className="login-divider" />

          <button
            type="button"
            className="login-btn login-btn-guest"
            onClick={handleGuest}
            disabled={loading}
          >
            <FaUser /> Entrar como invitado
          </button>
          <button
            type="button"
            className="login-btn login-btn-google"
            onClick={handleGoogle}
            disabled={loading}
          >
            <FaGoogle /> Continuar con Google
          </button>
        </form>
        
        <p className="login-footer">
          ¿No tienes una cuenta?{' '}
          <button onClick={onToggle} type="button">Regístrate</button>
        </p>

        <p className="login-footer">
          <select className="language-selector">
            <option value="es-VE">Español (Venezuela)</option>
            <option value="en-US">English (United States)</option>            
          </select>
          {' | '}
          <a href="#">Cookies</a> | <a href="#">Términos</a> | <a href="#">Privacidad</a>
        </p>
      </div>
      <div className="login-background">
        <img src={cineImage} alt="Cine" />
      </div>
    </div>
  );
};

export default LoginForm;
