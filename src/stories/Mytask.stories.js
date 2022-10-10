
import React from 'react';

import Task from './Mytask';

export default {
  component: Task,
  title: 'DatePicker',
};

const Template = (args) => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: '1',
  title: 'My datepicker',
  dateFormat:'m/d/Y',
  placeholder:"mm/dd/uuu",
  label:"lftestlabel",
  state: 'state1',
  invalid:false,
  invalidText:'invalidText:format error',
  InputDisabled:false,
  InputAllowInput:false,
  onChange:()=>{console.log("onChange")}
};

export const Pinned = Template.bind({});
Pinned.args = {
  id: '2',
  title: 'Test Task22',
  dateFormat:'m/d/Y',
  placeholder:"mm/dd/uuu",
  label:"lftestPinned",
  state: 'state2',
};

export const Archived = Template.bind({});
Archived.args = {
  id: '3',
  title: 'Test Task33',
  dateFormat:'m/d/Y',
  placeholder:"mm/dd/uuu",
  label:"lftestArchived",
  state: 'state3',
};

export const Lftest = Template.bind({});
Lftest.args = {
  id: '4',
  title: 'Test Task44',
  dateFormat:'m/d/Y',
  placeholder:"mm/dd/uuu",
  label:"lftest",
  state: 'state4',
};