import React from 'react'
import './team.css'
import Vif from '../ValidatedInputField/ValidatedInputField'
import $ from 'jquery'
import axios from "axios/index";
import {Link} from 'react-router-dom';

const get_css_url = (url) => ('url(' + url + ')');

class EventCard extends React.Component {

    toggleOpen(){
        this.setState({
            open: !this.state.open
        });
    };
    toggleJoin(){
        this.setState({
            joined: !this.state.joined
        });
     };

    componentDidMount()
    {
        this.send();
    }

    send = () =>
    {
        let id = window.location.pathname.match(/\d/g).join("");
        axios.defaults.withCredentials = true;
        axios({
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'GET',
            url: 'http://localhost:8080/api/teams/' + id,
            withCredentials: true,
        }).then((response) => {
            console.log(response);
            this.setState(
                {
                    team: response.data.result[0],
                    tournaments: response.data.result[1],
                    members: response.data.result[2][0],
                }
            );
        })
    };

    constructor(props){
        super(props);
        this.state = {
            open: false,
            joined: false,
            tournaments: [],
            team: {},
            members: []
        };
    }

    generateCreatorLink = (id) =>
    {
        return "/tournaments/" + id;
    };

    generateUserLink = (id) =>
    {
        return "/user/" + id;
    };

    render() {
        console.log(this.state);
        const tournaments = this.state.tournaments.map((tournament, i) => (
                <div key={i}>
                    <Link to={this.generateCreatorLink(tournament.tournament_id)}>{tournament.tournament}</Link>
                </div>
            ));


        const members = this.state.members.map((member, i) => (
                <div key={i}>
                    <Link to={this.generateUserLink(member.id)}>{member.login}</Link>
                </div>
            ));


        return (
            this.state.team  && this.state.tournaments && this.state.members ?
            <div>
                <div className="card cardTeam">
                    <div className="card-body">
                        <h1 className="teamName">{this.state.team.name}</h1>
                    </div>
                </div>
                <div className="container card teamInfo">
                    <span><b>Город: </b>{this.state.team.city}</span>
                    <h5>Участники:</h5>
                    {members}
                    <h5>Турниры, в которых участвовала команда:</h5>
                    {tournaments}
                </div>

            </div> : null
        );
    }
}

export default EventCard;