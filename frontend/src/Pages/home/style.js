import styled from 'styled-components';



export const StyledGrid = styled.div`
display:grid;
margin: 10px auto;
grid-template-columns:  1fr 1fr 1fr 1fr;


@media(max-width:1200px){
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 5px auto;
    max-width: 90%; 
}

@media(max-width:910px){
    display: grid;
    grid-template-columns: 1fr 1fr;
       margin: 5px auto;
    width: 70%; 
}

@media(max-width:620px){
    display: grid;
    grid-template-columns: 1fr;
    justify-content:center;
    align-items:center;
    margin: 5px auto;
    width: 50%; 
}
`
export const StyledCard = styled.div`
width: 300px;
height: 380px;
`