import React, {useState, useEffect} from 'react'
import Navbar from '../layout/Navbar'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';

function ProductMangement() {

  const user = useSelector((state) => state.auth.user);
  const [products, setProducts] = useState([])
  useEffect(() => {
    axios.get((`http://localhost:8081/product/`))
    .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  },[])

  console.log("product: ",products)
  console.log("user: ", user)

  let productByUser = [];
  if(products) {
    products.forEach(element => {
      if(parseInt(element.producer_id) === user.id )
      {
        productByUser.push(element)
      }
    });

  }

  console.log(productByUser)
  const handleEdit = (id) => {

  }

  return (
    <div className='product-management' style={{paddingTop: "85px"}}>
      <Navbar />
      <Link className='btn btn-primary' to="/sell/add-product" style={{marginLeft: "100px"}}>ADD PRODUCT</Link>
      <div className='product-management-container' style={{margin: "0 100px"}}> 
        <table class="table align-middle mb-0 bg-white">
          <thead class="bg-light">
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              productByUser?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div class="d-inline-flex align-items-center">
                        <img
                            src={item.image}
                            alt=""
                            style={{width: "100px", height: "100px"}}
                            class="square-image"
                            />
                        <div class="ms-3">
                          <p class="fw-bold mb-1">{item.name}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class="fw-normal mb-1">{item.description}</p>
                    </td>
                    <td>${item.price}</td>
                    <td className='col-2'>
                    <Link className='btn btn-outline-primary mx-2' to={`/sell/edit-product/${item.id}`}>Edit</Link>
                    <button className='btn btn-danger mx-2' >Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default connect(null)(ProductMangement);