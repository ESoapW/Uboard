import React, {useEffect} from "react";
import CardMui from "../../components/Card";
import BackToTop from '../../components/header';
import { StyledGrid, StyledCard } from "./style";
import useState from "react-usestateref";
import { useGlobalState } from "../../components/Context";
import { Navigate } from "react-router-dom";

// this page is almost same as Home
const Home = () => {
    const [searchData,setSearchData ] = React.useState('');
    const activitys = new Set();
    const [data, setData, setDataRef] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [data1, setData1, setData1Ref] = useState(); // filtered data

    const[user] = useGlobalState('user');

    async function showActivity(userId) {
        setIsLoading(true);
        const query = `query userWithUserId($userId: Int){
            userWithUserId(userId: $userId){
              userName
              userId
              participatedActivityList{
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
                }
        }}}`;
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query,variables: { userId } })
        }).then(response => response.json())
            .then(data => {
                setData(data)
            });
    }

    useEffect( () => {
        setIsLoading(true);
        showActivity(user);
        setTimeout(async () => {
            // filter the activities joined by user
            for(var i in setDataRef.current.data.userWithUserId.participatedActivityList){
                const activity = {
                    activityName: setDataRef.current.data.userWithUserId.participatedActivityList[i].activityName,
                    activityId: setDataRef.current.data.userWithUserId.participatedActivityList[i].activityId,
                    imageUrl: setDataRef.current.data.userWithUserId.participatedActivityList[i].imageUrl,
                    location: setDataRef.current.data.userWithUserId.participatedActivityList[i].location,
                    numOfParticipants: setDataRef.current.data.userWithUserId.participatedActivityList[i].numOfParticipants,
                    startTime: setDataRef.current.data.userWithUserId.participatedActivityList[i].startTime,
                    endTime: setDataRef.current.data.userWithUserId.participatedActivityList[i].endTime,
                    funds: setDataRef.current.data.userWithUserId.participatedActivityList[i].funds,
                    description: setDataRef.current.data.userWithUserId.participatedActivityList[i].description,
                    requirements: setDataRef.current.data.userWithUserId.participatedActivityList[i].requirements,
                    initializerId: setDataRef.current.data.userWithUserId.participatedActivityList[i].initializer.userId,
                    initializerName: setDataRef.current.data.userWithUserId.participatedActivityList[i].initializer.userName
                }
                await activitys.add(activity);
            }
            await setData1(Array.from(activitys))
            await setIsLoading(false);
        },700)
    }, []);


  const dataToHome = (dataFromHeader) => {
    setSearchData(dataFromHeader)
  }

  const dataToScreen =
    data1 &&
    data1.length &&
    data1.filter(item => {
        return (item.activityName).toLowerCase().includes(searchData.toLowerCase())
      })
      .map((activity) => {
        return (
          <StyledCard key={activity.activityId}>
            <CardMui activity={activity} />
          </StyledCard>
        );
      });

  const dataToScreenAfterResponsible = <StyledGrid>
      {dataToScreen}
    </StyledGrid>
  
  if(user == 0) {
    return <Navigate to="/signIn" replace />; // if not logged in, re-navigate to sign in
  } else {
      return(
          isLoading ? (
              <div>Loading ...</div>
          ) : (
              <>
                  <BackToTop
                      dataToScreen={dataToScreenAfterResponsible}
                      dataToHome={dataToHome}
                      isLoggedIn={true}
                  />
              </>
          ));
    }
};

export default Home;
