
import React from 'react';
import PropTypes from 'prop-types';
import {
  DatePicker,
  DatePickerInput,
} from 'carbon-components-react';





// import React from 'react';
// import {
//   DatePicker,
//   DatePickerInput
// } from 'carbon-components-react';
// import Mstar from './MandatoryStar';
// import { clientText, errorMSG } from '../static/textDictionary'

// const ContractEndDaterEle = (props) => {
//   return <>
//     <DatePicker
//       dateFormat="m/d/Y"
//       datePickerType="single"
//       // onChange={(e) => { console.log(e[0].getTime()) }}
//       id="contractEndDate"
//       value={props.value}
//       onChange={props.onChange}
//     >
//       <DatePickerInput
//         id="date-picker-default-id"
//         placeholder="mm/dd/yyyy"
//         labelText={<strong>{clientText.ifd_ContractEndDater}:<Mstar /></strong>}
//         type="text"
//         disabled={false}
//         allowInput={true}
//         onChange={(e) => {
//           console.log("1111111111")
//         }}
//         invalid={props.invalid}
//         invalidText={clientText.ifd_ContractEndDater + errorMSG.emptyValue}
//       />
//     </DatePicker>
//   </>
// }

// export default ContractEndDaterEle


export default function Datapicker({ id, title, dateFormat, placeholder, label, state, invalid, invalidText, InputDisabled, InputAllowInput, onChange, onPinTask, primary }) {
  return (
    <DatePicker
      dateFormat={dateFormat}
      datePickerType="single"
      onChange={onChange}
    >
      <DatePickerInput
        id="date-picker-single"
        placeholder={placeholder}
        labelText={title}
        disabled={InputDisabled}
        allowInput={InputAllowInput}
        onChange={function noRefCheck() { }}
        invalid={invalid}
        invalidText={invalidText}
      />
    </DatePicker>
  );
}


Datapicker.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  // primary: PropTypes.bool,
  /**
   * What background color to use
   */
  // backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  // size: PropTypes.oneOf(['small', 'medium']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onChange: PropTypes.func,
  //add for test
  placeholder: PropTypes.string.isRequired,
};

Datapicker.defaultProps = {
  // backgroundColor: null,
  // primary: true,
  // size: 'medium',
  onChange: () => { console.log("this is onclick.") },
  placeholder: "abcd",
  label: "mylabel"
};
