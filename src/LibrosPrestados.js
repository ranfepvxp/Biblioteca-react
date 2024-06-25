import React, { useState,useEffect,useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import PrestamosService from './services/PrestamosService';
import LibrosService from './services/LibrosService';
import { format } from 'date-fns';
import MainContext from './MainContext';

function LibrosPrestados()
{    
    
    const {componentState,setComponentState} = useContext(MainContext);
    const [data,setData] = useState([]);

    const prestamosService = PrestamosService;
    const imgURL = LibrosService.PortadasURL();


    const Get = async() => {
        await prestamosService.GetLibrosPrestados()
        .then(response=>{
          console.log(response.data);
          setData(response.data);
        }).catch(error=> {
          console.log(error); 
          })
      }

      const devolverLibro = async(id) => {
        prestamosService.DevolverLibro(id).then(response=>{
          if(response.data){
              setData([]);
              Get();
          }
        });
      }

      const devolverTodos = async(id) => {
        prestamosService.DevolverTodos().then(response=>{
          if(response.data){
              setData([]);
          }
        });
      }

      useEffect(()=>{
        Get();
      },[])
        return (
            <div className='row'>
              <button className="btn btn-warning"  onClick={()=> prestamosService.DevolverTodos() } > Devolver Todos </button> 
              
      {data.map(libro=>(

          <div className='col'>
            <div key={libro.idPrestamo} className='card' style={{width: '18rem'}}>
            <img className="card-img-top" src={imgURL+libro.imagen} />
            <div className="card-body">
              <h5 className="card-title"> {libro.libro}</h5>
              <p className="card-text"> Fecha de Prestamo: {format(libro.fechaHora,'MMMM do yyyy, h:mm:ss' )} </p>
              <button className="btn btn-primary"  onClick={()=>devolverLibro(libro.idPrestamo)} > Devolver </button> 
              </div>
            </div>
          </div>
      ))}
      </div>
        );


}

export default LibrosPrestados;