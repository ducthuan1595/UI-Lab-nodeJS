import { useEffect, useState, useContext } from "react";
import { url } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { context } from "../store/store";

const Form = () => {
  const navigate = useNavigate();
  const { params } = useParams();
  const { setUser } = useContext(context);

  const [valueInput, setValueInput] = useState({
    email: "",
    password: "",
  });
  const [errMessage, setErrMessage] = useState({
    email: '',
    password: ''
  });
  const [invalid, setInvalid] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleBlurInput = (e, name) => {
    setIsValid(false);
    if(valueInput[name] === valueInput.email && !valueInput.email.includes('@')){
      setErrMessage({ email: 'Invalid your email!' })
      setIsValid(true);
    }
    if(valueInput[name] === valueInput.password && valueInput.password.trim().length < 7){
      setErrMessage({ password: 'Password must be at least 8 charts'});
      setIsValid(true);
    }
  }

  const handleChangeInput = (e, name) => {
    setErrMessage({
      email: '',
      password: ''
    });
    setInvalid('');
    setIsValid(false);
    let cpState = { ...valueInput };
    cpState[name] = e.target.value;
    setValueInput(cpState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(isValid) return setInvalid("Information invalid!");
      setErrMessage({
        email: '',
        password: ''
      });
      if (params === "signup") {
        const res = await fetch(`${url}signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: valueInput.email,
            password: valueInput.password,
          }),
        });
        const data = await res.json();
        if (data.message !== "ok") {
          return setInvalid('Information invalid');
        }
        setValueInput({
          email: "",
          password: "",
        });
        return navigate("/form/login");
      } else {
        const res = await fetch(`${url}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: valueInput.email,
            password: valueInput.password,
          }),
        });
        const data = await res.json();
        if (data.message !== "ok") return setInvalid("Information invalid!");
        localStorage.setItem("userCurrent", JSON.stringify(data));
        setUser(data);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(errMessage);
  console.log(errMessage.email);
  console.log(errMessage.password);
  return (
    <main>
      <div className="form-center">
        <form className="product-form">
          <div className="form-control">
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              style={{borderColor: `${errMessage.email ? 'red' : ''}`}}
              value={valueInput.email}
              onChange={(e) => handleChangeInput(e, "email")}
              onBlur={(e) => handleBlurInput(e, 'email')}
            />
            <div className='error-message'>{errMessage.email}</div>
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              style={{borderColor: `${errMessage.password ? 'red' : ''}`}}
              value={valueInput.password}
              onChange={(e) => handleChangeInput(e, "password")}
              onBlur={(e) => handleBlurInput(e, 'password')}
            />
            <div className='error-message'>{errMessage.password}</div>
          </div>
          <div className="error-message">{invalid}</div>
          <button onClick={handleSubmit} type="submit" className="btn">
            {params === "login" ? "Login" : "Signup"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Form;
