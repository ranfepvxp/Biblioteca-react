import React,{ useContext } from "react";
import MainContext from '../MainContext';
import LibrosPrestados from "./LibrosPrestados";
import RegistrarLibro from "./RegistrarLibro";
import Login from "./Login";
import Libros from "./Libros";

function Body()
{
    
    const {user,componentState} = useContext(MainContext);


    return (
        <div className="container">


        {componentState === 'Libros Prestados' && (
            <LibrosPrestados />
          )}

        {componentState === 'Registrar Libro' && (
             <RegistrarLibro/>
        )}          


        {componentState === 'Login' &&             
          <Login user={user} />
        }
          
          {componentState === 'Inicio' && 
            <Libros/>}


        </div>
    );
}

export default Body;