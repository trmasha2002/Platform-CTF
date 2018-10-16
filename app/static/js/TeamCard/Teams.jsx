import React from "react";
import {connect} from 'react-redux';
import "./tournament.css";
import "./font-awesome.min.css";
import $ from "jquery";
import axios from 'axios';
import Moment from 'moment';
import {Link} from 'react-router-dom';


class Teams extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                teams: []
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
            url: 'http://localhost:8080/api/teams',
            withCredentials: true,
        }).then((response) => {
            console.log(response);
            this.setState(
                {
                    teams: response.data.result[0],
                }
            );
        })
    };

    render() {
        const teams = this.state.teams.map(team => (
            <div className="tournament">
                            <div className="tournament-header">
                                <h3 className="text-center">
                                    <Link to={"/teams/" + team.id} className="tournament-link">{team.name}</Link>
                                </h3>
                            </div>
                            <div className="tournament-footer">
                                <span className="tournament-type">{team.city}</span>
                            </div>
                        </div>
        ));

        return (
            this.state.teams ?
            <div>
                <div className="card-body">
                    <h2>Команды</h2>
                    <hr/>

                    <div className="tournament-wrappers">
                        {teams}
                    </div>


                </div>
            </div> : null
        )
    }
}

export default Teams;
