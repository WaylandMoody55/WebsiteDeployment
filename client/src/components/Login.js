import Button from "react-bootstrap/Button";
import logo  from './Images/logo.png';

import React, {useRef} from 'react';

import './Format.css';

import jwt_decode from "jwt-decode";
import {useEffect, useState} from 'react';

var exportLoginNum = 0;

/**
 * Login Component, This handles the logging into our POS System. 
 * Based on the ID entered either moved to the manager or server side
 * Can also log in via OAuth, however name associated with the email needs to inside the data base
 */
function Login() {
    /**
     * Allows you to use value from HTML
     * 
     */
    const loginNum = useRef(null);
    // function for handling login 


    /**
     * @function handleLogin
     * 
     * @description This queries the database based on the id numbered enterend in
     * Based on this either goes to manager or server side
     * 
     */
    async function handleLogin() {
      console.log(loginNum.current.value)
        exportLoginNum = loginNum.current.value
        sessionStorage.setItem('loginNum', loginNum.current.value)
        console.log(exportLoginNum)
        const postData = {
          title: loginNum.current.value
        };
    
        try {
          const res = await fetch("https://websitebackendtest.onrender.com/login", {
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
            window.location.href = 'https://testlaunch.onrender.com/ManagerSide'
          }

          if (data.ismanager === false) {
            window.location.href = 'https://testlaunch.onrender.com/ServerSide'
          }
    }

    catch (err) {
        console.log(err.messeage);
    }
    }

    //Below is OAuth code

    /**
     * @function oauthLogin
     * @description Takes the name from handleCallbackResponse and checks the database to see if that person is a manager or server
     * @param {string} name Name of the person being checked
     * 
     *
     * 
     */
    async function oauthLogin(name){
      console.log("First name is: " + name);
      const postData = {
        firstName: name
      };
      try{
        const res = await fetch("https://websitebackendtest.onrender.com/oauthLogin",{
            method: "post",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: JSON.stringify(postData),
        });

        if(!res.ok){
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
        }


        const data = await res.json()
        console.log(data.ismanager)

        if (data.ismanager === true) {
          window.location.href = 'https://testlaunch.onrender.com/ManagerSide'
        }

        if (data.ismanager === false) {
          window.location.href = 'https://testlaunch.onrender.com/ServerSide'
        }



      }
      catch(err){
          console.log(err.message);
      }




    }
    
    const [ user, setUser ] = useState({});

    /**
     * @function handleCallbackResponse
     * @description Uses oAuth to get data based on the email
     * @param {*} response response from the oAuth 
     * 
     * 
     * 
     */
    function handleCallbackResponse(response){
      console.log("Encoded JWT ID token = " + response.credential);
      var userObj = jwt_decode(response.credential);
      console.log(userObj);
      setUser(userObj);
      document.getElementById("signInDiv").hidden = true;
      console.log(userObj.given_name);
      oauthLogin(userObj.given_name)

    }
  
    
    useEffect(() => {
      /* global google */
      google.accounts.id.initialize({
        client_id: "362665886730-fnk59acdlntvhdi3or07tajtjoe27qi4.apps.googleusercontent.com",
        callback: handleCallbackResponse
      });
  
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {
          theme: "outline",
          size: "large"
        }
      );
  
    }, []);
    

    return (
      <div className="login">
        <div class = "flex flex-wrap justify-center space-x-5 px-5 py-5" >
          <div id = "signInDiv"></div>
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
                {/* <Button variant="primary" href="/ManagerSide">
                                    Manager Override
                </Button> */}
                <Button variant="primary" href="/CustomerSide">
                                    Customer UI
                </Button>
            </div>
            </form>

        </div>
        </div>
      );
    }
export {exportLoginNum}
export default Login;

