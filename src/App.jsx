import { useestado } from 'react';
import { useForm } from 'react-hook-form';

import Header from './components/header';
import Footer from './components/footer';

import Icon from './assets/img/icon.png';
import './App.css';

export default function App() {
  const { register, setValue, setFocus } = useForm();

  function checkCep(e) {
    const cep = e.target.value;
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        setValue('rua', data.logradouro);
        setValue('bairro', data.bairro);
        setValue('cidade', data.localidade);
        setValue('estado', data.uf);
        if (data.logradouro) {
          setFocus('number');
        } else {
          setFocus('rua');
        }
      });
  }

  return (
    <div className="container">
      <Header icon={Icon} />

      <main className="main">
        <form className="form">
          <div className="icon">
            <img src={Icon} alt="Icon" width="10%" />
          </div>

          <div className="field">
            <span>CEP</span>
            <input
              type="text"
              placeholder="digite o cep"
              className="input"
              {...register('cep')}
              onBlur={checkCep}
            />
          </div>

          <div className="field">
            <span>Rua</span>
            <input type="text" className="input" {...register('rua')} />
          </div>

          <div className="field">
            <span>Número</span>
            <input type="text" className="input" {...register('numero')} />
          </div>

          <div className="field">
            <span>Bairro</span>
            <input
              type="text"
              className="input"
              {...register('bairro')}
            />
          </div>

          <div className="field">
            <span>Cidade</span>
            <input type="text" className="input" {...register('cidade')} />
          </div>

          <div className="field">
            <span>Estado</span>
            <input type="text" className="input" {...register('estado')} />
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
