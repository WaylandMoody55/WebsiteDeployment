import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import logo  from './Images/logo.png';

function Login() {
    const handleLogin = () => (false);
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
                defaultValue=""
                placeholder=""
            />
            </div>
        </div>
        <Button variant="primary" onClick={handleLogin}>
                            Login
            </Button>
        </form>
    </div>
  );
}

export default Login;
