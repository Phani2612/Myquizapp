import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import routes from './routes/Route'
import Login from './UserFlow/Login'
import Signup from './UserFlow/Signup'
import { SnackbarProvider } from 'notistack';
import Home from './Components/Home';
import Quiz from './Components/Quiz'
import { AuthProvider } from './Auth/Auth';
import PrivateRoute from './Auth/PrivateRoute';
import ScoreModal from './Components/Scoreboard';


function App() {
  return (
   <SnackbarProvider  maxSnack={1}  anchorOrigin={{

      vertical : 'top',
      horizontal : 'right'
   }}>
     <AuthProvider>
     <Router>

<div>

  <Routes>

    <Route path='/' element={<Login />}></Route>
    <Route path='/signup' element = {<Signup/>} ></Route>
    <Route path='/home' element = {<PrivateRoute><Home/></PrivateRoute>} ></Route>
    <Route  path='/quiz/:id' element={<PrivateRoute><Quiz/></PrivateRoute>} ></Route>


    
 


  </Routes>

</div>

</Router>
     </AuthProvider>
   </SnackbarProvider>
  )
}

export default App