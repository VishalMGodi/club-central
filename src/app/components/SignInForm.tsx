'use client'
import React from 'react'
import { signIn, useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

const SignInForm = () => {
  var inputStyle = {borderRadius:"5px", width:"200px", height:"30px", backgroundColor:"rgba(0,0,0,0)"}
  var router = useRouter();

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    email: ""
  });

  const handleSubmitC = async (e: any) => {
    e.preventDefault();
    const response = await signIn('credentials', {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      redirect: false,
    });

    console.log("SignUpForm", response );
    if (!response?.error) {
      router.push('/');
      router.refresh();
    }
  };
  const handleSubmitG = async (e: any) => {
    e.preventDefault();
    const response = await signIn('google', {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
    }
    });

    console.log("SignUpForm", response );
    if (!response?.error) {
      router.push('/');
      router.refresh();
    }
  };



  return (<div id='box'
  style={{position:"absolute", left:"50%", top:"50%",transform:"translate(-50%, -50%)", backgroundColor:"white", width:"50%", height:"50%", textAlign: "center"}}>
    {/* <label htmlFor='username'>Username:</label><br />
    <input id="username" type="text" placeholder='new username' required pattern="[_A-Za-z0-9]{5,30}"
        value={formValues.username} onChange={(e) =>setFormValues({...formValues,username:e.target.value})}
        style={inputStyle}
        /><br /> */}
  
    <label htmlFor='username'>Email:</label><br/>
    <input id="email" type="email" placeholder='email' required
        value={formValues.email} onChange={(e) =>setFormValues({...formValues,email:e.target.value})}
        style={inputStyle}
        /><br />
    
    <label htmlFor='username'>Password:</label><br/>
    <input id="password" type="password" placeholder='password' required
        value={formValues.password} onChange={(e) =>setFormValues({...formValues,password:e.target.value})}
        style={inputStyle}
        /><br />
    <br/>
    <div style={{display:"flex", transform:"translateX(25%)"}}>
      <div style={{width:"125px", backgroundColor:"rgb(200,200,200)", borderRadius:"5px", height:"30px", textAlign: "center", lineHeight:"30px", marginRight:"3px"}}
        onMouseOver={e=>e.target.style.backgroundColor='rgb(180,180,180)'}
        onMouseOut={e=>e.target.style.backgroundColor='rgb(200,200,200)'}
        onClick={handleSubmitC}>SignIn</div>

      <div style={{width:"75px", backgroundColor:"rgb(54, 169, 253)", borderRadius:"5px", height:"30px", textAlign: "center", lineHeight:"30px"}}
        onMouseOver={e=>e.target.style.backgroundColor='rgb(34, 149, 233)'}
        onMouseOut={e=>e.target.style.backgroundColor='rgb(54, 169, 253)'}
        onClick={e=>{router.push("/api/auth/signUp");router.refresh()}}> SignUp</div>
    </div>
    {/* <div style={{width:"200px", backgroundColor:"rgb(238, 81, 81)", borderRadius:"5px", height:"30px", textAlign: "center", lineHeight:"30px", transform:"translateX(50%)", marginLeft:"3px"}}
      onMouseOver={e=>e.target.style.backgroundColor='rgb(218, 61, 61)'}
      onMouseOut={e=>e.target.style.backgroundColor='rgb(238, 81, 81)'}
      onClick={handleSubmitG}>SignIn with Google</div> */}

  </ div>)
}

export default SignInForm