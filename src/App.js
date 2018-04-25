import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';

import InputWithLabel from './componentes/InputWithLabel';
import BotaoCustomizado from './componentes/BotaoCustomizado';

class App extends Component {

  constructor() {
    super();
    this.state = { lista: [], usuario: { nome: "", email: "", senha: "", cpf: "", telefone: "", foto: "" } };
    this.enviarForm = this.enviarForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
    this.setCpf = this.setCpf.bind(this);

  }

  componentDidMount() {
    this.recuperarUsuarios();
  }



  enviarForm(evento) {
    evento.preventDefault();
    $.ajax({
      url: "http://localhost:8888/usuario/",
      contentType: 'application/json',
      type: 'post',
      data: JSON.stringify(this.state.usuario),
      success: (resposta) => {
        console.log("funcionou");
        this.recuperarUsuarios();
      },
      error: (error) => {
        console.log("Deu erro");
      }
    })

  }

  setNome(evento) {
    this.state.usuario.nome = evento.target.value
    this.setState({ usuario: this.state.usuario });
  }

  setEmail(evento) {
    this.state.usuario.email = evento.target.value
    this.setState({ usuario: this.state.usuario });
  }

  setSenha(evento) {
    this.state.usuario.senha = evento.target.value
    this.setState({ usuario: this.state.usuario });
  }

  setCpf(evento){
    this.state.usuario.cpf = evento.target.value
    this.setState({usuario: this.state.usuario });
  }


  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>

              <li className="pure-menu-item menu-item-divided pure-menu-selected">
                <a href="#" className="pure-menu-link">Livro</a>
              </li>

            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de Autores</h1>
          </div>

          <div className="content" id="content" style={{ marginTop: 2 + "em" }}>
           
          </div>


        </div>
      </div>


    );
  }
}

export default App;
