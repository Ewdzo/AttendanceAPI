import { Request, Response } from "express";

export const authReq = (permissions : String[]) => {
    return (req : Request, res : Response, next : Function) => {

        const userRole = req.body.role;
        if(!permissions.includes(userRole)) return res.status(401).send({ error: "Unauthorized Access"});
        
        next();
    }
}