import React, {useState, useRef, useCallback} from 'react';

import './Login.css';

const Login = (props) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [loginError, setLoginError] = useState(null);

  const redirect = useCallback(() => {
    props.history.push("/admin");
  }, [props]);

  const signIn = useCallback(() => {
    // Call server to login to account
    fetch('/accounts/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: usernameRef.current.value, password: passwordRef.current.value }),
    })
    .then((response) => {
      if (response.redirected) {
        redirect();
      }
      response.json();
    })
    .then((data) => {
      // If login failed display error
      setLoginError(data?.error);
    });
  }, [usernameRef, passwordRef, redirect])

  return(
    <>
      <div className="header" id="header">
        <div className="container" >
          <div className="header-logo"></div>
          <h4 className="header-text">Get Connected Guide Admin</h4>
        </div>
      </div>
      <div className="container card login">
        <div className="card-body">
          <h1 className="centered">Login</h1>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                className="form-control" 
                id="username"
                ref={usernameRef}
                >
              </input>
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password:</label>
              <input
                type="password"
                className="form-control"
                id="pwd"
                ref={passwordRef}>
              </input>
            </div>
            { loginError !== null
              ? <div className="red form-group">{loginError}</div>
              : <br/>
            }
            <div className="d-flex justify-content-center">
              <button type="button" onClick={signIn} className="btn btn-primary login-btn">Login</button>
            </div>
          </form>
          <br/>
          <div>Don't have an account? <a href="/create_account">Create an account</a></div>
        </div>
      </div>
    </>
  );
}

export default Login;