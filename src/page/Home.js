import React, { useEffect, useState } from 'react'
import "./Home.scss"
import Navbar from "../layout/Navbar"
import Footer from "../layout/Footer"
import axios from 'axios'
export default function Home() {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get((`http://localhost:8081/manufacturer/`))
        .then(response => {
            setCategories(response.data);
          })
          .catch(error => {
            console.error(error);
          });

        axios.get((`http://localhost:8081/product/`))
        .then(response => {
            setProducts(response.data);
          })
          .catch(error => {
            console.error(error);
          });


    },[])

    console.log("categori" ,products)

  return (
    <div className='home'>
        <Navbar />
      <div className="container">
            <div className="row">
                <div className="col-lg-3">
                    <div className="list-group">
                        {
                            categories?.map((item, index) => {
                                return(
                                    <div 
                                        className="list-group-item" 
                                        key={index}>
                                        {item.name}
                                    </div>
                                )

                            })
                        }
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="row">
                        {
                            products && products.map((item, index) =>{
                                return (
                                    <div className="col-lg-4 col-md-6 mb-4" key={index}>
                                        <div className="card h-100">
                                            <a><img className="card-img-top" src={item.image} alt="..." /></a>
                                            <div className="card-body">
                                                <h4 className="card-title"><a >{item.name}</a></h4>
                                                <h5>${item.price}</h5>
                                                <p className="card-text">{item.description}</p>
                                            </div>
                                            <div className="buy card-footer tex d-flex justify-content-center"><small className="font-weight-bold">BUY NOW</small></div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}
