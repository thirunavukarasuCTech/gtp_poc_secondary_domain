import React, { useEffect } from 'react'
import './CallBackPage.scss'
import { HashLoader } from 'react-spinners';
import { getSocialAuthTokens, getUserInfoFromAuth0, getUserInfoInfoFromAuth0ManagementAPI } from '../../utils/ApiService/GTPApis';
import { useDispatch } from 'react-redux';
import { loginSuccess, updateToken } from '../../reduxStore/features/LoginAndSignUpSlice/LoginAndSignUpSlice';
import { ToastMessage } from '../../utils/ToastService/toast';
import { useNavigate } from 'react-router-dom';


const CallBackPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        const code = window.location.search.split('?')[1].split("&")[0].split("=")
        const state = window.location.search.split('?')[1].split("&")[1].split("=")
        console.log(code, state);
        const getSocialLoginAuthToken = async () => {
            const response = await getSocialAuthTokens(code[1])
            console.log(response);
            if (response && response.data && response.data.access_token) {
                dispatch(updateToken(response.data))
                getUserInfoFromAuth0(response.data.access_token, (err: any, data: any) => {
                    if (err) {
                        console.log("Error while fetching user with UserInfo endpoint", err);
                        return;
                    }
                    getUserInfoInfoFromAuth0ManagementAPI(data.sub, (err: any, data: any) => {
                        if (err) {
                            console.log("Error while fetching user with Management API endpoint", err);
                            return;
                        }
                        let user = {
                            email: data.email,
                            name: data.name,
                            user_id: data.user_id
                        }
                        dispatch(loginSuccess(user))
                        ToastMessage("Success", "LINE login successful!")
                        navigate('/')
                    })
                })
            }

        }
        getSocialLoginAuthToken()
    })
    return (
        <>
            <div className="sweet-loading">
                <HashLoader
                    color={"green"}
                    loading={true}
                    // cssOverride={override}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </>
    )
}

export default CallBackPage