import React, {useContext} from 'react';


const LibrosPrestadosButton = (props) => {
  return <button className='btn btn-secondary' onClick={props.librosPrestados}>Libros Prestados</button>
}

export default LibrosPrestadosButton;