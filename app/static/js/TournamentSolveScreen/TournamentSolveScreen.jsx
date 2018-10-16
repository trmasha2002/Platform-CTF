import React from 'react'
import {connect} from 'react-redux'
import {loadTasks} from '../actions/taskLoadActions'
import {Link, Route} from 'react-router-dom'
import './TournamentSolveScreen.css'
import ValidatedInputField from '../ValidatedInputField/ValidatedInputField'
import TaskUpload from '../TaskFormUpload/TaskUpload'

const TaskCard = (props)=>(
    <Link to={{pathname: props.url + '/task/' + props.id + '/' + props.cid + '/' + props.tid}} className='no-text-decoration'>
    <div className = {"card task-card my-1"  + ((props.solved.indexOf(props.id) !== -1) ? ' solved': '') }>
        <div className = "card-body">
                <h5>{props.name}</h5>
                <h4>{props.score}</h4>
        </div>
    </div>
    </Link>
)

const Screen = (props) => (

    <div className='row allow-scroll-x'>
        {props.tasks.map((category, cid)=>(
            <div className='col-3'>
                <h3>{category.category}</h3>
                <div className=''>
                {
                    category.tasks.map((task, tid)=>(
                        <TaskCard key={tid} {...task} url={props.url} cid={cid} tid={tid} solved={props.solved}/>
                    ))
                }
                </div>
            </div>
        ))}
    </div>
)
class TournamentSolveScreen extends React.Component {
    render(){
        return (
        <div>
        <div className='left-column'>
        <div className='ml-xs-2 ml-sm-3 ml-md-5 ml-lg-6 mt-5'>{
            this.props.isLoading?
                <div>IS LOADING.....</div>
            : this.props.isErrored ? 
                <div>Error occured <strong>()_(*||*)_()</strong> </div>
            :
            <Screen tasks={this.props.data} url={'/tournaments/' + this.props.match.params.id + '/solve'} solved={this.props.solved}/>
        }
        </div>
        </div>
        { (!this.props.isLoading)?
        <div className='right-column'>
            <Route exact path='/tournaments/:id/solve/task/:task_id/:cat_id/:col_id' component={TaskUpload}/>
        </div>:null
        }
        </div>
        )
    }
    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.get(id);
    }
}
export default connect((state)=>({
    id: state.userState.status.id,
    isLoading : state.tasksLoad.isLoading,
    isErrored: state.tasksLoad.isErrored,
    data: state.tasksLoad.data,
    solved: state.tasksLoad.solved}), 
    (dispatch)=>({get: (id) => {dispatch(loadTasks(id))}}))(TournamentSolveScreen)
