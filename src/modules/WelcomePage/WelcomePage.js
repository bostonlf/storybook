import React from 'react';
import Menu from '../../components/Menu';
import Page404 from '../../modules/Page404';

const WelcomePage=({match}) => {
   
   const userRole=match.params.userRole

   return (
      <>
         <br /><br /><br />
         {userRole==="Administrator"||userRole==="Requestor"||userRole==="Supplier_Manager"? (
            <>
               <Menu userRole={userRole} />

                        <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-md-4 bx--col-lg-7">
                    
                  <h1 className="landing-page__heading">{userRole}</h1>
                    <h1 className="landing-page__heading">Welcom to V-TServices Vendor Management Portal</h1>
                    <hr />
                    <br/>
                    <br /><br /><br /><br />
                    <p className="landing-page__p">
                     V-TServices Vendor Management Portal is a tool to manage vendor companies for VTS.
                    </p>
                  </div>
                  <div className="bx--col-md-4 bx--offset-lg-1 bx--col-lg-2">
                    <img
                      className="landing-page__illo"
                      src={`${process.env.PUBLIC_URL}/homepage.png`}
                      alt="Carbon illustration"
                    />
                  </div>



                  
                </div>
                </div>
                
               <br /><br /><br /><br />
               
            </>
         ):(
               <><Page404 userRole={userRole} /> </>
            )}
         <br /><br /><br /><br />
         <br /><br /><br /><br />
      </>
   )
};
export default WelcomePage;