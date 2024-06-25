import axios from "axios";


const baseURL = "https://localhost:7092/api/login";

const Post = async(usuario) => {
    delete usuario.id;
    return await axios.post(baseURL,usuario);
}



  export default  {Post};