import React, { useEffect } from 'react'
import Banner from '../../components/ActionPerformers/Banner/Banner'
import { getUserAuthStatusForSocialLogin } from '../../utils/ApiService/GTPApis';

const HomePage = () => {

  useEffect(() => {
    const isRedirected = document.referrer !== '';

    if (isRedirected) {
      const fetchUserAuthStatus = async () => {
        const response = await getUserAuthStatusForSocialLogin(window.location.search.split('=')[1]);
        console.log('testskjhdjb', response);
        console.log(window.location.search.split('=')[1]);
      }

      fetchUserAuthStatus();
    }


  }, []);

  return (
    <>
      <Banner />
    </>
  )
}

export default HomePage