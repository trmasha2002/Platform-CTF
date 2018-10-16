import React from "react";
import Image from "./ctf.png";
import lol from "./Some.png";
import end from "./hackit_ctf_ctftime.png"
import "./ctf_main.css"
import {Link} from 'react-router-dom'
import ScrollAnimator from "../ScrollAnimator/ScrollAnimator"


class Text extends React.Component {
    
    render() {
        return (
            <div> 
                <div className="preview_page" >
                    <ScrollAnimator animClassName="animated fadeIn">
                        <h1 className="mainName">Capture The Flag</h1>
                    </ScrollAnimator>
                    
                    <div className="btns">
                    </div>
                </div>
                <div className="pages">
                    <ScrollAnimator animClassName="animated fadeIn">
                        <h1 className="whatIsCTF">Что такое CTFSquad</h1>
                    </ScrollAnimator>
                </div>
                <div className="opisane1">
                        <p className="CtfText"> <i>CTFSquad - это уникальный сервис для проведения CTF(Capture The Flag) непосредственно на сайте.</i>
                        </p>
                        <p className="CtfText">
                            CTFSquad предоставляет широкий набор настроек при создании турниров, а также тасков к нему. Интерактивная карта позволяет быстро найти очный турнир по близости.
                        </p>
                </div>
                
                <div className="pages1">
                    <ScrollAnimator animClassName="animated fadeIn">
                        <h1 className="typesOfCtf">Виды CTF</h1>
                    </ScrollAnimator>
                </div>

                <div className="opisane2">
                            <h3 className="types">Существует два формата проведения соревнований по компьютерной безопасности:</h3>
                            
                            <div className="row columns">
                                <div className="col-md-5 clmn1">
                                    <div className="card">
                                        <div className="card-body sndCardBody">
                                            
                                            <h5 style={{textAlign:'center'}}>Task-based</h5> 
                                            <p>
                                                Игрокам предоставляется набор заданий, 
                                                к которым требуется найти ответ и отправить его. 
                                                Ответ представляет собой флаг: это
                                                может быть набор символов или произвольная фраза. 
                                                За верно выполненное задание команда получает
                                                определенное количество очков. Чем задание сложнее, 
                                                тем больше очков будет полагаться за правильный
                                                ответ. 
                                            </p>
                                        </div>
                                    </div>
                                    
                                     
                                </div>
                                <div className="col-md-5 sndColumn">
                                    <div className="card ctfCard">
                                            <div className="card-body sndCardBody">
                                                <h5 style={{textAlign:'center'}}>Сlassic</h5> 
                                                <p className="pCard">
                                                    В классической схеме каждая команда получает выделенный сервер или 
                                                    небольшую сеть для поддержанияеё функционирования и защиты. 
                                                    Во время игры команды получают очки за корректную работу сервисов.
                                                </p>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                </div>              

                <div className="footr">
                    <p className="footrP"> 
                        Created by MSHP Team 31
                    </p>
                </div>
        </div>
        )
    }
}
export default Text;