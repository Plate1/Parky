interface userData {
    id: string

    fullname: string,
    email: string,
    grade: string,
    parkingspot: string,
    tardies: number,
    birthday: string,

    car1model: string,
    car1modelyear: number,
    car1plate: string,
    car1color: string,
    car1registration: "Approved" | "Pending" | "Incomplete",
    car1registrationimage: any,

    form1completed: boolean,
    form2completed: boolean,
    form3completed: boolean,
    form4completed: boolean,
    dlissueDate: string,
    dlupload: "Approved" | "Pending" | "Incomplete",
    dluploadimage: any
    insuranceupload: "Approved" | "Pending" | "Incomplete",
    insuranceuploadimage: any,
    zoneselection: boolean,
    zoneorder: number,
    zone: number
    amount: string,
    passtype: string,

    parentfullname: string,
    parentemail: string,
    parentphonenumber: string,
    street: string,
    street2: string | null,
    city: string,
    state: string,
    zipcode: number,

    car2model: string | null,
    car2modelyear: number | null,
    car2plate: string | null,
    car2color: string | null,
    car2registration: "Approved" | "Pending" | "Incomplete",
    car2registrationimage: any | null,
}

interface recordData {
    approved: number
    pending: number
    incomplete: number
}

interface zoneDataProps {
    name: string
    selected: boolean
    rank: number
    layer: null
    id: number
}

interface Notification {
    elapsedTime: string
    header: string
    text: string
    type: "positive" | "warning" | "negative"
    read?: boolean
}

interface FormPage {
    selectedCallBack?: React.Dispatch<React.SetStateAction<number>>
    data: userData
}

interface Field {
    value: string | File
    valid: boolean
    label: string
    required: boolean
}

interface FormProps {
    data: Field[]
}

interface ReturnField {
    label: string
    value: string | number | File | null
}

type searchParameters = "Name" | "License Plate" | "Car Color" | "Car Model" | "Parking Spot"
