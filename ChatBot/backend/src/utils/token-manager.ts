import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from './constants.js';
import { resolve } from 'path';

export const createToken = (id: string, email: string, expiresIn: string) => {
    const payload ={ id,email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};

//function for verifying the token of the user while logging in
export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
    
) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    //if the token is not found
    if (!token || token.trim() === ""){
        return res.status(401).json({message: "Token not received"});
    }

    return new Promise<void>((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success)=> {
            if(err){
                reject(err.message);
                return res.status(401).json({message: "Token Expired"});
            } else {
                resolve();
                res.locals.jwtData = success;
                return next(); //returning to the next middleware incase of no errors
            }
        })
    })
};