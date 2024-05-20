import { FC } from 'react'
import './App.css'
import AppRouter from './components/AppRouter'
import Header from './components/Header'

export const App : FC = () => {
  return (
    <div>
        <Header />
        <AppRouter />
    </div>
  )
}
