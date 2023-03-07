import React from "react";
import { Link } from "react-router-dom";
import { Header } from "./Header";
import AllUsersList from "../AllUsersList";

function Home(props) {
  return (
    <div >
      {/* <Header name={props} /> */}
      <br />
      <br /> 
      <h1>{props.name ? `Welcome - ${props.name}` : "Login please"}</h1>
      {props.name ? <AllUsersList /> : null }
    </div>
  );
}


export default Home;