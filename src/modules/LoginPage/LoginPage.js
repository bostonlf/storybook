import React, { useEffect } from 'react';
import { Loading } from 'carbon-components-react';
import Menu from '../../components/Menu';
import apiurl from '../../constants/Urls';

const LoginPage = props => {
  useEffect(() => {
    const redirectSSO = async () => {

      const clientId = (process.env.NODE_ENV === 'production' && typeof(process.env.REACT_APP_CLIENT_ID) != undefined) ? process.env.REACT_APP_CLIENT_ID : 'vmp-local';
      
      const url = apiurl.AUTHLOGIN+`/w3/login?clientId=${clientId}`;
      window.location.href = url;
    };
    const token = localStorage.getItem('access_token');
    localStorage.setItem('url', props.location.state.from.pathname);
    token ? props.history.push('') : redirectSSO();
  });
  return (
    <>
    <Menu userRole={""} />
    <br /><br /><br />
    <Loading withOverlay={false}  />
    </>
  );
};

export default LoginPage;
