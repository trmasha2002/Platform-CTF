import React from "react";
import axios from 'axios';
import $ from "jquery";
import "./login.css";
import {connect} from "react-redux";
import ValidatedInputField from '../ValidatedInputField/ValidatedInputField'
import {userState} from "../actions/userStateAction";
import {Link} from "react-router-dom"

class Login extends React.Component {
    handleSubmit = () => {
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
        axios.defaults.withCredentials = true;
        axios({
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'POST',
            url: 'http://localhost:8080/api/login',
            data: {
                'login': this.login.input.value,
                'password': this.pass.input.value
            },
            withCredentials: true,
        }).then((response) => {
            console.log(response);
                if (response.data.status === "ok")
                {
                    this.props.userState();
                    this.props.history.push('/user/' + response.data.result.id);
                    this.props.history.push('/');

                }
                else {
                    console.log(response);
                    $(".alert").removeClass("hidden");
                    document.getElementById("error").innerHTML = response.data.result;
                }
            },
            (err) => {
                console.log(err);
            });
        return false;
    }


    componentWillMount()
    {
        this.props.userState();
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
            !this.props.state.loading ?
            <div className="card border-primary">
                <div className="alert alert-danger hidden">
                    <strong id="error"></strong>
                </div>
                <div className="card-body">
                    <h5 className="card-title display-4"> Вход </h5>
                    <div className="form-group form-row">
                        <label className="col-xs-12 col-sm-3 login-label"> Логин: </label>
                        <div className='col-xs-12 col-sm-9'>
                            <ValidatedInputField re={new RegExp(/^[A-Za-z0-9_-]*$/)} placeholder="Логин" name="login"
                        feedback="Поле может содержать только латинские буквы или цифры"
                        ref={(input) => {
                            this.login = input
                        }} />
                        </div>
                    </div>
                    <div className="form-group form-row">
                        <label className="col-xs-12 col-sm-3 login-label">Пароль: </label>
                        <div className=" col-xs-12 col-sm-9">
                            <ValidatedInputField
                                   re={new RegExp(/^.{8,}$/)}
                                placeholder="Пароль"
                                type="password"
                                feedback="Пароль может содержать только латинские буквы цифры и специальные символы и не может быть меньше 8 символов в длинну"
                                name="pass"
                                ref={(input) => {
                                    this.pass = input
                                }} />
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Войти</button>
                    <Link to = "/forgetpassword">Забыли пароль?</Link>
                </div>
            </div> : null
        );
    }
}

const mapStateToProps = state => ({
    state: state.userState.status
});

export default connect(mapStateToProps, {userState})(Login);
