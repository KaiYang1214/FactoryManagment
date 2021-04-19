import styled from 'styled-components';

export const outputNode = styled.div`
border-radius: 5px;
font-family: sans-serif;
color: white;
border: solid 2px black;
overflow: visible;
font-size: 11px;
background-color: #444e7c;
&.selected {
    border: solid 2px rgb(0,192,255);
}
&.error {
    border: solid 2px #e04355;
}
`;

export const outputTitle = styled.div`
background: rgba(0, 0, 0, 0.3);
display: flex;
white-space: nowrap;
justify-items: center;
`;

export const outputTitleName = styled.div`
flex-grow: 1;
padding: 5px 5px;
`;

export const outputPortContainer = styled.div`
display: flex;
width: 100%;
background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
`;

export const outputPort = styled.div`
width: 15px;
height: 15px;
background: hsla(0,0%,100%,.1);

&:hover {
    background: rgb(192, 255, 0);
}

&:first-of-type {
    margin-right: 10px;
}

&:only-child {
    margin-right: 0px;
}
`;

export const outputPortLabelContainer = styled.div`
display: flex;
margin-top: 1px;
align-items: center;
flex: 1;
`;

export const outputPortLabel = styled.div`
padding: 0 5px;
flex-grow: 1;
`;

export const outputColWrapper = styled.div`
display: flex;
max-width: 200px;
flex-flow: wrap;
`;
