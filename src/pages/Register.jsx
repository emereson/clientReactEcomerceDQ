import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './pagesStyle/login.css';
import { useState } from 'react';

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [error, seterror] = useState();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/client/signup`;

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
        seterror(err.response.data);
      });

    reset();
  };

  return (
    <div className="longin__container">
      <section className="longin__section">
        <img src="/logo.svg" alt="" />
        <h2>REGISTRARME</h2>
        <form className="login__form" onSubmit={handleSubmit(submit)}>
          <div className="login__div">
            <label htmlFor="name">
              <i className="bx bxs-user"></i>
            </label>
            <input
              {...register('name')}
              id="name"
              type="text"
              required
              placeholder="Nombres"
            />
          </div>
          <div className="login__div">
            <label htmlFor="lastName">
              <i className="bx bxs-user-detail"></i>
            </label>
            <input
              {...register('lastName')}
              id="lastName"
              type="text"
              required
              placeholder="Apellidos"
            />
          </div>
          <div className="login__div">
            <label htmlFor="email">
              <i className="bx bxs-envelope"></i>
            </label>
            <input
              {...register('email')}
              id="email"
              type="email"
              required
              placeholder="email"
            />
          </div>
          <div className="login__div" style={{ width: '47%' }}>
            <label htmlFor="dni">
              <i className="bx bxs-user-badge"></i>
            </label>
            <input
              {...register('dni')}
              id="dni"
              type="number"
              onInput={(e) => (e.target.value = e.target.value.slice(0, 8))}
              required
              placeholder="dni"
            />
          </div>
          <div className="login__div" style={{ width: '47%' }}>
            <label htmlFor="phoneNumber">
              <i className="bx bxs-phone"></i>
            </label>
            <input
              {...register('phoneNumber')}
              id="phoneNumber"
              type="number"
              required
              placeholder="telefono"
            />
          </div>
          <div className="login__div">
            <label htmlFor="date">
              <i class="bx bxs-calendar"></i>
            </label>
            <input {...register('date')} id="date" type="date" required />
          </div>
          <div className="login__div">
            <label htmlFor="address">
              <i className="bx bxs-map"></i>
            </label>
            <input
              {...register('address')}
              id="address"
              type="text"
              required
              placeholder="su dirección"
            />
          </div>
          <div className="login__div">
            <label htmlFor="password">
              <i className="icon icon-padlock-1"></i>
            </label>
            <input
              {...register('password')}
              id="password"
              type="password"
              placeholder="contraseña"
              minLength={6}
              required
            />
          </div>

          <button>Registrarme</button>
        </form>

        <article className="longinSection__article">
          <span>¿Ya cuentas con una cuenta ?</span>
          <p onClick={() => navigate('/log-in')}>Iniciar sesión</p>
        </article>
      </section>
    </div>
  );
};

export default Register;
