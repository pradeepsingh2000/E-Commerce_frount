import axios from "axios";
import { BASE_URL } from "../../Constants/constant";


 const getToken = ()  =>{
  return localStorage.getItem('token');
 }

export async function   getAllProduct(data) { 
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/products/getproduct?limit=${data.limit}&page=${data.page}&search=${data.search}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export async function getProductById(id) {
  try {

    const response = await axios.get(
      `${BASE_URL}/customer/products/getProductById/${id}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
}

export async function addProductToCart(data) {
try{
  const token = getToken()
  const response = await axios.post(
    `${BASE_URL}/customer/products/addToCart`,
    data,
    {
      headers: {
        Authorization:token,
      },
    }
  );
  if (response.status === 200) {
    return response.data;
  } else {
    return response.data;
  }
}catch (err) {
  console.log(err);
  return err.response.data;
}
}

export async function addProductToWish(id) {
  try{
    const token = getToken()
    const response = await axios.post(
      `${BASE_URL}/customer/products/addToWishlist/${id}`,
      {},
      {
        headers: {
          Authorization:token,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }   
    else {
      return response.data;
    }
  }catch (err) {
    console.log(err);
    return err.response.data;
  }
}

export async function getwishCartNo(token) {

  try{

  const response = await axios.get(
    `${BASE_URL}/customer/products/getCartWish`,
    {
      headers: {
        Authorization: token,
      },
    }
  )
   
    if (response.status === 200) {
      return response.data;
    }   
    else {
      return response.data;
    }
  }
  catch (err) {
    return err.response.data;
  }
}

export async function getWishList() {
  try{
      const token =  getToken()
    const response = await axios.get(
      `${BASE_URL}/customer/products/getWishlist`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
     
      if (response.status === 200) {
        return response.data;
      }   
      else {
        return response.data;
      }
    }
    catch (err) {
      return err.response.data;
    }
}

export async function getCartList() {
  try{
      const token =  getToken()
    const response = await axios.get(
      `${BASE_URL}/customer/products/getCartData`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
     
      if (response.status === 200) {
        return response.data;
      }   
      else {
        return response.data;
      }
    }
    catch (err) {
      return err.response.data;
    }
}

export async function UpdateCartQuantity(data) {
  try{
    const token =  getToken()
  const response = await axios.post(
    `${BASE_URL}/customer/products/updateCartQuantity`,
    data,
    {
      headers: {
        Authorization: token,
      },
    }
  )
   
    if (response.status === 200) {
      return response.data;
    }   
    else {
      return response.data;
    }
  }
  catch (err) {
    return err.response.data;
  }
}

export async function RemoveFromCart (id) {
  try{
    const token =  getToken()
  const response = await axios.delete(
    `${BASE_URL}/customer/products/removeToCart/${id}`,
    {
      headers: {
        Authorization: token,
      },
    }
  )
   
    if (response.status === 200) {
      return response.data;
    }   
    else {
      return response.data;
    }
  }
  catch (err) {
    return err.response.data;
  }
}

export async function RemoveFromWish(id) {
  try{
    const token =  getToken()
  const response = await axios.delete(
    `${BASE_URL}/customer/products/removeToWish/${id}`,
    {
      headers: {
        Authorization: token,
      },
    }
  )
   
    if (response.status === 200) {
      return response.data;
    }   
    else {
      return response.data;
    }
  }
  catch (err) {
    return err.response.data;
  }
}