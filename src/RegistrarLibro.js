import React, { useState,useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import LibrosService from './services/LibrosService';

import MainContext from './MainContext';

function RegistrarLibro()
{
    const {componentState,setComponentState} = useContext(MainContext);
    const [selectedFile, setSelectedFile] = useState(null);
   
    const [libro,setLibro] = useState({
        id:0,
        nombre:'',
        autor:'',
        editorial:'',
        año:'',
        imagen:'',
        cantidadDisponible:0
    });

    const librosPost = async() => {
        delete libro.id;
        LibrosService.Post(libro)
        .then(response=>{
          setComponentState('start');
        }).catch(error=> {
          console.log(error); 
        })
    }

    const handleImgInput = (files) => {
      const file =  files.item(0);
      console.log(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {

        console.log(libro.imagen);
          setLibro({imagen:reader.result.toString()});
        };
    }
  

      
    const handleChange = e=>{
        const {name, value} = e.target;
        setLibro ({
        ...libro,
        [name]:value
    })
}

    
  return (
    <div>      
      <h1>Registrar Libro</h1>
      <input className='form-control' name='nombre' type='text' placeholder='Nombre' onChange={handleChange} />
      <input className='form-control' name='autor' type='text' placeholder='Autor'  onChange={handleChange}  />
      <input className='form-control' name='editorial' type='text' placeholder='Editorial' onChange={handleChange} />
      <input className='form-control' name='año' type='text' placeholder='Año'  onChange={handleChange}  />
      <input className='form-control' name='imagen-file' type='file' value={selectedFile} onChange={e=>handleImgInput(e.target.files)} />
      <input className='form-control' name='imagen' type='hidden' placeholder='Año'  onChange={handleChange}  />
      <input className='form-control' name='cantidadDisponible' type='text' placeholder='Cantidad'  onChange={handleChange}  />
      <input className='btn btn-primary' type='button' onClick={()=> librosPost() } value={'Registrar'} />
    </div>
  )

}

export default RegistrarLibro;