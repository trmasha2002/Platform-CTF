import React from "react";
import {connect} from 'react-redux';
import "./tournament.css";
import "./font-awesome.min.css";
import $ from "jquery";
import axios from 'axios';
import Vif from '../ValidatedInputField/ValidatedInputField'


class MakeTournament extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                date: new Date().toISOString()
            };
    }

    componentDidMount()
    {
        const script = document.createElement("script");
        script.src = "js/Tournament/datetime.js";
        script.async = true;
        document.body.appendChild(script);
    }

    componentWillUnmount()
    {
        let all_scripts = document.getElementsByTagName("script");
        let my_script = all_scripts[all_scripts.length - 1];
        my_script.remove();
    }


    handleSubmit = () => {
        console.log(this);
        axios.defaults.withCredentials = true;
        console.log(this.place.value);

        axios({
            headers: {

                // "Access-Control-Allow-Origin": "*",
                // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            },
            method: 'GET',
            url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + this.place.value,
            withCredentials: true
        }).then((response) => {
            console.log(response);
        });

        axios({
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'POST',
            url: 'http://localhost:8080/api/tournament/create',
            data:
                {
                'name': this.name.input.value,
                'description': this.description.input.value,
                'time': this.time.value,
                'online': $('input[name=customRadio7]:checked').val(),
                'platform': $('input[name=customRadio3]:checked').val(),
                'place': this.place.input.value,
                'private': $('input[name=customRadio1]:checked').val(),
                'time_to_live': this.time_to_live.value,
                'for_team_allowed': $('input[name=customRadio5]:checked').val(),
            },
            withCredentials: true,
        }).then((response) => {
            if (response.data.status === 'ok')
            {
                let id = response.data.result;
                this.props.history.push('/tournaments/' + id);
            }
        })
    };

    showPlaceInput = () => {
        $("#place-label").fadeIn(400, function (e) {
            $("#place-label").removeClass("hidden");
        });

        $("#place-input").fadeIn(400, function (e) {
            $("#place-input").removeClass("hidden");
        });
    };

    hidePlaceInput = () => {
        $("#place-label").fadeOut(400, function (e) {
            $("#place-label").addClass("hidden");
        });

        $("#place-input").fadeOut(400, function (e) {
            $("#place-input").addClass("hidden");
        });
    };


    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h2>Создание турнира</h2>
                    <div className="alert alert-danger hidden">
                        <strong id="error"></strong>
                    </div>
                    <form className="form-horizontal">
                        <div className="form-group row">
                            <label className="col-5 custom-label">Название турнира: </label>
                        </div>
                        <div className="form-group row">
                            <div className="col-9">
                                <Vif re={new RegExp(/^[A-Za-zА-Яа-я0-9_\s]+$/)} feedback="Только русские и латинские буквы" 
                                type="text" className="form-control" placeholder="MSHP-CTF" ref={(input) => {
                                    this.name = input
                                }}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-5 custom-label">Описание: </label>
                        </div>
                        <div className="form-group row">
                            <div className="col-9">
                                <Vif type="textarea" re={new RegExp(/^[а-яА-Яa-zA-Z0-9\s\,\.\?\\\/\{\}\!\@\#\$\%\^\&\*]+$/)}
                                 feedback="Поле не может быть пустым"
                                 className="form-control" placeholder="Описание" ref={(input) => {
                                    this.description = input
                                }}></Vif>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-5 custom-label">Платформа: </label>
                        </div>
                        <div className="form-group row">
                            <div className="col-9">
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="customRadio3" name="customRadio3"
                                           className="custom-control-input" value={1} ref={(input) => {
                                    this.platform = input
                                }}/>
                                    <label className="custom-control-label" htmlFor="customRadio3">Своя</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="customRadio4" name="customRadio3"
                                           className="custom-control-input" value={0} ref={(input) => {
                                    this.platform_ = input
                                }}/>
                                    <label className="custom-control-label" htmlFor="customRadio4">На этом
                                        сервисе</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-5 custom-label">Формат проведения: </label>
                        </div>
                        <div className="form-group row">
                            <div className="col-9">
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="customRadio7" name="customRadio7"
                                           value={0} className="custom-control-input" onClick={this.showPlaceInput}
                                    ref={(input) => {
                                    this.online = input
                                }}/>
                                    <label className="custom-control-label" htmlFor="customRadio7">Очный</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="customRadio8" name="customRadio7"
                                           value={1} className="custom-control-input" onClick={this.hidePlaceInput}
                                    ref={(input) => {
                                    this.online = input
                                }}/>
                                    <label className="custom-control-label" htmlFor="customRadio8">Онлайн</label>
                                </div>
                            </div>
                        </div>


                        <div className="form-group row hidden" id="place-label">
                            <label className="col-5 custom-label">Место проведения: </label>
                        </div>
                        <div className="form-group row hidden" id="place-input">
                            <div className="col-9">
                                <Vif 
                                re = {new RegExp(/^[а-яА-Яa-zA-Z0-9\s\-\_.,\\\/]+$/)}
                                feedback = "Не валидный адрес"
                                type="text" className="form-control"
                                       placeholder="г.Москва, ул. Пушкина, д. Колотушкина" ref={(input) => {
                                    this.place = input
                                }}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-5 custom-label">Доступность: </label>
                        </div>
                        <div className="form-group row">
                            <div className="col-9">
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="customRadio1" name="customRadio1"
                                           value="0" className="custom-control-input" ref={(input) => {
                                    this.private = input
                                }}/>
                                    <label className="custom-control-label" htmlFor="customRadio1">Публичный</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="customRadio2" name="customRadio1"
                                           value="1" className="custom-control-input" ref={(input) => {
                                    this.private_ = input
                                }}/>
                                    <label className="custom-control-label" htmlFor="customRadio2">Приватный (По
                                        invite-link)</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-5 custom-label">Время начала соревнования: </label>
                        </div>
                        <div className="form-group row">
                            <div className="col-9">
                                <div className="input-group date" id="datetimepicker2" data-target-input="nearest">
                                    <input type="text" className="form-control datetimepicker-input"
                                           data-target="#datetimepicker2" ref={(input) => {
                                    this.time = input
                                }}/>
                                    <div className="input-group-append" data-target="#datetimepicker2"
                                         data-toggle="datetimepicker">
                                        <div className="input-group-text"><i className="fa fa-calendar"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-5 custom-label">Время окончания соревнования: </label>
                        </div>
                        <div className="form-group row">
                            <div className="col-9">
                                <div className="input-group date" id="datetimepicker3" data-target-input="nearest">
                                    <input type="text" className="form-control datetimepicker-input"
                                           data-target="#datetimepicker3" ref={(input) => {
                                    this.time_to_live = input
                                }}/>
                                    <div className="input-group-append" data-target="#datetimepicker3"
                                         data-toggle="datetimepicker">
                                        <div className="input-group-text"><i className="fa fa-calendar"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-5 custom-label">Тип соревнования: </label>
                        </div>
                        <div className="form-group row">
                            <div className="col-9">
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="customRadio5" name="customRadio5"
                                           value={1} className="custom-control-input" ref={(input) => {
                                    this.for_team_allowed = input
                                }}/>
                                    <label className="custom-control-label" htmlFor="customRadio5">Командный</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="customRadio6" name="customRadio5"
                                           value={0} className="custom-control-input" ref={(input) => {
                                        this.for_team_allowed = input
                                    }}/>
                                    <label className="custom-control-label" htmlFor="customRadio6">Личный</label>
                                </div>
                            </div>
                        </div>

                    </form>
                    <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Создать
                    </button>
                </div>
            </div>
        )
    }
}

export default MakeTournament;
