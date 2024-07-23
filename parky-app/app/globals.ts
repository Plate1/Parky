
import React from 'react'

export const StudentIndex = React.createContext(3);

const getStatus = (data: userData) => {
    let haspaid = false;
    if (data.amount){
        haspaid = true
    }

    if (data.form1completed && data.form2completed && data.form3completed && data.form4completed &&
        data.zoneselection && haspaid
    ){
        if (data.dlupload==="Incomplete" || data.insuranceupload==="Incomplete" || data.car1registration==="Incomplete" || (data.car2registration!==null && data.car2registration==="Incomplete")){
            return "incomplete";
        }else if(data.dlupload==="Pending" || data.insuranceupload==="Pending" || data.car1registration==="Pending" || (data.car2registration!==null && data.car2registration==="Pending")){
            return "pending";
        }
    } else {
        return "incomplete";
    }

    return "approved"
}

export default getStatus