import React, { useEffect } from "react";
import "./App.css";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./Chat";
import { auth } from "./firebase";

function App() {
  const [{ user }, dispatch] = useStateValue();
  console.log(user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // the user is logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    return () => {
      // Any cleanup operations go in here...
      unsubscribe();
    };
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Switch>
            <Route path="/chat">
              <Chat />
            </Route>

            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
