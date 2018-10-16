import React from "react";
import "./UserCard.css";
import { Link } from 'react-router-dom';



const UserCard = (props) => (
    <div className="card" id="main-card">
        <div className="main">
            <div className="header-cover">
                <img
                    src={props.hat || "https://www.webpagefx.com/internet-marketing/img/09-web-design.png"}
                    className="rounded mx-auto d-block img-fluid" />
                <div className="content">
                    <div className="row">
                        <div className="col">
                            <div className="rating-photo">
                                <div className="col-sm-auto">
                                    <img
                                        src={props.avatar || "https://vk.vkfaces.com/623621/v623621881/21756/uJVXgpWW7BM.jpg"}
                                        className="rounded-circle" />
                                </div>
                                <div className="rating">
                                </div>
                            </div>
                        </div>
                        <div className="name">
                            {props.name + ' ' + (props.surname != null? props.surname: '')}
                        </div>
                        <div className="information">
                        {props.own === 1 ?
                            <Link className="btn btn-primary" to='/user/edit/' >Редактировать</Link>:''
                            }
                        </div>
                        <div className="card" id="about">
                            <div className="card-body" id="cardb">
                                <h5>Турниры, в которых участвовал пользователь:</h5>
                                {props.tournaments}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
export default UserCard;