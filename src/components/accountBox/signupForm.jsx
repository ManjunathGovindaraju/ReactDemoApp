import React, { useContext, useState } from "react";
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

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [waitingForCode, setWaitingForCode] = useState(false);
  const [code, setCode] = useState("");

  const signUp = (e) => {
    console.log("Signup-->");
    e.preventDefault();
    
    Auth.signUp({ username: email, password, attributes: { name, email } })
      .then((data) => {
        console.log(data);
        setWaitingForCode(true);
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const confirmSignUp = (e) => {
    e.preventDefault();

    Auth.confirmSignUp(email, code)
      .then((data) => {
        console.log(data);
        setWaitingForCode(false);
        setEmail("");
        setCode("");
        setName("");
        switchToSignin();
      })
      .catch((err) => console.log(err));
  };

  const resendCode = () => {
    Auth.resendSignUp(email)
      .then(() => {
        console.log("code resent successfully");
      })
      .catch((e) => {
        console.log(e);
      });
      
  };
  return (
    <BoxContainer>
      {!waitingForCode && ( <FormContainer> 
        <Input type="text" placeholder="Full Name"  value={name} onChange={(e) => setName(e.target.value)}/>
        <Input type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <Input type="password" placeholder="Confirm Password" />
        
      </FormContainer>
      )}
      {waitingForCode && (
        <Input type="text" placeholder="Confirmation Code"  value={code} onChange={(e) => setCode(e.target.value)}/>
      )}
      
     
      <Marginer direction="vertical" margin={10} />
      {!waitingForCode && (
      <SubmitButton type="submit" onClick={signUp}>Submit</SubmitButton> 
      )}

      {waitingForCode && (
      <SubmitButton type="submit" onClick={confirmSignUp}>Confirm</SubmitButton> 
      )}


      <Marginer direction="vertical" margin="1em" />
      
      
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Sign-in
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
