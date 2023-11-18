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



  return (<div id='box'
  style={{position:"absolute", left:"50%", top:"50%",transform:"translate(-50%, -50%)", backgroundColor:"white", width:"50%", height:"50%", textAlign: "center"}}>
    <label htmlFor='username'>Username:</label><br />
    <input id="username" type="text" placeholder='new username' required pattern="[_A-Za-z0-9]{5,30}"
        value={formValues.username} onChange={(e) =>setFormValues({...formValues,username:e.target.value})}
        style={inputStyle}
        /><br />
  
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

    <div style={{display:"flex", transform:"translateX(25%)"}}>
      <div style={{width:"150px", backgroundColor:"rgb(200,200,200)", borderRadius:"5px", height:"30px", textAlign: "center", lineHeight:"30px"}}
        onMouseOver={e=>e.target.style.backgroundColor='rgb(180,180,180)'}
        onMouseOut={e=>e.target.style.backgroundColor='rgb(200,200,200)'}
        onClick={handleSubmitC}>SignIn</div>

      <div style={{width:"50px", backgroundColor:"rgb(54, 169, 253)", borderRadius:"5px", height:"30px", textAlign: "center", lineHeight:"30px"}}
      onMouseOver={e=>e.target.style.backgroundColor='rgb(34, 149, 233)'}
      onMouseOut={e=>e.target.style.backgroundColor='rgb(54, 169, 253)'}
      onClick={e=>{router.push("/api/auth/signUp")}}> SignUp</div>
    </div>

  </ div>)
  return (
        <div className="paage">
          <div className="signin">
            <div className="card">
              <div className="provider">
                <form action="http://localhost:3000/api/auth/signin/github" method="POST">
                  <input type="hidden" name="csrfToken" value="0a7ccfdf7ec331c343910ff3bce1c2305e2d7977c782c65d75f9f6abe3b84d4b" />
                  <input type="hidden" name="callbackUrl" value="/community" />
                  <button type="submit" className="button">
                    <img loading="lazy" height="24" width="24" id="provider-logo" src="https://authjs.dev/img/providers/github.svg" />
                    <span>Sign in with GitHub</span>
                  </button>
                </form>
              </div>
              <div className="provider">
                <form action="http://localhost:3000/api/auth/signin/google" method="POST">
                  <input type="hidden" name="csrfToken" value="0a7ccfdf7ec331c343910ff3bce1c2305e2d7977c782c65d75f9f6abe3b84d4b" />
                  <input type="hidden" name="callbackUrl" value="/community" />
                  <button type="submit" className="button">
                    <img loading="lazy" height="24" width="24" id="provider-logo" src="https://authjs.dev/img/providers/google.svg" />
                    <span>Sign in with Google</span>
                  </button>
                </form>
              </div>
              <div className="provider">
                <hr/><form action="http://localhost:3000/api/auth/callback/credentials" method="POST">
                      <input type="hidden" name="csrfToken" value="0a7ccfdf7ec331c343910ff3bce1c2305e2d7977c782c65d75f9f6abe3b84d4b" />
                      <div>
                        <label className="section-header" >Username:</label>
                        <input name="username" id="input-username-for-credentials-provider" type="text" placeholder="Your Username" />
                      </div>
                      <div>
                        <label className="section-header" >Email:</label>
                        <input name="email" id="input-email-for-credentials-provider" type="text" placeholder="Your Email" />
                      </div>
                      <div>
                        <label className="section-header" htmlFor="input-password-for-credentials-provider">Password:</label>
                        <input name="password" id="input-password-for-credentials-provider" type="text" placeholder="Your Password"  />
                      </div>
                      <button type="submit">Sign in with Credentials</button>
                    </form>
              </div>
            </div>
          </div>
        </div>
  )
}

export default SignInForm