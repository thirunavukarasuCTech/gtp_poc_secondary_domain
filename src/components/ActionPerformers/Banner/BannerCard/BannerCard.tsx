import React from 'react'
import './BannerCard.scss'


import rightArrow from "../../../../assets/right_arrow.png"

const BannerCard = ({img} : any) => {
  return (
    <>
        <div className="banner-card">
            <div className="banner-card-image">
                <img src={img} alt="" loading="lazy"/>
            </div>
            <div className="banner-card-description d-flex">
                <p className='m-0'>20% Golf Bonus</p>
                <img src= {rightArrow} alt="" loading="lazy"/>
            </div>
        </div>
    </>
  )
}

export default BannerCard