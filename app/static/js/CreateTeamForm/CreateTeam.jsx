import React from 'react'
import './CreateTeam.css'
import $ from "jquery";
import axios from "axios/index";
import ValidatedInputField from '../ValidatedInputField/ValidatedInputField'
import {connect} from 'react-redux'
import {sendCreateTeamForm} from '../actions/createTeamFormActions'

const get_css_url = (url) => ('url(' + url + ')');

class CreateTeam extends React.Component {
    render() {
        return (
            <div className="card">
                    <div className="card-body">
                    <h3 className="create">Создание команды</h3>
                    {
                        this.props.isInvalid ?
                    (<div className="alert alert-danger">
                        <strong id="error">Ошибка валидации: </strong>{this.props.validationError}
                    </div>) :''
                    }
                        <div className="form-group">
                            <label for="name">Название команды:</label>
                            <ValidatedInputField re={new RegExp(/^[a-zA-Zа-яА-Я0-9\s]+$/)} placeholder="Название" name="name"
                                                 feedback="Поле может содержать только русские или латинские буквы и цифры"
                                                 ref={(input) => {
                                                     this.name = input;
                                                 }} />                        </div>
                        <div className="form-group">
                            <label id  = "text" for="textarea">Город:</label>
                            <ValidatedInputField re={new RegExp(/^[a-zA-Zа-яА-Я]+$/)} placeholder="Город" name="сity"
                                                 feedback="Поле может содержать только русские или латинские буквы"
                                                 ref={(input) => {
                                                     this.city = input;
                                                 }} />
                        </div>
                        <button type="button" className="btn btn-primary btn-block"
                                onClick={()=>{this.props.send(this.name.input.value, this.city.input.value)}}>Создать
                        </button>
                    </div>
                </div>
        );
    }
    componentDidUpdate(){
        if(this.props.isSuccessed){
            this.props.history.push('/teams');
        }
        if(!this.props.isAuth){
            this.props.history.push('/login')
        }
    }
}

export default connect((state)=>({
    isAuth: state.userState.status.id != null,
    isLoading : state.createTeamForm.loading,
    isErrored: state.createTeamForm.errored,
    isSuccessed: state.createTeamForm.successed, 
    isInvalid: state.createTeamForm.invalid,
    validationError: state.createTeamForm.validationError}), (dispatch)=>({send: (name, city) => {dispatch(sendCreateTeamForm(name, city))}}))(CreateTeam)