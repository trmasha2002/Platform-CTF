import React from "react";
import axios from 'axios';
import $ from "jquery";
import ValidatedInputField from '../ValidatedInputField/ValidatedInputField'

class ForgetPass extends React.Component {
    handleSubmit = event => {
        this.send()
    };

    send() {
        console.log(this);
        axios.defaults.withCredentials = true;
        axios({
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'POST',
            url: 'http://localhost:8080/api/forgetpass',
            data: {
                'email': this.email.input.value
            },
            withCredentials: true,
        }).then((response) => {
            console.log(response);
                if (response.data.status === "ok") {
                    this.props.history.push('/login');
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

    render() {
        console.log(this.state);
        return (
            <div className="card border-primary">
                <div className="alert alert-danger hidden">
                    <strong id="error"/>
                </div>
                <div className="card-body">
                    <h5 className="card-title display-4"> Получение нового пароля </h5>
                    <div className="form-group form-row">
                        <label className="col-xs-12 col-sm-3 login-label"> Ваша почта: </label>
                        <div className='col-xs-12 col-sm-9'>
                            <ValidatedInputField
                            re={new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)}
                                placeholder="Email"
                                feedback="Неверный Email" name="email"
                                ref={(input) => {
                                    this.email = input
                                }} />
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Отправить</button>
                </div>
            </div>
        );
    }
}
export default ForgetPass;