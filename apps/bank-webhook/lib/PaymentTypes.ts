import z from "zod";

export const PaymentTypes = z.object({
    token :z.string() , 
    userId:z.number().gt(0) ,
    amount:z.number().gte(0)
})


 