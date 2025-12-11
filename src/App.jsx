import { useState } from 'react'
import './App.css'
import Counter from './easy/CounterPage' 
import HardPage from './hard/HardPage';
import MediumPage from './medium/MediumPage';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



function Header(){
  return (
    <BrowserRouter>
    <nav>
      <Link to="/easy">Easy</Link>
      <Link to="/medium">Medium</Link>
      <Link to="/hard">Hard</Link>
    </nav>
    

    <Routes>
      <Route path="/easy" element={<Counter/>}/>
      <Route path="/medium/*" element={<MediumPage/>}/>
      <Route path="/hard/*" element={<HardPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}


function App() {
  

  return (
    <>
     <Header></Header>
    </>
  )
}

export default App;
