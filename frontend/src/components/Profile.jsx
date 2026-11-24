import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axiosInstance'

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadProfile() {
      try {
        const response = await api.get('/users/profil')
        if (isMounted) {
          setProfile(response.data)
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError.response?.data?.error ||
              'A profil betöltése nem sikerült. Jelentkezz be, majd próbáld újra.',
          )
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadProfile()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="page-section">
      <div className="auth-card auth-card-wide">
        <h1>Profil</h1>
        {isLoading && (
          <p className="form-message form-message-info" role="status">
            Profil betöltése…
          </p>
        )}
        {error && (
          <>
            <p className="form-message form-message-error" role="alert">
              {error}
            </p>
            <p className="auth-switch">
              <Link to="/login">Tovább a bejelentkezéshez</Link>
            </p>
          </>
        )}
        {profile && (
          <dl className="profile-list">
            <div className="profile-row">
              <dt>Név</dt>
              <dd>{profile.name || 'Nincs megadva'}</dd>
            </div>
            <div className="profile-row">
              <dt>E-mail-cím</dt>
              <dd>{profile.email || 'Nincs megadva'}</dd>
            </div>
            <div className="profile-row">
              <dt>Telefonszám</dt>
              <dd>{profile.phone || 'Nincs megadva'}</dd>
            </div>
          </dl>
        )}
      </div>
    </section>
  )
}
