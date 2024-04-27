import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  CardHeader,
  Grid,
  Pagination,
  Paper,
  Rating,
} from "@mui/material";
import Button from "@mui/material/Button";
import Select from "react-select";
import Typography from "@mui/material/Typography";
import {
  addProductToCart,
  addProductToWish,
  getAllProduct,
  getwishCartNo,
} from "../../Services/Products/ProductsApi";
import Loader from "../../Components/Loader/loader";
import { BACKEND_URL } from "../../Constants/constant";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./product.css";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, SuccessMessage } from "../../helper/helper";
import { useDispatch, useSelector } from "react-redux";
import { getCartWish, selectedLoggerInUser } from "../../Redux/Auth/authSlice";
export default function Product() {
  const [page, setpage] = useState(1);
  const [total, settotal] = useState();
  const [limit, setlimit] = useState(10);
const [search,setsearch] = useState("");
const [category,setcategory] = useState("")
  const [loader, setloader] = useState(true);
  const [cardData, setcardData] = useState([]);
  const navigate = useNavigate();
  const user = useSelector(selectedLoggerInUser);
  const dispatch = useDispatch();
  console.log(user.token, "the token");
  const options = [
    { value: "Shirt", label: "Shirt" },
    { value: "Jeans", label: "Jeans" },
    { value: "T-shirt", label: "T-shirt" },
    { value: "Shoes", label: "Shoes" },
    { value: "Shorts", label: "Shorts" },
  ];

  const handlePageChange = (event, page) => {
    setpage(page);
  };

  const viewPage = (id) => {
    navigate(`/viewproducts/${id}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          limit: limit,
          page: page,
        };
        const response = await getAllProduct(data);
        setloader(true);
        if (response.status) {
          console.log(response.data.totalDocs, "(response.data.totalDocs");
          console.log(response.data);
          setcardData(response.data.docs);
          setpage(response.data.page);
          settotal(response.data.totalPages);
          // settotalPage(response.data.)
          setlimit(response.data.limit);
          setloader(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          limit: 10,
          page: 1,
          search:search
        };
        console.log("searchcall",)
        // Adding a delay of 1 second using setTimeout
        const delay = () => new Promise(resolve => setTimeout(resolve, 1000));
        await delay();
  
        const response = await getAllProduct(data);
        setloader(true);
  
        if (response.status) {
          console.log(response.data.totalDocs, "(response.data.totalDocs");
          console.log(response.data);
          setcardData(response.data.docs);
          setpage(response.data.page);
          settotal(response.data.totalPages);
          setlimit(response.data.limit);
          setloader(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [search]);
  

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


  const AddToWish = async (id) => {
    console.log(user.token, "the data");
    const response = await addProductToWish(id);
    if (response.status) {
      SuccessMessage(response.message);
      await getwishCartNo(user.token).then((e) => {
        console.log(e.data, "the add to cart");
        dispatch(getCartWish(e.data));
      });
      // dispatch(getCartWish(response.data))
    } else {
      ErrorMessage(response.message);
    }
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <Box sx={{ width: "100%", marginTop: "30px" }}>
              <div>
                <div className="search row mb-4">
                  <div className="col-5"></div>
                  <div className="col-3">
                  <input
                    type="text"
                    aria-label="First name"
                    placeholder="Search.."
                    onChange={(e)=>{setsearch(e.target.value)}}
                    className="searchbtn"
                  />
                  </div>
                  <div className="col-3">
              
                  </div>
            
                 
                </div>
              </div>
              <Grid container spacing={3}>
                {cardData.map((card) => (
                  <Grid item xs={6} md={4}>
                    <div className="card">
                      <div className="d-flex justify-content-between p-3">
                        <p className="lead mb-0">{card.brand}</p>
                        <div className="d-flex  justify-content-center ">
                          <VisibilityIcon
                            color="secondary"
                            onClick={() => {
                              viewPage(card._id);
                            }}
                          />
                        </div>
                      </div>
                      <img
                        src={`${BACKEND_URL}/${card.images}`}
                        className="card-img-top"
                        alt="Laptop"
                      />
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-3">
                          <h5 className="mb-0">{card.name}</h5>
                          <h5 className="text-dark mb-0">Rs.{card.price}</h5>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                          <p className="text-muted mb-0">
                            Available:{" "}
                            <span className="fw-bold">{card.price}</span>
                          </p>
                          <div className="ms-auto text-warning">
                            <Rating
                              value={card.totalrating}
                              name="read-only"
                              readOnly
                              precision={0.5}
                            />
                          </div>
                        </div>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            variant="outlined"
                            sx={{ m: 1 }}
                            onClick={() =>
                              user.token
                                ? AddToCart(card._id, card.price)
                                : ErrorMessage("Login First")
                            }
                            startIcon={<ShoppingCartIcon />}
                          >
                            Cart
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() =>
                              user.token
                                ? AddToWish(card._id)
                                : ErrorMessage("Login First")
                            }
                            sx={{ m: 1 }}
                            endIcon={<FavoriteBorderOutlinedIcon />}
                          >
                            Wish
                          </Button>
                        </Box>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </div>
          <Pagination
            count={total}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </>
      )}
    </>
  );
}
