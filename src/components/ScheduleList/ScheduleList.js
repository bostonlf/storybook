import React from 'react';
import {Select, SelectItem} from "carbon-components-react";

const ScheduleList = ({scheduleid, schedulelabel, schedule,setSchedule})=>{

  return (
    <>
       <Select
          id={scheduleid}
          invalid={false}
          invalidText="A valid value is required"
          value={schedule}
          onChange={(e)=>{setSchedule(e.target.value)}}
          labelText={<strong>{schedulelabel}:</strong>}>
          <SelectItem text="Please select" value="Please select" />
          <SelectItem text="Compliant" value="COMPLIANT" />
          <SelectItem text="Not compliant" value="NOT_COMPLIANT" />
          <SelectItem text="Not included" value="NOT_INCLUDED" />
          <SelectItem text="Approved by exception" value="APPROVED_BY_EXCEPTION" />
        </Select>
    </>
  );
};

export default ScheduleList;