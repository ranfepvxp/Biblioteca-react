


const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const validateEmail = (e) => {
  if(e.target?.value && e.target.value.match(isValidEmail)){
     
      return true;
  }else{     
      return false;
  }
}

const isEmpty = (e) => {
    if(e.target?.value !== ""){
        return false;
    }else{
        return true;
    }
}



export default  {validateEmail, isEmpty};