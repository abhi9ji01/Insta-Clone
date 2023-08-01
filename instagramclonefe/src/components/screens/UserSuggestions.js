import React, { useContext, useEffect, useState } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Suggestion } from './Suggestion';
import {HiOutlineLightBulb} from 'react-icons/hi'


const UserSuggestions = () => {
    const [randomUser,setRandomUsers]=useState();

    useEffect(() => {
        console.log("here in frontEnd")
        fetch('/random-users')
        .then(response => {
          return response.json();
        })
        .then(data => {
          setRandomUsers(data.users);
        //   console.log(randomUser)
        })
        .catch(error => {
          console.log(error);
        });
      }, []);

  return (
    <Card style={{    flex: 3,
        margin: 20+"px",
        height: 500+"px",
        overflow: "hidden",
        height: "fit-content",
        padding: 10+"px"}}>
      <Card.Header style={{padding: 10+"px",fontSize: 20+"px",outline: "auto",fontWeight: "bolder",marginBottom:"10px"}}><HiOutlineLightBulb color='black' style={{marginRi
    :"2px",fontSize:"22px"}}/>Suggestions for You</Card.Header>
      <ListGroup variant="flush">
        {
            randomUser?randomUser.map((data)=>{
                return (
                    <Suggestion key={data._id} user={data}/>
                )
            }):""
        }
      


      </ListGroup>
    </Card>
  );
};

export default UserSuggestions;
