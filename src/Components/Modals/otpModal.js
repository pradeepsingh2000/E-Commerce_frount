import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./otpmodal.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function OtpModal(props) {
  const { otp, onSubmit, close } = props;

  console.log(props);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputOtp, setInputOtp] = React.useState("");
  const handleOtpInputChange = (event) => {
    setInputOtp(event.target.value);
  };
  const handleSubmit = () => {
    onSubmit(inputOtp);
    close(false);
  };

  return (
    <div>
      <Modal
        open={otp}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="input-container">
            <input
              placeholder="Enter Otp"
              type="number"
              value={inputOtp}
              onChange={handleOtpInputChange}
            />
            <button onClick={handleSubmit}>Submit OTP</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
