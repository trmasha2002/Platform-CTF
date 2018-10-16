import React from 'react'
import './TaskUpload.css'
import ValidatedInputField from '../ValidatedInputField/ValidatedInputField'
import axios from "axios";
import {connect} from 'react-redux'
import {setTaskRight} from "../actions/taskLoadActions"
import $ from 'jquery'
class EventCard extends React.Component {

    constructor(props) {
        super(props);

    };
    handleSubmit = () => {
        if(this.props.solved.indexOf(this.props.match.params.task_id * 1) !== -1){
            $("#alert_task_success")[0].innerHTML = "You have already solved this task"
            $("#alert_task_success").show();
            $("#alert_task_wrong").hide();
            return;
        }
        this.send()
    };
    send() {
        axios.defaults.withCredentials = true;
        axios({
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'POST',
            url: 'http://localhost:8080/api/taskupload',
            data: {
                'flag': this.flag.input.value,
                'tournament_id' : this.props.match.params.id,
                'id' : this.props.match.params.task_id
            },
        }).then((response) => {
            if (response.data.status === 'ok') {
                if (!(response.data.result.right)) {
                    console.log('Wrong flag')
                    $("#alert_task_wrong").show();
                    $("#alert_task_success").hide();
                }
                else {
                    console.log('Right flag')
                    this.props.setTaskRight(this.props.match.params.task_id)
                }
            }
            else {
                console.log(response.data.result)
            }
        },
            (err) => {
                console.log(err);
            });
        return false;
    }
    render() {
        if(this.props.loading){
            return(<div>Loading...</div>)
        }
        let task = this.props.data[this.props.match.params.cat_id].tasks[this.props.match.params.col_id];
        let isSolved = (this.props.solved.indexOf(this.props.match.params.task_id * 1) !== -1)
        return (
                <div className="card task-form h-100 pt-5">
                    <div className="card-body">
                        <h3 style={{textAlign: 'center'}}> {task.name}</h3>
                        <p style={{textAlign: 'center'}}>{task.info}</p>
                        <h4 style={{textAlign: 'center', marginBottom: '20px'}}>Отправить флаг</h4>
                            <ValidatedInputField
                                    re={new RegExp(/^[a-zA-Z\{\}\_\-]+$/)}
                                    feedback="Заполните поле"
                                    name="название"
                                    placeholder="Флаг"
                                    ref={(input) => {
                                        this.flag = input
                                    }}/>
                        <div>
                            <button type="button" className={"btn btn-primary btn-block" + (isSolved ? ' disabled' : '')}
                                onClick={this.handleSubmit}>Создать
                            </button>

                            <div id='alert_task_success' className={'alert alert-success mt-1 ' + (isSolved ? '' : 'hidden')}>
                                Task solved
                            </div>
                            <div id='alert_task_wrong' className='alert alert-danger hidden mt-1'>
                                Wrong flag
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
    componentDidUpdate(){
        $("#alert_task_success")[0].innerHTML = "Task solved";
        $("#alert_task_wrong").hide();
    }
}

export default connect((state)=>({data: state.tasksLoad.data, solved: state.tasksLoad.solved, loading: state.tasksLoad.isLoading}), (dispatch)=>({
    setTaskRight: (id)=>{dispatch(setTaskRight(id))}
}))(EventCard);
