/*jshint esversion: 6 */
import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {userState} from "../actions/userStateAction";

class Logout extends React.Component{
    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        axios.defaults.withCredentials = true;
        axios.post("http://localhost:8080/api/logout")
            .then((response) =>
            {
                if (response.data.result === 'good')
                {
                    this.props.userState();
                    this.props.history.push('/');
                }
                this.props.history.push('/');
            });
    }

    render(){
        return (<div>

        </div>);
    }
}

const mapStateToProps = state => ({
    state: state.userState.status
});

export default connect(mapStateToProps, {userState})(Logout);