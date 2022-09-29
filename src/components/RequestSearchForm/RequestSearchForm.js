import React, {useEffect, useState} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {
  Checkbox,
  TextInput,
  Tabs,
  Tab,
  Select, SelectItem,
  Button
} from 'carbon-components-react';
import {fetchRequest, fetchAllRequest} from '../../actions/act_request';
import MyRequestContainer from '../../container/MyRequestContainer';
import AllRequestContainer from '../../container/AllRequestContainer';

const RequestSearchForm=({history, userRole}) => {

  // initial state & function
  const [params, setParams]=useState(" ");

  const [companyName, setCompanyName]=useState(null);
  const [contactType, setContactType]=useState(null);
  const [contactSurname, setContactSurname]=useState(null);

  const [ifVTSChecked, setIfVTSChecked]=useState(true);
  const [ifCustomerChecked, setIfCustomerChecked]=useState(true);

  const data=useSelector(state => state.request.payload, shallowEqual);
  const alldata=useSelector(state => state.request.allpayload, shallowEqual);
  const ifRefresh=useSelector(state => state.request.ifRefresh, shallowEqual);

  const dispatch=useDispatch();


  useEffect(() => {
    if (params) {
      console.log(params);
      dispatch(fetchRequest(params));
      dispatch(fetchAllRequest(params));
    }
  }, [ifRefresh, params, dispatch]);


  /*LIST OF FUNCTIOND START */




  function searchRequest() {
    let searchParams="";
    if (companyName) {
      searchParams=searchParams+(searchParams? "&":"")+"companyName="+companyName
    }
    if (contactSurname) {
      searchParams=searchParams+(searchParams? "&":"")+"surname="+contactSurname
    }
    if (contactType) {
      searchParams=searchParams+(searchParams? "&":"")+"contactType="+contactType
    }
    switch (ifVTSChecked) {
      case true:
        switch (ifCustomerChecked) {
          case true:
            break;
          default:
            searchParams=searchParams+(searchParams? "&":"")+"purchaseType=V_TS_INTERNAL"
        }
        break;
      default:
        switch (ifCustomerChecked) {
          case true:
            searchParams=searchParams+(searchParams? "&":"")+"purchaseType=CUSTOMER"
            break;
          default:
            searchParams=searchParams+(searchParams? "&":"")+"purchaseType=xxxxx"
        }
    }
    setParams(searchParams? "?"+searchParams:" ")
  }

  function clearSearch() {
    setIfVTSChecked(true)
    setIfCustomerChecked(true)
    setCompanyName(null)
    setContactSurname(null)
    setContactType(null)
  }


  /*LIST OF FUNCTIOND END */

  return (
    <>
      <br /><hr /><br />
      <label className="bx--label">
        <strong>Type</strong>
      </label>
      <br />
      <Checkbox
        wrapperClassName="checkbox-inline"
        checked={ifVTSChecked}
        id="type-1"
        labelText="V-TS Internal"
        title="aaaa"
        onChange={value => {setIfVTSChecked(value)}}
      />
      <Checkbox
        wrapperClassName="checkbox-inline"
        checked={ifCustomerChecked}
        id="type-2"
        labelText="Customer"
        onChange={value => {setIfCustomerChecked(value)}}
      />
      <br />
      <TextInput
        id="companyname"
        labelText={<strong>Company Name:</strong>}
        onChange={(e) => {setCompanyName(e.target.value)}}
        value={companyName? companyName:""}
      />
      <br />
      <Select
                    id="type"
                    value={contactType}
                    onChange={(e) => {setContactType(e.target.value)}}
                    labelText={<strong>Contact type:</strong>}
                  >
                    <SelectItem text="Please select" value="" />
                    <SelectItem text="Data Privacy focal point" value="DATA_PRIVACY_FOCAL_POINT" />
                    <SelectItem text="Commercial focal point" value="COMMERCIAL_FOCAL_POINT" />
                    <SelectItem text="Legal focal point" value="LEGAL_FOCAL_POINT" />
                  </Select>

      <br />
      <TextInput
        id="contactsurname"
        labelText={<strong>Contact Surname:</strong>}
        onChange={(e) => {setContactSurname(e.target.value)}}
        value={contactSurname? contactSurname:""}
      />
      <br />
      <Button onClick={() => {searchRequest()}}>Search</Button>
      <label>              </label>
      <Button onClick={() => {clearSearch()}}>Clear&nbsp; </Button>
      <br /><br /><hr /><br />
      {userRole==="Supplier_Manager"?
      (
      <Tabs selected={0} triggerHref="#" >
        
        {/*<Tab href="#" label="My requests">
          <div>
          <MyRequestContainer history={history} data={data} userRole={userRole}/>
          </div>
        </Tab>
      */}
        <Tab href="#" label="All requests">
          <AllRequestContainer history={history} data={alldata} userRole={userRole} />
        </Tab>
      </Tabs>
      ):(
        <MyRequestContainer history={history} data={data} userRole={userRole}/>
      )}
    </>
  )
}
export default RequestSearchForm;