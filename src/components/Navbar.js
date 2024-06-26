import React,{ useContext } from "react";
import MainContext from '../MainContext';
import LoginButton from "../forms/LoginButton";
import LibrosRegistrarButton from "../forms/LibrosRegistrarButton";
import LibrosPrestadosButton from "../forms/LibrosPrestadosButton";

function Navbar()
{
    
    const {user,setUser,componentState,setComponentState} = useContext(MainContext);


    return (
        <div className="container mt-3">
        <div class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
            <span class="fs-4">
            {componentState} 
            {
            user!==null ?  <div> <small>Bienvenido {user}!</small> </div> : 
            <div>Inicia sesion para poder realizar acciones </div>
            } 
            </span>
      

      <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
      {user!==null ?  
        <div>
        <a class="me-3 py-2 text-dark text-decoration-none" href="#">
          <LibrosPrestadosButton librosPrestados={() => setComponentState('Libros Prestados') } />
        </a>
        <a class="me-3 py-2 text-dark text-decoration-none" href="#">
          <LibrosRegistrarButton registrarLibro={() => setComponentState('Registrar Libro') } />
        </a>
        <a class="me-3 py-2 text-dark text-decoration-none" href="#">
          <button className="btn btn-warning btn-sm" onClick={()=>{setUser(null); setComponentState('Inicio')}}>Salir</button>
        </a>
        </div>
        : 
        <div>
        <a class="py-2 text-dark text-decoration-none">
            <LoginButton login={() => setComponentState('Login') } />
        </a>  
        </div>        
        } 
        
         
       
      </nav>
    </div>
    </div>
    );
}

export default Navbar;