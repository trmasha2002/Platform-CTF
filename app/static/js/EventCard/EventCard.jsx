import React from 'react'
import './EventCard.css'

const get_css_url = (url) => ('url(' + url + ')');

class EventCard extends React.Component {

    toggleEnrolled() {
        this.setState({
            enrolled: !this.state.enrolled
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            enrolled: false
        };
    };

    render() {
        let btnText = this.state.enrolled ? "Отписаться" : "Записаться";
        let btnClass = this.state.enrolled ? "btn btn-danger text-white" : "btn btn-success text-white";
        return (
            <div className="card event-card my-2">
                <div className="col-md-4 lol card-img-top" style={{ backgroundImage: get_css_url(this.props.image || "https://voteformost.net/wp-content/plugins/wp-foto-vote/assets/img/no-photo.png") }} />
                <div className="card-body col-xs-12 col-sm-12 col-md-8 col-md-offset-1">
                    <h5 className="card-title mb-1">{this.props.name || "Название карточки"}</h5>
                    <p className="mb-2 d-flex event-card no-gutters">
                    <small className="d-block col-xs-12 col-md-4">{this.props.place}</small>
                    <small className="d-block col-xs-12 col-md-8">{this.props.time}</small>
                    </p>
                    <p className="card-text">{this.props.info || "Описание event'а"}</p>
                    <button className={btnClass} onClick={this.toggleEnrolled.bind(this)}>{btnText}</button>
                </div>
            </div>
        );
    }
}

export default EventCard;
