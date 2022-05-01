import React, {useEffect} from "react";
import CardMui from "../../components/Card";
import BackToTop from '../../components/header';
import { StyledGrid, StyledCard } from "./style";
import useState from "react-usestateref";
import { Navigate} from "react-router-dom";
import { useGlobalState } from "../../components/Context";

const Home = () => {
    const [searchData,setSearchData ] = useState(''); // text in the search box
    const activitys = new Set(); // activities to show
    const [data, setData, setDataRef] = useState(); // raw activities data from backend
    const [isLoading, setIsLoading] = useState(true); // check if the async showActivity() finished
    const [data1, setData1, setData1Ref] = useState(); // activities data after mapping

    const[user] = useGlobalState('user'); // get current logged in user

    // get activity data from database
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
            }).catch(err => console.log(err));
    }

    // load activities data
    useEffect( () => {
        setIsLoading(true);
        showActivity();
        setTimeout(async () => {
            for(var i in setDataRef.current.data.activity){
                const activity = {
                    activityName: setDataRef.current.data.activity[i].activityName,
                    activityId: setDataRef.current.data.activity[i].activityId,
                    imageUrl: setDataRef.current.data.activity[i].imageUrl,
                    location: setDataRef.current.data.activity[i].location,
                    numOfParticipants: setDataRef.current.data.activity[i].numOfParticipants,
                    startTime: setDataRef.current.data.activity[i].startTime,
                    endTime: setDataRef.current.data.activity[i].endTime,
                    funds: setDataRef.current.data.activity[i].funds,
                    description: setDataRef.current.data.activity[i].description,
                    requirements: setDataRef.current.data.activity[i].requirements,
                    initializerId: setDataRef.current.data.activity[i].initializer.userId,
                    initializerName: setDataRef.current.data.activity[i].initializer.userName
                }
                await activitys.add(activity);
            }
            await setData1(Array.from(activitys))
            await setIsLoading(false);
        },700)
    }, []);

  // load data after searching
  const dataToHome = (dataFromHeader) => {
    setSearchData(dataFromHeader)
  }

  // search feature, filter the data after searching
  const dataToScreen =
    data1 &&
    data1.length &&
    data1.filter(item => {
        //console.log(item)
        return (item.activityName).toLowerCase().includes(searchData.toLowerCase())
      })
      .map((activity) => {
        return (
          <StyledCard key={activity.activityId}>
            <CardMui activity={activity} />
          </StyledCard>
        );
      });

  // final data shown on the page
  const dataToScreenAfterResponsible = <StyledGrid>
      {dataToScreen}
    </StyledGrid>


  if(user == 0) {
    return <Navigate to="/signIn" replace />; // if not logged in, re-navigate to sign in
  } else {
      return(
          isLoading ? (
              <div>Loading ...</div> // render after async process finish
          ) : (
              <>
                  <BackToTop
                      dataToScreen={dataToScreenAfterResponsible}
                      dataToHome={dataToHome}
                  />

              </>
          ));
         }
};

export default Home;
