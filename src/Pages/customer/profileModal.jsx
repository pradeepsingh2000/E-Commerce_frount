import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input, TextField } from "@mui/material";
import { Label } from "@mui/icons-material";
import { useFormik } from "formik";
import { editProfile, editProfileInitail } from "../../schema";
import { updateProfile } from "../../Services/User/UserApi";
import { SuccessMessage } from "../../helper/helper";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column", // To stack items vertically
    alignItems: "center",     // To center items horizontally
  };
  

export default function ProfileModal(props) {
  const { show, onSubmit, close ,editData} = props;
  const [Edit,setEdit] = React.useState(editData)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => close(false);

  const updateUser =async(data) =>{
   await updateProfile(data).then(e=>{
    if(e.status){
      SuccessMessage(e.message)
      onSubmit(true)
      close(false);
    }
   })
  }
  const handleCloseModel = () => {
    close(false);
  };

  const warn = {
    color: "red",
    fontSize: "10px",
  };
  const { values, errors, touched,setFieldValue, handleBlur, handleChange, handleSubmit } =
  useFormik({
    initialValues: Edit,
    validationSchema: editProfile,
    onSubmit: (values) => {
      console.log('hit')
      const data ={
        name:values.name,
        email:values.email
      }
    //  const formdata = new FormData();
    //  formdata.append('name', values.name);
    //  formdata.append('email', values.email);
     console.log(data);
     updateUser(data)
    //  formdata.append('image', image);
    
    //   response(formdata)
    },
  });
  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box    sx={style}>
        <div className="form-box align-items-start">
        <form className="form">
          <span className="title">Edit</span>
          <span className="subtitle">
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
           
            {/* <input type="file" className="input" name="image"  placeholder="image"  onChange={(e)=>{
              setimage(e.target.files[0])
            }}
                  onBlur={handleBlur}  />
          </div> */}
          </div>
          <button onClick={handleSubmit}>Save</button>
        </form>
       
      </div>
          <button className="btn btn-danger" onClick={handleCloseModel}>Close</button>

        </Box>
      
      </Modal>
    </div>
  );
}
