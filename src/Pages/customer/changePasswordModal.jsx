import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './changePassword.css';
import { ErrorMessage, SuccessMessage } from '../../helper/helper';
import { changePassword } from '../../Services/User/UserApi';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height:400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,

};

export default function PasswordModal(props) {
    const {Show,onSubmit,close} = props
    console.log(props)
    const [oldpassword , setOldPassword]  = React.useState("")
    const [newpassword , setNewPassword]  = React.useState("")
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => close(false);
   const handleChangePasswordDate = async () =>{
    if(oldpassword.length <=0 || newpassword.length <=0){
ErrorMessage("Please enter new and old password")
    }
const data ={
  password:oldpassword,
  updatePassword:newpassword
}
await changePassword(data).then((e) =>{
  if(e.status){
    SuccessMessage(e.message)
    close(false)
  }
  else{
    ErrorMessage(e.message)
  }
})
   }

  return (
    <div>
      <Modal
        open={Show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div class="form-container">
      <div class="logo-container">
        Change Password
      </div>

      <form class="form">
        <div class="form-group">
          <input type="password" id="email" onChange={(e)=>{
            setOldPassword(e.target.value);
          }} placeholder="Enter old password" required/>
          <input type="password" id="email" onChange={(e) =>{
            setNewPassword(e.target.value);
          }} placeholder="Enter new Password" required/>
        </div>

        <Button  onClick={handleChangePasswordDate}>Save</Button>
      </form>
      <Button variant="contained"  color="error" onClick={handleClose}>Back</Button>

    </div>
         
        </Box>
      </Modal>
    </div>
  );
}