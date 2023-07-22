// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardGroup,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CRow,
//   CFormLabel,
//   CFormCheck,
// } from "@coreui/react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import CIcon from "@coreui/icons-react";
// import { cilScreenSmartphone } from "@coreui/icons";
// import { auth } from "../../../config/firebaseConfig";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import axios from "axios";
// import { BASE_URL } from "src/constants/constants";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { MuiOtpInput } from "mui-one-time-password-input";

// function Login() {
//   const navigate = useNavigate();
//   const [phone, setPhone] = useState("");
//   const [isOtpScreen, setOtpScreen] = useState(false);
//   const [finalOtp, setFinalOtp] = useState("");
//   // const [user, setUser] = useState([])

//   const configureCaptcha = () => {
//     window.localStorage.removeItem("token");
//     window.localStorage.removeItem("phone");
//     console.log("Executed captcha method...");
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       "recaptcha-container",
//       {
//         size: "invisible",
//         callback: () => {
//           console.log("Recaptca varified");
//           onSignInSubmit();
//         },
//         defaultCountry: "IN",
//       },
//       auth
//     );
//   };

//   const onSignInSubmit = async () => {
//     const phoneNumber = "+" + phone;

//     configureCaptcha();

//     if (window.recaptchaVerifier != null) {
//       const appVerifier = window.recaptchaVerifier;

//       //Sending otp to current provided phone.
//       signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//         .then(async function (result) {
//           // let code = window.prompt('Please enter the otp')
//           setOtpScreen(true);
//           window.confirmationResult = result;
//         })
//         .catch((error) => {
//           console.log("Otp Auth error===>", error);
//           // appVerifier.reset()
//         });
//     }
//   };

//   //function for calling login api.
//   const loginUser = async (result, phoneNumber) => {
//     console.log("AccessToken 83 ===>", result);
//     let loginPayload = {
//       roleType: "Admin",
//       phoneNumber,
//       token: result?.user?.accessToken,
//     };
//     await axios
//       .post(BASE_URL + "/auth/login", loginPayload)
//       .then((_user) => {
//         console.log("_user", _user);
//         window.localStorage.setItem("token", _user.data.data.token);
//         window.localStorage.setItem("phone", phoneNumber);

//         toast("Signed in success", { position: toast.POSITION.TOP_RIGHT });
//         navigate("/");
//       })
//       .catch((err) => {
//         console.log("userLoginError ===>", err);
//         showToast(false);
//       });
//   };

//   //function for showing toast
//   const showToast = (isSuccess) => {
//     return isSuccess === true
//       ? toast.success("OTP verified successfully.", {
//           position: toast.POSITION.TOP_RIGHT,
//         })
//       : toast.error("Failed to verify OTP.", {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//   };
//   const VerifyOtpHandler = async (code) => {
//     window.confirmationResult
//       .confirm(code)
//       .then((result) => {
//         showToast(true);
//         loginUser(result, phone);

//         console.log("Result ===>", result);
//       })
//       .catch((error) => {
//         console.log("OTP Validate error::", error);
//         showToast(false);
//       });
//   };
//   const OtpScreen = () => {
//     const [otp, setOtp] = useState("");

//     const handleOtpChange = (newValue) => {
//       setOtp(newValue);
//       // setFinalOtp(newValue)
//     };
//     return (
//       <CCardBody style={{ margin: "0 auto" }}>
//         {/* <ToastContainer /> */}

//         <div className="mb-4">
//           <h4 className="mb-2">Enter OTP</h4>
//         </div>
//         <div className="mb-4">
//           <h5 className="mb-2">Verification Code</h5>
//           <p className="text-medium-emphasis">
//             We have sent the 6-digit code to your phone number
//           </p>
//           <p>
//             +{phone}{" "}
//             <span
//               className="text-primary"
//               style={{ cursor: "pointer" }}
//               onClick={() => setOtpScreen(false)}
//             >
//               Edit
//             </span>
//           </p>
//         </div>
//         <div className="mb-4">
//           <MuiOtpInput value={otp} length={6} onChange={handleOtpChange} />
//         </div>
//         <div className="mb-4" style={{ marginTop: "50px" }}>
//           Didn't recieve code? &nbsp;
//           <span
//             className="text-primary"
//             style={{ cursor: "pointer" }}
//             onClick={() => setOtpScreen(false)}
//           >
//             Request again
//           </span>
//         </div>
//         <div>
//           <CButton
//             disabled={otp.length != 6}
//             // shape="rounded-pill"
//             color="info"
//             onClick={() => VerifyOtpHandler(otp)}
//             className="p-2 text-white"
//           >
//             <span style={{ marginLeft: "10px", marginRight: "10px" }}>
//               Verify
//             </span>
//           </CButton>
//         </div>
//       </CCardBody>
//     );
//   };

//   return (
//     <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
//       <CContainer>
//         <CRow className="justify-content-center">
//           <CCol md={8}>
//             <CCardGroup>
//               <ToastContainer />

//               <CCard className="p-4">
//                 {!isOtpScreen ? (
//                   <CCardBody style={{ margin: "0 auto" }}>
//                     <h4 className="mb-2">Admin Panel </h4>
//                     <p className="text-medium-emphasis">
//                       Login with your registered mobile number
//                     </p>
//                     <CForm>
//                       <CInputGroup className="mb-4">
//                         <p className="text-medium-emphasis mb-2">
//                           Phone Number
//                         </p>

//                         <PhoneInput
//                           variant="outlined"
//                           country={"us"}
//                           value={phone}
//                           onChange={(phone) => setPhone(phone)}
//                         />
//                         {/* <CFormInput
//                           name="phone"
//                           type="phone"
//                           placeholder="Enter phone number"
//                           autoComplete="phone number"
//                           required
//                           onInput={(e) => setPhone(e.target.value)}
//                         /> */}
//                       </CInputGroup>
//                       <div id="recaptcha-container"></div>
//                       <CRow>
//                         <CCol xs={10}>
//                           <CFormCheck
//                             className="mb-4"
//                             // id="flexCheckChecked"
//                             label="I have read the terms and condition"
//                           />
//                         </CCol>
//                       </CRow>
//                       <CRow>
//                         <CCol xs={6}>
//                           <CButton
//                             // shape="rounded-pill"
//                             color="info"
//                             onClick={onSignInSubmit}
//                             // className="btn btn-primary btn-loading"
//                             data-coreui-timeout="2000"
//                             className="p-2"
//                           >
//                             <span
//                               style={{
//                                 color: "#FFFFFF",
//                                 marginLeft: "10px",
//                                 marginRight: "10px",
//                               }}
//                             >
//                               Request OTP
//                             </span>
//                           </CButton>
//                           {/* <ToastContainer /> */}
//                         </CCol>
//                       </CRow>
//                     </CForm>
//                   </CCardBody>
//                 ) : (
//                   <OtpScreen />
//                 )}
//               </CCard>
//             </CCardGroup>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   );
// }

// export default Login;
