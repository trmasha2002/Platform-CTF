import React from "react";
import {connect} from 'react-redux';
import "./tournament.css";
import "./font-awesome.min.css";
import $ from "jquery";
import axios from 'axios';
import Moment from 'moment';
import {Link} from 'react-router-dom';


class TournamentTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                tasks: []
            };
    }


    componentDidMount() {
        this.send();
    }

    send = () => {
        axios.defaults.withCredentials = true;
        axios({
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'GET',
            url: 'http://localhost:8080/api/tournaments/' + window.location.pathname.match(/\d/g).join("") + "/tasks",
            withCredentials: true,
        }).then((response) => {
            console.log(response);
            this.setState(
                {
                    tasks: response.data.result,
                }
            );
        })
    };



    genLink = (id) =>
    {
        let tour_id = window.location.pathname.match(/\d/g).join("");
        return "/tournaments/" + tour_id + "/tasks/" + id + "/edit";
    };
    render() {
        const id = window.location.pathname.match(/\d/g).join("");
        const link = '/tournaments/' + id + '/tasks/create';
        Moment.locale('ru');
        const tasks = this.state.tasks.map(task => (
            <div>
                <span className="text-center">
                    {task.name}
                </span>
                <span> {task.type}</span>
                <span> {task.score}</span>
                <span> <Link to={this.genLink(task.id)}>Редактировать</Link></span>
            </div>
        ));


        return (
            this.state.tasks ?
                <div>
                    <div className="card-body">
                        <h2>Таски</h2>
                        <hr/>

                        <div className="tournament-wrappers">
                            {tasks}
                        </div>

                        <Link to={link}>Добавить новый таск</Link>
                    </div>
                </div> : null
        )
    }
}

export default TournamentTasks;
