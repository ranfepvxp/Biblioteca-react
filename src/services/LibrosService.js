
import axios from "axios";

    const baseURL = "https://localhost:7092/api/libros";
    const imgURL ="https://localhost:7092/Portadas/"

    const PortadasURL = () =>
    {
      return imgURL;
    }

    const Get = async() => {
      return await axios.get(baseURL);  
    }

    const Delete=async(libroSeleccionado)=>{
        return await axios.delete(baseURL+"/"+libroSeleccionado.id);
    }

    const Post = async(libro) => {
      delete libro.id;
      return await axios.post(baseURL,libro);      
  }



export default  {Get,Delete,Post,PortadasURL};