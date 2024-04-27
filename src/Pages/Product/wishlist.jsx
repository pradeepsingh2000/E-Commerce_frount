import React, { useEffect, useState } from "react";
import {
  RemoveFromWish,
  addProductToCart,
  getWishList,
  getwishCartNo,
} from "../../Services/Products/ProductsApi";
import Loader from "../../Components/Loader/loader";
import { BASE_URL } from "../../Constants/constant";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ErrorMessage, SuccessMessage } from "../../helper/helper";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { getCartWish, selectedLoggerInUser } from "../../Redux/Auth/authSlice";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState();
  const [loading, setLoading] = useState(true);
  const [refresh, setrefresh] = useState(true);
  const navigate = useNavigate();
  const user = useSelector(selectedLoggerInUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (refresh) {
      async function fetchData() {
        try {
          setLoading(true);
          const response = await getWishList();
          if (response.status) {
            setWishlist(response.data);
            setLoading(false);
            setrefresh(false);
          }
        } catch (error) {
          console.error(error);
        }
      }

      fetchData();
    }
  }, [refresh]);

  const AddToCart = async (id, price) => {
    const data = {
      id: id,
      totalPrice: price,
    };

    const response = await addProductToCart(data);
    if (response.status) {
      SuccessMessage(response.message);
      await getwishCartNo(user.token).then((e) => {
        console.log(e, "the add to cart");
        dispatch(getCartWish(e.data));
      });

      console.log(response.data, "the data");
    } else {
      ErrorMessage(response.message);
    }
  };

  const RemoveWish = async (id) => {
    try {
      const r = await RemoveFromWish(id);

      if (r.status) {
        SuccessMessage(r.message);

        const e = await getwishCartNo(user.token);

        console.log(e, "the add to cart");
        dispatch(getCartWish(e.data));
        setrefresh(true);
      } else {
        ErrorMessage(r.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const gotoview =  (id) =>{
	alert("HEKKO")
	console.log("GOO HERE")
navigate(`viewproducts/${id}`)
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="cart-wrap">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="main-heading mb-10">My wishlist</div>
                <div className="table-wishlist">
                  <table
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    width="100%"
                  >
                    <thead>
                      <tr>
                        <th width="45%">Product Name</th>
                        <th width="15%">Unit Price</th>
                        <th width="15%">Stock Status</th>
                        <th width="15%">Action</th>
                        <th width="10%"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlist.map((item, index) => (
                        <tr key={index}>
                          <td width="45%">
                            <div className="display-flex align-center">
                              <div className="img-product">
                                <img
                                  src={`${BASE_URL}/${item.product.images[0]}`}
                                  alt=""
                                  style={{ height: "100px" }}
                                />
                              </div>
                              <div className="name-product">
                                {item.product.name}
                              </div>
                            </div>
                          </td>
                          <td width="15%" className="price">
                            Rs {item.product.price}
                          </td>
                          <td width="15%">
                            <span className="in-stock-box">
                              {item.product.quantity
                                ? "In Stock"
                                : "Out of Stock"}
                            </span>
                          </td>
                          <td width="15">
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Button
                                variant="outlined"
                                onClick={() =>
                                  user.token
                                    ? AddToCart(
                                        item.product._id,
                                        item.product.price
                                      )
                                    : ErrorMessage("Login First")
                                }
                                startIcon={<ShoppingCartIcon />}
                              >
                                Cart
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                sx={{ m: 1 }}
                                onClick={(e) => {
                                  RemoveWish(item._id);
                                }}
                                startIcon={<HeartBrokenIcon />}
                              >
                                Remove
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<RemoveRedEyeIcon />}
								onClick={(e) =>{
									console.log("hit")
									navigate(`/viewproducts/${item.productId}`)
								}}
                              >
                                View
                              </Button>
	

                            </div>
                          </td>

                          <td width="10%" className="text-center">
                            <a href="#" className="trash-icon">
                              <i className="far fa-trash-alt"></i>
                            </a>
                          </td>
                        </tr>
                      ))}
                      {/* <tr>
					        		<td width="45%">
					        			<div className="display-flex align-center">
		                                    <div className="img-product">
		                                        <img src="https://www.91-img.com/pictures/laptops/asus/asus-x552cl-sx019d-core-i3-3rd-gen-4-gb-500-gb-dos-1-gb-61721-large-1.jpg" alt="" className="mCS_img_loaded"/>
		                                    </div>
		                                    <div className="name-product">
		                                        Apple iPad Mini
		                                    </div>
	                                    </div>
	                                </td>
					        		<td width="15%" className="price">$110.00</td>
					        		<td width="15%"><span className="in-stock-box">In Stock</span></td>
					        		<td width="15%"><button className="round-black-btn small-btn">Add to Cart</button></td>
					        		<td width="10%" className="text-center"><a href="#" className="trash-icon"><i className="far fa-trash-alt"></i></a></td>
					        	</tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
