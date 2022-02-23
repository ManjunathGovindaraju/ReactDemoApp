import React, { useContext, useState  } from "react";
import { Auth } from "aws-amplify";


import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

const getUserName = async ()  => {
  const userInfo = await Auth.currentUserInfo();
  console.log('userInfo', userInfo);
  return userInfo.attributes['name']
};


export function WelcomePage(props) {
  const { switchToSignup } = useContext(AccountContext);
   
  return (
    <BoxContainer>
    
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#"> Happy Testing... </MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
    
    </BoxContainer>
  );
}
