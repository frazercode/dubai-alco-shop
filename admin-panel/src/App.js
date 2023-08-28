import { useEffect, useState } from "react";
import { getAuth } from "./api/auth";
import SignIn from "./pages/Login";
import Menu from "./pages/Menu";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(undefined);
  
  const checkLogin = async () => {
    let res = await getAuth();
    if (res.loggedIn) setLoggedIn(true);
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      {loggedIn ? <Menu login={{loggedIn, setLoggedIn}} /> : <SignIn login={{loggedIn, setLoggedIn}} />}
    </>
  );
}
