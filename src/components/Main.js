import React from 'react';
import { useSubscription } from '@apollo/client';
import { GET_AUTHOR_DETAILS } from '../graphql/subscription';
import AuthorList from '../components/AuthorList';
import { useAuth0 } from '../components/AuthWrapper';
import Button from '@material-ui/core/Button';

const Main = () => {

    const {
        isAuthenticated,
        loginWithRedirect,
        logout,
        loading : auth0Loading
    } = useAuth0();

    const { loading, error, data } = useSubscription(
        GET_AUTHOR_DETAILS, {}
    );

    if (error) {
        console.log("error", error)
        return (<div>Error</div>)
    }

    if (loading || auth0Loading) {
        return (<div>Loading Authors</div>)
    }

    return (
        <div>
            {!isAuthenticated ? <Button onClick={() => loginWithRedirect({})}>Login</Button> : <Button onClick={() => logout()}>Logout</Button>}
            <AuthorList authors={data.author} />
        </div>
    )
};

export default Main;

