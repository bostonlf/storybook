import React from 'react';
import NewRecipientForm from '../../components/NewRecipientForm';
import Menu from '../../components/Menu';
import Page404 from '../../modules/Page404';

const RecipientAddPage=({history, match}) => {
  const userRole=match.params.userRole
  return (
    userRole==="Administrator"||userRole==="Supplier_Manager"? (
      <>
        <NewRecipientForm history={history} userRole={userRole} />
      </>
    ):(
        <>
          <Menu userRole={userRole} />
          <br /><br /><br />
          <Page404 userRole={userRole} /> </>
      )
  )

};
export default RecipientAddPage;