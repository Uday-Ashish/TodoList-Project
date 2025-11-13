const jwt = require("jsonwebtoken");


module.exports = async (req, res, next) => {

    try {

        const token = req.headers["authorization"].split(" ")[1];

        jwt.verify(token, process.env.JWT_SEC, (err,decode) => {
            if(err){
                return res.status(500).send(
                    {
                        success: false,
                        message: "Unauthorized - User",
                    }
                );
            }else {
                req.user = { id : decode.id};
                console.log(` decode id : ${decode.id}`);
                next();
            }
        });
    }catch (error){
        console.log(error);
        res.status(400).send({
            success: false,
            message : "please provide auth token",
            error,
        })
    }
}