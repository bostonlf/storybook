import React  from 'react';
import {
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
  SideNav,
} from 'carbon-components-react/lib/components/UIShell';
import {Account32,IdManagement32} from '@carbon/icons-react';

const Menu=({userRole}) => {

  // const [ifSideNavOpen, setifSideNavOpen]=useState(false)
  // const [authUser, setAuthUser]=useState(false);
  // const [authRequest, setAuthRequest]=useState(false);
  // const [authRecipient, setAuthRecipient]=useState(false);
  // const [authActiveRequest, setAuthActiveRequest] = useState(false);

  // const openSideNav=() => {
  //   setifSideNavOpen(!ifSideNavOpen)
  // }

  // useEffect(() => {
  //   if (userRole) {
  //     if (userRole==="Administrator") {
  //       setAuthRequest(true)
  //       setAuthRecipient(true)
  //       setAuthUser(true)
  //       setAuthActiveRequest(true)
  //     }
  //     else if (userRole==="Supplier_Manager") {
  //       setAuthRequest(true)
  //       setAuthRecipient(true)
  //       setAuthActiveRequest(true)
  //     }
  //     else if (userRole==="Requestor") {
  //       setAuthRequest(true)
  //       setAuthRecipient(false)
  //       setAuthUser(false)
  //       setAuthActiveRequest(true)
  //     }
  //     else {
  //       setAuthRequest(false)
  //       setAuthRecipient(false)
  //       setAuthUser(false)
  //       setAuthActiveRequest(false)
  //     }
  //   }
  // }, [userRole]);


  return (

    <SideNav aria-label="Side navigation" expanded={true}>
            <SideNavItems>
            <SideNavMenuItem href="/">
                  Homepage
                </SideNavMenuItem>
              <SideNavMenu renderIcon={IdManagement32}  title="User">
                <SideNavMenuItem href="/welcome">
                  Add user
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu  renderIcon={Account32}  title="Configuration">
                <SideNavMenuItem href="/2">
                  Country
                </SideNavMenuItem>
                <SideNavMenuItem href="/">
                  Client
                </SideNavMenuItem>
                <SideNavMenuItem href="/">
                  Region
                </SideNavMenuItem>
              </SideNavMenu>
            </SideNavItems>
          </SideNav>
    //  </Header> 

  )
}
export default Menu;