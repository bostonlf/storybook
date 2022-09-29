import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Link,
  Loading,
  Button
} from 'carbon-components-react';
import {AddAlt16} from '@carbon/icons-react'
import {shallowEqual, useSelector} from 'react-redux';
import RequestSearchForm from '../../components/RequestSearchForm';
import ErrorPage from '../../components/ErrorPage';
import Menu from '../../components/Menu';
import Page404 from '../../modules/Page404';


const RequestPage=({history, match}) => {
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
            <h1 className="landing-page__heading">Request</h1>
            <br />

            {userRole ==="Requestor"?(
            <>
              <hr /><br/>
              <Button
                disabled={false}
                href={"requestadd"}
                renderIcon={AddAlt16}
              >
                Create a new Request
              </Button>
            </>
            ):""}
            
            <br />
            <RequestSearchForm history={history} userRole={userRole} />
          </>
        ):(
          <><Page404 userRole={userRole} /> </>
        )):(<> <Loading withOverlay={false}  /> </>)
    ):(
        <ErrorPage userRole={userRole} />
      )
  )
};
export default RequestPage;