import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axiosInstance'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('A két jelszó nem egyezik.')
      return
    }

    setIsSubmitting(true)
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      }
      await api.post('/users/reg', userData)
      navigate('/login', {
        replace: true,
        state: { notice: 'Sikeres regisztráció. Most már bejelentkezhetsz.' },
      })
    } catch (requestError) {
      setError(
        requestError.response?.data?.error ||
          'A regisztráció nem sikerült. Próbáld meg újra.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="page-section">
      <div className="auth-card">
        <h1>Regisztráció</h1>
        {error && (
          <p className="form-message form-message-error" role="alert">
            {error}
          </p>
        )}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="register-name">Teljes név</label>
            <input
              autoComplete="name"
              id="register-name"
              name="name"
              onChange={handleChange}
              required
              value={formData.name}
            />
          </div>
          <div className="form-field">
            <label htmlFor="register-email">E-mail-cím</label>
            <input
              autoComplete="email"
              id="register-email"
              name="email"
              onChange={handleChange}
              required
              type="email"
              value={formData.email}
            />
          </div>
          <div className="form-field">
            <label htmlFor="register-phone">Telefonszám (nem kötelező)</label>
            <input
              autoComplete="tel"
              id="register-phone"
              name="phone"
              onChange={handleChange}
              type="tel"
              value={formData.phone}
            />
          </div>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="register-password">Jelszó</label>
              <input
                autoComplete="new-password"
                id="register-password"
                name="password"
                onChange={handleChange}
                required
                type="password"
                value={formData.password}
              />
            </div>
            <div className="form-field">
              <label htmlFor="register-confirm-password">Jelszó újra</label>
              <input
                autoComplete="new-password"
                id="register-confirm-password"
                name="confirmPassword"
                onChange={handleChange}
                required
                type="password"
                value={formData.confirmPassword}
              />
            </div>
          </div>
          <button className="button button-primary" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Regisztráció…' : 'Fiók létrehozása'}
          </button>
        </form>
        <p className="auth-switch">
          Már van fiókod? <Link to="/login">Jelentkezz be</Link>
        </p>
      </div>
    </section>
  )
}
