import * as React from 'react';
import useState from 'react-usestateref';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router";
import { goToSignIn} from "../../Router/coordenation";

// customized theme
const theme = createTheme({
    palette: {
        orange: {
            main: '#FFA500',
            dark: '#dc9003',
        }
    },
});

export default function SignUp() {
  const [isRegistered, setIsRegistered, isRegisteredRef] = useState(false); // state check if current email is registered
  const navigate = useNavigate();
  var pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // email validation regex

  // register query
  async function register(userRegisterInput) {
    const query = `mutation registerUser($userRegisterInput: UserRegisterInput){
          registerUser(userRegisterInput: $userRegisterInput){
            userId
            userName
            userSchool
          }}`;
    const response = await fetch('http://localhost:8080/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables: { userRegisterInput } })
    }).then(response => response.json())
    .then(data => {
      if(!data.data) {
        setIsRegistered(true)
      }
    })
    .catch((error) => {
    });
  }

  // sign in submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget); // data from form

    const userRegisterInput = {
      userName: data.get('firstName') + data.get('lastName'),
      userSchool : data.get('school'),
      userGrade : data.get('grade'),
      email : data.get('email'),
      phoneNumber : data.get('phoneNumber'),
      password : data.get('password'),
    }
    if (!userRegisterInput.userName || 
        !userRegisterInput.userSchool ||
        !userRegisterInput.userGrade ||
        !userRegisterInput.email ||
        !userRegisterInput.phoneNumber ||
        !userRegisterInput.password ){
        alert("All information is required!") // check if all information is provided
        return
    } else if (!userRegisterInput.email.match(pattern)) { // email validation
      alert('Wrong email format!')
      event.target.email.value = "";
      return
    } else {
      register(userRegisterInput)
      setTimeout(() => {
        // check if email is already registered
        if(isRegisteredRef.current) {
          window.alert('Email has been already registered!');
          setIsRegistered(false);
        } else {
          window.alert('Register successful!');
          goToSignIn(navigate);
        }
        event.target.email.value = "";
        event.target.phoneNumber.value = "";
        event.target.password.value = "";
        event.target.firstName.value = "";
        event.target.lastName.value = "";
        event.target.grade.value = ""
        event.target.school.value = ""
      }, 1000)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'orange.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="school"
                  label="School"
                  type="school"
                  id="school"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="grade"
                  label="Grade"
                  type="grade"
                  id="grade"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="phoneNumber"
                    label="Phone Number"
                    type="phoneNumber"
                    id="phoneNumber"
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="orange"
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./signIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
