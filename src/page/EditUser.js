import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
export default function EditUser() {
    let navigate = useNavigate()
    const {id} = useParams();
    const [user, setUsers] = useState({
        fullName: "",
        password: "",
        email: "",
        phoneNumber: "",
        sellId: "0",
        customerId: 1,
        adminId:"0",

    })

    useEffect(()=> {
        axios.get(`http://localhost:8081/user/${id}`)
          .then(response => {
            setUsers(response.data);
          })
          .catch(error => {
            console.error(error);
          });
    }, [])

    const {fullName, password, email, phoneNumber, sellId,customerId, adminId } = user
    

    const onInpuChange  =  (e) => {
        setUsers({...user,[e.target.name]:e.target.value})
       
    }



    const onSubmit = async (e) => {
        e.preventDefault()
        user.sellId = parseInt(user.sellId);
        user.adminId = parseInt(user.adminId);
        await axios.put(`http://localhost:8081/user/edit-user/${id}`, user)
        navigate("/admin/user-management");
        console.log(user)
    }
  return (
    <div className='edit-user'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4' >
                        Edit User
                    </h2>
                    <form onSubmit={(e) => onSubmit(e)}> 

                        <div className='mb-3'>
                            <label htmlFor='FullName' className='form-label text-left'>
                                Full Name
                            </label>
                            <input type={"text"} className='form-control' placeholder='Enter your full name' name='fullName' value={fullName} onChange={(e) => onInpuChange(e)}/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Username' className='form-label text-left' >
                                Email
                            </label>
                            <input type={"text"} className='form-control' placeholder='Enter your Email' name='email' value={email} onChange={(e) => onInpuChange(e)}/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-label text-left'>
                                Phone Number
                            </label>
                            <input type={"text"} className='form-control' placeholder='Enter your Phone number' name='phoneNumber' value={phoneNumber} onChange={(e) => onInpuChange(e)}/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-label text-left'>
                                Password
                            </label>
                            <input type={"text"} className='form-control' placeholder='Enter your Phone password' name='password' value={password} onChange={(e) => onInpuChange(e)}/>
                        </div>
                        <div className='mb-3'>
                            <label for="sel1" class="form-label">Admin Id</label>
                            <select class="form-select" id="sel1" name="adminId" value={adminId} onChange={(e) => onInpuChange(e)}>
                                <option>0</option>
                                <option>1</option>
                            </select> 
                        </div>
                        <div className='mb-3'>
                            <label for="sel1" class="form-label">Sell Id</label>
                            <select class="form-select" id="sel1" name="sellId" value={sellId} onChange={(e) => onInpuChange(e)}>
                                <option>0</option>
                                <option>1</option>
                            </select> 
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>Save</button>
                        <Link  className='btn btn-outline-danger mx-2' to={"/admin/user-management"}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
