import React from 'react';
import countrylist from './countrylist.json';
import {AddAlt16} from '@carbon/icons-react'
import { CardLink } from '@carbon/ibmdotcom-react';

const LocaleContainer=() => {

  const data=countrylist.regionList[0].countryList;

  /*LIST OF FUNCTIOND START */




  /*LIST OF FUNCTIOND END */
  return (

    <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-2 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
  <CardLink title="Lorem ipsum dolor sit amet"  href="https://example.com" icon={<AddAlt16 />}/>
  </div>
  <div className="bx--col-sm-2 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
  <CardLink title="Lorem ipsum dolor sit amet"  href="https://example.com" icon={<AddAlt16 />}/>
  </div>
  </div>
  <div className="bx--row">
      <div className="bx--col-sm-2 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
  <CardLink title="Lorem ipsum dolor sit amet"  href="https://example.com" icon={<AddAlt16 />}/>
  </div>
  <div className="bx--col-sm-2 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
  <CardLink title="Lorem ipsum dolor sit amet"  href="https://example.com" icon={<AddAlt16 />}/>
  </div>
  </div>
  </div>
  )
}
export default LocaleContainer;