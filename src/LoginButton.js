import React, {useContext} from 'react';


const LoginButton = (props) => {
  return <button className='btn btn-primary btn-bg' onClick={props.login}>Login</button>
}

export default LoginButton;