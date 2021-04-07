import React, {useState, useEffect, useCallback} from 'react';

import './CreateAccount.css';

const CreateAccount = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    // Check if username is available
    if (username !== ""){
      fetch('/accounts/usernames/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: username}),
      })
      .then((response) => response.json())
      .then((data) => {
        setUsernameError(!data.isUsernameAvailable);
      });
    }
  }, [username]);

  useEffect(() => {
    // Check for password length error
    if ((password.length === 0 && confirmPassword.length === 0) || password.length >= 8 || confirmPassword.length >= 8) {
      setPasswordLengthError(false);
    }
    else {
      setPasswordLengthError(true);
    }

    // Check for password match error
    if ((password.length !== 0 || confirmPassword.length !== 0) && password !== confirmPassword) {
      setPasswordMatchError(true);
    }
    else {
      setPasswordMatchError(false);
    }
  }, [password, confirmPassword]);

  const redirect = useCallback(() => {
    props.history.push("/login");
  }, [props]);

  const signUp = useCallback(() => {
    if (!usernameError && !passwordLengthError && !passwordMatchError) {
      // Call server to create account
      fetch('/accounts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      })
      .then((response) => {
        if (response.redirected) {
          redirect();
          return;
        }
        response.json();
      })
      .then((data) => {
        setServerError(data?.error);
      });
    }
  }, [username, password, usernameError, passwordLengthError, passwordMatchError, redirect]);

  return(
    <>
      <div className="header" id="header">
        <div className="container" >
          <div className="header-logo"></div>
          <h4 className="header-text">Get Connected Guide Admin</h4>
        </div>
      </div>
      <div className="container card create-account">
        <div className="card-body">
          <h1 className="centered">Create Account</h1>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                className={username.length !== 0
                  ? usernameError ? "form-control is-invalid" : "form-control is-valid"
                  : "form-control"
                }
                id="username"
                defaultValue={username}
                onChange={e => {
                  setUsername(e.target.value);
                }}>
              </input>
              { username.length !== 0
              ? <small className={usernameError? "red" : "green"}>
                  { usernameError
                    ? (<>Username is not available. Try a different one.</>)
                    : (<>Username is available.</>)
                  }
                </small>
              : null
              }
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password:</label>
              <input
                type="password"
                className={(password.length !== 0 || confirmPassword.length !== 0)
                  ? (passwordLengthError || passwordMatchError) ? "form-control is-invalid" : "form-control is-valid"
                  : "form-control"
                }
                id="pwd"
                defaultValue={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}>
              </input>
            </div>
            <div className="form-group">
              <label htmlFor="cpwd">Confirm Password:</label>
              <input
                type="password"
                className={(password.length !== 0 || confirmPassword.length !== 0)
                  ? (passwordLengthError || passwordMatchError) ? "form-control is-invalid" : "form-control is-valid"
                  : "form-control"
                }
                id="cpwd"
                defaultValue={confirmPassword}
                onChange={e => {
                  setComfirmPassword(e.target.value);
                }}>
              </input>
              <small className={!(password.length >= 8 || confirmPassword.length >= 8) || passwordLengthError? "red" : "green"}>
                { !(password.length >= 8 || confirmPassword.length >= 8) || passwordLengthError
                  ? (<>Password must be at least 8 characters long.</>)
                  : (<>Password is at least 8 characters long.</>)
                }
              </small>
              <br/>
              <small className={passwordMatchError? "red" : "green"}>
                { passwordMatchError
                  ? (<>Passwords do not match.</>)
                  : (<>Passwords match.</>)
                }
              </small>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                onClick={signUp}
                className="btn btn-primary create-account-btn"
                disabled={username.length === 0 || usernameError 
                  || password.length === 0 || confirmPassword.length === 0 
                  || passwordLengthError || passwordMatchError}>
                Create Account
              </button>
            </div>
          </form>
          { serverError !== null
            ? <div className="alert alert-danger">{serverError}</div>
            : null
          }
          <br/>
          <div>Already have an account? <a href="/login">Login</a></div>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;