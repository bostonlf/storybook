import React, {useEffect, useState} from 'react';
import {
  Loading,
} from 'carbon-components-react';
import EditRecipientForm from '../../components/EditRecipientForm';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {selectedRecipient} from '../../actions/act_recipient';
import ErrorPage from '../../components/ErrorPage';
import Menu from '../../components/Menu';

const RecipientEditPage=({history, match}) => {

  const userRole=match.params.userRole;
  const recipientId=match.params.recipientId;

  const [ifLoading, setIfLoading]=useState(true);

  const data=useSelector(state => state.recipient.selected, shallowEqual);
  const ifConnect=useSelector(state => state.recipient.ifConnect, shallowEqual);

  const dispatch=useDispatch();


  useEffect(() => {
    if (recipientId) {
      dispatch(selectedRecipient(recipientId))
    }
  }, [dispatch, recipientId]);

  useEffect(() => {
    if (data) {
      setIfLoading(false)
    }
  }, [data]);

  return (
    ifConnect? (
      data? (
        <><EditRecipientForm history={history} recipientId={recipientId} userRole={userRole} /></>
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
        <ErrorPage userRole={userRole} />
      )
  )

};
export default RecipientEditPage;