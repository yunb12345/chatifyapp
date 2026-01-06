import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './LandingPage.jsx';
import ChatDemo from './components/views/chatdemo.jsx';
import AuthPage from './components/views/AuthPage.jsx';
import PageLoader from './components/PageLoader.jsx';

import { useAuthStore } from './store/useAuthStore.jsx';
import { useEffect } from 'react';

function App() {
  const {checkAuth, isCheckingAuth, authUser} = useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  if (isCheckingAuth) return <PageLoader/>
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={authUser ? <LandingPage /> : <Navigate to={"/login"}/>}/>
        <Route path="/chat" element={<ChatDemo />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App