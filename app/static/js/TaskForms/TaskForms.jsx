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

    };
    handleSubmit = () => {
        this.send()
    };
    send() {
        let id = window.location.pathname.match(/\d/g).join("");
        axios.defaults.withCredentials = true;
        axios({
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'POST',
            url: 'http://localhost:8080/api/createtask',
            data: {
                'name': this.name.input.value,
                'info': this.info.input.value,
                'score': this.score.input.value,
                'type' : this.type.input.value,
                'flag' : this.flag.input.value,
                'tournament' : id
            },
        }).then((response) =>
            {
                console.log(response);
                if (response.data.status !== "bad")
                {
                    this.props.history.push("/tournaments/" + id + "/tasks");
                }


            },
            (err) => {
                console.log(err);
            });
        return false;
    }
    render() {
        return (
            <div>
                <div className="card task-form">
                <div className="alert alert-danger hidden">
                    <strong id="error"/>
                </div>
                <div className="alert alert-success hidden">
                    <strong id="success"/>
                </div>
                    <div className="card-body">
                        <h3 style={{textAlign: 'center'}}>Создание заданий</h3>
                        <form>
                            <div className="form-group">
                                <label for="validationServer01">Название</label>
                                <ValidatedInputField
                                    re={new RegExp(/^[a-zA-Zа-яА-Я0-9_\-\+\*.\s]+$/)}
                                    feedback="Заполните поле"
                                    name="название"
                                    placeholder="Txt it"
                                    ref={(input) => {
                                        this.name = input
                                    }}/>

                                <label for="form-control forms">Описание</label>
                                <ValidatedInputField 
                                         type="textarea" 
                                         re={new RegExp(/^[а-яА-Яa-zA-Z0-9\s\,\.\?\\\/\{\}\!\@\#\$\%\^\&\*]+$/)} placeholder="Описание задания" name="text"
                                         feedback="Заполните поле"
                                         rows="3"
                                         ref={(input) => {
                                             this.info = input
                                         }}>
                                    
                                </ValidatedInputField>

                                <label for="form-control forms">Очки</label>
                                <ValidatedInputField re={new RegExp(/^[0-9]+$/)} placeholder="100" name="text"
                                         feedback="Только числовые значения"
                                         ref={(input) => {
                                             this.score = input
                                         }}>
                                    
                                </ValidatedInputField>      

                                <label for="form-control forms">Тип</label>
                                <ValidatedInputField re={new RegExp(/^[a-zA-Z]+$/)} placeholder="PWN" name="text"
                                         feedback="Поле не может содержать цифры и русские буквы"
                                         ref={(input) => {
                                             this.type = input
                                         }}>
                                    
                                </ValidatedInputField>  
                                
                                <label for="form-control forms">Флаг</label>
                                <ValidatedInputField re={new RegExp(/^[a-zA-Z0-9\_\{\}]+$/)} placeholder="CTF{i_d0_l0v3_ucacugA_and_ShAd3rs}" name="text"
                                         feedback="Только большие и маленькие буквы цифры фигурные скобки и нижние подчеркивания"
                                         ref={(input) => {
                                             this.flag = input
                                         }}>
                                    
                                </ValidatedInputField>
                                
                            </div>
                          <button type="button" className="btn btn-primary btn-block"
                                onClick={this.handleSubmit}>Создать
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default EventCard;
