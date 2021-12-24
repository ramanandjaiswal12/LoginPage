
import React, { useEffect, useState } from "react";
import { TextField, Button } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import logo from "./logo.jpg"
import './App.css';
import Login from "./login";

function ResetPassword() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState({})
    let navigate = useNavigate();
    async function update(e) {
        e.preventDefault()

        try {
            await axios.post('/reset-password', {
                email
            })
                .then((response) => {
                    setError(response.data)


                })

        }


        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        tosatMessage()

    });

    function tosatMessage() {
        if (error.msg) {
            alert(error.msg)
            if (error.msg.includes("link"))
                navigate("/")
            console.log("____________________---")
            console.log(error)
        }

    }


    return (

        <div className="main-login" >

            <img className='img' src={logo} />
            <form onSubmit={update} className="from-submit" style={{ paddingTop: "19px" }}>
                <TextField
                    label="Username"
                    name="Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}

                />
                <br></br>
                <br></br>

                <Button className="login_button"
                    type="submit"

                >
                    Reset
                </Button>
            </form>

        </div>
    )




}


export default ResetPassword