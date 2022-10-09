
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


export default function Datapicker({ id, title, dateFormat,placeholder,label,state, onArchiveTask, onPinTask,primary }) {
  return (
    <div className={`list-item ${state}`}>
   <DatePicker
   dateFormat={dateFormat}
  datePickerType="single"
  onChange={function noRefCheck(){}}
  onClose={function noRefCheck(){}}
  onOpen={function noRefCheck(){}}
>
  <DatePickerInput
    id="date-picker-single"
    placeholder={placeholder}
    labelText={"Date Picker label"+title}
    onChange={function noRefCheck(){}}
    onClose={function noRefCheck(){}}
    onOpen={function noRefCheck(){}}
  />
</DatePicker>
{label}
primary:{primary}
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
  //add for test
  placeholder:PropTypes.string.isRequired,
};

Datapicker.defaultProps = {
  backgroundColor: null,
  primary: true,
  size: 'medium',
  onClick: undefined,
  placeholder:"abcd",
  label:"mylabel"
};
