import React, {useEffect, useState} from 'react';
import {

  Loading,
} from 'carbon-components-react';
import UserForm from '../../components/UserForm';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {selectedUser} from '../../actions/act_user';
import ErrorPage from '../../components/ErrorPage';
import Page404 from '../../modules/Page404';
import Menu from '../../components/Menu';

const UserEditPage=({history, match}) => {

  const userRole=match.params.userRole
  const userId=match.params.userId;

  const [ifLoading, setIfLoading]=useState(true);

  const data=useSelector(state => state.user.selected, shallowEqual);
  const ifConnect=useSelector(state => state.user.ifConnect, shallowEqual);

  const dispatch=useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(selectedUser(userId))
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (data) {
      setIfLoading(false)
    }
  }, [data]);

  return (
    ifConnect? (
      userRole==="Administrator"? (
        data? (
          <>
            <UserForm history={history} userId={userId} userRole={userRole} /></>
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
      ):(
          <><Page404 userRole={userRole} /> </>
        )):(
        <ErrorPage userRole={userRole} />
      )
  )
};
export default UserEditPage;