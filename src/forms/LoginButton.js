import React from 'react';

const LoginButton = (props) => {
  return <button className='btn btn-primary btn-sm' onClick={props.login}>Login</button>
}

export default LoginButton;