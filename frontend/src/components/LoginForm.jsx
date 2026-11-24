import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import api from '../api/axiosInstance'

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await api.post('/users/login', formData)
      navigate('/profil', { replace: true })
    } catch (requestError) {
      setError(
        requestError.response?.data?.error ||
          'Nem sikerült bejelentkezni. Ellenőrizd az adatokat, majd próbáld újra.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="page-section">
      <div className="auth-card">
        <h1>Bejelentkezés</h1>
        {location.state?.notice && (
          <p className="form-message form-message-success" role="status">
            {location.state.notice}
          </p>
        )}
        {error && (
          <p className="form-message form-message-error" role="alert">
            {error}
          </p>
        )}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="login-email">E-mail-cím</label>
            <input
              autoComplete="email"
              id="login-email"
              name="email"
              onChange={handleChange}
              required
              type="email"
              value={formData.email}
            />
          </div>
          <div className="form-field">
            <label htmlFor="login-password">Jelszó</label>
            <input
              autoComplete="current-password"
              id="login-password"
              name="password"
              onChange={handleChange}
              required
              type="password"
              value={formData.password}
            />
          </div>
          <button className="button button-primary" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Bejelentkezés…' : 'Bejelentkezés'}
          </button>
        </form>
        <p className="auth-switch">
          Még nincs fiókod? <Link to="/register">Regisztrálj</Link>
        </p>
      </div>
    </section>
  )
}
