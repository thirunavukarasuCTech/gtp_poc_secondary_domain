import React from 'react'
import './common.scss'
const MyAccount = ({ userLoyaltyInfo }: any) => {
  
  return (
    <div className="my-account-container">
      <p className='my-account-title m-0'>My Account</p>
      <div className="my-account mt-5 d-flex align-items-center">
        <div className="account">
          <p className='user-points m-0'>{userLoyaltyInfo.loyaltyPoints} points</p>
          <p className='info m-0'>Current Tier: {userLoyaltyInfo.currentSlab}</p>
          <p className='info m-0'>Membership ID: {userLoyaltyInfo.memberId}</p>
          <p className='info m-0'>Lifetime Points: {userLoyaltyInfo.lifeTimePoints}</p>
          <p className='info m-0'>Lifetime Purchases: {userLoyaltyInfo.lifeTimePurchases}</p>
          <p className='info m-0'>User type: {userLoyaltyInfo.userType}</p>
          {/* <p className='points-expiry m-0'>5,000 Points Expire on 2023/01/08</p> */}
        </div>
      </div>
    </div>
  )
}

export default MyAccount