import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loginSuccess } from '../redux/actions/authActions'
import { connect, useDispatch } from 'react-redux';

function SignUp() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUsers] = useState({
    fullName: "",
    password: "",
    email: "",
    phoneNumber: "",
    sellId: "0",
    customerId: 1,
    adminId:"0",
  })

  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPassword, setIsPassword] = useState(true)
  
  const {fullName, password, email, phoneNumber, sellId,customerId, adminId } = user

  const onChangeInput = (e) =>  {
    setUsers({...user,[e.target.name]:e.target.value})
  }
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleBlur = (e) => {
    if(e.target.value !== password) {
      setIsPassword(false)
    } else  {
      setIsPassword(true)
    }
  }

  const onSubmitRegiter = async () => {
    user.sellId = parseInt(user.sellId);
    user.adminId = parseInt(user.adminId);

    if(isPassword) {
      await axios.post("http://localhost:8081/user/add", user)

      let userLogin = {
        email: user.email,
        password: user.password
      }

      let userLoginResult = await axios.post(`http://localhost:8081/user/user-login`, userLogin)
      if(userLoginResult.data !==  null && userLoginResult.data !== "" ){
        
        
        dispatch(loginSuccess(userLoginResult.data)); // Lưu thông tin người dùng vào Redux store
        navigate("/")
      }

      // navigate("/login");

    }

    console.log(user)
  }
  return (
    <div className='sign-up'>
        <section className="vh-100" style={{backgroundColor: "#eee"}}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{borderRadius: "25px"}} >
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                        <form className="mx-1 mx-md-4">

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input type="text" id="form3Example1c" className="form-control" name='fullName' value={fullName} onChange={(e)=> onChangeInput(e)} />
                              <label className="form-label" for="form3Example1c">Full Name</label>
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input type="email" id="form3Example3c" className="form-control" name="email" value={email} onChange={(e) => onChangeInput(e)} />
                              <label className="form-label" for="form3Example3c">Your Email</label>
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input type="text" id="form3Example4c" className="form-control" name='phoneNumber' value={phoneNumber} onChange={(e) => onChangeInput(e)} />
                              <label className="form-label" for="form3Example4c">Phone Number</label>
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input type="password" id="form3Example4" className="form-control" name='password' value={password}  onChange={(e) => onChangeInput(e)} />
                              <label className="form-label" for="form3Example4">Password</label>
                            </div>
                          </div>


                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input 
                                type="password" 
                                id="form3Example4cd" 
                                className="form-control" 
                                name='confirmPassword' value={confirmPassword} 
                                onChange={(e) => onChangeConfirmPassword(e)} 
                                onBlur={(e) => handleBlur(e)} />
                              <label className="form-label" for="form3Example4cd" style={ !isPassword ? {color: "red"}:{} }>Confirm Password</label>
                            </div>
                          </div>

                          <div className="form-check d-flex justify-content-center mb-5">
                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                            <label className="form-check-label" for="form2Example3">
                              I agree all statements in <a href="#!">Terms of service</a>
                            </label>
                          </div>

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="button" className="btn btn-primary btn-lg" onClick={() => onSubmitRegiter()}>Register</button>
                          </div>

                        </form>

                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                          className="img-fluid" alt="Sample image"/>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}


export default connect(null, { loginSuccess })(SignUp);