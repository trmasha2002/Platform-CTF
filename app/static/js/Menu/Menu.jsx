/*jshint esversion: 6 */
import React from "react";
import {Link} from 'react-router-dom';
import "./Menu.css"
import {connect} from "react-redux";
import {userState} from "../actions/userStateAction";

function LoginReg() {
    return (
        <div>
            <ul className="navbar-nav float-right">
                <li className="nav-item">
                    <Link className="nav-link" to="/reg">Регистрация</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Вход</Link>
                </li>
            </ul>
        </div>
    );
}

function Profile(props) {
    return (
        <ul className="navbar-nav float-right">
            <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false" to="#">
                    {props.login}
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link className="dropdown-item" to={"/user/" + props.id}>Профиль</Link>
                    <Link className="dropdown-item" to="/tournaments/create">Создать турнир</Link>
                    <Link className="dropdown-item" to="/teams/create">Создать команду</Link>
                    <Link className="dropdown-item" to="/logout">Выйти</Link>
                </div>
            </li>
            <span className="navbar-text"><i className="fa-lg fa fa-user" aria-hidden="true"></i></span>
        </ul>
    )
}

/**
 * @return {null}
 */
function IsProfile(props) {
    const login = props.login;
    const id = props.id;
    const loading = props.loading;
    if (loading === null) {
        return null;
    }

    if (id !== null) {
        return <Profile login={login} id={id}/>
    }

    return <LoginReg/>

}


class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {};
    }

    componentWillMount() {
        this.props.userState();
    }

    render() {
        const login = this.props.state.username;
        const id = this.props.state.id;
        const loading = this.props.state.loading;
        return (<div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">CTFSquad</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/tournaments">Турниры</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/teams">Команды</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/map">Карта</a>
                        </li>
                    </ul>
                    <IsProfile login={login} id={id} loading={loading}/>
                </div>
            </nav>
        </div>);
    }
}

const mapStateToProps = state => ({
    state: state.userState.status
});

export default connect(mapStateToProps, {userState})(Menu);
