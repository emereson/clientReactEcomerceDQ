import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './pagesStyle/login.css';

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/user/login`;

    axios
      .post(url, data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        const userDataJSON = JSON.stringify(res.data);
        localStorage.setItem('userData', userDataJSON);

        navigate('/');
        window.location.reload();
      })

      .catch((err) => {
        console.log(err);
      });

    reset();
  };

  return (
    <div className="longin__container">
      <form className="login__form" onSubmit={handleSubmit(submit)}>
        <img src="/logo.svg" alt="" />
        <h2>INICIAR SESION</h2>
        <div className="login__div">
          <label htmlFor="dni">DNI:</label>
          <input
            {...register('dni')}
            id="dni"
            type="number"
            required
          />
        </div>
        <div className="login__div">
          <label htmlFor="password">Contraseña:</label>
          <input
            {...register('password')}
            id="password"
            type="password"
            required
          />
        </div>
        <button>iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
