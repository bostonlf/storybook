import React from 'react';
import NewRequestForm from '../../components/NewRequestForm';
import Menu from '../../components/Menu';
import Page404 from '../../modules/Page404';

const RequestAddPage=({history, match}) => {
  const userRole=match.params.userRole
  return (
    userRole==="Administrator"||userRole==="Requestor"||userRole==="Supplier_Manager"? (
      <>
        <NewRequestForm history={history} userRole={userRole} />
      </>
    ):(
        <>
          <Menu userRole={userRole} />
          <br /><br /><br />
          <Page404 userRole={userRole} />
        </>
      )
  )

};
export default RequestAddPage;