import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.route.js";
import companyRouter from "./routes/company.route.js"
import jobRouter from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import morgan from "morgan";

dotenv.config({});

const app = express();

//middleware
const corsOptions = {
    origin: ["https://job-portal-chi-sooty.vercel.app","http://localhost:5173"],
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.use(cookieParser());
app.use(morgan('tiny'));
app.use(cookieParser(process.env.JWTPASSWORD));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'https://job-portal-chi-sooty.vercel.app');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });



//api's
app.use("/api/v1/user",userRouter);
app.use("/api/v1/user/company",companyRouter);
app.use("/api/v1/user/job",jobRouter);
app.use("/api/v1/user/application",applicationRoute);



const port = process.env.PORT || 3000;
app.listen(port,()=>{
    connectDB();
    console.log(`Server is running on port ${port}`);
})