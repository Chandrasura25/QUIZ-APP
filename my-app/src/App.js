import React from 'react';
import {Routes,Route,Navigate} from 'react-router-dom'
import './App.css';
import AddQuestion from './component/AddQuestion';
import AnswerQuest from './component/AnswerQuest';
import Contact from './component/Contact';
import Dashboard from './component/Dashboard';
import LandingPage from './component/LandingPage';
import Login from './component/Login';
import Page404 from './component/Page404';
import QuestCategory from './component/QuestCategory';
import QuestionPage from './component/QuestionPage';
import SignUp from './component/SignUp';
// import Timer from './component/Timer';
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
      <Route path='/dashboard' element={token?<Dashboard/> : <Navigate to='/login'/>} />
      <Route path='/todaysQ' element={<TodaysQuestion/>} />
      <Route path='/addQuest' element={<AddQuestion/>} />
      <Route path='/answerQuest' element={<AnswerQuest/>} />
      <Route path='/getquest' element={<QuestionPage/>} />
      <Route path="/questCategory" element={<QuestCategory/>} />
      <Route path="*" element={<Page404/>} />
    </Routes>
    </>
  );
}
export default App;