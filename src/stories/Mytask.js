
import React from 'react';
import {
  DatePicker,
  DatePickerInput,
  Tabs,
  Tab,
  Select, SelectItem,
  Button
} from 'carbon-components-react';



export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  return (
    <div className={`list-item ${state}`}>
   <Button>Button</Button>
   <DatePicker
  datePickerType="single"
  onChange={function noRefCheck(){}}
  onClose={function noRefCheck(){}}
  onOpen={function noRefCheck(){}}
>
  <DatePickerInput
    id="date-picker-single"
    labelText="Date Picker label"
    onChange={function noRefCheck(){}}
    onClose={function noRefCheck(){}}
    onOpen={function noRefCheck(){}}
    placeholder="mm/dd/yyyy"
  />
</DatePicker>
    </div>
  );
}