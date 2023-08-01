const express=require('express')
const app=express()

const mongoose=require('mongoose')
const PORT=5000
const {MONGOURI}=require('./keys')
const sgMail=require('@sendgrid/mail')



 mongoose.connect(MONGOURI,{
 	useNewUrlParser:true,
 	useUnifiedTopology:true
 })
mongoose.connection.on('connected',()=>
{
	console.log("connected success")
})
mongoose.connection.on('error',(err)=>
{
	console.log("connected error",err)
})



const API_KEY =
'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';

sgMail.setApiKey(API_KEY)

const message={
	to: 'yadavhitesh340@gmail.com',
	from: 'yadavhitesh160@gmail.com',
	subject: 'Hello from Hitesh',
	text: 'Hello from Hitesh yadav',
	html:'<h1>Hello asdfgg</h1>', 
};

sgMail.send(message)
.then(response=>console.log('Email sent...'))
.catch(error=>console.log(error.message))

require('./models/user')
require('./models/post')

app.use(express.json())

app.use(require("./routes/auth"))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.listen(PORT,()=>
{
	console.log("server is running on port",PORT)
})