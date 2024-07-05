import React from 'react'
import './Login.css'
import Button from '@mui/material/Button';
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth'
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

function Login() {
    const [state, dispatch] = useStateValue();

    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => alert(error.message))
    }

    return (
        <div className='login'>
            <div className='login__container'>
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuhCy5DAq2Ax1doPeraxo0gR6aLRb0rZO_sw&s'
                    alt='logo'
                />
                <div className='login__text'>
                    <h1>Sign in to Trash Lyf Podcast ♻️</h1>
                </div>
                <Button type='submit' onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
