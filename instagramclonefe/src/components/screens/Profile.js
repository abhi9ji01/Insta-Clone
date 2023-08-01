import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import { AiFillEdit } from 'react-icons/ai';
import { Modal, Input } from 'antd';


const Profile  = ()=>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newName, setNewName] = useState('');

    const handleName = () => {
    setIsModalVisible(true);
    };

    const handleOk = () => {
    setName(newName);
    setIsModalVisible(false);
    };

    const handleCancel = () => {
    setIsModalVisible(false);
    };


    useEffect(()=>{
       fetch('/mypost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setPics(result.mypost)
       })
    },[])
    useEffect(()=>{
       if(image){
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","instaClone")
        data.append("cloud_name","deplzc6zz")
        fetch("https://api.cloudinary.com/v1_1/deplzc6zz/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
    
       
           fetch('/updatepic',{
               method:"put",
               headers:{
                   "Content-Type":"application/json",
                   "Authorization":"Bearer "+localStorage.getItem("jwt")
               },
               body:JSON.stringify({
                   pic:data.url
               })
           }).then(res=>res.json())
           .then(result=>{
               console.log(result)
               localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
               dispatch({type:"UPDATEPIC",payload:result.pic})
               //window.location.reload()
           })
       
        })
        .catch(err=>{
            console.log(err)
        })
       }
    },[image])

    useEffect(() => {
        if (name) {
            fetch('/updatename', {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    name
                })
            })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                localStorage.setItem("user", JSON.stringify({...state, name: result.name}))
                dispatch({type: "UPDATENAME", payload: result.name})
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [name])

    
    useEffect(() => {
        if (email) {
            fetch('/updateemail', {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    email
                })
            })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                localStorage.setItem("user", JSON.stringify({...state, email: result.email}))
                dispatch({type: "UPDATEEMAIL", payload: result.email})
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [email])
    
    
    const updatePhoto = (file)=>{
        setImage(file)
    }
      
      const handleEmail = () => {
        const newEmail = prompt("Enter new email:");
        if (newEmail) {
          setEmail(newEmail);
        }
      };
      
   return (
       <div style={{maxWidth:"600px",margin:"0px auto"}}>
           <div style={{
              margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>

         
           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={state?state.pic:"loading"}
                   />
                 
               </div>
               <div>
                   <h4>{state?state.name:"loading"}<AiFillEdit onClick={handleName}/><Modal
      title="Update Name"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Enter new name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
    </Modal></h4>
                   <h5>{state?state.email:"loading"}<AiFillEdit onClick={handleEmail}/></h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{mypics.length} posts</h6>
                       <h6>{state?state.followers.length:"0"} followers</h6>
                       <h6>{state?state.following.length:"0"} following</h6>
                   </div>

               </div>
           </div>
        
            <div className="file-field input-field" style={{margin:"10px"}}>
            <div className="btn #64b5f6 blue darken-1">
                <span>Update pic</span>
                <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            </div>      
           <div className="gallery">
               {
                   mypics.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                       )
                   })
               }

           
           </div>
       </div>
   )
}


export default Profile