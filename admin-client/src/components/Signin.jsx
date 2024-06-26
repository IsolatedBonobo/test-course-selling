import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography, createTheme} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import {userState} from "../store/atoms/user.js";
import { BASE_URL } from '../config.js';
import { ThemeProvider } from "@emotion/react";
const theme = createTheme({
    palette: {
      lavender: {
        main: '#CF9FFF',
        contrastText: '#000',
      },
    },
  });
function Signin() {
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
                    onChange={(evant11) => {
                        let elemt = evant11.target;
                        setEmail(elemt.value);
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
                    color="lavender"
                    onClick={async () => {
                        const res = await axios.post(`${BASE_URL}/admin/login`, {
                            username: email,
                            password: password
                        }, {
                            headers: {
                                "Content-type": "application/json"
                            }
                        });
                        const data = res.data;
                        
                        localStorage.setItem("token", data.token);
                        // window.location = "/"
                        setUser({
                            userEmail: email,
                            isLoading: false
                        })
                        navigate("/courses")
                    }}
                    
                    > Signin</Button>
                    </ThemeProvider>
            </Card>
        </div>
    </div>
}

export default Signin;