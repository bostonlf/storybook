import React, { useEffect } from 'react';
import { Loading } from 'carbon-components-react';
import qs from 'qs'

const RedirectPage = (props) => {
  useEffect(() => {
    let queryStr = props.location.search;
    if (queryStr && queryStr[0] === '?') {
      queryStr = queryStr.substr(1);
      const ssoObj = qs.parse(queryStr);
      localStorage.setItem('access_token', ssoObj.access_token);
      localStorage.setItem('refresh_token', ssoObj.refresh_token);
      const url = localStorage.getItem('url');
      props.history.push(url);
    }
  });
  return (
    <>
      <Loading withOverlay={false} className="bx--loading auto-center" />
    </>
  )
}

export default RedirectPage;
