import React, { useState,useEffect,useContext,createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { Modal,ModalBody,ModalFooter,ModalHeader } from 'reactstrap';
import Login from './Login';
import Libros from './Libros';
import LoginButton from './LoginButton';
import { UserContext } from './MainContext';
import RegistrarLibro from './RegistrarLibro';
import LibrosPrestados from './LibrosPrestados';
import LibrosPrestadosButton from './LibrosPrestadosButton';
import MainContext from './MainContext';
import Navbar from './components/Navbar';

function App() {

const [user, setUser] = useState(null);
const [componentState, setComponentState] = useState('start');



  return (
  
  <MainContext.Provider value={{
    user,setUser,componentState,setComponentState
  }}>
  <div>

  <Navbar></Navbar>      


<LibrosPrestadosButton librosPrestados={() => setComponentState('LibrosPrestados') } />

          {componentState === 'LibrosPrestados' && (
            <LibrosPrestados />
          )}


          {componentState === 'registrar' && (
             <RegistrarLibro/>
          )}          

          {componentState === 'start' && (
            <LoginButton login={() => setComponentState('login') } />
          )}

          {componentState === 'login' &&             
          <Login user={user} />
       
            }
          
          {componentState === 'start' && 
            <Libros/>}

          
    </div>
    </MainContext.Provider>
    )

  
}

export default App;
