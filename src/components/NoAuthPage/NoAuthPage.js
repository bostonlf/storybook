import React  from 'react';
import Menu from '../../components/Menu';

const NoAuthPage = ({userRole})=>{
    return (
      <>
       <Menu userRole={userRole} />
    <br /><br /><br />
      <h4>
        You are not  authorized to access this page, 
    </h4>
    </>
    )
}
export default NoAuthPage;