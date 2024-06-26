import React, { useState,useEffect,useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal,ModalBody,ModalFooter } from 'reactstrap';
import  LibrosService  from '../services/LibrosService';
import PrestamosService from '../services/PrestamosService';
import MainContext from '../MainContext';

function Libros() {

  
  const {user} = useContext(MainContext);
  const service = LibrosService;
  const prestamosService = PrestamosService;
  const [data,setData] = useState([]);

  const [modalEliminar, setModalEliminar]=useState(false);  
  const [modalPrestar, setModalPrestar]=useState(false);

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const abrirCerrarModalPrestar=()=>{
    setModalPrestar(!modalPrestar);
  }

  const [libroSeleccionado, setLibroSeleccionado]=useState({
    id:0,
    nombre:'',
    autor:'',
    editorial:'',
    año:'',
    imagen:'',
    cantidadDisponible:0
  })




  const Get = async()=>
  {
     await service.Get().then(response =>{
        console.log(response.data);
        setData(response.data);
      }).catch(err => {
        console.log(err);
      });
  
    }

    
  const Delete = async()=>
    {
        await service.Delete(libroSeleccionado).then(response=>{
          if(response.data){
            setData(data.filter(libro=>libro.id!==libroSeleccionado.id ));
          }      
          abrirCerrarModalEliminar(); 
         
        }).catch(error=>{
          console.log(error);
        });        
       
    }

    
  const Prestar = async()=>
    {      
        let dataAuxiliar=data;

        await prestamosService.PrestarLibro(libroSeleccionado).then(response=>{
          dataAuxiliar.map(libro=>{
            if(libro.id===libroSeleccionado.id){
              libro.cantidadDisponible=response.data.cantidadDisponible;
            }
          abrirCerrarModalPrestar();
          })
        }).catch(err=>{
            console.log(err);
        });
    
          
    }



  const seleccionarLibro=(libro, caso)=>{
    setLibroSeleccionado (libro);
    (caso==="Eliminar")?
    abrirCerrarModalEliminar(): abrirCerrarModalPrestar();
  }
  

  useEffect(()=>{
    Get();
  },[])

  return (
    <div className="row">



   
      {data.map(libro=>(
        
          <div className='col mb-3'>
            <div key={libro.id} className='card' style={{width: '18rem'}}>
            <img className="card-img-top" src={service.PortadasURL()+libro.imagen} />
            <div className="card-body">
              <h5 className="card-title"> {libro.nombre}</h5>
              <p className="card-text"> {libro.autor} | {libro.editorial} | {libro.año}</p>
              <p className="card-text"> Cantidad Disponible: {libro.cantidadDisponible}</p>

             {user!==null ?    
              <div>
              { libro.cantidadDisponible>0 && <button className="btn btn-primary"  onClick={()=>seleccionarLibro(libro, "Prestar")} >Prestar </button> }
              <button className="btn btn-danger"  onClick={()=>seleccionarLibro(libro, "Eliminar")}>Eliminar</button>
             </div>
             : ''}
            
            </div>
            </div>
          </div>
      ))}

      <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar el libro {libroSeleccionado && libroSeleccionado.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>Delete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>



      <Modal isOpen={modalPrestar}>
      <ModalBody>
      Estás a punto de prestar una edición de {libroSeleccionado && libroSeleccionado.nombre}.
      <br/> ¿Deseas Continuar?
      
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>Prestar() }>Prestar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalPrestar()}>Cancelar</button>
      </ModalFooter>
    </Modal>


    </div>
  );


}


export default Libros;