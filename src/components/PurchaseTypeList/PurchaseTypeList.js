import React from 'react';
import {Select, SelectItem} from "carbon-components-react";

const PurchaseTypeList = ({displayForm, purchaseType})=>{

  return (
    <>
       <Select
          id="purchasetype"
          invalid={false}
          invalidText="A valid value is required"
          value={purchaseType?purchaseType:""}
          onChange={(e)=>{displayForm(e.target.value)}}
          labelText={<strong>Purchase Type <span className="required-css-class">*</span></strong>}>
          <SelectItem text="Please select" value="Please select" />
          <SelectItem text="Hardware only (no maintenance)" value="hardware" />
          <SelectItem text="Software only ( no installation or maintenance svc) " value="software" />
          <SelectItem text="V-TS Internal" value="V_TS_INTERNAL" />
          <SelectItem text="Customer" value="CUSTOMER" />
        </Select>
    </>
  );
};

export default PurchaseTypeList;