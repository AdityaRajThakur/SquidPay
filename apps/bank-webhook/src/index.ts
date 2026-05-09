import express from 'express';
import z from "zod" ; 
import {PaymentTypes} from "../lib/PaymentTypes" ; 
import prisma from "@repo/db/client";
const app = express();
app.use(express.json()) ; 
app.post("/hdfcWebhook", async (req, res) => {
    
    const paymentInformation: {
        token: string,
        userId: number,
        amount: number
    } = { token: req.body.token, userId: req.body.user_identifier, amount: req.body.amount }
    const parseTypes = PaymentTypes.safeParse(paymentInformation) ; 
    if(!parseTypes.success){
        return res.status(401).json({
            msg :"Received Invalid input"
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
                        increment: paymentInformation.amount
                    },
                }
            }),
            prisma.onRampTransaction.update({
                where: {
                    id: paymentInformation.userId
                },
                data: {
                    status: "Success"
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