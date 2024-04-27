import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import Select from "react-select";
import * as yup from "yup";
import { useState } from "react";
import { Country, State, City }  from 'country-state-city';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAddress } from "../../Redux/Auth/authSlice";


const style = {
  position: "absolute",
  top: "50%",
  height: 600,
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddAddress(props) {
  const { open, handleClose,handleConfirm } = props;
  const [statelist,setstatelist] = useState()
  const [citylist,setcitylist] = useState([])
  const dispatch = useDispatch()

  const SelectState = () =>{
    const country = State.getStatesOfCountry('IN')
    const newArray = country.map(entry => ({ label: entry.name, value: entry.name , code :entry.isoCode }));
    setstatelist(newArray)
  }

const setCityAsPerState = (code,name) =>{
const city = City.getCitiesOfState('IN',code)
const newArray = city.map(entry => ({ label: entry.name, value: entry.name  }));
setcitylist(newArray)
}
  useEffect(()=>{
    SelectState()
  },[])

  const formik = useFormik({
    initialValues: {
      city: "",
      state:"",
      address: "",
      phoneNo:""
    },
    enableReinitialize: true,

    onSubmit: async (values) => {
        
        console.log(values,'values')
        
        dispatch(setAddress(values))
        handleConfirm()
        // handleConfirm
    },
    validationSchema: yup.object({
        city: yup.string().required(),
        state: yup.string().required(),
        address: yup.string().required(),
        phoneNo: yup
        .number()
        .min(1000000000, 'Phone number must be at least 10 digits')
        .max(9999999999, 'Phone number must be at most 10 digits')
        .required('Phone number is required'),
    }),
  });


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>Add Address</h1>
          <form className="row g-3" onSubmit={formik.handleSubmit}>
           
            <div className="col-12">
              <label for="validationDefault04" className="form-label">
                Select State
              </label>
              <Select
               options={statelist}
                 id="state"
                name="state"
                // value={options.find((e) => e.value === formik.values.category)}
                onChange={(e) => {
                    console.log(e)
                    setCityAsPerState(e.code,e.value)
                  formik.setFieldValue("state", e.value);
                }}
            
              />
              {formik.touched.state && formik.errors.state && (
                <div style={{ color: "red" }}>{formik.errors.state}</div>
              )}
            </div>
            
            <div className="col-12">
              <label for="validationDefault05" className="form-label">
                Select City
              </label>
              <Select
               options={ citylist}
                 id="city"
                name="city"
                // value={options.find((e) => e.value === formik.values.category)}
                onChange={(e) => {
                    console.log(e)
                    setCityAsPerState(e.code,e.value)
                  formik.setFieldValue("city", e.value);
                }}
            
              />
              {formik.touched.city && formik.errors.city && (
                <div style={{ color: "red" }}>{formik.errors.city}</div>
              )}
            </div>
            <div className="col-12">
              <div className="mb-3">
                <label for="formFile" className="form-label">
                  {" "}
                 Address
                </label>
                 <input
                  className="form-control"
                  type="text"
                  id="address"
                  name="address"
                  onChange={(e) => {
                    formik.setFieldValue("address", e.target.value);
                  }}
                /> 
              </div>
            </div>
            <div className="col-12">
              <div className="mb-3">
                <label for="formFile" className="form-label">
                  {" "}
                  Enter PhoneNo
                </label>
              
                 <input
                  className="form-control"
                  type="number"
                  id="phoneNo"
                  name="phoneNo"
                  onChange={(e) => {
                    formik.setFieldValue("phoneNo", e.target.value);
                  }}
                /> 
                {formik.touched.phoneNo && formik.errors.phoneNo && (
                <div style={{ color: "red" }}>{formik.errors.phoneNo}</div>
              )}
              </div>
            </div>

            <div className="col-12">
              <button className="btn btn-primary" type="submit">
                Submit form
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
