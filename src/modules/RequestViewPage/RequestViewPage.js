import React, {useEffect, useState} from 'react';
import {
  Loading,
} from 'carbon-components-react';
import ViewRequestForm from '../../components/ViewRequestForm';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {selectedRequest,managerSelectedRequest} from '../../actions/act_request';
import ErrorPage from '../../components/ErrorPage';
import NoAuthPage from '../../components/NoAuthPage';
import Menu from '../../components/Menu';

const RequestViewPage=({history, match}) => {

  // get id and user from URL
  const userRole=match.params.userRole;
  const requestId=match.params.requestId;

  const [ifLoading, setIfLoading]=useState(true);

  const data=useSelector(state => state.request.selected, shallowEqual);
  const auth=useSelector(state => state.request.auth, shallowEqual);
  const ifConnect=useSelector(state => state.request.ifConnect, shallowEqual);

  const dispatch=useDispatch();

  useEffect(() => {
    if (requestId) {
      if (userRole==="Requestor") {
        dispatch(managerSelectedRequest(requestId))
      }
      else {
      dispatch(selectedRequest(requestId))
      }
    }
  }, [dispatch, requestId, userRole]);

  useEffect(() => {
    if (data) {
      setIfLoading(false)
    }
  }, [data]);

  return (
    ifConnect? (
      auth?(
      data? (
        <><ViewRequestForm history={history} requestId={requestId} userRole={userRole} /></>
      ):(
          <>
            <Menu userRole={userRole} />
            <br /><br /><br />
            <Loading
              active={ifLoading}
              small={false}
              withOverlay={true}
            />
          </>
        )
      ):(<>
      <NoAuthPage userRole={userRole} /></>)
    ):(
        <ErrorPage userRole={userRole} />
      )
  )

};
export default RequestViewPage;