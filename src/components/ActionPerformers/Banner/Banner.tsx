import React from 'react'
import './Banner.scss'
import home from "../../../assets/GTP_HOME_PAGE.png"
import UserInfo from '../UserInfo/UserInfo';
import BannerCard from './BannerCard/BannerCard';
import { useSelector } from 'react-redux';
import manPlayingGolf from "../../../assets/man_playing_golf.png"
import onsen from "../../../assets/onsen.png"
import resortBonus from "../../../assets/resort_bonus.png"
import restaurantDeal from "../../../assets/restaurant_deal.png"
const Banner = () => {
  const isAuthenticated = useSelector((state: any) => state.userState.loginAndSignup.isAuthenticated);

  const sectionStyle = {
    backgroundImage: `url(${home})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '83vh',
    color: '#fff',
    padding: '20px',
  };
  return (
    <>
      <div className="background-section" style={sectionStyle}>
        {isAuthenticated && (
          <>
            <div className="banner-user-greet w-90">
              <UserInfo isMainheader={false} />
              <p className='m-0 mt-4 banner-user-greet-description'>We have curated these deals especially for you.</p>
            </div>
            <div className="banner-cards-container d-flex">
              <BannerCard img = {manPlayingGolf}/>
              <BannerCard img = {onsen}/>
              <BannerCard img = {resortBonus}/>
              <BannerCard img = {restaurantDeal}/>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Banner