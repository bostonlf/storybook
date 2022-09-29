import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Link,
  Button
} from 'carbon-components-react';
import {AddAlt16} from '@carbon/icons-react'
import {shallowEqual, useSelector} from 'react-redux';
import UserContainer from '../../container/UserContainer';
import Menu from '../../components/Menu';
import Page404 from '../../modules/Page404';
import ErrorPage from '../../components/ErrorPage';

const UserPage=({history, match}) => {

  const userRole=match.params.userRole;

  const ifConnect=useSelector(state => state.user.ifConnect, shallowEqual);

  return (
    ifConnect? (
      userRole==="Administrator"? (
        <>
          <Menu userRole={userRole} />
          <br /><br /><br />
          <Breadcrumb noTrailingSlash aria-label="Page navigation">
            <BreadcrumbItem>
              <Link href={"./welcome"}>V-TServices Vendor Management Portal</Link>
            </BreadcrumbItem>
          </Breadcrumb>
          <h1 className="landing-page__heading">User</h1>
          <br /><hr /><br />
          <Button
            disabled={false}
            href={"useradd"}
            renderIcon={AddAlt16}>
            Create a new User
          </Button>
          <br /><br /><hr /><br />
          <UserContainer history={history} userRole={userRole} />
        </>
      ):(
          <><Page404 userRole={userRole} /> </>
        )
    ):(
        <ErrorPage userRole={userRole} />
      )
  )
};
export default UserPage;