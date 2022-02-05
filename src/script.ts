import { ERole, IPerson, IUser, IMedicalRecord, IToothRecord } from './pg/schema/interfaces';
import { uuid } from "uuidv4";
import random from "random-name";
import client from "./config/client";
const randomBirthday = require('random-birthday');




const patientGen = async () => {
   
    const personId = uuid()
    const firs = random.first()

    const person : IPerson = {
        id : personId,
        firstname: firs,
        middlename: random.middle(),
        lastname: random.last(),
        address: "Nasipit, Talamban",
        birthplace: "Cebu City",
        dateofbirth: randomBirthday(),
        email: `${firs}513@gmail.com`,
        mobileno: "+639358271147",
        nationality: "Filipino",
        occupation: "Programmer",
        sex: "Male",
        religion: "Roman Catholic",
        type: "patient",
        telnumber: "NA"
    }

    const user: IUser = {
        personId,
        role : ERole.Assistant,
        username: 'admin',
        password: 'admin'
    }

    await client.table('person').insert(person).run()
    await client.table('user').insert(user).run()


}

patientGen()


