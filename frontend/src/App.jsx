import { Routes, Route, Navigate } from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import LandingPage from './LandingPage.jsx';
import ChatDemo from './components/views/chatdemo.jsx';
import AuthPage from './components/views/AuthPage.jsx';
import PageLoader from './components/PageLoader.jsx';
import { Toaster } from 'react-hot-toast';
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
        <Route path="/" element={authUser ? <Navigate to={"/chat"}/> : <LandingPage />}/>
        <Route path="/chat" element={authUser ?<ChatDemo /> : <Navigate to="/login" />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
      
      <Toaster/>
    </BrowserRouter>
  )
}

export default App