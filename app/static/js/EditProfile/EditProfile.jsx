/*jshint esversion: 6 */
import React from "react";
import axios from 'axios'
import ValidatedInputField from "../ValidatedInputField/ValidatedInputField";
import $ from "jquery"
import {connect} from 'react-redux'

class EditProfile extends React.Component {

    handleSubmitName = event => {
        this.sendname()
    };
    handleSubmitSurname = event => {
        this.sendsurname()
    };
    handleSubmitEmail = event => {
        this.sendemail()
    };
    handleSubmitPassword = event => {
        this.sendpass()
    };
    sendname() {
        axios(
            {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },

                method: 'POST',
                url: 'http://localhost:8080/api/changename',
                data: {
                    'name': this.name.input.value,
                }
            }
        ).then((response) => {
                if (response.data.status === "ok") {
                    document.getElementById("success").innerHTML = "Данные успешно изменены";
                    $(".alert-success").removeClass("hidden");
                }
                else {
                    $("div.alert").removeClass("hidden");
                    console.log(response);
                    document.getElementById("error").innerHTML = response.data.result;
                }
            },
            (err) => {
                console.log(err);
            });
        return false;
    }
    sendsurname() {
        axios(
            {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },

                method: 'POST',
                url: 'http://localhost:8080/api/changesurname',
                data: {
                    'surname': this.surname.input.value,
                }
            }
        ).then((response) => {
                if (response.data.status === "ok") {
                    $(".alert-success").removeClass("hidden");
                    document.getElementById("success").innerHTML = "Данные успешно изменены";
                }
                else {
                    $("div.alert").removeClass("hidden");
                    console.log(response);
                    document.getElementById("error").innerHTML = response.data.result;
                }
            },
            (err) => {
                console.log(err);
            });
        return false;
    }
    sendemail() {
        axios(
            {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },

                method: 'POST',
                url: 'http://localhost:8080/api/changeemail',
                data: {
                    'email': this.email.input.value,
                    'password': this.password.input.value
                }
            }
        ).then((response) => {
                if (response.data.status === "ok") {
                    $(".alert-success").removeClass("hidden");
                    document.getElementById("success").innerHTML = "Данные успешно изменены";
                }
                else {
                    $("div.alert").removeClass("hidden");
                    console.log(response);
                    document.getElementById("error").innerHTML = response.data.result;
                }
            },
            (err) => {
                console.log(err);
            });
        return false;
    }
    sendpass() {
        axios(
            {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },

                method: 'POST',
                url: 'http://localhost:8080/api/changepass',
                data: {
                    'old_password': this.old_password.input.value,
                    'new_password': this.new_password.input.value,
                    'new_password_confirm': this.new_password_confirm.input.value
                }
            }
        ).then((response) => {
                if (response.data.status === "ok") {
                    $(".alert-success").removeClass("hidden");
                    document.getElementById("success").innerHTML = "Данные успешно изменены";
                }
                else {
                    $("div.alert").removeClass("hidden");
                    console.log(response);
                    document.getElementById("error").innerHTML = response.data.result;
                }
            },
            (err) => {
                console.log(err);
            });
        return false;
    }
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <div className="alert alert-danger hidden">
                    <strong id="error"/>
                </div>
                <div className="alert alert-success hidden">
                    <strong id="success"/>
                </div>
                <h2>Редактирование</h2>
                <div className="row">
                    <div className="col-2">
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist"
                             aria-orientation="vertical">
                            <a className="nav-link active" id="v-pills-name-tab" data-toggle="pill" href="#v-pills-name"
                               role="tab" aria-controls="v-pills-name" aria-selected="true">Имя</a>
                            <a className="nav-link" id="v-pills-surname-tab" data-toggle="pill" href="#v-pills-surname"
                               role="tab" aria-controls="v-pills-surname" aria-selected="false">Фамилия</a>
                            <a className="nav-link" id="v-pills-email-tab" data-toggle="pill"
                               href="#v-pills-email"
                               role="tab" aria-controls="v-pills-email" aria-selected="false">E-mail</a>
                            <a className="nav-link" id="v-pills-pass-tab" data-toggle="pill"
                               href="#v-pills-pass"
                               role="tab" aria-controls="v-pills-pass" aria-selected="false">Пароль</a>
                        </div>
                    </div>

                    <div className="col-10">
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane fade show active" id="v-pills-name" role="tabpanel"
                                 aria-labelledby="v-pills-name-tab">
                                <div className="form-group form-row">
                                    <label className="col-2 login-label">Имя:</label>
                                    <div className='col-7'>
                                        <ValidatedInputField
                                            re={new RegExp(/^[a-zA-Zа-яА-Я]+$/)}
                                            feedback="Поле может содержать только русские буквы без пробелов"
                                            placeholder="Имя"
                                            type="name"
                                            ref={(input) => {
                                                this.name = input
                                            }}/>
                                    </div>
                                </div>
                                <button type="button" className="offset-2 col-7 btn btn-primary btn-block"
                                        onClick={this.handleSubmitName}>Сохранить
                                </button>
                            </div>
                            <div className="tab-pane fade" id="v-pills-surname" role="tabpanel"
                                 aria-labelledby="v-pills-surname-tab">
                                <div className="form-group form-row">
                                    <label className="col-2 login-label">Фамилия: </label>
                                    <div className="col-7">
                                        <ValidatedInputField
                                            re={new RegExp(/^[a-zA-Zа-яА-Я]+$/)} placeholder="Фамилия" name="surname"
                                            feedback="Поле может содержать только русские буквы без пробелов"
                                            ref={(input) => {
                                                this.surname = input
                                            }}/>
                                    </div>
                                </div>
                                <button type="button" className="offset-2 col-7 btn btn-primary btn-block"
                                        onClick={this.handleSubmitSurname}>Сохранить
                                </button>

                            </div>
                            <div className="tab-pane fade" id="v-pills-email" role="tabpanel"
                                 aria-labelledby="v-pills-email-tab">

                                <div className="form-group form-row">
                                    <label className="col-2 login-label">E-mail:</label>
                                    <div className="col-7">
                                        <ValidatedInputField
                                            re={new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)}
                                            type="email"
                                            feedback="Неверный email"
                                            placeholder="ctfthebest@example.net"
                                            name="email"
                                            ref={(input) => {
                                                this.email = input
                                            }}/>
                                    </div>
                                </div>
                                 <div className="form-group form-row">
                                    <label className="col-2 login-label">Пароль:</label>
                                    <div className="col-7">
                                        <ValidatedInputField
                                            re={/^.{8,}$/}
                                            type="password"
                                            feedback="Количество символов должно превышать 8"
                                            placeholder="Пароль"
                                            name="pass"
                                            ref={(input) => {
                                                this.password = input
                                            }} />
                                    </div>
                                </div>
                                <button type="button" className="offset-2 col-7 btn btn-primary btn-block"
                                        onClick={this.handleSubmitEmail}>Сохранить
                                </button>
                            </div>
                            <div className="tab-pane fade" id="v-pills-pass" role="tabpanel"
                                 aria-labelledby="v-pills-pass-tab">

                                <div className="form-group form-row">
                                    <label className="col-2 login-label">Старый пароль:</label>
                                    <div className="col-7">
                                        <ValidatedInputField
                                            re={/^.{8,}$/}
                                            type="password"
                                            feedback="Количество символов должно превышать 8"
                                            placeholder="Пароль"
                                            name="pass"
                                            ref={(input) => {
                                                this.old_password = input
                                            }} />
                                    </div>
                                </div>
                                <div className="form-group form-row">
                                    <label className="col-2 login-label">Новый пароль:</label>
                                    <div className="col-7">
                                        <ValidatedInputField
                                            re={/^.{8,}$/}
                                            type="password"
                                            feedback="Количество символов должно превышать 8"
                                            placeholder="Пароль"
                                            name="new_pass"
                                            ref={(input) => {
                                                this.new_password = input
                                            }} />
                                    </div>
                                </div>
                                <div className="form-group form-row">
                                    <label className="col-2 login-label">Новый пароль еще раз:</label>
                                    <div className="col-7">
                                        <ValidatedInputField
                                            re={/^.{8,}$/}
                                            type="password"
                                            callback = {(value)=>(this.new_password.input.value == value)}
                                            feedback="Количество символов должно превышать 8, пароли должны совпадать"
                                            placeholder="Пароль"
                                            name="new_pass_conf"
                                            ref={(input) => {
                                                this.new_password_confirm = input
                                            }} />
                                    </div>
                                </div>
                                <button type="button" className="offset-2 col-7 btn btn-primary btn-block"
                                            onClick={this.handleSubmitPassword}>Сохранить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default connect((state)=>({isAuth: state.userState.status.id != null}), (dispatch)=>{})(EditProfile);
