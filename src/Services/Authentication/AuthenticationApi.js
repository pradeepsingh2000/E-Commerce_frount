import axios from "axios";
import { BASE_URL } from "../../Constants/constant";

export async function login(data) {
  try {
    const response = await axios.post(`${BASE_URL}/customer/auth/login`, data);
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
    throw error;
  }
}

export async function registerUser(data) {
  try {
    const response = await axios.post(
      `${BASE_URL}/customer/auth/register`,
      data
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

export async function verifyOTP(email,otp) {
  try {
    const response = await axios.post(`${BASE_URL}/customer/auth/verifyOtp`, {
      email,otp,
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
