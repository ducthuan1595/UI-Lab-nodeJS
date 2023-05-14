import { useEffect, useState, useContext } from "react";
import { url } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { context } from "../store/store";

const Form = () => {
  const navigate = useNavigate();
  const { params } = useParams();
  const { setUser } = useContext(context);

  const [valueInput, setValueInput] = useState({
    email: '',
    password: '',
  });
  const [errMessage, setErrMessage] = useState('');

  const handleChangeInput = (e, name) => {
    setErrMessage('');
    let cpState = {...valueInput};
    cpState[name] = e.target.value;
    setValueInput(cpState);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      if(params === 'signup') {
        const res = await fetch(`${url}signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: valueInput.email, password: valueInput.password })
        });
        const data = await res.json();
        if(data.message !== 'ok') {
          return setErrMessage('Information invalid!')
        };
        setValueInput({
          email: '',
          password: ''
        })
        return navigate('/form/login');
      } else {
        const res = await fetch(`${url}login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: valueInput.email, password: valueInput.password })
        });
        const data = await res.json();
        if(data.message !== 'ok') return setErrMessage('Information invalid!')
        localStorage.setItem('userCurrent', JSON.stringify(data));
        setUser(data);
        navigate('/');
      }
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <main>
      <div className='form-center'>
      <form className="product-form">
        <div className='form-control'>
        <label>Email</label>
        <input type="email" id="email" name="email" value={valueInput.email} onChange={(e) =>handleChangeInput(e, 'email')} />
        </div>
        <div className='form-control'>
        <label>Password</label>
        <input type="password" id="password" name="password" value={valueInput.password} onChange={(e) =>handleChangeInput(e, 'password')} />
        </div>
        <div className='error-message'>{errMessage}</div>
        <button onClick={handleSubmit} type='submit' className="btn">{params === 'login' ? 'Login' : 'Signup'}</button>
      </form>
      </div>
    </main>
  );
};

export default Form;
