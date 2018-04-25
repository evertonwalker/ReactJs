import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class FormularioAutor extends Component {

    constructor() {
        super();
        this.state = { lista: [], usuario: { nome: "", email: "", senha: "", cpf: "", telefone: "", foto: "" } };
        this.enviarForm = this.enviarForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
        this.setCpf = this.setCpf.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();
        $.ajax({
            url: 'http://localhost:8888/usuarios/',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify(this.state.usuario),
            success: function (novaListagem) {
                PubSub.publish('atualiza-lista-autores', novaListagem);
            }.bind(this),
            error: function (resposta) {
                console.log(resposta);
            },
        });
    }

    setNome(evento) {
        this.setState({ nome: evento.target.value });
    }

    setEmail(evento) {
        this.setState({ email: evento.target.value });
    }

    setSenha(evento) {
        this.setState({ senha: evento.target.value });
    }



    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviarForm} method="post" >
                    <InputWithLabel id="nome" type="text" name="nome" value={this.state.usuario.nome} onChange={this.setNome} label="Nome" />
                    <InputWithLabel id="email" type="email" name="email" value={this.state.usuario.email} onChange={this.setEmail} label="Email" />
                    <InputWithLabel id="cpf" type="text" name="cpf" value={this.state.usuario.cpf} onChange={this.setCpf} label="Cpf" />
                    <InputWithLabel id="senha" type="password" name="senha" value={this.state.usuario.senha} onChange={this.setSenha} label="Senha" />
                    <BotaoCustomizado label="Gravar" />
                </form>
            </div>
        );
    }
}

class TabelaAutores extends Component {

    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.lista.map(function (autor) {
                                return (
                                    <tr key={autor.id}>
                                        <td>{autor.nome}</td>
                                        <td>{autor.email}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }

}

export default class AutorBox extends Component {
    constructor() {
        super();
        this.state = { lista: [] };
    }

    componentDidMount() {
        recuperarUsuarios().bind(this)
    }

    recuperarUsuarios() {
        $.ajax({
            url: "http://localhost:8888/usuario/",
            dataType: 'json',
            success: (resposta) => {
                this.setState({ lista: resposta })
            }
        });

        PubSub.subscribe('atualiza-lista-autores', function (topico, novaLista) {
            this.setState({ lista: novaLista });
        }.bind(this));

    }

    render() {
        return (
            <div>
                <FormularioAutor />
                <TabelaAutores lista={this.state.lista} />

            </div>
        );
    }
}