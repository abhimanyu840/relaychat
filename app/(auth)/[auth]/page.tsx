import NotFound from '@/app/not-found'
import LoginComponent from '@/components/LoginComponent'
import SignupComponent from '@/components/SignupComponent'
import { AuthFlow } from '@/types'
import React from 'react'

const Auth = ({ params }: { params: { auth: AuthFlow } }) => {

    if (params.auth === AuthFlow.Signup) {
        return <SignupComponent />
    }

    if (params.auth === AuthFlow.Login) {
        return <LoginComponent />
    }

    if (params.auth !== AuthFlow.Login && params.auth !== AuthFlow.Signup) {
        return <NotFound />
    }
}

export default Auth
