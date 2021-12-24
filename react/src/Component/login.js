import axios from "axios"
import React, { useEffect, useState } from "react";
import { TextField, Button } from '@material-ui/core'
import Alert from 'react-bootstrap/Alert'
import { BrowserRouter, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import logo from "./logo.jpg"
import './App.css';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({})
    let navigate = useNavigate();



    async function login(e) {
        e.preventDefault()
        console.log("___________")
        console.log(e)

        try {
            await axios.post('/login', {
                email, password
            })
                .then((response) => {

                    setError(response.data)
                    console.log("Response[email]________________")
                    console.log(response.data)



                })
        }

        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        tosatMessage()

    });

    function tosatMessage() {
        if (error.login) {

            if (error.login.includes("Succcess"))
                navigate("/login-page")
            console.log("____________________---")
            console.log(error)
        }

    }

    return (

        <div className="main-login" >
            <div className="login-centre">
                <img className='img' src={logo} />
                {/* <span style={{ paddingRight: "42px", paddingTop: "18px" }}>Login in your account</span> */}
                {error.login ? <div style={{ color: "blue" }}>{error.login}</div> : null}
                <form onSubmit={login} className="from-submit" style={{ paddingTop: "19px" }}>
                    <TextField
                        label="Username"
                        name="Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                    {error.email ? <div style={{ color: "red" }}>{error.email}</div> : null}
                    <br />
                    <br />
                    <TextField
                        className="from-text"
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    {error.password ? <div style={{ color: "red" }}>{error.password}</div> : null}
                    <br />
                    <br />
                    <Button className="login_button"
                        type="submit"

                    >
                        login
                    </Button>
                </form>
                <div style={{ paddingTop: "14px" }}>
                    <Link to='/reset-password'>forget password</Link>
                    {/* <span> Sign up</span> */}
                </div>


            </div>
        </div >
    )
}

export default Login