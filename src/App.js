import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import MainContext from './MainContext';
import Navbar from './components/Navbar';
import Body from './components/Body';

function App() {

const [user, setUser] = useState(null);
const [componentState, setComponentState] = useState('Inicio');

return (
  <MainContext.Provider value={{
    user,setUser,componentState,setComponentState
  }}>
    <div>
      <Navbar></Navbar>      
      <Body></Body>      
    </div>
    </MainContext.Provider>
    )  
}
export default App;
