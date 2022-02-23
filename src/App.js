import React, { useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import Amplify from "aws-amplify";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  useEffect(() => {
    Amplify.configure({
      Auth: {
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      },
    });
  });
  return (
    <AppContainer>
      <AccountBox />
    </AppContainer>
  );
}

export default App;
