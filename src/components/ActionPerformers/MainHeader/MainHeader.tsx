import React from 'react'

import NavigationBar from '../NavigationBar/NavigationBar'
import logo from "../../../assets/gtpLogo.png"
import './MainHeader.scss'
import UserInfo from '../UserInfo/UserInfo'
import { useNavigate } from "react-router-dom";


const MainHeader = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="main-header">
                <div className="gtp-logo" onClick={()=>{
                    navigate("/")
                }}>
                    <img src={logo} alt="" loading="lazy"/>
                </div>
                <UserInfo isMainheader={true}/>
                <NavigationBar />
            </div>
        </>
    )
}

export default MainHeader