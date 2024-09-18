import React from 'react';
import SlotsSignIn from '../components/Login/SignIn';  // Dosya yolunu kontrol edin

const LoginPage = ({ onLogin }) => {  // onLogin props'u alınıyor
  return (
    <div>
      <h1>Giriş Sayfası</h1>
      <SlotsSignIn onLogin={onLogin} />  {/* onLogin fonksiyonu geçiliyor */}
    </div>
  );
};

export default LoginPage;