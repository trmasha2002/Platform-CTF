import React from "react";
import RegistrForm from "./RegistrForm/RegistrForm";
import EditProfile from "./EditProfile/EditProfile";
import Login from './LoginForm/LoginForm';
import Profile from "./Profile/Profile";
import Logout from "./Logout/Logout";
import ConfirmCode from "./RegistrForm/ConfirmCode"
import Menu from "./Menu/Menu";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MakeTournament from "./Tournament/MakeTournament";
import TeamCard from "./TeamCard/TeamCard";
import CreateTeam from "./CreateTeamForm/CreateTeam";
import Landing from "./Landing/Landing"
import TaskForms from "./TaskForms/TaskForms"
import TaskUpload from "./TaskFormUpload/TaskUpload"
import ForgetPass from "./ForgetPass/ForgetPass"
import Scoreboard from "./Scoreboard/Scoreboard";
import Map from "./Map/Map";
import SolveTournament from './TournamentSolveScreen/TournamentSolveScreen'
import Tournaments from "./Tournament/Tournaments";
import Tournament from "./Tournament/Tournament";
import EditTournament from "./Tournament/EditTournament";
import StartPage from "./StartPage/StartPage";
import Teams from "./TeamCard/Teams";
import TournamentTasks from "./Tournament/TournamentTasks";
import EditTask from "./TaskForms/EditTask";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Menu/>
                    <Route path='/map' component={Map}/>
                    <Route path='/tournaments/:id/solve' component={SolveTournament}/>
                    <div className="container mt-5">
                        <Switch>
                            <Route exact path='/' component={StartPage}/>
                            <Route exact path='/landing' component={Landing}/>
                            <Route exact path='/taskforms' component={TaskForms}/>
                            <Route exact path='/TaskUpload' component={TaskUpload}/>
                            <Route exact path='/tournaments/edit/:id' component={EditTournament}/>
                            <Route exact path='/tournaments/create' component={MakeTournament}/>
                            <Route exact path='/tournaments/:id/tasks/create' component={TaskForms}/>
                            <Route exact path='/map' component={Map}/>
                            <Route exact path='/tournaments/:id' component={Tournament}/>
                            <Route exact path='/tournaments/private' component={Tournament}/>
                            <Route exact path='/tournaments' component={Tournaments}/>
                            <Route exact path='/user/edit' component={EditProfile}/>
                            <Route exact path='/reg' component={RegistrForm}/>
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/confirm' component={ConfirmCode}/>
                            <Route exact path='/logout' component={Logout}/>
                            <Route exact path='/' component={Landing}/>
                            <Route exact path='/user/edit' component={EditProfile}/>
                            <Route exact path='/user/:id' component={Profile}/>
                            <Route exact path='/tournaments/:id/scoreboard' component={Scoreboard}/>
                            <Route exact path='/tournaments/:id/tasks' component={TournamentTasks}/>
                            <Route exact path='/tournaments/:tournament_id/tasks/:task_id/edit' component={EditTask}/>
                            <Route exact path='/teams/create' component={CreateTeam}/>
                            <Route exact path='/teams' component={Teams}/>
                            <Route exact path='/forgetpassword' component={ForgetPass}/>
                            <Route path='/teams/:id' component={TeamCard}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}
