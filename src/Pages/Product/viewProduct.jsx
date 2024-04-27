import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addProductToCart, getProductById, getwishCartNo } from "../../Services/Products/ProductsApi";
import Loader from "../../Components/Loader/loader";
import { BACKEND_URL } from "../../Constants/constant";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import "./viewproduct.css";
import { Button, Paper, Rating } from "@mui/material";
import ReviewCard from "./reviewCards";
import { getCartWish, selectedLoggerInUser } from "../../Redux/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, SuccessMessage } from "../../helper/helper";
import AddAddress from "../../Components/Modals/addAddress";
export default function ViewProduct() {
  const { id } = useParams();
  const [loader, setloader] = useState(true);
  const [product, setProduct] = useState();
  const user = useSelector(selectedLoggerInUser)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const back =() =>{
    navigate('/products');
  }
  const AddToCart = async (id,price) =>{
    const data ={
      id:id,
      totalPrice:price
    }
    
    const response = await addProductToCart(data);
    if(response.status){
    SuccessMessage(response.message);
   await  getwishCartNo(user.token).then(e =>{
    console.log(e,'the add to cart')
    dispatch(getCartWish(e.data))
   })
   
    console.log(response.data,'the data')
    }
    else {
      ErrorMessage(response.message);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductById(id);
        setloader(true);
        if (response.status) {
          setProduct(response.data);
          setloader(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div>
            <AddAddress/>
          <div className="container mt-5 mb-5">
            <div className="row d-flex justify-content-center">
              <div className="col-md-10">
                <Paper>
                  <div className="card">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="images p-3">
                          <div
                            id="carouselExampleControls"
                            class="carousel slide"
                            data-bs-ride="carousel"
                          >
                            <div class="carousel-inner">
                              <div class="carousel-item active">
                                <img
                                  src={`${BACKEND_URL}/${product.images}`}
                                  class="d-block w-100"
                                  alt="..."
                                />
                              </div>
                              <div class="carousel-item">
                                <img
                                  src={`${BACKEND_URL}/${product.images}`}
                                  class="d-block w-100"
                                  alt="..."
                                />
                              </div>
                              <div class="carousel-item">
                                <img
                                  src={`${BACKEND_URL}/${product.images}`}
                                  class="d-block w-100"
                                  alt="..."
                                />
                              </div>
                            </div>
                            <button
                              class="carousel-control-prev"
                              type="button"
                              data-bs-target="#carouselExampleControls"
                              data-bs-slide="prev"
                            >
                              <span
                                class="carousel-control-prev-icon"
                                aria-hidden="true"
                              ></span>
                              <span class="visually-hidden">Previous</span>
                            </button>
                            <button
                              class="carousel-control-next"
                              type="button"
                              data-bs-target="#carouselExampleControls"
                              data-bs-slide="next"
                            >
                              <span
                                class="carousel-control-next-icon"
                                aria-hidden="true"
                              ></span>
                              <span class="visually-hidden">Next</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="product p-4">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <Button
                                variant="contained"
                                color="error"
                                onClick={()=>{
                                  back();
                                }}
                                startIcon={<ArrowBackIcon />}
                              >
                                Back
                              </Button>
                            </div>{" "}
                            <i className="fa fa-shopping-cart text-muted"></i>
                          </div>
                          <div className="mt-4 mb-3">
                            {" "}
                            <span className="text-uppercase text-muted brand">
                              {product.brand}
                            </span>
                            <h5 className="text-uppercase">{product.name}</h5>
                            <div className="price d-flex flex-row align-items-center">
                              {" "}
                              <span className="act-price">
                                {product.price} Rs
                              </span>
                            </div>
                            <div className="price d-flex flex-row align-items-center">
                              {" "}
                              <span>
                                <Rating
                                  precision={0.5}
                                  name="read-only"
                                  readOnly
                                  value={product.totalrating}
                                />
                              </span>
                            </div>
                          </div>
                          <p className="about">{product.description}</p>
                          <div className="sizes mt-5"></div>
                          <div className="cart mt-4 align-items-center">
                            {" "}
                            <Button
                              variant="contained"
                              color="success"
                              onClick={(e) => AddToCart(product._id,product.price)}
                              startIcon={<ShoppingCartIcon />}
                            >
                              Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Paper>
              </div>
            </div>
          </div>
          <>
          <h1 className="d-flex justify-content-center">Product Review</h1>
          {product.reviews && product.reviews[0] ? (
            
            <div className="reviews">
             
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
          </>
        
       
        </div>
      )}
    </>
  );
}
