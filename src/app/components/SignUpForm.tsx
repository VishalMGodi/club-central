'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import axios from 'axios'


const SignUpForm = () => {
    var router = useRouter();
    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
        dob: "",//"2023-11-07"
        email: ""
    });

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        console.log(formValues)

        var validate = await axios.get("http://localhost:4000/checkUser/", { params: {
            username: formValues.username,
            email: formValues.email,
            signup: true
        }})
        console.log("Checking",validate.data.length, validate)

        if (!validate.data.length){
            var reponse = await axios.post("http://localhost:4000/createUser", formValues)
            console.log(reponse.data);
            router.push('/api/auth/signIn');
        }
        else alert("username/email already exists");  
    }

    return (<form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input id="username" type="text" placeholder='new username' required
            value={formValues.username} pattern="[_A-Za-z0-9]{5,30}"
            onChange={(e) =>setFormValues({...formValues,username:e.target.value})}/><br />
      
        <label>Email:</label>
        <input id="email" type="email" placeholder='email' required
            value={formValues.email}
            onChange={(e) =>setFormValues({...formValues,email:e.target.value})}/><br />
        
        <label>Password:</label>
        <input id="password" type="" placeholder='password' required
            value={formValues.password}
            onChange={(e) =>setFormValues({...formValues,password:e.target.value})}/><br />
        
        <label>Date of Birth:</label>
        <input id="date_of_birth" type="date" required
            value={formValues.dob}
            onChange={(e) =>setFormValues({...formValues,dob:e.target.value})}/><br />
        <button type="submit">Submit</button>
    </form>)
}
export default SignUpForm;