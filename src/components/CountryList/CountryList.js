import React from 'react';
import {Select, SelectItem} from "carbon-components-react";

const CountryList=({country, changeCountry, ifInvalidCountry}) => {

  return (
    <div>
      <Select
        id="country"
        invalid={ifInvalidCountry}
        invalidText="A valid value is required"
        value={country}
        onChange={(e) => {changeCountry(e.target.value)}}
        labelText={<strong>Country:<span className="required-css-class">*</span></strong>}
      >
        <SelectItem text="Please select" value="Please select" />
        <SelectItem text="Austria" value="AUSTRIA" />
        <SelectItem text="Czech Republic" value="CZECH_REPUBLIC" />
        <SelectItem text="Germany" value="GERMANY" />
        <SelectItem text="Hungary" value="HUNGARY" />
        <SelectItem text="Italy" value="ITALY" />
        <SelectItem text="Poland" value="POLAND" />
        <SelectItem text="Slovakia" value="SLOVAKIA" />
        <SelectItem text="Other Countries" value="OTHER_COUNTRIES" />
      </Select>
    </div>
  );
};
export default CountryList;