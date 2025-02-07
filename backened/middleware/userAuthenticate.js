import jwt from "jsonwebtoken";

const isAuthenticate = async(req,res,next)=>{
    // console.log(req.signedCookies.token);
    try {
        const token = req.signedCookies.token;
        // console.log('token: ',token);
        if(!token){
            console.log("User not authenticate");
            return res.status(401).json({
                message:"user not authenticate",
                sucess:false
            })
        }
        
        const decode = jwt.verify(token,process.env.JWTPASSWORD);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                sucess:false
            })
        }
        req.id = decode.userId;
        // console.log(req.id);
        next();
    } catch (error) {
        console.log("Error");
        console.log(error);
    }
}

export default isAuthenticate;