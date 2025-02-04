import jwt from "jsonwebtoken";

const isAuthenticate = async(req,res,next)=>{
    // console.log(req.signedCookies.token);

    try {
        const token = req.signedCookies.token;
        console.log('token: ',token);
        if(!token){
            res.status(401).json({
                message:"user not authenticate",
                sucess:false
            })
        }

        const decode = jwt.verify(token,process.env.JWTPASSWORD);
        if(!decode){
            res.status(401).json({
                message:"Invalid token",
                sucess:false
            })
        }
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}

export default isAuthenticate;