import React, { useEffect, useState } from 'react'
import { BASE_URL } from "../../Constants/constant";

import { selectedLoggerInUser } from "../../Redux/Auth/authSlice";
import { useSelector } from 'react-redux';
import { getProfile } from '../../Services/User/UserApi';
import ProfileModal from './profileModal';
import PasswordModal from './changePasswordModal';

export default function Profile() {
  const user = useSelector(selectedLoggerInUser);
const [loading,setloading] = useState(true)
const [userprofile,setUserProfile] = useState()
const[modal,showmodal] = useState(false);
const [refresh,setreferesh] = useState(true)
const[passwordModal,setpasswordModal] = useState(false)

const handleEditData =(event) =>{
  setreferesh(true)
}
const handleClose =(e) =>{
  showmodal(e)
}
const handleChangePasswordData =(e) =>{
  console.log(e)
}
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await getProfile();
      console.log(response.data);
      setUserProfile(response.data[0])
      setloading(false)
      setreferesh(false)
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [refresh]);


  return (
  <>
  {
    loading ? (<h1>LOading</h1>):(  <section style={{backgroundColor: "#eee"}}>
    <div className="container py-5">
  
      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body text-center">
            <img src={`${BASE_URL}/${userprofile.image}`} alt="avatar"
                className="rounded-circle img-fluid" style={{width: "150px;"}}/>
              <h5 className="my-3">{userprofile.name}</h5>
              <p className="text-muted mb-1">{userprofile.role}</p>
              <div className="d-flex justify-content-center mb-2">
                <button type="button" onClick={() =>{showmodal(true)}} className="btn btn-primary">Update Profile</button>
                <button type="button" onClick={() =>{setpasswordModal(true)}} className="btn btn-danger ms-1">Change Password</button>
              </div>
            </div>
          </div>
         
        </div>
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Full Name</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{userprofile.name}</p>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Email</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{userprofile.email}</p>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Phone</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">(097) 234-5678</p>
                </div>
              </div>
              <hr/>
          
            </div>
          </div>
         
        </div>
      </div>
    </div>
    <ProfileModal show={modal} onSubmit={handleEditData} editData={userprofile} close={handleClose} />
    <PasswordModal Show={passwordModal} onSubmit={handleChangePasswordData} close={(e)=>{
      setpasswordModal(e)
    }}/>
  </section>
  
  )
  }
  

  
  </>
     
  )}
