import { ERole, IPerson, IUser, IMedicalRecord, IToothRecord } from './pg/schema/interfaces';
import { uuid } from "uuidv4";
import random from "random-name";
import client from "./config/client";
const rrag = require('real-random-address');
const randomBirthday = require('random-birthday');




const patientGen = async () => {
    // const personId = uuid()
    // const firs = random.first()

    // const person : IPerson = {
    //     id : personId,
    //     firstname: firs,
    //     middlename: random.middle(),
    //     lastname: random.last(),
    //     address: "Nasipit, Talamban",
    //     birthplace: "Cebu City",
    //     dateofbirth: randomBirthday(),
    //     email: `${firs}513@gmail.com`,
    //     mobileno: "+639225994182",
    //     nationality: "Filipino",
    //     occupation: "Programmer",
    //     sex: "Male",
    //     religion: "Roman Catholic",
    //     type: "patient",
    //     telnumber: "NA"
    // }



    // const medical : IMedicalRecord = {
    //     allergies : "none",
    //     bloodPressure: "normal",
    //     bloodType: "type A",
    //     doctor: `Dr. ${random.last()}`,
    //     personId,
    //     healthCondition: "normal",
    //     illness: "none",
    //     isHospitalized: false,
    //     medication: "none",
    //     officeAddress: "Nasipit, Talamban",
    //     smoker: "occationally"
    // }


    const tooth : IToothRecord = {
        condition: "Decayed",
        personId: "fa9bcf27-204d-4b98-b125-0fe36326c444",
        isBottom: false,
        isCenter: false,
        isRight: false,
        isLeft: true,
        isTop: true,
        toothNo: 16
    }


    // await client.table("person").insert(person).run()
    // await client.table("medical").insert(medical).run()
    await client.table("toothrecord").insert(tooth).run()
    // console.log(person);
    // console.log(medical);
    

    // const user: IUser = {
    //     personId,
    //     role : ERole.Patient,
    //     username: 'patient1',
    //     password: 'patient1'
    // }

}

patientGen()

