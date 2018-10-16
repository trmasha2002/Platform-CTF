import React from "react";
import axios from 'axios';

class ConfirmCode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: ''
        };
    }

    componentWillMount()
    {
        this.send();
    }

    //TODO Проверить авторизованность

/*    checkAuth()
    {
            const isAuth = store.getState()[0];
            console.log(store.getState());
                if  (isAuth)
            {
                this.props.history.push('/');
                }
    }*/

    // componentDidMount()
    // {
    //     this.checkAuth();
    // }

    send() {
        axios.defaults.withCredentials = true;
        let url_link = window.location.href;
        let url = new URL(url_link);
        let code = url.searchParams.get('code');
        axios({
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'GET',
            url: 'http://localhost:8080/api/confirm?code=' + code,
            withCredentials: true,
        }).then((response) => {
            console.log(response);
            this.setState(
                    {
                        answer: response.data.result,
                    }
                )
            },
            (err) => {
                console.log(err);
            });
        return false;
    }

    render() {
        const answer = this.state.answer;
        return (
            answer ?
                <div className="">
                    <h3 id="answer">{answer}</h3>
                </div> : <h3>Активация...</h3>
        );
    }
}
export default ConfirmCode;