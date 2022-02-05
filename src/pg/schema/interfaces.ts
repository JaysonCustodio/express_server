export interface IPerson {
  id: string;
  firstname: string;
  lastname: string;
  middlename: string;
  email: string;
  address: string;
  mobileno: string;
  nationality: string;
  occupation: string;
  dateofbirth: string;
  birthplace: string;
  religion: string;
  sex: string;
  password?: string,
  username?: string, 
  telnumber?: string;
  type: string;
}

export interface INotification {
  personId: string,
  message: string,
  date: string,
}

export interface IUser {
  personId: string;
  role: ERole;
  username: string;
  password: string;
}

export interface IAppointment {
  appointmentDate : string;
  status: string;
  purpose: string;
  personId: string;
  session: string;
  isAdmin: boolean;
}

export interface IMedicalRecord {
  personId: string,
  doctor: string,
  officeNo: string,
  officeAddress: string,
  hospitalized: string,
  healthCondition: string,
  illness: string,
  smoker: string,
  allergies: string,
  medication: string,
  bloodType: string,
  bloodPressure: string
}

export interface IToothRecord {
  toothNo : number,
  condition: string,
  personId: string,
  isLeft: boolean,
  isRight: boolean,
  isTop: boolean,
  isCenter: boolean,
  isBottom: boolean
}

export interface ITreatmentRecord {
  appointmentDate: string,
  toothNo: number,
  procedure: string,
  dentist: string,
  charge: number,
  paid: number,
  balance: number,
  nextAppointmentDate:  string
}



export enum ERole {
  Dentist = "ROLE_DENTIST",
  Assistant = "ROLE_ASSISTANT",
  Patient = "ROLE_PATIENT",
}
