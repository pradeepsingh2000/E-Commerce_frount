import axios from "axios";
import { BASE_URL } from "../../Constants/constant";

const getToken = () => {
  return localStorage.getItem("token");
};

export async function getProfile() {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}/customer/account/profile`, {
      headers: {
        Authorization: token,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}
export async function updateProfile (data) {
  const token = getToken();
  try {
    const response = await axios.put(`${BASE_URL}/customer/account/editProfile`,data, {
      headers: {
        Authorization: token,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  }
  catch (error) {
    throw error;
  }

}

export async function changePassword(data){
  const token = getToken();
  try{
    const response = await axios.put(`${BASE_URL}/customer/account/changePassword`,data, {
      headers: {
        Authorization: token,
      },
    });
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
// axios.post("http://localhost:10000/customer/products/createOrder", {
//       items: [{ id: "xl-tshirt" }],
//     }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json', // Specify the content type
//       },
//     })
//     .then((response) => {
//       setClientSecret(response.data.clientSecret);
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
//   }

