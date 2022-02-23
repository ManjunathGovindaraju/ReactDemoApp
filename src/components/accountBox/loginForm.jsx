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




export function LoginForm(props) {
    const { switchToSignup } = useContext(AccountContext);
    const { switchToWelcome } = useContext(AccountContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signIn = (e) => {
      e.preventDefault();
      Auth.signIn({
        username: email,
        password,
      })
        .then((user) => {
          setEmail("");
          setPassword("");
          console.log(user);
          switchToWelcome();
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forgot your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={signIn}>Login</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Sign-up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
