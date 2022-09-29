import React from 'react';
import Menu from '../../components/Menu';

const ErrorPage=({userRole}) => {
  return (
    <div>
      <Menu userRole={userRole} />
    <br /><br /><br />
      <h5>
        There is a temprory connection issue with this page, Please refresh the page orcontact your Administrator
    </h5>
    </div>
  );
};
export default ErrorPage;