import React from 'react';
import LoginDevelopment from './LoginDevelopment'
import AuthProvider from '../../providers/AuthProvider'

export default function App() {
  return (
    <>
      <AuthProvider>

        <LoginDevelopment />
      </AuthProvider>
    </>
  )
}
