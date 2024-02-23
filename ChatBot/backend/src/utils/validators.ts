import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";


export const validate= (validations: ValidationChain[] ) => {
    return async (req:Request, res:Response, next:NextFunction) => {
        for(let validation of validations){
            const result= await validation.run(req);
            if(!result.isEmpty()){
                break;
            }
        }
        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        //error when data cannot be processed
        return res.status(422).json({errors:errors.array() });
    };
};

export const loginValidator=[
    body("email").trim().isEmail().withMessage("Email Id is required"),
    body("password").trim().isLength({ min:6 }).withMessage("Password is required to have 6 characters"),

];

export const signupValidator=[
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
];

export const chatCompletionValidator =[
    body("message").notEmpty().withMessage("Message is required"),
];