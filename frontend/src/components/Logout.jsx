import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axiosInstance'

export default function Logout() {
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  async function handleLogout() {
    setError('')
    setIsSubmitting(true)

    try {
      await api.post('/users/logout')
      navigate('/', {
        replace: true,
        state: { notice: 'Sikeresen kijelentkeztél.' },
      })
    } catch (requestError) {
      setError(
        requestError.response?.data?.error ||
          'Nem sikerült kijelentkezni. Próbáld meg újra.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="page-section">
      <div className="auth-card">
        <h1>Kijelentkezés</h1>
        {error && (
          <p className="form-message form-message-error" role="alert">
            {error}
          </p>
        )}
        <div className="logout-actions">
          <button
            className="button button-primary"
            disabled={isSubmitting}
            onClick={handleLogout}
            type="button"
          >
            {isSubmitting ? 'Kijelentkezés…' : 'Kijelentkezem'}
          </button>
          <Link className="button button-secondary" to="/">
            Mégsem
          </Link>
        </div>
      </div>
    </section>
  )
}
