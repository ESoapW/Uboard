import React, { useEffect } from "react";
import Button from '@mui/material/Button';
import { useParams } from "react-router";
import {Typography } from "@material-ui/core";
import CardMui from "../../components/Card";
import { StyledContainer, StyledCard, CardContainer } from "./style";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BackToTop from "../../components/header";
import useState from "react-usestateref";
import TextField from '@mui/material/TextField';
import { goToHome } from "../../Router/coordenation";
import { useNavigate, Navigate } from "react-router-dom";
import { useGlobalState } from "../../components/Context";

// Customized theme
const theme = createTheme({
  palette: {
      orange: {
          main: '#FFA500',
          dark: '#dc9003',
      }
  },
});

const Details = () => {
  const [detailCharacter, setDetailCharacter,detailCharacterRef] = useState({}); // activity details to be passed into card as props
  const { id } = useParams(); 
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData, setDataRef] = useState(); // data loaded from database
  const [comments, setComments, commentsRef] = useState();// comments state in the comments text box
  const [user] = useGlobalState('user'); // current logged in user

  const navigate = useNavigate();

  // get activity details from server
  async function showActivity() {
    setIsLoading(true);
    const query = `query activity{
        activity{
    activityId
    activityName
    imageUrl
    location
    numOfParticipants
    startTime
    endTime
    funds
    description
    requirements
    initializer{
      userName
      userId
    }}}`;
    const response = await fetch('http://localhost:8080/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query })
    }).then(response => response.json())
        .then(data => {
          setData(data)
        });
  }

  // map activity data to 'detailCharacter' state
  useEffect(() => {
    setIsLoading(true);
    showActivity();
    setTimeout(async () => {
      for(var i in setDataRef.current.data.activity){
        if(setDataRef.current.data.activity[i].activityId == id){
          const detail = {
            activityName:  setDataRef.current.data.activity[i].activityName,
            activityId : setDataRef.current.data.activity[i].activityId,
            imageUrl : setDataRef.current.data.activity[i].imageUrl,
            location : setDataRef.current.data.activity[i].location,
            numOfParticipants : setDataRef.current.data.activity[i].numOfParticipants,
            startTime : setDataRef.current.data.activity[i].startTime.replace('T',' ').replace('Z',''),
            endTime : setDataRef.current.data.activity[i].endTime.replace('T',' ').replace('Z',''),
            funds : setDataRef.current.data.activity[i].funds,
            description : setDataRef.current.data.activity[i].description,
            requirements : setDataRef.current.data.activity[i].requirements,
            initializerId : setDataRef.current.data.activity[i].initializer.userId,
            initializerName : setDataRef.current.data.activity[i].initializer.userName,
          }
          await setDetailCharacter(detail)
        }
      }
      await setIsLoading(false);
      console.log(detailCharacter);
    },700)
  }, []);

  // join an activity, create a new application and send to data base
  async function handleJoin() {
    // get query variables
    const applicationCreateInput = {comments: commentsRef.current}
    const applicantId = user
    const activityId = detailCharacter.activityId
    
    if(!applicationCreateInput.comments){
      alert('Comments required!')
      return
    } else {
      const query =  `mutation createApplication($applicationCreateInput: ApplicationCreateInput, $applicantId: Int, $activityId: Int){
          createApplication(applicationCreateInput: $applicationCreateInput,
          applicantId: $applicantId
          activityId: $activityId
          ){
            applicant{
              userId
              userName
            }
            activity{
              activityName
              activityId
            }
          }
        }`;
      const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables: { applicationCreateInput, applicantId, activityId} })
      });
      window.alert("Request sent!")
      goToHome(navigate)
    }
  };

  // data to be shown on page, to be passed as props to header component
  const detailToScreen = (
    <ThemeProvider theme={theme}>
      <StyledContainer>
        <CardContainer>
          <CardMui isDetail={true} character={detailCharacter} />
          <StyledCard>
            <Typography color='primary' variant='h5' component='h2'>
              {detailCharacter.activityName}
            </Typography>

            <Typography>&nbsp;</Typography>
              <Typography color='secondary'>Start Time: {detailCharacter.startTime}</Typography>
              <Typography color='secondary'>End Time: {detailCharacter.endTime}</Typography>
              <Typography color='secondary'>Location: {detailCharacter.location}</Typography>
              <Typography color='secondary'>Requirements: {detailCharacter.requirements}</Typography>
              <Typography color='secondary'>Activity Funds: {detailCharacter.funds}</Typography>
              <Typography color='secondary'>Number of participants: {detailCharacter.numOfParticipants}</Typography>
              <Typography color='secondary'>Activity Description: {detailCharacter.description}</Typography>
              <Typography color='secondary'>Organizer: {detailCharacter.initializerName}</Typography>
            <Typography>&nbsp;</Typography>

            {/* check if activity is created by current logged in user */}
            { (user != detailCharacterRef.current.initializerId) ?
            <Button
              type="submit"
              color="orange"
              variant="contained"
              onClick = {handleJoin}
            >
              Join
            </Button>
            :
            <Typography color='primary' variant='h5' component='h2'>This is your activity!</Typography>
            } 

            <Typography>&nbsp;</Typography>

            { (user != detailCharacterRef.current.initializerId) &&
            <TextField
                  required
                  multiline
                  rows={2}
                  name="comments"
                  label="Comments"
                  type="comments"
                  id="comments"
                  onChange={(event) => {setComments(event.target.value)}}
                />
                
            }

            { (user != detailCharacterRef.current.initializerId) &&
            <Typography>&nbsp;</Typography> }
            
            <Button
              onClick = {() => goToHome(navigate)}
              color="orange"
              variant="contained"
            >
              back
            </Button>

          </StyledCard>
        </CardContainer>
      </StyledContainer>
    </ThemeProvider>
  );

  if(user == 0) {
    return <Navigate to="/signIn" replace />; // if not logged in, re-navigate to sign in
  } else {
      return(
          isLoading ? (
              <div>Loading ...</div>
          ):(
              <BackToTop isDetail={true} dataToScreen={detailToScreen} />
          ));
    }
};

export default Details;
