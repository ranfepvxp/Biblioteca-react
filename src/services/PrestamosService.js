
import axios from "axios";

const baseURL = "https://localhost:7092/api/prestamos";

const GetLibrosPrestados = async() => {
    return await axios.get(baseURL);  
}

const DevolverLibro = async(id) => {

    let url = baseURL+"/devoluciones/return/"+id;
    console.log(url);
    return await axios.get(url);  
}


const DevolverTodos = async() => {

    let url = baseURL+"/devoluciones/return-all";
    console.log(url);
    return await axios.get(url);  
}

const PrestarLibro = async(libroSeleccionado)=>{
    return await axios.post(baseURL,libroSeleccionado);        
}

export default  {GetLibrosPrestados,PrestarLibro,DevolverLibro,DevolverTodos};