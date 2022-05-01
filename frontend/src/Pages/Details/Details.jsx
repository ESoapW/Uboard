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
  const [detailActivity, setDetailActivity, detailActivityRef] = useState({}); // activity details to be passed into card as props
  const { id } = useParams(); 
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData, setDataRef] = useState(); // data loaded from database
  const [comments, setComments, commentsRef] = useState();// comments state in the comments text box
  const [user] = useGlobalState('user'); // current logged in user
  const [isJoined, setIsJoined, isJoinedRef] = useState(false);

  const navigate = useNavigate();

  // get activity details from server
  async function showActivity() {
    setIsLoading(true);
    const query = `query activity{
        activity{
          activityId
          activityName
          participants{
            userId
          }
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

  // map activity data to 'detailActivity' state
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
            participants : setDataRef.current.data.activity[i].participants,
          }
          await setDetailActivity(detail)
          // check if user already joined the activity
          setIsJoined(detailActivityRef.current.participants.filter(participant => participant.userId == user).length > 0)
        }
      }
      await setIsLoading(false);
    },700)
  }, []);

  // join an activity, create a new application and send to data base
  async function handleJoin() {
    // get query variables
    const applicationCreateInput = {comments: commentsRef.current}
    const applicantId = user
    const activityId = detailActivity.activityId
    
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
          <CardMui isDetail={true} activity={detailActivity} />
          <StyledCard>
            <Typography color='primary' variant='h5' component='h2'>
              {detailActivity.activityName}
            </Typography>

            <Typography>&nbsp;</Typography>
              <Typography color='secondary'>Start Time: {detailActivity.startTime}</Typography>
              <Typography color='secondary'>End Time: {detailActivity.endTime}</Typography>
              <Typography color='secondary'>Location: {detailActivity.location}</Typography>
              <Typography color='secondary'>Requirements: {detailActivity.requirements}</Typography>
              <Typography color='secondary'>Activity Funds: {detailActivity.funds}</Typography>
              <Typography color='secondary'>Number of participants: {detailActivity.numOfParticipants}</Typography>
              <Typography color='secondary'>Activity Description: {detailActivity.description}</Typography>
              <Typography color='secondary'>Organizer: {detailActivity.initializerName}</Typography>
            <Typography>&nbsp;</Typography>

            {/* check if activity is created by current logged in user */}
            {/* If user created or joined the activity, join button will not be shown */}
            { (user != detailActivityRef.current.initializerId) && !isJoinedRef.current ?
            <Button
              type="submit"
              color="orange"
              variant="contained"
              onClick = {handleJoin}
            >
              Join
            </Button>
            :
              ( isJoinedRef.current ?
              <Typography color='primary' variant='h5' component='h2'>You have joined this activity!</Typography>
            : <Typography color='primary' variant='h5' component='h2'>You created this activity!</Typography>
              )
            } 

            <Typography>&nbsp;</Typography>

            { (user != detailActivityRef.current.initializerId) && 
               !isJoinedRef.current &&
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

            { (user != detailActivityRef.current.initializerId) &&
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
