import React from "react";
import {connect} from 'react-redux';
import "./tournament.css";
import "./font-awesome.min.css";
import $ from "jquery";
import axios from 'axios';
import Moment from 'moment';
import {Link} from 'react-router-dom';

class Tournaments extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                tournaments: []
            };
    }

    componentDidMount()
    {
        this.send();
    }

    send = () => {
        axios.defaults.withCredentials = true;
        axios({
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'GET',
            url: 'http://localhost:8080/api/tournaments/all',
            withCredentials: true,
        }).then((response) => {
            this.setState(
                {
                    tournaments: response.data.result,
                }
            );
        })
    };

    isOnline = (value) =>
        {
            if (value) return "Онлайн";
            return "Очный"
        };

    render() {
        Moment.locale('ru');
        const tournaments = this.state.tournaments.map((tournament, i) => (
            <div className="tournament" key={i}>
                            <div className="tournament-header">
                                <h3 className="text-center">
                                    <Link to={"/tournaments/" + tournament.id} className="tournament-link">{tournament.name}</Link>
                                </h3>
                            </div>
                            <div className="tournament-body">
                                <p className="tournament-content">
                                    {tournament.description.slice(0, 100)}...
                                </p>
                            </div>

                            <div className="tournament-footer">
                                <span className="tournament-date">{Moment(tournament.time).format('DD-MM-YYYY HH:mm')}</span>
                                <span className="tournament-type">{this.isOnline(tournament.online)}</span>
                            </div>
                            <div>Организатор: {tournament.author_name}</div>
                        </div>
        ));

        return (
            this.state.tournaments ?
            <div>
                <div className="card-body">
                    <h2>Турниры</h2>
                    <hr/>

                    <div className="tournament-wrappers">
                        {tournaments}
                    </div>


                </div>
            </div> : null
        )
    }
}

export default Tournaments;
