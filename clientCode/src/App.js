import { useEffect } from "react";
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";
import logo from "./logo.svg";
import "./App.css";

function App() {
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          "BNMmAXyw9VcqwTC74mqkFa-ZGe4hUR2TwLNEmyKi3mRos1inUURpRD46MNdm84rT8MVZprBIrq0d0PSZmwkUz2w",
      });
      console.log("Token Generated", token);
      // Send this token  to server ( db)
    } else if (permission === "denied") {
      alert("You denied for the notification");
      // const token = await getToken(messaging, {
      //   vapidKey:
      //     "BNMmAXyw9VcqwTC74mqkFa-ZGe4hUR2TwLNEmyKi3mRos1inUURpRD46MNdm84rT8MVZprBIrq0d0PSZmwkUz2w",
      // });
      // console.log("Token Generated", token);
      // // Send this token  to server ( db)
    }
  }

  useEffect(() => {

    // Req user for notification permission
    requestPermission();

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
