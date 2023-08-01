import React,{useState,useContext} from 'react'

import {Link,useNavigate,useParams} from 'react-router-dom'
import M from 'materialize-css'

const SignIn=()=>{

	const navigate=useNavigate()
    const[password,setPassword]=useState("")
    const {token}=useParams()

    const PostData=()=>{
        fetch("/new-password",{method:"post",headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            password,
            token
        })
        }).then(res=>res.json())
        .then(data=>{
             if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else
            {
                M.toast({html:data.message,classes:"#388e3c green darken-2"})
                navigate('/signin')
            }
        }).catch(err=>{
            console.log(err)
        })

    }


return (
	<div className="mycard">
	<div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>PostData()}>
            Update password
        </button>

          
      </div>
	</div>
	)
}

export default SignIn