/*jshint esversion: 6 */
import React, {PureComponent} from "react";
import UserCard from '../UserCard/UserCard'
import {Link} from 'react-router-dom';
import axios from 'axios'
import {connect} from 'react-redux'
import {loadProfile} from '../actions/profileLoadActions'
class Profile extends PureComponent{

    generateCreatorLink = (id) =>
    {
        return "/tournaments/" + id;
    };


    render(){
        if(this.props.isLoading){
            return <div>Loading....</div>
        }
        let own = parseInt(this.props.match.params.id) === this.props.id;

            const tournaments = this.props.data[1].map((tournament, i) => (
                <div key={i}>
                    <Link to={this.generateCreatorLink(tournament.tournament_id)}>{tournament.tournament}</Link>
                </div>
            ));


        return(
            <UserCard own={own} tournaments={tournaments} {...this.props.data[0]}/>
        )
    }
    componentDidMount()
    {
        this.props.get(this.props.match.params.id);
    }
}
export default connect((state)=>({
    id: state.userState.status.id,
    isLoading : state.profileLoad.isLoading,
    isErrored: state.profileLoad.isErrored,
    data: state.profileLoad.data}), 
    (dispatch)=>({get: (id) => {dispatch(loadProfile(id))}}))(Profile)
