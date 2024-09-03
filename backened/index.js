import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.route.js";
import companyRouter from "./routes/company.route.js"
dotenv.config({});

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOption = {
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOption));

//api's
app.use("/api/v1/user",userRouter);
app.use("/api/v1/user/company",companyRouter);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    connectDB();
    console.log(`Server is running on port ${port}`);
})