import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const userLinks = [
  { label: 'Regisztráció', to: '/register' },
  { label: 'Bejelentkezés', to: '/login' },
  { label: 'Kijelentkezés', to: '/logout' },
  { label: 'Profil', to: '/profil' },
]

export default function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  function closeMenu() {
    setIsUserMenuOpen(false)
  }

  return (
    <header className="site-header">
      <h3>HomeProjekt - Molnár Marcell</h3>
      <div className="header-inner">
        <nav aria-label="Fő navigáció" className="main-nav">
          <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end to="/">
            Főoldal
          </NavLink>
          <div className="user-menu">
            <button
              aria-controls="user-menu-panel"
              aria-expanded={isUserMenuOpen}
              className="nav-menu-trigger"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              type="button"
            >
              Felhasználó
              <span aria-hidden="true" className="menu-chevron">
                {isUserMenuOpen ? '▲' : '▼'}
              </span>
            </button>
            {isUserMenuOpen && (
              <div className="user-menu-panel" id="user-menu-panel">
                {userLinks.map((item) => (
                  <NavLink
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                    key={item.to}
                    onClick={closeMenu}
                    to={item.to}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
