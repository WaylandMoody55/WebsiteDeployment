import Button from "react-bootstrap/Button";
import logo  from './Images/logo.png';

import React, {useRef} from 'react';
var exportLoginNum = 0;
function Login() {
  // allows you to use value from html 
    const loginNum = useRef(null);
    // function for handling login 
    async function handleLogin() {
      console.log(loginNum.current.value)
        exportLoginNum = loginNum.current.value
        sessionStorage.setItem('loginNum', loginNum.current.value)
        console.log(exportLoginNum)
        const postData = {
          title: loginNum.current.value
        };
    
        try {
          const res = await fetch("/login", {
            method: "post",
            mode : "cors",
            // cache: 'no-cache',
            headers: {
              "Content-Type": "application/json",
              "x-access-token": "token-value",
              // "Accept": "application/json"
            },
            body: JSON.stringify(postData),
          });

          if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
          }

          // grabs data from server response 
          const data = await res.json()
          console.log(data)

          // check if it is a manager or server 
          if (data.ismanager === true) {
            window.location.href = 'http://localhost:3000/ManagerSide'
          }

          if (data.ismanager === false) {
            window.location.href = 'http://localhost:3000/ServerSide'
          }
    }

    catch (err) {
        console.log(err.messeage);
    }
    }
    return (
        <div class = "flex flex-wrap justify-center space-x-5 px-5 py-5">
            <img src={logo} alt="Logo" />
            <form id="login" className="w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="name"
                >
                    Enter Login Id:
                </label>
                </div>
                <div className="md:w-2/3">
                <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="loginVal"
                    type="text"
                    defaultValue="100"
                    placeholder=""
                    ref = {loginNum}
                />
                </div>
            </div>
            <div class = "flex flex-wrap justify-center space-x-5">
                <Button variant="primary" onClick={handleLogin}>
                                    Login
                </Button>
                <Button variant="primary" href="/ManagerSide">
                                    Manager Override
                </Button>
                <Button variant="primary" href="/CustomerSide">
                                    Customer UI
                </Button>
            </div>
            </form>
        </div>
      );
    }
export {exportLoginNum}
export default Login;