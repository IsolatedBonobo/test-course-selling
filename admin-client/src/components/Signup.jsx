import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography, createTheme} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import { BASE_URL } from "../config.js";
import {useNavigate} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import {userState} from "../store/atoms/user.js";
import { ThemeProvider } from "@emotion/react";
const theme = createTheme({
    palette: {
      lavender: {
        main: '#CF9FFF',
        contrastText: '#000',
      },
    },
  });
function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userState);

    return <div>
            <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant={"h4"}>
                Welcome to Coursera. Sign up below
                </Typography>
            </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card varint={"outlined"} style={{width: 400, padding: 20}}>
                <TextField
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                    fullWidth={true}
                    label="Email"
                    variant="outlined"
                />
                <br/><br/>
                <TextField
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    fullWidth={true}
                    label="Password"
                    variant="outlined"
                    type={"password"}
                />
                <br/><br/>
                <ThemeProvider theme={theme}>

                <Button
                    size={"large"}
                    variant="contained"
                    color='lavender'
                    onClick={async() => {
                        const response = await axios.post(`${BASE_URL}/admin/signup`, {
                            username: email,
                            password: password
                        })
                        let data = response.data;
                        localStorage.setItem("token", data.token);
                        // window.location = "/"
                        setUser({userEmail: email, isLoading: false})
                        navigate("/courses")
                    }}

                    > Signup</Button>
                    </ThemeProvider>
            </Card>
        </div>
    </div>
}

export default Signup;