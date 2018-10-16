import React, {PureComponent} from "react";
import axios from "axios";
import $ from "jquery";
import store from "../store";
import ValidatedInputField from '../ValidatedInputField/ValidatedInputField'
import { connect } from 'react-redux';
import { userState } from "../actions/userStateAction";

class RegistrForm extends PureComponent {
    handleSubmit = event => {
        this.send()
    };

    checkAuth()
    {
        if (this.props.state.id)
        {
            this.props.history.push('/');
        }
    }

    send() {
        console.log(this.name.value);
        axios({
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'POST',
            url: 'http://localhost:8080/api/register',
            data: {
                'name': this.name.input.value,
                'email': this.mail.input.value,
                'login': this.login.input.value,
                'password': this.password.input.value,
                'confirmpass': this.confirmpass.input.value,
            }
        }).then((response) => {
                if (response.data.status === "ok") {
                    $(".alert-success").removeClass("hidden");
                    document.getElementById("success").innerHTML = "Регистрация прошла успешно. Для подтверждения аккаунта пройдите по ссылке в письме, пришедшем на указанный e-mail";
                }
                else {
                    console.log(response.data.result);
                    $("div.alert").removeClass("hidden");
                    document.getElementById("error").innerHTML = response.data.result;
                }
            },
            (err) => {
                console.log(err);
            });
    }

    componentDidUpdate()
    {
        this.checkAuth();
    }


    componentDidMount()
    {
        this.checkAuth();
    }


    render() {
        return (
            <div className="card border-primary">
                <div className="alert alert-danger hidden">
                    <strong id="error"/>
                </div>
                <div className="alert alert-success hidden">
                    <strong id="success"/>
                </div>
                <div className="card-body">
                    <h1 className="card-title display-4">Регистрация</h1>
                    <label htmlFor="exampleInputPassword">Имя: </label>
                    <ValidatedInputField
                        re={new RegExp(/^[a-zA-Zа-яА-Я]+$/)} placeholder="Имя" name="name"
                        feedback="Поле может содержать только русские и латинские буквы без пробелов"
                        ref={(input) => {
                            this.name = input;
                        }}/>
                    <label htmlFor="exampleInputPassword">Логин: </label>
                    <ValidatedInputField
                        re={new RegExp(/^^[A-Za-z0-9_-]*$/)}
                        placeholder="Логин" name="login"
                        feedback="Поле может содержать только латинские буквы или цифры"
                        ref={(input) => {
                            this.login = input
                        }}/>
                    <div className='mt-3'>
                        <label htmlFor="exampleInputPassword">E-mail: </label>
                        <ValidatedInputField
                            re={new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)}
                            placeholder="Email"
                            feedback="Неверный Email" name="email"
                            ref={(input) => {
                                this.mail = input
                            }}/>


                        <div className="form-group">
                            <label for="exampleInputPassword">Пароль: </label>
                            <ValidatedInputField
                                re={/^.{8,}$/}
                                type="password"
                                feedback="Количество символов должно превышать 8"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Пароль"
                                ref={(input) => {
                                    this.password = input
                                }}
                                name="pass"/>
                        </div>

                        <div className="form-group">
                            <label for="exampleInputPassword1">Повторите свой пароль: </label>
                            <ValidatedInputField
                                re={/^.{8,}$/}
                                type="password"
                                feedback="Количество символов должно превышать 8, пароли должны совпадать"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Пароль"
                                callback = {(value)=>(value == this.password.input.value)}
                                ref={(input) => {
                                    this.confirmpass = input
                                }}
                                name="repeatpass"/>
                        </div>
                        <button type="button" className="btn btn-primary btn-block"
                                onClick={this.handleSubmit}>Зарегистрироваться
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state: state.userState.status
});

export default connect(mapStateToProps, {userState})(RegistrForm);
