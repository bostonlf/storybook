import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Link,
  Loading,
} from 'carbon-components-react';
import {shallowEqual, useSelector} from 'react-redux';
import RequestActiveSearchForm from '../../components/RequestActiveSearhForm';
import ErrorPage from '../../components/ErrorPage';
import Menu from '../../components/Menu';
import Page404 from '../../modules/Page404';


const RequestActivePage=({history, match}) => {
  const userRole=match.params.userRole

  const ifConnect=useSelector(state => state.request.ifConnect, shallowEqual);
  const loginRole=useSelector(state => state.principal.payload, shallowEqual);
  return (
    ifConnect? (
      loginRole?(
        loginRole.roles.indexOf(userRole)!==-1?
        (
          <>
            <Menu userRole={userRole} />
            <br /><br /><br />
            <Breadcrumb noTrailingSlash aria-label="Page navigation">
              <BreadcrumbItem>
                <Link href={"./welcome"}>V-TServices Vendor Management Portal</Link>
              </BreadcrumbItem>
            </Breadcrumb>
            <h1 className="landing-page__heading">Active Requests</h1>
            <br />
            
            <br />
            <RequestActiveSearchForm history={history} userRole={userRole} />
          </>
        ):(
          <><Page404 userRole={userRole} /> </>
        )):(<> <Loading withOverlay={false}  /> </>)
    ):(
        <ErrorPage userRole={userRole} />
      )
  )
};
export default RequestActivePage;