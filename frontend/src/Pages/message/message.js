import * as React from 'react';
import useState from "react-usestateref";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {DataGrid} from '@mui/x-data-grid';
import BackToTop from "../../components/header";
import {useEffect} from "react";
import { useGlobalState } from "../../components/Context";
import { Navigate } from 'react-router-dom';

// customized theme
const theme = createTheme({
    palette: {
        orange: {
            main: '#FFA500',
            dark: '#dc9003',
        }
    },
});

export default function Message() {
    const applications = new Set(); // array to store raw data
    const [data, setData, setDataRef] = useState(); // raw data loaded from database
    const [isLoading, setIsLoading] = useState(true); 
    const [data1, setData1, setData1Ref] = useState(); // new data manipulated into arrays, to be loaded into data grid
    const [gridData, setGridData, gridDataRef] = useState(); // selected row in grid

    const[userId] = useGlobalState('user');

    // get message data from database
    async function showMessage(userId) {
        setIsLoading(true);
        const query = `query userWithUserId($userId: Int){
          userWithUserId(userId: $userId){
            initializedActivityList{
              applications{
                applicationId
                applicationStatus
                activity{
                  activityName
                }
                applicant{
                  userName
                  userGrade
                  userSchool
                  email
                  phoneNumber
                }
                comments
        }}}}`;
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query, variables: { userId } })
        }).then(response => response.json())
            .then(data => {
                setData(data)
            });
    }

    // load grid data
    useEffect(() => {
        setIsLoading(true);
        showMessage(userId);
        setTimeout(async () => {
            var idNum = 1
            for(var message in setDataRef.current.data.userWithUserId.initializedActivityList){
                if(setDataRef.current.data.userWithUserId.initializedActivityList[message].applications.length != 0){
                    for(var i in setDataRef.current.data.userWithUserId.initializedActivityList[message].applications){

                        const application = {
                            id: idNum,
                            activityName: setDataRef.current.data.userWithUserId.initializedActivityList[message].applications[i].activity.activityName,
                            name: setDataRef.current.data.userWithUserId.initializedActivityList[message].applications[i].applicant.userName,
                            school:setDataRef.current.data.userWithUserId.initializedActivityList[message].applications[i].applicant.userSchool,
                            grade:setDataRef.current.data.userWithUserId.initializedActivityList[message].applications[i].applicant.userGrade,
                            email:setDataRef.current.data.userWithUserId.initializedActivityList[message].applications[i].applicant.email,
                            phone:setDataRef.current.data.userWithUserId.initializedActivityList[message].applications[i].applicant.phoneNumber,
                            comments:setDataRef.current.data.userWithUserId.initializedActivityList[message].applications[i].comments,
                            status:setDataRef.current.data.userWithUserId.initializedActivityList[message].applications[i].applicationStatus,
                            applicationId:setDataRef.current.data.userWithUserId.initializedActivityList[message].applications[i].applicationId,
                        }
                        idNum += 1
                        await applications.add(application);
                    }
                }
            }
            await setData1(Array.from(applications))
            await setIsLoading(false);
        },700)
    }, []);

    // accept an application
    async function handleClickAccept() {
      const appId = gridDataRef.current.applicationId
      const query =  `mutation applicationApprove($appId: Int ){
          applicationApprove(applicationId: $appId){
            applicationId
            applicationStatus
          }
        }`;
      const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables: { appId } })
      });
      window.location.reload()
    };

    // reject an application
    async function handleClickReject() {
      const appId = gridDataRef.current.applicationId
      const query =  `mutation applicationDeny($appId: Int ){
          applicationDeny(applicationId: $appId){
            applicationId
            applicationStatus
          }
        }`;
      const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables: { appId } })
      });
      window.location.reload()
    };

  // data to be shown on page, to be passed as props to header component
  const columns = [
    { field: 'status', headerName: 'Status', sortable: true, width: 130 },
    { field: 'activityName', headerName: 'Activity Name', width: 150 },
    { field: 'name', headerName: 'Applicant Name', sortable: false, width: 130 },
    { field: 'school', headerName: 'School', width: 130 },
    { field: 'grade', headerName: 'Grade', width: 130 },
    { field: 'email', headerName: 'Email', sortable: false, width: 200 },
    { field: 'phone', headerName: 'PhoneNumber', sortable: false, width: 130 },
    { field: 'comments', headerName: 'Comments', sortable: false, width: 200 },

  ];

  const detailToScreen = (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="lg">
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
          Messages
        </Typography>

        <div style={{ height: 400, width: '100%', marginTop: '25px'}}>
            <DataGrid
              initialState={{
                sorting: {
                  sortModel: [{ field: 'status', sort: 'asc' }],
                },
              }}
                name="message"
                rows={data1}
                onSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);
                  const selectedRowData = data1.filter((row) =>
                    selectedIDs.has(row.id)
                  );
                  setGridData(selectedRowData[0])
                  console.log(gridDataRef.current)
                }}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection={false}
                rowSelection
            />
        </div>

        <div style={{ display:'flex'}}>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, mr:5 }}
                color="orange"
                onClick={handleClickAccept}
                >
                Accept
            </Button>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, ml:5 }}
                color="orange"
                onClick={handleClickReject}
                >
                Reject
            </Button>
        </div>

    </Box>
    </Container>
  </ThemeProvider>
  );

  if(userId == 0) {
    return <Navigate to="/signIn" replace />; // if not logged in, re-navigate to sign in
  } else {
      return(
          isLoading ? (
              <div>Loading ...</div>
              ) : (
                  <BackToTop isDetail={true} dataToScreen={detailToScreen} />
              ));
    }
}
