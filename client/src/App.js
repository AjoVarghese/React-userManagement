import './App.css'
import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom'
import Signup from './Pages/User/Signup'
import Home from './Pages/User/Home';
import Profile from './Pages/User/Profile';
import Login from './Pages/User/Login';
import AdminHome from './Pages/Admin/Home'
import AdminLogin from './Pages/Admin/Login'
import Edit from './Pages/Admin/Edit';
 
function App() {
  const userdata = JSON.parse(localStorage.getItem('userInfo'))
  const adminInfo=localStorage.getItem('adminInfo')
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/signup'  element={ <Signup/>}/>
          <Route exact path='/profile' element={<Profile/>}/>
          <Route exact path='/admin/' element={adminInfo?<AdminHome/>:<Navigate to={'../adminlogin'}/>}/>
          <Route exact path='/adminlogin' element={<AdminLogin/>}/>
          <Route  path='/edit-user' element={<Edit/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
