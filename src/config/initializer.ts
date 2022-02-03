import { IAppointment } from '../pg/schema/interfaces';
import { uuid} from "uuidv4";
import { ERole } from "../pg/schema/interfaces";
import client from "./client";

export default async () => {
       
    const personId = uuid()

    await client.db("dental").table("person").insert({
        id: personId,
        firstname: "Assistant",
        lastname: "assistant",
        email: "jcustodio123@gmail.com",
        address: "Nasipit, Talamban",
        mobileno: "09225994182",
        nationality: "filipino",
        dateofbirth: "1996-10-21",
        religion: "catholic",
        sex: "Male",
        telnumber: "NA",
    }).run()
    
    await client.db("dental").table("user").insert({
        personId,
        username: "assistant",
        password: "assistant",
        role: ERole.Assistant
    }).run()
    

}