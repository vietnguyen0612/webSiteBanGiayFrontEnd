import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { loginSuccess } from '../redux/actions/authActions'
import { connect, useDispatch } from 'react-redux';
function Login() {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [userLogin, setUserLogin] = useState({})
  const [loginFail, setLoginFail] = useState(false)
  const [user, setUsers] = useState({
    password: "",
    email: "",
  })
  const {password, email } = user

  const onChangeInput = (e) => {
    setUsers({...user,[e.target.name]:e.target.value})
  }
  const handleLogin = async () => {

    let userLoginResult = await axios.post(`http://localhost:8081/user/user-login`, user)
    

    if(userLoginResult.data !==  null && userLoginResult.data !== "" ){
      setUserLogin(userLoginResult.data)
      navigate("/")
      dispatch(loginSuccess(userLoginResult.data)); // Lưu thông tin người dùng vào Redux store
    }else {
      setLoginFail(true)
    }

    
  };
  
  useEffect(()=> {
    
  },[loginFail])

  return (
    <div className='login'>
        <section className="vh-100">
  <div className="container-fluid">
    <div className="row">
      <div className="col-sm-6 text-black">

        <div className="px-5 ms-xl-4">
          <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{color: "#709085"}}></i>
          <span className="h1 fw-bold mb-0">Shoe store</span>
        </div>

        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

          <form style={{width: "23rem"}}>

            <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}} >Log in</h3>

            <div className="form-outline mb-4">
              <input type="email" id="form2Example18" className="form-control form-control-lg" name='email' value={email} onChange={(e) => onChangeInput(e)} />
              <label className="form-label" for="form2Example18" style={loginFail ?{color: "red"}: {}}>{loginFail ? `Enter your email`: `Email address`}</label>
            </div>

            <div className="form-outline mb-4">
              <input type="password" id="form2Example28" className="form-control form-control-lg" name='password' value={password} onChange={(e) => onChangeInput(e)}/>
              <label className="form-label" for="form2Example28" style={loginFail ?{color: "red"}: {}}>{loginFail ? `Enter your Password`: `Password`}</label>
            </div>

            <div className="pt-1 mb-4">
              <button className="btn btn-info btn-lg btn-block" type="button" onClick={()=> handleLogin()}>Login</button>
            </div>

            <p>Don't have an account? <Link to="/sign-up" className="link-info">Register here</Link></p>

          </form>

        </div>

      </div>
      <div className="col-sm-6 px-0 d-none d-sm-block">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
          alt="Login image" className="w-100 vh-100" style={{objectFit: "cover", objectPosition: "left"}}/>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}


export default connect(null, { loginSuccess })(Login);