import React from 'react';
import {Routes,Route,Navigate} from 'react-router-dom'
import './App.css';
import AddQuestion from './component/AddQuestion';
import Contact from './component/Contact';
import Dashboard from './component/Dashboard';
import LandingPage from './component/LandingPage';
import Login from './component/Login';
import Page404 from './component/Page404';
import SignUp from './component/SignUp';
import Timer from './component/Timer';
import TodaysQuestion from './component/TodaysQuestion';
function App() {
  const token = localStorage.token;

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/home' element={<Navigate to='/home'/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/contact' element={<Contact/>}/>
      {/* <Route path='/time' element={<Timer/>} /> */}
      <Route path='/dashboard' element={token?<Dashboard/> : <Navigate to='/login'/>} />
      <Route path='/todaysQ' element={<TodaysQuestion/>} />
      <Route path='/addQuest' element={<AddQuestion/>} />
      <Route path="*" element={<Page404/>} />
    </Routes>
    </>
  );
}
export default App;