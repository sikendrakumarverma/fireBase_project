import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";
import axios from "axios";
import Swal from "sweetalert2";
import { SERVER_URI } from "../../config/keys.js";

import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  const backendServer = `${SERVER_URI}/login`

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.password) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);

    // store in mongodb
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
            //console.log(response.data.data.token);
            localStorage.setItem("token",response.data.data.token)
            //navigate("/");
        })

        // store in firebase
        signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        
        navigate("/");
        window.location.reload()
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
        <h1 className={styles.heading}>Login</h1>

        <InputControl
          label="Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter email address"
        />
        <InputControl
         type="password"
          label="Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, password: event.target.value }))
          }
          placeholder="Enter Password"
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;