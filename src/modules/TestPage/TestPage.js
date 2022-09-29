import React from 'react';
import "./testpage.scss";
import { CardLink } from '@carbon/ibmdotcom-react';
import {AddAlt16} from '@carbon/icons-react'

const TestPage=({userRole}) => {
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
      );
    };
export default TestPage;