import * as Yup from "yup";

export const loginFormik = Yup.object({
    email:Yup.string().email().required("Please enter your Email"),
   password:Yup.string().required("Please enter your password")  
});

export const register = Yup.object({
    email:Yup.string().email().required("Please enter your email"),
    name:Yup.string().required("Please enter your name"),
    password:Yup.string().required("Please enter your password"),
});

export  const editProfile = Yup.object({
  email:Yup.string().email().required("Please enter your email"),
    name:Yup.string().required("Please enter your name"),
})
export const registerInitail ={
  email:"",
  password:"",
  name:"",
 
}

export const editProfileInitail ={
  email:"",
  name:"",
  
}

export const loginInitial = {
  email:"",
  password:"",
}