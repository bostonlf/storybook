import React, {useEffect, useState} from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Link,
  Loading,
  TextInput,
  Checkbox,
  Button
} from 'carbon-components-react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {addUser} from '../../actions/act_user';
import ErrorPage from '../../components/ErrorPage';
import Menu from '../../components/Menu';


const UserForm=({history, userRole}) => {
  const data=useSelector(state => state.user.selected, shallowEqual);
  const ifRedirect=useSelector(state => state.user.ifRedirect, shallowEqual);
  const ifConnect=useSelector(state => state.user.ifConnect, shallowEqual);



  const [userid, setUserId]=useState("");
  const [ifLoading, setIfLoading]=useState(false);


  const [ifUser, setIfUser]=useState(false);
  const [ifSupplierManager, setIfSupplierManager]=useState(false);
  const [ifAdministrator, setIfAdministraor]=useState(false);


  const [ifInvalideID, setIfInvalidID]=useState(false);
  const [ifInvalideRole, setIfInvalidRole]=useState(false);

  const dispatch=useDispatch();
  function saveUser() {
    let role=[];
    if (ifUser) {
      role.push("Requestor")
    }
    if (ifSupplierManager) {
      role.push("Supplier_Manager")
    }
    if (ifAdministrator) {
      role.push("Administrator")
    }

    var params={
      roles: role,
      username: userid
    }

    if (userid.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)&&role.length!==0) {
      setIfLoading(true)
      setIfInvalidID(false)
      setIfInvalidRole(false)
      dispatch(addUser(params));
    }
    else {
      if (!userid.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        setIfInvalidID(true)
      }
      else {
        setIfInvalidID(false)
      }
      if (role.length===0) {
        setIfInvalidRole(true)
      }
      else {
        setIfInvalidRole(false)
      }
    }

  }

  useEffect(() => {
    if (data) {
      if (data.content.roleCodes.indexOf("Requestor")!==-1) {
        setIfUser(true)
      }
      if (data.content.roleCodes.indexOf("Supplier_Manager")!==-1) {
        setIfSupplierManager(true)
      }
      if (data.content.roleCodes.indexOf("Administrator")!==-1) {
        setIfAdministraor(true)
      }
      setUserId(data.content.customerId);
    }

    if (ifRedirect) {
      history.push("/"+userRole+"/user");
      setIfLoading(false)
    }
  }, [ifRedirect, data, history, userRole]);

  return (
    ifConnect? (
      <>          <Menu userRole={userRole} />
      <br /><br /><br />
            <Breadcrumb noTrailingSlash aria-label="Page navigation">
          <BreadcrumbItem>
            <Link href={"../welcome"}>V-TServices Vendor Management Portal</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href={"../user"}>User</Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <h1 className="landing-page__heading">Create/Edit a User</h1>
        <br /><hr /><br />
        <TextInput
          id="userid"
          defaultValue={userid}
          invalid={ifInvalideID}
          invalidText="A valid email is required"
          onChange={(e) => {setUserId(e.target.value)}}
          type="email"
          labelText={<strong>User ID:<span className="required-css-class">*</span></strong>}
        />
        <br />
        <label className="bx--label">
          <strong>Role:<span className="required-css-class">*</span></strong>
        </label>
        <Checkbox
          checked={ifUser}
          id="role-user"
          labelText="Requestor"
          onChange={value => {setIfUser(value)}}
        />
        <Checkbox
          checked={ifSupplierManager}
          id="role-manager"
          labelText="Supplier Manager"
          onChange={value => {setIfSupplierManager(value)}}
        />
        <Checkbox
          checked={ifAdministrator}
          id="role-administrator"
          labelText="Administrator"
          onChange={value => {setIfAdministraor(value)}}
        />
        {ifInvalideRole? (
          <>
            <div className="bx--form-requirement">A valid role is required</div>
            <br />
            <br />
          </>
        ):(<></>)}
        <br /><hr /><br />
        <Button
          onClick={() => {saveUser()}}>Save</Button>
        <Loading
          active={ifLoading}
          small={false}
          withOverlay={true}
        />
      </>
    ):(
        <ErrorPage />
      )
  )
};
export default UserForm;