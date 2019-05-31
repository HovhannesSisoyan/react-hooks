import React from 'react';

import AuthContext from '../auth-context';

const Auth = props => {
    const auth = React.useContext(AuthContext);

    return <button onClick={auth.login}>Log in!</button>
}

export default Auth;