import React from 'react';
import {Select, SelectItem} from "carbon-components-react";

const CustomerGroupList=({customerGroup, changeCustomerGroup, ifInvalidCustomerGroup, mandatoryField}) => {

  return (
    <div>
      <Select
        id="customerGroup"
        invalid={ifInvalidCustomerGroup}
        invalidText="A valid value is required"
        value={customerGroup}
        onChange={(e) => {changeCustomerGroup(e.target.value)}}
        labelText={(mandatoryField==="yes")?(<strong>Customer Group:<span className="required-css-class">*</span></strong>):(<strong>Customer Group:</strong>)}
      >
        <SelectItem text="Please select" value="Please select" />
        <SelectItem text="Unicredit Bank AG" value="UNICREDIT_BANK_AG" />
        <SelectItem text="Unicredit Austria" value="UNICREDIT_AUSTRIA" />
        <SelectItem text="Unicredit Spa" value="UNICREDIT_SPA" />
        <SelectItem text="3 parties" value="THIRD_PARTIES" />
        <SelectItem text="CEE" value="CEE" />
        <SelectItem text="N/A" value="NULL" />
      </Select>
    </div>
  );
};
export default CustomerGroupList;
