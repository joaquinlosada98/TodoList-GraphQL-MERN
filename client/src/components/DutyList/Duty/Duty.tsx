import React from 'react';
import update from '../../../imgs/update.png';
import remove from '../../../imgs/remove.png'
import "./duty.css";
import { useMutation, gql } from '@apollo/client';


const DELETE_DUTY = gql`
    mutation deleteDuty($id: ID!) {
        deleteDuty(id: $id)
    }
`
interface IDuty {
    id: string;
    name: string;
}

interface DutyProps {
    duty: IDuty;
    setSelectedDuty: (value: IDuty | {}) => void;
    setRefreshList: (value: boolean) => void;
}


const Duty = ({duty, setSelectedDuty, setRefreshList} : DutyProps) => {
    const [deleteDuty] = useMutation(DELETE_DUTY);

    const handleUpdate = () => {
        setSelectedDuty(duty)
    }

    const handleDelete = () => {
        deleteDuty({
            variables: { 
                id: duty.id
            }
        });

        setRefreshList(true);
    }

    return (
    <div className="Duty">
        <h3>{duty.name}</h3>
        <div className="buttonActions">
            <button className="updateButton" onClick={handleUpdate}><img src={update} alt="update"/></button>
            <button className="deleteButton" onClick={handleDelete}><img src={remove} alt="delete"/></button>
        </div>
    </div>
    );
}
 
export default Duty;