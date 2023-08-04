import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import axios from 'axios'
export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    useEffect(()=>{
        axios.get('http://localhost:8081/user/')
        .then(response => {
            setUsers(response.data);
            setIsDeleted(false)
          })
          .catch(error => {
            console.error(error);
          });
    }, [isDeleted])
    const handleDelete = ( id ) => {
        axios.delete(`http://localhost:8081/user/delete-user/${id}`)
        .then(response => {
            setIsDeleted(true);
        })
        .catch(error => {
             console.error(error);
    });
    }
  return (
    <div className='user-management' style={{paddingTop: "85px"}}>
        <Navbar />
        <Link className='btn btn-primary' to="/admin/add-user" style={{marginLeft: "100px"}}>ADD NEW USER</Link>
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Number</th> 
                        <th scope="col">Sell Id</th>
                        <th scope="col">Customer Id</th>
                        <th scope="col">Action</th> 
                    </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <th>1</th>
                            <td>Nguyễn Văn Việt</td>
                            <td>vanvietn73@gmail.com</td>
                            <td>0379514810</td>
                            <td>1</td>
                            <td>1</td>
                            <td>
                            <Link className='btn btn-outline-primary mx-2'  >Edit</Link>
                            <button className='btn btn-danger mx-2' >Delete</button>
                            </td>
                        </tr> */}
                    {users.map((item,index) => {
                        return (
                        <tr key={index}>
                            <th>{item.id}</th>
                            <td>{item.fullName}</td>
                            <td>{item.email}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.sellId}</td>
                            <td>{item.customerId}</td>
                            <td>
                            <Link className='btn btn-outline-primary mx-2' to={`/admin/edit-user/${item.id}`} >Edit</Link>
                            <button className='btn btn-danger mx-2' onClick={()=> handleDelete(item.id)} >Delete</button>
                            </td>


                            {/* <td>
                            <button className='btn btn-primary mx-2'>View</button>
                            <Link className='btn btn-outline-primary mx-2' to={`/edituser/${item.id}`} >Edit</Link>
                            <button className='btn btn-danger mx-2' onClick={() => handleClick(item.id)}>Delete</button>
                            </td> */}
                        </tr>
                        )
                    })} 
                    
                    
                    </tbody>
                </table> 
            </div>
        </div>
    </div>   
  )
}
