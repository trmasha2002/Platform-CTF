import React from "react";
import "./tournament.css";
import "./font-awesome.min.css";
import $ from "jquery";
import axios from 'axios';
import Moment from 'moment';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {userState} from "../actions/userStateAction";
import Countdown from "./Countdown";



class Tournament extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                contestants: []
            };
    }

    componentDidMount()
    {
        this.send();
        this.props.userState();
    }

    reg = () =>
    {
        let id = window.location.pathname.match(/\d/g).join("");
        let id_our = this.state.tournaments.for_team_allowed ? this.props.state.team_id : this.props.state.id;
        axios.defaults.withCredentials = true;
        axios({
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'POST',
            url: 'http://localhost:8080/api/tournaments/' + id + '/reg',
            data:
                {
                    'contestant_id' : id_our
                },
            withCredentials: true,
        }).then((response) =>
        {
            console.log(response);
        })
    };


    disReg = () =>
    {
        let id = window.location.pathname.match(/\d/g).join("");
        axios.defaults.withCredentials = true;
        axios({
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'POST',
            url: 'http://localhost:8080/api/tournaments/' + id + '/disreg',
            data:
                {
                    'contestant_id' : this.props.state.id
                },
            withCredentials: true,
        }).then((response) =>
        {
            console.log(response);
        })
    };

    send = () =>
    {
        let id = window.location.pathname.match(/\d/g).join("");
        axios.defaults.withCredentials = true;
        axios({
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'GET',
            url: 'http://localhost:8080/api/tournaments/' + id,
            withCredentials: true,
        }).then((response) => {
            this.setState(
                {
                    tournaments: response.data.result[0],
                    creator: response.data.result[1],
                    contestants: response.data.result[2],
                    in_tournament: response.data.result[3]
                }
            );
        })
    };

    delete = () =>
    {
        let id = window.location.pathname.match(/\d/g).join("");
        axios.defaults.withCredentials = true;
        axios({
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'POST',
            url: 'http://localhost:8080/api/tournaments/' + id + '/delete',

            withCredentials: true,
        }).then((response) =>
        {
            console.log(response);
             if (response.data.status === "ok")
                {
                    this.props.history.push('/tournaments');

                }
        })
    };

    isOnline = (value) =>
        {
            if (value) return "Онлайн";
            return "Очный"
        };

    whatPlatform = (value) =>
        {
            if (value) return "На сервисе организатора";
            return "На этом сервисе"
        };

    isTeam = (value) =>
    {
            if (value) return "Командный";
            return "Личный"
    };

    showButton = (our_time, dead_time) =>
    {
        let now_date = new Date();

        let our_time_ = new Date(Moment(our_time).utcOffset('+0000').format('YYYY-MM-DD HH:mm'));

        let dead_time_ = new Date(Moment(dead_time).utcOffset('+0000').format('YYYY-MM-DD HH:mm'));
        // console.log(our_time.valueOf());
        if (now_date.valueOf() > our_time_.valueOf() && now_date.valueOf() < dead_time_.valueOf() && this.state.in_tournament)
        {
            let link = "/tournaments/" + this.state.tournaments.id + '/solve';
            return (
                <div className="button button-success">
                    <Link to={link}>
                    Войти
                    </Link>
                </div>
            )
        }

        else if (now_date.valueOf() < our_time_.valueOf() && now_date.valueOf() < dead_time_.valueOf())
        {
            if (this.state.in_tournament)
            {
                return (
                <div className="">
                    <button type="button" onClick={this.disReg} className="btn btn-danger">Отменить участие</button>
                </div>
                )
            }

                return (
                <div className="">
                    <button type="button" onClick={this.reg} className="btn btn-info">Зарегистрироваться</button>
                </div>
                );
        }
    };

    getEditPermission = (id) =>
    {
        if (id === this.state.creator.id)
        {
            const link_edit = "/tournaments/edit/" + this.state.tournaments.id;
            const link_task = "/tournaments/" + this.state.tournaments.id + '/tasks';
            return (<div>
                    <Link to={link_edit}>Редактировать</Link>
                    <br/>
                    <Link to={link_task}>Таски</Link>
                    <br/>
                    <span onClick={this.delete}>Удалить</span>
                </div>
            );
        }

        return null;
    };

    generateCreatorLink = (id) =>
    {
        return "/user/" + id;
    };

    render() {
        console.log(this.state);
        Moment.locale('ru');
        const contestants = this.state.contestants.map((contestant, i) => (
            <div key={i}>
                <Link to={this.generateCreatorLink(contestant.contestant_id)}>{contestant.contestant}</Link>
            </div>
        ));
        return (
            this.state.tournaments && this.state.creator && this.props.state ?
            <div>
                <div className="">
                            <div className="tournament-header">
                                <h3 className="">
                                    {this.state.tournaments.name}
                                </h3>
                                <h6>
                                    {this.getEditPermission(this.props.state.id)}
                                </h6>
                                <hr/>
                            </div>
                            <div className="tournament-body">
                                <p className="tournament-content">
                                    {this.state.tournaments.description}
                                </p>
                                <div>
                                    <span>Формат проведения: {this.isOnline(this.state.tournaments.online)}</span>
                                </div>

                                <div>
                                    <span>Платформа: {this.whatPlatform(this.state.tournaments.platform)}</span>
                                </div>

                                <div>
                                    <span>Начало: {Moment(this.state.tournaments.time).utcOffset('+0000').format('DD-MM-YYYY HH:mm')}</span>
                                </div>
                                <div>
                                    <span>Конец: {Moment(this.state.tournaments.time_to_live).utcOffset('+0100').format('DD-MM-YYYY HH:mm')}</span>
                                </div>
                                <div>
                                    <Countdown date={this.state.tournaments.time_to_live} />
                                </div>
                                <div>
                                    <span>Тип соревнования: {this.isTeam(this.state.tournaments.for_team_allowed)}</span>
                                </div>
                                <div>
                                    <span>
                                        Организатор: <Link to={this.generateCreatorLink(this.state.creator.id)}> {this.state.creator.login}</Link></span>
                                </div>

                                {this.showButton(this.state.tournaments.time, this.state.tournaments.time_to_live)}
                            </div>
                    <h3>Участники:</h3>
                    {contestants}
                        </div>
            </div> : null
        )
    }
}

const mapStateToProps = state => ({
    state: state.userState.status
});

export default connect(mapStateToProps, {userState})(Tournament);
