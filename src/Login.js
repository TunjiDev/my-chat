import React from "react";
import "./Login.css";
import { auth, googleAuthProvider, facebookAuthProvider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [state, dispatch] = useStateValue();

  const signInGoogle = async () => {
    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      // console.log(result);
      dispatch({
        type: "SET_USER",
        user: result.user,
      });

      history.push("/chat");
    } catch (error) {
      alert(error.message);
    }
  };

  const signInFacebook = async () => {
    try {
      const result = await auth.signInWithPopup(facebookAuthProvider);
      // console.log(result);
      dispatch({
        type: "SET_USER",
        user: result.user,
      });

      history.push("/chat");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1>Welcome To My-Chat</h1>
        <button className="login__googleBtn" onClick={signInGoogle}>
          Sign In With Google
        </button>
        <button className="login__facebookBtn" onClick={signInFacebook}>
          Sign In With Facebook
        </button>
      </div>
    </div>
  );
}

export default Login;
