import io from 'socket.io-client'
import {scoreboardSetUpdated, scoreboardSetErrored} from './actions/scoreboardLoadActions'
import store from './store'
let subscribed = false;
let socket = io("http://localhost:8080", {
    path: "/socket.io",
    transportOptions: {
        polling: {
          extraHeaders: {'Access-Control-Allow-Origin': '*'}
        }
    }})
socket.on("connect", ()=>{
    console.log("socket.io connected")
    if(subscribed) {
        socket.emit("join_scoreboard", {tournament_id : store.getState().scoreboardLoading.tournament_id})
    }
})
socket.on("scoreboard_update", (data)=>{
    if (data.status === "ok"){ 
        store.dispatch(scoreboardSetUpdated(data.result))
    }
    else {
        store.dispatch(scoreboardSetErrored(true))
    }
})
store.subscribe(()=>{
    let state = store.getState()
    let newSubscribed = store.getState().scoreboardLoading.subscribed;
    if(newSubscribed !== subscribed){
        subscribed = newSubscribed;
        let param = {tournament_id : store.getState().scoreboardLoading.tournament_id}
        socket.emit(subscribed ? "join_scoreboard" : "leave_scoreboard", param)
    }
})