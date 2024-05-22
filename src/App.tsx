import { FC } from 'react'
import './App.css'
import AppRouter from './components/AppRouter'
import Header from './components/Header'
import { useLocation } from 'react-router-dom'

export const App : FC = () => {
  const {pathname} = useLocation()
  const login = pathname === "/login"

  return (
    <div>
        {login ? null:<Header />}
        <AppRouter />
    </div>
  )
}