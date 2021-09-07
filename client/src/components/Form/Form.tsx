import React, { useEffect, useState } from 'react';
import "./form.css";
import {useMutation, gql } from '@apollo/client';

const CREATE_DUTY = gql`
    mutation createDuty($name: String!) {
        createDuty(name: $name){
            id 
            name 
        }
    }
`

const UPDATE_DUTY = gql`
    mutation updateDuty($id: ID!, $name: String!) {
        updateDuty(id:$id, name:$name){
            id 
            name 
        }
    }
`

interface IDuty {
    id: string;
    name: string;
}

interface FormProps {
    selectedDuty: any;
    setSelectedDuty: (value: IDuty | {}) => void;
    setRefreshList: (value: boolean) => void;

}

const Form = ({selectedDuty, setSelectedDuty, setRefreshList} : FormProps)=> {

    const [createForm, setCreateForm] = useState(false);
    const [text, setText] = useState('')

    const [createDuty] = useMutation(CREATE_DUTY);
    const [updateDuty] = useMutation(UPDATE_DUTY);

    useEffect(() => {
        if(Object.keys(selectedDuty).length === 0){
            setCreateForm(true);
            setText('');
        }else{
            setCreateForm(false);
            setText(selectedDuty?.name);
        }
    }, [selectedDuty, setCreateForm, setText])



    const handleCreateDuty = () => {
        if(text.length > 0){
            createDuty({
                variables: {
                    name: text
                }
            });
    
            // Set de Form to the "CREATE" state
            setText('');
            setSelectedDuty({});
    
            // Refetch my List! 
            setRefreshList(true);

        }
    }

    const handleUpdateDuty = () => {
        updateDuty({
            variables: {
                id: selectedDuty.id,
                name: text
            }
        });

        // Set de Form to the "CREATE" state
        setText('');
        setSelectedDuty({});

        // Refetch my List! 
        setRefreshList(true);
    }

    const handleChange = (e : any) => {
        setText(e.target.value);
    }

    // Si es verdadero
    if(createForm){

        return (
            <div className="Form">
                <div className="FormGroup">
                    <h3>Create a new Duty</h3>
                    <textarea
                        value={text}
                        onChange={handleChange}
                    />
                    <button onClick={handleCreateDuty}>Add a Duty</button>
                </div>
            </div>
        )
    }




    return (

        <div className="Form">
            <div className="FormGroup">
                <h3>Update Duty</h3>
                <textarea 
                    value={text} 
                    onChange={handleChange}
                />
                <button onClick={handleUpdateDuty}>Update Duty</button>
            </div>
        </div>
    );
}
 
export default Form;