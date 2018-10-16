/*jshint esversion: 6 */
import React from "react";
import AvatarImageCropper from 'react-avatar-image-cropper';
import "./EditUserPic.css"
import axios from "axios/index";
import $ from "jquery";

class EditUserPic extends  React.Component{
    constructor(props) {
        super(props);
    }

    apply = (file) => {
        this.src = window.URL.createObjectURL(file);
    }

    send() {
        axios.defaults.withCredentials = true;
        axios({
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'POST',
            url: 'http://localhost:8080/api/login',
            data: {
                'login': this.login.value,
                'password': this.src.value
            },
            withCredentials: true,
        }).then((response) => {
                console.log(response);
                if (response.data.status === "ok") {
                    this.props.avatar = response.data.avatar;
                }
                else {
                    console.log(response);
                }
            },
            (err) => {
                console.log(err);
            });
        return false;
    }
    render (){
        return (
            <div className="input-group mb-3">
                    <div className="card editpic">
                        <span className="input-group-text">Главное фото профиля</span>
                        <AvatarImageCropper
                            src = {this.props.avatar}
                            apply={this.apply.bind(this)}
                            isBack={true}
                        />
                    </div>
            </div>
        );
    }
}
export default EditUserPic;