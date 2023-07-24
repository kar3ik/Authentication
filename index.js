const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes")
const {notFound , errorHandler} = require("./middleware/errorMiddleware")
const conectDB =require('./config/db');
const cookieParser = require('cookie-parser')



conectDB()

dotenv.config();
const port= process.env.PORT || 5000

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api/users",userRoutes)

app.get('/',(req,res)=>{
  res.send("server is ready")
})


app.use(notFound)
app.use(errorHandler)


app.listen(4000, () => {
    console.log(`Server started on ${port} `);
  });

