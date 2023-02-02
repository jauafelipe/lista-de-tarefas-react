import React, { Component } from "react";
import Tarefas from './Tarefas/Tarefas'
import Form from './Form/Form'
import './Main.css'

export default class Main extends Component {
    state = {
        novaTarefa: '',
        tarefas: [],
        index: -1,
    }
    componentDidMount() {
        const tarefas = JSON.parse(localStorage.getItem('tarefas'))
        if(!tarefas) return;
        this.setState({ tarefas })
    }
    componentDidUpdate(prevProps, prevState) {
        const { tarefas } = this.state;
        if(tarefas === prevState.tarefas) return;
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('envento previnido');

        const { tarefas, index } = this.state;
        let { novaTarefa } = this.state;
        novaTarefa = novaTarefa.trim();

        if(tarefas.indexOf(novaTarefa) !== -1) return;

        const novasTarefas = [...tarefas];

        if(index === -1) {
            this.setState({
                tarefas: [...novasTarefas, novaTarefa],
                novaTarefa: '',
            });
        } else {
            novasTarefas[index] = novaTarefa
            this.setState({
                tarefas: [...novasTarefas],
                index: -1
            })
        }

    }
        

    handleChange = (e) => {
        this.setState({
            novaTarefa: e.target.value,
        });
    }
    handleEdit = (e, index) => {
       const { tarefas } = this.state;

       this.setState({
        index,
        novaTarefa: tarefas[index]
       })
    }
    handleDelete = (e, index) => {
        const { tarefas } = this.state
        const novasTarefas = [...tarefas]
        novasTarefas.splice(index, 1)

        this.setState({
            tarefas: [...novasTarefas]
        })
        console.log('deleter', index)
    }


    render() {
        
        const { novaTarefa, tarefas } = this.state;

        return (
            <div className="main">
                <h1>LISTA DE TAREFAS</h1>
             <Form
             handleSubmit = {this.handleSubmit}
             handleChange = {this.handleChange}
             novaTarefa = {novaTarefa}
              />
              <Tarefas
                tarefas = { tarefas }
                handleEdit = { this.handleEdit }
                handleDelete = { this.handleDelete }
              />
            </div>
        )
    }
}
