import React from 'react';
import useState from 'react-usestateref';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import bgpic from './bg.png'
import { useNavigate } from "react-router";
import { goToHome, } from "../../Router/coordenation";
import {setUser} from '../../components/Context';

// Customized theme
const theme = createTheme({
    palette: {
        orange: {
            main: '#FFA500',
            dark: '#dc9003',
        }
    },
});

export default function SignInSide(props) {
  
  // userIdRef can get the result after state is updated
  const [userId, setUserId, userIdRef] = useState(0);

  // Navigation with router
  const navigate = useNavigate();

  // Login logic
  async function logIn(loginInput) {
    const query = `query login($loginInput: LoginInput!){
          login(loginInput: $loginInput){
          userId
        }}`;
    //console.log(JSON.stringify({ loginInput}))
    const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables: { loginInput } })
    }).then(response => response.json())
        .then(data => {
          setUserId(data.data.login.userId)
        })
        .catch((error) => {
          return
        });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get data from current form
    const data = new FormData(event.currentTarget);
    const loginInput = {
        email : data.get('email'),
        password : data.get('password'),
    }

    // This is 2 admin users to test
    if (loginInput.email=='adminTest@u.nus.edu'){
      setUser(111111)
      localStorage.setItem('user',111111)
      goToHome(navigate);
      window.alert("Login successful!");
      event.target.email.value = ""
      event.target.password.value = ""
    } else if (loginInput.email=='easonwei1998@gmail.com'){
      setUser(111116)
      localStorage.setItem('user',111116)
      goToHome(navigate);
      window.alert("Login successful!");
      event.target.email.value = ""
      event.target.password.value = ""
    }

    // Real log in
    else {
      logIn(loginInput);
      setTimeout(() => {
        if(userIdRef.current) {
          setUser(userIdRef.current)
          localStorage.setItem('user',userIdRef.current)
          goToHome(navigate);
          window.alert("Login successful!");
          event.target.email.value = ""
          event.target.password.value = ""
        } else {
          window.alert("Invalid account!")
          event.target.email.value = ""
          event.target.password.value = ""
        }
      }, 1000)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bgpic})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 12,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'orange.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color = "orange"
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="./signUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
