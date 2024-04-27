import React, { useEffect, useState } from "react";
import "./addToCart.css";
import { RemoveFromCart, UpdateCartQuantity, getCartList, getwishCartNo } from "../../Services/Products/ProductsApi";
import Loader from "../../Components/Loader/loader";
import { BASE_URL } from "../../Constants/constant";
import { Button, IconButton, Rating } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useDispatch, useSelector } from "react-redux";
import { getCartWish } from "../../Redux/Auth/authSlice";
import { selectedLoggerInUser } from "../../Redux/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import AddAddress from "../../Components/Modals/addAddress";
export default function AddToCart() {
  const user = useSelector(selectedLoggerInUser);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState();
  const [quantity, setQuantity] = useState(1);
  const [refresh,setRefresh] = useState(false);
  const [open,setopen] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getCartList();
        if (response.status) {
          console.log(response.data);
          setWishlist(response.data[0]);
          setLoading(false);
          setRefresh(false);
          gettotalProductCost()
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [refresh]);

  useEffect(() => {
    const updateTotal = () => {
      if (wishlist && wishlist.length > 0) {
        gettotalProductCost();
      }
    };
    updateTotal();
  }, [wishlist]);

  const gettotalProductCost = () => {
    let total = 0;
  
    wishlist.forEach((e) => {
      total += e.totalPrice;
    });
  
    setGrandTotal(total);
  };

  const AddQuantity = async (id,price,qty) => {

    console.log(id,price,qty,'the data')
     let newqty = qty + 1;
     let totalPrice = price * newqty;
     const data ={
      id:id,
      quantity:newqty,
      totalPrice:totalPrice
     }

await UpdateCartQuantity(data).then(e=>{
  console.log(e)
  if(e.status)setRefresh(true)
})
  }
  const SubQuantity =async (id,price,qty) => {
   
    let newqty = qty -1;
    let totalPrice = price *newqty;
    const data ={
       id:id,
      quantity:newqty,
      totalPrice:totalPrice
    }
    await UpdateCartQuantity(data).then(e=>{
  console.log(e)
  if(e.status)setRefresh(true)
})

  }

  const handleConfirm = () =>{
    setopen(false)
    navigate('/stripe')
  }
  const removeFromCart = async (id) => {
    try {
      const response = await RemoveFromCart(id);
  
      if (response.status) {
        console.log('come in side')
        const cartResponse = await getwishCartNo(user.token);
        if(cartResponse.status) 
        {
          dispatch(getCartWish(cartResponse.data))
          setRefresh(true);
        }
      }
    } catch (error) {
      console.error(error);
      // Handle any errors here
    }
  };
  const handleClose = () =>{
    setopen(false)
  }


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
         <AddAddress open={open} handleClose ={handleClose} handleConfirm={handleConfirm}/>
          <section className="shopping-cart dark">
            <div className="container">
              <div className="block-heading">
                <h2>Shopping Cart</h2>
               
              </div>
              <div className="content">
                <div className="row">
                  <div className="col-md-12 col-lg-8">
                    <div className="items">
                      <div className="product">
                        {wishlist.map((item) => (
                          <div className="row">
                            <div className="col-md-3">
                              <img
                                className="img-fluid mx-auto d-block image"
                                src={`${BASE_URL}/${item.product.images}`}
                                alt={item.product.images[0]}
                              />
                            </div>

                            <div className="col-md-8">
                              <div className="info">
                                <div className="row">
                                  <div className="col-md-5 product-name">
                                    <div className="product-name">
                                      <div className="product-info">
                                        <div>
                                          Name:{" "}
                                          <span className="value">
                                            {item.product.name}
                                          </span>
                                        </div>
                                        <div>
                                          Brand:{" "}
                                          <span className="value">
                                            {item.product.brand}
                                          </span>
                                        </div>
                                        <div>
                                          Rating:{" "}
                                          <Rating
                                            precision={0.5}
                                            name="read-only"
                                            style={{ marginTop: "2px" }}
                                            readOnly
                                            value={item.product.totalrating}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <label htmlFor="quantity">Quantity:</label>

                                    <IconButton
                                      color="success"
                                      variant="contained"
                                    >
                                      <AddIcon  onClick ={(e) => {
                                        AddQuantity(item._id,item.product.price,item.quantity);
                                      }}/>
                                    </IconButton>

                                    {item.quantity}

                                    <IconButton
                                      color="error"
                                      disabled={item.quantity === 1}
                                      variant="contained"
                                    >
                                      <RemoveIcon  onClick ={(e) =>{
                                        SubQuantity(item._id,item.product.price,item.quantity);
                                      }} />
                                    </IconButton>
                                  </div>
                                  <div className="col-md-3 price">
                                    <span>Rs{item.totalPrice}</span>
                                  </div>
                                  <div className="col-md-6 mt-4 justify-content-end">
                                   <Button  variant="contained" color="error" onClick={(e)=>{removeFromCart(item._id)}} startIcon={<RemoveShoppingCartIcon/>}/>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-4">
                    <div className="summary">
                      <h3>Summary</h3>
                      <div className="summary-item">
                        <span className="text">Total Products</span>
                        <span className="price">{wishlist.length}</span>
                      </div>
                      <div className="summary-item">
                        <span className="text">Total</span>
                        <span className="price">{grandTotal}</span>
                      </div>
                      {/* <button
                        type="button"
                        className="btn btn-primary btn-lg btn-block"
                        onClick={() =>{
                          moveToStripe()
                        }}
                      >
                        Checkout
                      </button> */}
                      <button className="btn btn-primary" onClick={(e)=>{
                        setopen(true)
                      }}>
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
