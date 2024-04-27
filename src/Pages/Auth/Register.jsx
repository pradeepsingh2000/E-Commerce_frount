import React, { useState } from "react";
import "./Register.css";
import { ErrorMessage, useFormik } from "formik";
import { registerInitail ,register } from "../../schema/index";
import { registerUser, verifyOTP } from "../../Services/Authentication/AuthenticationApi";
import { Link, useNavigate } from "react-router-dom";
import { SuccessMessage } from "../../helper/helper";
import OtpModal from "../../Components/Modals/otpModal";
export default function Register() {
  const [image,setimage] = useState();
  const [Userotp, setOtp] = useState(''); 
  const [Useremial, setUseremial] = useState()
  const[otp,showOtp] = useState(false);
  const navigate = useNavigate();
  const warn = {
    color: "red",
    fontSize: "10px",
  };
  const { values, errors, touched,setFieldValue, handleBlur, handleChange, handleSubmit } =
  useFormik({
    initialValues: registerInitail,
    validationSchema: register,
    onSubmit: (values) => {
     const formdata = new FormData();
     formdata.append('name', values.name);
     formdata.append('email', values.email);
     formdata.append('password', values.password);
     formdata.append('image', image);
     setUseremial(values.email);
      response(formdata)
    },
  });
  const handleOtpSubmit = (otpValue) => {
    console.log(otpValue,'the opt')
    setOtp(otpValue);
  
    Verify(Useremial,otpValue);
  };

  const handleCloseOtpModal = (isModalOpen) => {
    showOtp(isModalOpen);
  };

  const response = async (data) => {
    try {
       await registerUser(data).then(e => {
        if (e.status) {
          SuccessMessage(e.message);
          showOtp(true)
        } else {
          ErrorMessage(e.message);
        }
      })      
    } catch (e) {
      console.log("An error occurred:", e);
      ErrorMessage(e.response.data.message);
    }
  };

  const Verify = async (email,otp) =>{
    try {
    
        let emailcheck =email.toLowerCase().trim()
      await verifyOTP(emailcheck,otp).then(e => {
       if (e.status) {
         SuccessMessage(e.message); 
         showOtp(false)
         navigate('/login')
       } else {
         ErrorMessage(e.message);
       }
     })      
   } catch (e) {
     console.log("An error occurred:", e);
     ErrorMessage(e.response.data.message);
   }
  }
  return (
    <>
    <div className=" row ">
      <div className="col-4"></div>
      <div className=" col-6 align-items-start">
        <form className="form">
          <span className="title">Sign up</span>
          <span className="subtitle">
            Create a free account with your email.
          </span>
          <div className="form-container">
            <input type="text" className="input" name="name" value={values.name} placeholder="Full Name" onChange={handleChange}
                  onBlur={handleBlur}  />
            { errors.name && touched.name ? (
              <p style={warn}>{errors.name}</p>
            ) : null}
            <input type="email" className="input" name="email" value={values.email} placeholder="Email"  onChange={handleChange}
                  onBlur={handleBlur} />
            { errors.email && touched.email ? (
              <p style={warn}>{errors.email}</p>
            ) : null}
            <input type="password" className="input" name="password" value={values.password} placeholder="Password"  onChange={handleChange}
                  onBlur={handleBlur} />
            { errors.password && touched.password ? (
              <p style={warn}>{errors.password}</p>
            ) : null}
            <input type="file" className="input" name="image"  placeholder="image"  onChange={(e)=>{
              setimage(e.target.files[0])
            }}
                  onBlur={handleBlur}  />
          </div>
          <button onClick={handleSubmit}>Sign up</button>
        </form>
        <div className="form-section">
          <p>
            Have an account?
          <Link to="/login">Login ?</Link>
          </p>
        </div>
      </div>

{
  otp ?  <OtpModal otp={otp} onSubmit={handleOtpSubmit} close={handleCloseOtpModal}/> : null

}
      </div>
    </>
  );
}
