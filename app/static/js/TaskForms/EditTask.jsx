import React from 'react'
import './TaskForms.css'
import axios from "axios";
import $ from "jquery";
import {connect} from "react-redux";
import ValidatedInputField from '../ValidatedInputField/ValidatedInputField'
import {userState} from "../actions/userStateAction";
import {Link} from "react-router-dom"

class EventCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            task : {}
        }

    };

    get = () => {
        let task_id = window.location.pathname.substr(window.location.pathname.indexOf('/tasks')).match(/\d/g).join("");
        axios.defaults.withCredentials = true;
        axios({
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'GET',
            url: 'http://localhost:8080/api/tasks/' + task_id,
            withCredentials: true,
        }).then((response) => {
            console.log(response);
            this.setState(
                {
                    task: response.data.result,
                }
            );
        })
    };

    componentWillMount()
    {
        this.get();
    }

    onTodoChangeName(value) {
        this.setState(prevState => ({
            task: {
                ...prevState.task,
                name: value
            }
        }))
    }

   onTodoChangeType(value) {
        this.setState(prevState => ({
            task: {
                ...prevState.task,
                type: value
            }
        }))
    }

    onTodoChangeInfo(value) {
        this.setState(prevState => ({
            task: {
                ...prevState.task,
                info: value
            }
        }))
    }

    onTodoChangeScore(value) {
        this.setState(prevState => ({
            task: {
                ...prevState.task,
                score: value
            }
        }))
    }

    onTodoChangeFlag(value) {
        this.setState(prevState => ({
            task: {
                ...prevState.task,
                flag: value
            }
        }))
    }


    handleSubmit = () => {
        this.send()
    };

    send() {
        let tour_id = window.location.pathname.substr(0, window.location.pathname.indexOf('/tasks')).match(/\d/g).join("");
        axios.defaults.withCredentials = true;
        axios({
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'POST',
            url: 'http://localhost:8080/api/edit_task/' + this.state.task.id,
            data:
                {
                'name': this.name.input.value,
                'info': this.info.input.value,
                'score': this.score.input.value,
                'type' : this.type.input.value,
                'flag' : this.flag.input.value,
                'tournament' : tour_id
            },
        }).then((response) =>
            {
                console.log(response);
                if (response.data.status !== "bad")
                {
                    this.props.history.push("/tournaments/" + tour_id + "/tasks");
                }

            },
            (err) => {
                console.log(err);
            });
        return false;
    }
     delete = () =>
    {
        let tournament_id = this.props.match.params.tournament_id;
        let task_id = this.props.match.params.task_id;
        axios.defaults.withCredentials = true;
        axios({
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'POST',
            url: 'http://localhost:8080/api/tournaments/' + tournament_id + '/tasks/' + task_id + '/delete',

            withCredentials: true,
        }).then((response) =>
        {
            console.log(response);
             if (response.data.status === "ok")
                {
                    this.props.history.push('/tournaments/' + tournament_id + '/tasks');

                }
             else{
                 {
                    this.props.history.push('/tournaments/' + tournament_id + '/tasks');

                }
             }
        })
    };
    render() {
        return (
            this.state.task ?
            <div>
                <div className="card task-form">
                <div className="alert alert-danger hidden">
                    <strong id="error"/>
                </div>
                <div className="alert alert-success hidden">
                    <strong id="success"/>
                </div>
                    <div className="card-body">
                        <h3 style={{textAlign: 'center'}}>Редактирование таска</h3>
                        <form>
                            <div className="form-group">
                                <label for="validationServer01">Название</label>
                                <ValidatedInputField
                                    type="textarea" 
                                    re={new RegExp(/^[а-яА-Яa-zA-Z0-9\s\,\.\?\\\/\{\}\!\@\#\$\%\^\&\*]+$/)} placeholder="Описание задания" name="text"
                                    feedback="Заполните поле"
                                    rows="3"
                                    name="название"
                                    onChange={e => this.onTodoChangeName(e.target.value)}
                                    value={this.state.task.name}
                                    placeholder="Название"
                                    ref={(input) => {
                                        this.name = input
                                    }}/>

                                <label for="form-control forms">Описание</label>
                                <ValidatedInputField re={new RegExp(/^[а-яА-яa-zA-Z0-9]+$/)} placeholder="Описание задания" name="text"
                                         feedback="Заполните поле"
                                         rows="3"
                                         onChange={e => this.onTodoChangeInfo(e.target.value)}
                                         value={this.state.task.info}
                                         ref={(input) => {
                                             this.info = input
                                         }}>

                                </ValidatedInputField>

                                <label for="form-control forms">Очки</label>
                                <ValidatedInputField re={new RegExp(/^[0-9]+$/)} placeholder="100" name="text"
                                         feedback="Только числовые значения"
                                         value={this.state.task.score}
                                         onChange={e => this.onTodoChangeScore(e.target.value)}
                                         ref={(input) => {
                                             this.score = input
                                         }}>

                                </ValidatedInputField>

                                <label for="form-control forms">Тип</label>
                                <ValidatedInputField  re={new RegExp(/^[a-zA-Z]+$/)} placeholder="PWN" name="text"
                                         feedback="Поле не может содержать цифры и русские буквы"
                                         value={this.state.task.type}
                                         onChange={e => this.onTodoChangeType(e.target.value)}
                                         ref={(input) => {
                                             this.type = input
                                         }}>

                                </ValidatedInputField>

                                <label for="form-control forms">Флаг</label>
                                <ValidatedInputField re={new RegExp(/^[a-zA-Z0-9\_\{\}]+$/)} placeholder="CTF{i_d0_l0v3_uc@cugA_and_Sh@d3rs}" name="text"
                                         feedback="Не делайте флаг слишком сложным. Иначе его нельзя будет брутить)))"
                                         value={this.state.task.flag}
                                         onChange={e => this.onTodoChangeFlag(e.target.value)}
                                         ref={(input) => {
                                             this.flag = input
                                         }}>

                                </ValidatedInputField>

                            </div>
                          <button type="button" className="btn btn-primary btn-block"
                                onClick={this.handleSubmit}>Изменить
                        </button>
                         <button type="button" className="btn btn-danger btn-block"
                                onClick={this.delete}> Удалить
                        </button>
                        </form>
                    </div>
                </div>
            </div> : null
        );
    }
}


export default EventCard;
