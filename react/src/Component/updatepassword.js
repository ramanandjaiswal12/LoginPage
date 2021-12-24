
import React, { useEffect, useState } from "react";
import { TextField, Button } from '@material-ui/core'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import logo from "./logo.jpg"
import './App.css';
function UpdatePassword() {

    const [url, setUrl] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [error, setError] = useState({})
    // const [nav, setNav] = useState(false)
    let navigate = useNavigate();



    async function update(e) {
        setUrl(window.location.href)
        e.preventDefault()
        try {
            await axios.post('/update-password', {
                url, newPassword
            })
                .then((response) => {
                    // setNav(true)
                    setError(response.data)
                })
        }

        catch (error) {
            console.error(error)
        }
    }

    return (

        <div className="main-login" >

            <img className='img' src={logo} />
            <form onSubmit={update} className="from-submit" style={{ paddingTop: "19px" }}>
                <TextField
                    label="NewPassword"
                    name="NewPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                {error.msg ? <div style={{ color: "red" }}>{error.msg}</div> : null}


                <br></br>
                <br></br>
                <Button className="login_button"
                    type="submit"

                >
                    update
                </Button>
            </form>
            {/* {nav ? navigate("/") : null} */}



        </div>
    )
}
export default UpdatePassword