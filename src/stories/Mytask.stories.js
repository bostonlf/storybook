
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
  title: 'Test Task11',
  dateFormat:'m/d/Y',
  placeholder:"mm/dd/uuu",
  label:"lftestlabel",
  state: 'state1',
  updatedAt: new Date(2018, 0, 1, 9, 0),
};

export const Pinned = Template.bind({});
Pinned.args = {
  id: '2',
  title: 'Test Task22',
  dateFormat:'m/d/Y',
  placeholder:"mm/dd/uuu",
  label:"lftestPinned",
  state: 'state2',
  updatedAt: new Date(2018, 0, 1, 9, 0),
};

export const Archived = Template.bind({});
Archived.args = {
  id: '3',
  title: 'Test Task33',
  dateFormat:'m/d/Y',
  placeholder:"mm/dd/uuu",
  label:"lftestArchived",
  state: 'state3',
  updatedAt: new Date(2018, 0, 1, 9, 0),
};

export const Lftest = Template.bind({});
Lftest.args = {
  id: '4',
  title: 'Test Task44',
  dateFormat:'m/d/Y',
  placeholder:"mm/dd/uuu",
  label:"lftest",
  state: 'state4',
  updatedAt: new Date(2018, 0, 1, 9, 0),
};