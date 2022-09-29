import React from 'react';
import {Select, SelectItem} from "carbon-components-react";

const SupplierTypeList = ({supplierType, changeSupplierType})=>{

  return (
    <>
       <Select
          id="suppliertype"
          value={supplierType}
          onChange={(e)=>{changeSupplierType(e.target.value)}}
          labelText={<strong>Supplier Type<span className="required-css-class">*</span></strong>}>
          <SelectItem text="Primary" value="PRIMARY" />
          <SelectItem text="Subcontractor " value="SUBCONTRACTOR" />
        </Select>
    </>
  );
};

export default SupplierTypeList;