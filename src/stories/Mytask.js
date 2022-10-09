
import React from 'react';
import PropTypes from 'prop-types';
import {
  DatePicker,
  DatePickerInput,
} from 'carbon-components-react';



export default function Datapicker({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  return (
    <div className={`list-item ${state}`}>
   <DatePicker
  datePickerType="single"
  onChange={function noRefCheck(){}}
  onClose={function noRefCheck(){}}
  onOpen={function noRefCheck(){}}
>
  <DatePickerInput
    id="date-picker-single"
    labelText={"Date Picker label"+title}
    onChange={function noRefCheck(){}}
    onClose={function noRefCheck(){}}
    onOpen={function noRefCheck(){}}
    placeholder="mm/dd/yyyy"
  />
</DatePicker>
    </div>
  );
}


Datapicker.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Datapicker.defaultProps = {
  backgroundColor: null,
  primary: true,
  size: 'medium',
  onClick: undefined,
};
