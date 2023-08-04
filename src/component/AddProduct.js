import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function AddProduct() {
    let navigate = useNavigate()
    const user = useSelector((state) => state.auth.user);
    const [categori, setCategories] = useState([])
    const [product, setProduct] = useState({
        name: '',
        description: "",
        image: "",
        price: '',
        producer_id: user.id,
        manufacturer_id: "1"

    })


    const {name, description, image, price, producer_id, manufacturer_id} = product;


   const onInpuChange =(e) => {
    setProduct({...product,[e.target.name]:e.target.value})
   }

   useEffect(() => {
    axios.get((`http://localhost:8081/manufacturer/`))
    .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    },[])

    const onSubmit = async (e) => {
        e.preventDefault()
        product.manufacturer_id = parseInt(product.manufacturer_id);
        product.producer_id = parseInt(product.producer_id);
        product.price = parseInt(product.price)

        try {
            await axios.post('http://localhost:8081/product/add', product)
        } catch (error) {
            console.log(error)
        }
        navigate("/user/product-management")
    }

  return (
    <div className='add-product'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4' >
                        Add Product
                    </h2>
                    <form onSubmit={(e) => onSubmit(e)}> 

                        <div className='mb-3'>
                            <label htmlFor='FullName' className='form-label text-left'>
                                Product Name
                            </label>
                            <input type={"text"} className='form-control' placeholder='Product name' name='name' value={name} onChange={(e) => onInpuChange(e)}/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Username' className='form-label text-left' >
                                Description
                            </label>
                            <input type={"text"} className='form-control' placeholder='Description' name='description' value={description} onChange={(e) => onInpuChange(e)}/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-label text-left'>
                                Link Image
                            </label>
                            <input type={"text"} className='form-control' placeholder='Link image' name='image' value={image}  onChange={(e) => onInpuChange(e)}/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-label text-left'>
                                Price
                            </label>
                            <input type={"text"} className='form-control' placeholder='price' name='price' value={price}  onChange={(e) => onInpuChange(e)}/>
                        </div>
                        <div className='mb-3'>
                            <label for="sel1" class="form-label">Manufacturer</label>
                            <select class="form-select" id="sel1" name="manufacturer_id" value={manufacturer_id}  onChange={(e) => onInpuChange(e)}>
                                {
                                    categori?.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>{item.name}</option>
                                        )
                                    })
                                }
                                
                            </select> 
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>ADD</button>
                        <Link  className='btn btn-outline-danger mx-2' to={"/user/product-management"}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default connect(null)(AddProduct);