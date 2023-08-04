import React, { useEffect } from 'react'
import "./Navbar.scss"
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/actions/authActions'
import { connect, useDispatch } from 'react-redux';

function Navbar() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()
  
  const handleLogin =() => {
    navigate("/login")
  }

  const handleLogout =() => {
    dispatch(logoutSuccess())
    navigate("/login")
  }

  useEffect(() => {

  }, [user])
  console.log(user)
  return (
    <div className='Navbar'>
        <div className='task'>
            <Link to="/" className='name-store'>
                Shoe Store
            </Link>
            {
              user&& user.adminId !== null && user.adminId === 1 ? (<Link className="task-element" to="/admin/user-management" >User Management</Link>) : ""
            }
            {
              (user && user.sellId === 1  && user.sellId !== null) ? <Link className='task-element' to="/user/product-management">Product Management</Link>: ""
            }
            
            
        </div>
        <div className='log-in-out'>
            <div className='say-hello'>{user? `Hello ${user.fullName}!` :""}</div>
            {user ?
            <button 
            type="button" className="btn btn-danger"
            onClick={() => handleLogout()}>
              <span className="fa fa-sign-out-alt mr-2"></span>
              Logout
            </button>
            : 
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={() => handleLogin()}>
                <span className="fa fa-sign-in-alt mr-2"></span>
                Login
            </button>}
            
            
        </div>
    </div>
  )
}
export default connect(null, { logoutSuccess })(Navbar);
