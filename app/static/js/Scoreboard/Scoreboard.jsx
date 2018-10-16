import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Chart from 'chart.js'
import {connect} from 'react-redux'
import {scoreboardSetSubscribed, loadScoreboardHTTP} from '../actions/scoreboardLoadActions'
import io from 'socket.io-client'
class TopChart extends React.PureComponent {
    constructor(props) {
        super(props);
        this.colors = ['rgb(2,200,200)', 'rgb(250,0,100)', 'rgb(255,167,25)', 'rgb(25,178,43)', 'rgb(51, 152, 255)', 'rgb(255, 88, 76)', 'rgb(133,8,173)', 'rgb(133,255,43)', 'rgb(178, 101, 18)', 'rgb(180, 8, 56)'];
    }
    componentDidMount() {
        this.updateChart();
    }
    componentDidUpdate() {
        this.updateChart();
    }
    updateChart() {
        this.chart = new Chart(this.canvas, {
            type: 'scatter',
            data: {
                datasets: this.props.datasets.slice(0, 10).map((ds, i) => ({
                    label: ds.contestant,
                    fill: false,
                    backgroundColor: this.colors[i],
                    borderColor: this.colors[i],
                    steppedLine: 'before',
                    data: (()=>{
                        let mydata = ds.history.map((d, i) => ({
                        x: d.time,
                        y: d.score
                        }));
                        mydata.unshift({x : this.props.begin, y: 0});
                        let today = new Date();
                        today.setHours(today.getHours() + 3);
                        mydata.push({x: today, y: mydata[mydata.length - 1]});
                        return mydata;
                        })()
                }))
            },
            options: {
                showLines: true,
                legend: {
                    position: 'bottom'
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        //distribution: 'series'
                    }]
                }
            }
        });
    }

    render() {
        return (
            <canvas ref={(canvas) => {
                this.canvas = canvas
            }} width="600px" height="200px">
            </canvas>
        )
    }
}

const TableItem = (props) => (
    <tr>
        <th scope='row'>{props.place + 1}</th>
        <td>{props.contestant}</td>
        <td>{props.score}</td>
    </tr>
);

const Table = (props) => (
    <table className='table table-bordered'>
        <thead>
        <th scope='column'>#</th>
        <th scope='column'>Команда</th>
        <th scope='column'>Результат</th>
        </thead>
        <tbody>
        {props.columns.map((value, key) => (
            <TableItem key={key} place={key} {...value} />
        ))}
        </tbody>
    </table>
);

class ScoreboardList extends React.Component {
    componentDidMount() {
        this.props.subscribe(this.props.match.params.id*1.0);
        this.props.loadScoreboardHTTP(this.props.match.params.id*1.0)
    }
    componentWillUnmount() {
        this.props.unsubscribe(this.props.match.params.id*1.0);
    }
    render() {
        console.log(this.props)
        if (this.props.isLoading) {
            return (<div>Loading...</div>)
        }
        else if (this.props.isErrored) {
            return (<div>Errored</div>)
        }
            return (
                <div>
                    <TopChart datasets={this.props.scoreboard.scoreboard} begin={this.props.scoreboard.tournament_begin}/>
                    <Table columns={this.props.scoreboard.scoreboard}/>
                </div>
            )
    }
}
const mapStateToProps = state => ({
        isLoading : state.scoreboardLoading.scoreboardIsLoading,
        isErrored: state.scoreboardLoading.scoreboardIsErrored,
        scoreboard: state.scoreboardLoading.scoreboard
    })
console.log(Boolean(mapStateToProps));
const mapDispatchToProps = dispatch => ({
    subscribe:(tournament_id) => dispatch(scoreboardSetSubscribed(true, tournament_id)),
    unsubscribe:(tournament_id) => dispatch(scoreboardSetSubscribed(false, tournament_id)),
    loadScoreboardHTTP: (tournament_id) => dispatch(loadScoreboardHTTP(tournament_id))
})
export default connect(mapStateToProps, mapDispatchToProps)(ScoreboardList);