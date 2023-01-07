import { useRef, useState } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [sendingReq,setSendingReq]=useState(false);


  const emailInputRef=useRef();
  const passwordInputRef=useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(e)=>{
    e.preventDefault();
    setSendingReq(true)

    const enterdEmail=emailInputRef.current.value;
    const enterdPassword=passwordInputRef.current.value;

    if(isLogin){

    }else{
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjAh1g9MQvnFuvQV79fBtLhQ3lc4buXxw',{
        method:'POST',
        body:JSON.stringify({
          email:enterdEmail,
          password:enterdPassword,
          returnSecureToken:true
        }),
        headers:{
          'Content-type':'application/json'
        }
      }).then((res)=>{
        if(res.ok){
          setSendingReq(false)
          console.log('ok',res);
        }else{
            return res.json().then((data)=>{
              alert(data.error.message);
              setSendingReq(false)
            })
        }
      })
    }

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {sendingReq && <p>Sending Request...</p>}
         {!sendingReq && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
