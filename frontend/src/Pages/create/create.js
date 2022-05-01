import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import BackToTop from "../../components/header";
import { useGlobalState } from '../../components/Context';
import useState from 'react-usestateref';
import { goToHome } from '../../Router/coordenation';
import { useNavigate, Navigate } from 'react-router-dom';

// Customized theme
const theme = createTheme({
    palette: {
        orange: {
            main: '#FFA500',
            dark: '#dc9003',
        }
    },
});

// create activity query
export async function activityCreate(activityCreateInput, initializerId) {
    const query = `mutation createActivity($activityCreateInput: ActivityCreateInput, $initializerId: Int){
            createActivity(activityCreateInput: $activityCreateInput, initializerId: $initializerId){
                activityId
        }}`;
    console.log(JSON.stringify({ activityCreateInput}))
    const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables: { activityCreateInput, initializerId } })
    });
}

export default function CreateActivity() {
    // use state to get data from text field
    const [inputActivityName, setInputActivityName] = useState();
    const [inputImageUrl, setInputImageUrl, inputImageUrlRef] = useState();
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [inputLocation, setInputLocation] = useState();
    const [inputNumOfParticipants, setInputNumOfParticipants] = useState();
    const [inputCost, setInputCost] = useState();
    const [inputDescription, setInputDescription] = useState();
    const [inputRequirements, setInputRequirements] = useState();

    const navigate = useNavigate();
    const[userId] = useGlobalState('user');

    // submit image to server side
    async function handleSubmitImage(event){
        event.preventDefault();
        console.log(new FormData(document.getElementById("imageForm")))
        const response = await fetch('http://localhost:8080/upload', {
            method: 'POST',
            // headers: { 'Content-Type': 'multipart/form-data'},
            body: new FormData(document.getElementById("imageForm"))
        }).then(response => console.log(response.text().then((res)=>{
            setInputImageUrl(res)
            window.alert('Image uploaded!')
        })));
    };

    // submit form to create an activity
    const handleSubmit = (event) => {
        event.preventDefault();

        const activityCreateInput = {
            activityName: inputActivityName,
            imageUrl: inputImageUrlRef.current,
            startTime: startDate.toISOString().slice(0, 19)+'Z',
            endTime: endDate.toISOString().slice(0, 19)+'Z',
            location: inputLocation,
            description: inputDescription,
            numOfParticipants: inputNumOfParticipants,
            funds: inputCost,
            requirements: inputRequirements
        }
        // input validation
        if (!activityCreateInput.activityName ||
            !activityCreateInput.imageUrl ||
            !activityCreateInput.startTime ||
            !activityCreateInput.endTime ||
            !activityCreateInput.location ||
            !activityCreateInput.description ||
            !activityCreateInput.numOfParticipants ||
            !activityCreateInput.requirements){
            alert('All information is required!')
            return
        } else {
            activityCreate(activityCreateInput, userId)
            window.alert('Successfully created!')
            goToHome(navigate)
        }    
    };

    // data to be shown on page, to be passed as props to header component
    const detailToScreen = (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Create an activity
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <Grid container spacing={1} rowSpacing={1.5}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="activityName"
                                    label="Activity Name"
                                    type="activityName"
                                    id="activityName"
                                    onChange={(event) => {setInputActivityName(event.target.value)}}
                                />
                            </Grid>


                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="Start Time"
                                        name="startTime"
                                        id="startTime"
                                        value={startDate}
                                        onChange={(newValue) => {
                                            setStartDate(newValue);
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="End Time"
                                        name="endTime"
                                        id="endTime"
                                        value={endDate}
                                        onChange={(newValue) => {
                                            setEndDate(newValue);
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="location"
                                    label="Location"
                                    type="location"
                                    id="location"
                                    onChange={(event) => {setInputLocation(event.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="numOfParticipants"
                                    label="Expected number of participants"
                                    type="number"
                                    id="numOfParticipants"
                                    onChange={(event) => {setInputNumOfParticipants(event.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="cost"
                                    label="Estimated cost"
                                    type="number"
                                    id="cost"
                                    onChange={(event) => {setInputCost(event.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    multiline
                                    rows={4}
                                    name="description"
                                    label="Description"
                                    type="description"
                                    id="description"
                                    onChange={(event) => {setInputDescription(event.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    multiline
                                    rows={4}
                                    name="requirements"
                                    label="Requirements"
                                    type="requirements"
                                    id="requirements"
                                    onChange={(event) => {setInputRequirements(event.target.value)}}
                                />
                            </Grid>
                        </Grid>
                        <form action="http://localhost:8080/upload" id="imageForm" encType="multipart/form-data" target="image">
                            <Button
                                type="file"
                                component="label"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 1 }}
                                color="orange"
                            >Select Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="pic"
                                    name="pic"
                                    hidden
                                />
                            </Button>
                            <Button
                                type="submit"
                                component="label"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 1, mb: 2 }}
                                color="orange"
                            >Upload Image
                                <input type="submit" onClick={handleSubmitImage} hidden/>
                            </Button>

                        </form>
                        <iframe name="image" id="image" hidden></iframe>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="orange"
                        >
                            Create
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );

    if(userId == 0) {
        return <Navigate to="/signIn" replace />; // if not logged in, re-navigate to sign in
      } else {
            return <BackToTop isDetail={true} dataToScreen={detailToScreen}/>;
      }
}
