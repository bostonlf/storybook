import React, {useEffect, useState} from 'react';
import {
  Breadcrumb,
  FormGroup,
  RadioButtonGroup,
  RadioButton,
  Button
} from 'carbon-components-react';
import {Redirect} from 'react-router-dom';
import {setPrincipal} from '../../actions/act_principal';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import LoadingPage from '../../components/LoadingPage';
import ErrorPage from '../../components/ErrorPage';
import Menu from '../../components/Menu';
import Consent from '../../components/Consent';


const LandingPage=props => {


  const [selectedRole, setSelectedRole]=useState(null);
  const [ifInvalideRole, setIfInvalideRole]=useState(false);
  const ifConnect=useSelector(state => state.principal.ifConnect, shallowEqual);

  const data = useSelector(state => state.principal.payload, shallowEqual);

  const dispatch=useDispatch();

  //dispatch(getConsentStatus());

  function selectRole() {
    if (selectedRole) {
      dispatch(setPrincipal(selectedRole));
      props.history.push(selectedRole+'/welcome');
      setIfInvalideRole(false)
    }
    else {
      setIfInvalideRole(true)
    }
  }

  return (
    ifConnect? (
      <>
        <Menu userRole={""} />
        <br /><br /><br />
        {data? (
          data.roles.length===1? (
            <><Redirect to={{pathname: "/"+data.roles[0]+"/welcome"}} /></>
          ):(
              <>
                <Breadcrumb noTrailingSlash aria-label="Page navigation">
                </Breadcrumb>
      
<h1 className="landing-page__heading">Welcom to V-TServices Vendor Management Portal</h1>
                <br /><br />
                <hr /><br /><br />   
                

                <h5>Please select your role to continue:</h5>
                <br />
                {ifInvalideRole? (
                    <label className="bx--label"><span className="required-css-class">A valid role is required</span></label>
                ):(<></>)}
                <FormGroup
                  legendText=""
                  invalid={true}>
                  <RadioButtonGroup
                    name="role-group"
                    onChange={(value) => {setSelectedRole(value); setIfInvalideRole(false)}}
                    orientation="vertical"
                  >
                    {data.roles.map(value => (
                      <RadioButton key={value} id={value} labelText={value} value={value} />
                    ))}
                  </RadioButtonGroup>
                </FormGroup>
                <Button
                  onClick={() => {selectRole()}}>
                  GO
                  </Button>

                  

                <br /><br /><br /><br /><hr />
                
                </>
            )
        ):(<LoadingPage />)}
        <br /><br /><br /><br />
        <br /><br /><br /><br />
        <Consent/>
      </>
    ):(<ErrorPage userRole={""} />)
  )
};
export default LandingPage;