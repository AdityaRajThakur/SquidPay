import crypto from "crypto";
// generate an token of length
export function generateToken(length : number  ):string{
    return crypto.randomBytes(length).toString("hex");
}

