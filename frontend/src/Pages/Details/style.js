import styled from "styled-components";

export const StyledContainer = styled.div`
  margin:5% auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardContainer = styled.div`
  display: flex;
  background: rgba(243, 144, 47, 0.35);
  padding: 2px;
  border-radius: 15px;
  box-shadow: 0 0 1px white;
 
  @media(max-width:500px){
  flex-direction: column;
  padding: 1px
  }

`;

export const StyledCard = styled.div`
  width: 25vw;
  color: white;
  padding:30px 20px;



  @media(max-width:500px){
  flex-direction: column;
  padding: 10px  5px;
  margin: 2px auto;
  width: 80%;

  }

`;



