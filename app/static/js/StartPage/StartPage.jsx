import React from 'react'
import './StartPage.css'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import {userState} from "../actions/userStateAction";

class StartPage extends React.Component {

    constructor(props) {
        super(props);

    };

    componentWillMount()
    {
        this.props.userState();
    }

    componentDidUpdate()
    {
        if (this.props.state.id)
        {
            this.props.history.push('/tournaments');
        }
    }

    componentDidMount()
    {
        if (this.props.state.id)
        {
            this.props.history.push('/tournaments');
        }
    }

    render() {
        return (
            this.props.state ?
            <div>
                <div className='MainLogo'></div>
                <div className="row stfRow">
                    <div className="col-sm rowText">
                        <Link to="/reg" className='href' style={{textDecoration: 'none'}}>Регистрация</Link>
                    </div>
                    <div className="col-sm rowText">
                        <Link to="/login" className='href' style={{textDecoration: 'none'}}>Вход</Link>
                    </div>
                    <div className="col-sm rowText">
                        <Link to="/landing" className='href' style={{textDecoration: 'none'}}>О проекте</Link>
                    </div>
                </div>
            </div> : null
        );
    }
}

const mapStateToProps = state => ({
    state: state.userState.status
});

export default connect(mapStateToProps, {userState})(StartPage);
