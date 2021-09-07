import React, { useState } from 'react';
import Header from './components/Header/Header';
import DutyList from './components/DutyList/DutyList';
import Form from './components/Form/Form';
import './App.css';

import { ApolloProvider } from '@apollo/client';
import {client} from './apollo';




interface IDuty {
    id: string;
    name: string;
}

function App() {

  const [selectedDuty, setSelectedDuty] = useState<IDuty | {}>({});
  const [refreshList, setRefreshList] = useState<boolean>(false);

  return (
    <ApolloProvider client={client}>
      <div>

        <Header/>

        <div className="Main">

          <DutyList
              setSelectedDuty={setSelectedDuty}
              refreshList={refreshList}
              setRefreshList={setRefreshList} 
          />

          <Form 
              selectedDuty={selectedDuty}
              setSelectedDuty={setSelectedDuty}
              setRefreshList={setRefreshList}
          />

        </div>

      </div>
    </ApolloProvider>
  );
}

export default App;
