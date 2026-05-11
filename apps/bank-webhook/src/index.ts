import express from 'express';
import {PaymentTypes} from "../lib/PaymentTypes" ; 
import prisma from "@repo/db/client";
import {OnRampStatus} from "@prisma/client" ; 
import z from "zod" ; 
const app = express();
app.use(express.json()) ; 
app.post("/hdfcWebhook", async (req, res) => {
    
    const paymentInformation: {
        token: string, 
        userId: number, 
        amount: number 
    } = { token: req.body.token, userId: req.body.user_identifier , amount: req.body.amount } 
    const parseTypes = PaymentTypes.safeParse(paymentInformation) ; 
    if(!parseTypes.success){ 
        return res.status(401).json({ 
            msg :"Received Invalid input, send correct input" 
        });  
    }


    try {
        await prisma.$transaction([
            prisma.balance.update({
                where: {
                    userId: paymentInformation.userId
                },
                data: {
                    amount: {
                        increment: (paymentInformation.amount * 100 )
                    },
                }
            }),
            prisma.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: OnRampStatus.Success
                }
            })
        ])
        return res.status(200).json({
            msg: "captured"
        })
    }
    catch (e) {
        console.log(e) ; 
        return res.status(501).json({
            msg : "error during, processing webhook"
        })
    }

})

app.listen(3002, ()=>{
    console.log("server is listening on port 3002")
})