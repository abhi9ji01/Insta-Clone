import React,{useContext, useState} from 'react';

import { ListGroupItem } from 'react-bootstrap';

import {Link} from 'react-router-dom'
import { UserContext } from '../../App';

export const Suggestion=({user})=>{
    // console.log(user)
    const {state,dispatch} = useContext(UserContext)
    const [showfollow,setShowFollow] = useState(true)



    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:user._id
            })
        }).then(res=>res.json())
        .then(data=>{
        
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
             setShowFollow(false)
             console.log(user.name+"is followed")
        })
    }
    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:user._id
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
             console.log(user.name+"is unfollowed")
             setShowFollow(true)
             
        })
    }

    return (
        <ListGroupItem >
                        <div className="flex align-items-center">
                            <Link to={user._id !== state._id?"/profile/"+user._id :"/profile"  }>
                                <img
                                    src={user.pic}
                                    alt="User Avatar"
                                    height={50+"px"}
                                    width={50+"px"}
                                    className="rounded-circle mr-3"
                                    />
                            </Link>
                            <span style={{position: "relative",top: -15+"px",left: 10+"px"}}>{user.name}</span>
                            
                            {showfollow?
                                <button style={{float:'right'}} className="btn btn-sm btn-green float-right"
                                    onClick={()=>followUser()}
                                    >Follow</button>
                                : 
                                <button style={{float:'right'}} className="btn btn-sm btn-red float-right"
                                    onClick={()=>unfollowUser()}
                                    >UnFollow</button>
                            }
                        </div>
                        </ListGroupItem>
    )
}