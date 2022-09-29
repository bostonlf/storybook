

import React from 'react';
import {
  DatePicker,
  DatePickerInput
} from 'carbon-components-react'

export default function Task({ task: { id, title, state,value,labelText,disabled,allowInput,invalid,invalidText}, onArchiveTask, onPinTask }) {
  return (
    <div className={`list-item ${state}`}>
     xxxxx
    </div>
  );
}