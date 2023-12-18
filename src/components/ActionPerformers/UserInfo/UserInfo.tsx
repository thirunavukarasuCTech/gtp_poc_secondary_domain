import React, { useEffect, useState } from 'react'
import globe from "../../../assets/globe_image.png"
import './UserInfo.scss'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getCustomer } from '../../../utils/ApiService/GTPApis';

const UserInfo = ({ isMainheader }: any) => {
  const isAuthenticated = useSelector((state: any) => state.userState.loginAndSignup.isAuthenticated);
  const loggedInUser = useSelector((state: any) => state.userState.loginAndSignup.user);
  const token = useSelector((state: any) => state.userState.loginAndSignup.token);

  const navigate = useNavigate();

  const [userLoyaltyDetailsState, setUserLoyaltyDetailsState] = useState({
    userType: "",
    lifeTimePoints: "0",
    lifeTimePurchases: "0",
    loyaltyPoints: "0"
  });

  const capUser = async () => {
    const res = await getCustomer(token)
    console.log("Cap user info", res);
    if (res && res.status === 200 && res.data && res.data.customers && res.data.customers.customer && res.data.customers.customer[0]) {
      setUserLoyaltyDetailsState({
        userType: res.data.customers.customer[0].type,
        lifeTimePoints: res.data.customers.customer[0].lifetime_points,
        lifeTimePurchases: res.data.customers.customer[0].lifetime_purchases,
        loyaltyPoints: res.data.customers.customer[0].loyalty_points ? res.data.customers.customer[0].loyalty_points : 0
      })
    }
    return res;
  }
  useEffect(() => {
    capUser()
  }, [loggedInUser])

  return (
    <>
      {isMainheader ? (
        <div className="user-info d-flex align-items-center justify-content-end">
          {isAuthenticated && <div className="user-details">
            <p className='m-0 cursor-pointer' onClick={() => {
              navigate("/myAccount")
            }}>{loggedInUser.name} | {userLoyaltyDetailsState.loyaltyPoints && userLoyaltyDetailsState.loyaltyPoints} POINTS</p>
          </div>}
          <div className="language d-flex align-items-center">
            <img src={globe} alt="" height={20} width={20} loading="lazy" />
            <p className='m-0'>ENGLISH | JAPANESE</p>
          </div>
        </div>
      ) : (
        <div className="user-info-banner">
          {isAuthenticated && <div className="user-details">
            <p className='m-0'>{loggedInUser.name}</p>
          </div>}
        </div>
      )}
    </>
  )
}

export default UserInfo