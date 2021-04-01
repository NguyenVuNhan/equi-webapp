import styled from 'styled-components';


const Equi = styled.div`
background: black;
border-radius: 50%;
width: 1080px;
height: 1080px;
border: 5px solid green;
margin-top: 120px;
position: absolute;
display: flex;
flex-direction:row;
justify-content: center;
`

export const CablesArea = styled.div`
height: 370px;
width: 100px;
background: white;
`

export const Potentiometer = styled.div`
background: white;
border-radius: 50%;
width: 400px;
height: 400px;
margin-top: 340px;
position: absolute;
`
export const Button = styled.div`
background: white;
border-radius: 50%;
width: 150px;
height: 150px;
border: 5px solid red;
margin-top: 60%;
position: absolute;
display: flex;
justify-content: center;
`

export const ForCircle = styled.div`
display:flex;
flex-direction:column;
border:10px solid yellow;
margin-left:-50%;
`
export default Equi;