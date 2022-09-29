import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Link,
  Button
} from 'carbon-components-react';
import {AddAlt16} from '@carbon/icons-react'
import {shallowEqual, useSelector} from 'react-redux';
import RecipientContainer from '../../container/RecipientContainer';
import ErrorPage from '../../components/ErrorPage';
import Menu from '../../components/Menu';
import Page404 from '../../modules/Page404';
const RecipientPage=({history, match}) => {
  const userRole=match.params.userRole

  const ifConnect=useSelector(state => state.request.ifConnect, shallowEqual);
  return (
    ifConnect? (
      userRole==="Administrator"||userRole==="Supplier_Manager"||userRole==="DEVELOPER"?
        (
          <>
            <Menu userRole={userRole} />
            <br /><br /><br />
            <Breadcrumb noTrailingSlash aria-label="Page navigation">
              <BreadcrumbItem>
                <Link href={"./welcome"}>V-TServices Vendor Management Portal</Link>
              </BreadcrumbItem>
            </Breadcrumb>
            <h1 className="landing-page__heading">Service recipient</h1>
            <br /><hr /><br />
            <Button
              disabled={false}
              href={"recipientadd"}
              renderIcon={AddAlt16}
            >
              Create a new Service recipient
          </Button>
            <br /><br /><hr /><br />
            <RecipientContainer history={history} userRole={userRole} />
          </>
        ):(
          <><Page404 userRole={userRole} /> </>
        )
    ):(
        <ErrorPage userRole={userRole} />
      )
  )
};
export default RecipientPage;