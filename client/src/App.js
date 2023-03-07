import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import NotFound from "./Components/PageNotFound";
import { Header } from "./Components/Home/Header";
import AllUsersList from "./Components/AllUsersList";

import { auth } from "./firebase";

import "./App.css";

function App() {
  //const [userName, setUserName] = useState("");
  const [userLoggedIn,setUserLoggedIn]=useState("")

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        //setUserName(user.displayName);
        setUserLoggedIn(user.displayName);
      } else setUserLoggedIn("");

      console.log(user)
    });
  }, []);

  function LoggedOut(){
    setUserLoggedIn("");

  }

  return (
    <div className="App">
      <Router>
      <Header name={userLoggedIn} logOut={LoggedOut}/>
      <Home name={userLoggedIn}/>
        <Routes>
        {!userLoggedIn ?
            <Route path="/" exact element={<Login />} />
            :
            < Route path="/" />}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/GetAllUsersList' element={<AllUsersList />} >  </Route>
          <Route path="*" exact element={<NotFound />} />
        </Routes>
      </Router>
      {/* <div>
        <AllUsersList/>
      </div> */}
    </div>
  );
}

export default App;