import React, { useEffect, useState } from 'react';
import add from '../../imgs/add.png';
import Duty from './Duty/Duty';
import "./dutylist.css";
import { useQuery, gql } from '@apollo/client';

const MY_DUTYS = gql`
    query myDutyList {
        myDutyList {
            id 
            name 
        }
    }
`

interface IDuty {
    id: string;
    name: string;
}

interface DutyListProps {
    setSelectedDuty: (value: IDuty | {}) => void,
    refreshList: boolean,
    setRefreshList: (value: boolean) => void
}



const DutyList = ({setSelectedDuty, refreshList, setRefreshList} : DutyListProps) => {
    const [dutys, setDutys] = useState([]);
    const {data, error, loading, refetch} = useQuery(MY_DUTYS);

    // GraphQL Querys
    useEffect(() => {
        if(error !== undefined) {
            alert("Error fetiching Dutys");
        }
    }, [error]);

    useEffect(() => {
        if(data) {
            setDutys(data.myDutyList);
        }
    }, [data])


    // Refresh when a Duty is Created, Deleted or Updated! 

    useEffect(() => {
        if(refreshList){
            refetch();
            setRefreshList(false);
        }
    }, [refreshList, setRefreshList, refetch])


    if(loading){
        return (
            <div className="List">
                <h3>Loading Dutys from DB</h3>
            </div>
        )
    }


    const handleAdd = () => {
        setSelectedDuty({})
    }

    return (
        <div className="List">
            <div className="ListHeader">
                <h3>Awesome List! </h3>
                <button className="addButton" onClick={handleAdd}><img src={add} alt="add"/></button>
            </div>

            <div className="Dutys">
                {
                    dutys.map((duty, key) => (
                        <Duty 
                            duty={duty}
                            setSelectedDuty={setSelectedDuty}
                            setRefreshList={setRefreshList}
                            key={key}
                        />
                    ))
                }
            </div>
        </div>
    );
}
 
export default DutyList;