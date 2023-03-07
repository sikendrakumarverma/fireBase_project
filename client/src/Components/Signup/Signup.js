import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
//import { Container, Stack } from '@mui/system';
import axios from "axios";
import Swal from "sweetalert2";

import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";

import styles from "./Signup.module.css";
import { SERVER_URI } from "../../config/keys.js";

const backendServer = `${SERVER_URI}/register`

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    phone:"",
    email: "",
    password: "",
    address:""
  });
  console.log(values)
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.password || !values.phone || !values.address ) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);

    axios.post(backendServer, values)
    .then((response) => {
        console.log("response", response)
        //alert(`success : ${response.data.message}`)
        Swal.fire({
            // position: 'top-end',
            icon: 'success',
            title: response.data.message,
            showConfirmButton: true,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
             timer: 2500
        }).then(() => {
            //navigate("/login");
        })

        // 
        createUserWithEmailAndPassword(auth, values.email, values.password,values.phone,values.address)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        console.log(user)
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/login");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
        
    })
    .catch((error) => {
      setSubmitButtonDisabled(false);
        console.log("error", error.response.data.message)
        //alert(`Error: ${error.response.data.message}`)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            text: error.response.data.message
          })
    })

    
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h3 className={styles.heading}>Signup</h3>

        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
         <InputControl
          label="Phone"
          placeholder="Enter your phone"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, phone: event.target.value }))
          }
        />
         <InputControl
          label="Address"
          placeholder="Enter your address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, address: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          type="password"
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, password: event.target.value }))
          }
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;