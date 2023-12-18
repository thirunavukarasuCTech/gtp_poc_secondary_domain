import React, { useEffect, useState } from 'react'
import './ProfilePage.scss'
import MyAccount from '../../components/ActionPerformers/MyProfile/MyAccount'
import { MyProfile } from '../../components/ActionPerformers/MyProfile/MyProfile'
import { useSelector } from 'react-redux'
import { getCustomer } from '../../utils/ApiService/GTPApis'

const ProfilePage = () => {
  const token = useSelector((state: any) => state.userState.loginAndSignup.token);
  const [userLoyaltyDetailsState, setUserLoyaltyDetailsState] = useState({});

  const capUser = async () => {
    const res = await getCustomer(token)
    console.log("Cap user info", res);
    if (res && res.status === 200 && res.data && res.data.customers && res.data.customers.customer && res.data.customers.customer[0]) {
      setUserLoyaltyDetailsState({
        currentSlab: res.data.customers.customer[0].current_slab,
        memberId: res.data.customers.customer[0].external_id ? res.data.customers.customer[0].external_id : res.data.customers.customer[0].user_id,
        userType: res.data.customers.customer[0].type,
        lifeTimePoints: res.data.customers.customer[0].lifetime_points,
        lifeTimePurchases: res.data.customers.customer[0].lifetime_purchases,
        loyaltyPoints: res.data.customers.customer[0].loyalty_points
      })
    }
    return res;
  }
  useEffect(() => {
    capUser()
  }, [])


  return (
    <>
      <div className="my-profile-page-container w-75 mt-5">
        <MyAccount userLoyaltyInfo={userLoyaltyDetailsState} />
        <MyProfile />
      </div>
    </>
  )
}

export default ProfilePage