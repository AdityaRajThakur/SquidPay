'use client' 
import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/center"
import { useState } from "react";
import { Button } from "@repo/ui/button";
import p2pTransfer from "../app/lib/actions/p2pTransfer";
import { TextInput } from "@repo/ui/textinput";
export default function SendMoney():JSX.Element{
    const [number ,setNumber] = useState<string>("") ; 
    const [amount , setAmount] = useState<number>(0) ; 
    return <div className = "h-96">
        <Center>
            <Card title = {"Send P2P"}>
                <div>
                    <TextInput placeholder="Enter Amount " label="Amount" onChange={(amt)=>{
                        setAmount(Number(amt)) ; 
                    }}></TextInput>
                    <TextInput placeholder="Enter Phone Number" label = "Phone Number" onChange={(phone)=>{
                        setNumber(phone) ; 
                    }}></TextInput>
                    <div className = "mt-4">
                                            <Button onClick = {async ()=>{
                        // write code for sending money
                                                const res = await p2pTransfer({
                                                    to : number , 
                                                    amount:(amount * 100 )
                                                })
                                                
                                                console.log(res) ; 
                  }}>
                        Send
                    </Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}