import jwt from "jsonwebtoken";

const isAuthenticate = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
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