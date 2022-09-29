import React from 'react';
import UserForm from '../../components/UserForm';
import Page404 from '../../modules/Page404';


const UserAddPage=({history, match}) => {

  const userRole=match.params.userRole

  return (
    userRole==="Administrator"? (
      <>
        <UserForm history={history} userRole={userRole} />
      </>
    ):(
        <><Page404 userRole={userRole} /> </>
      )
  )

};
export default UserAddPage;