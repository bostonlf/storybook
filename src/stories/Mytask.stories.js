
import React from 'react';

import Task from './Mytask';

export default {
  component: Task,
  title: 'DatePicker',
};

const Template = (args) => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Test Task11',
    state: 'TASK_INBOX',
    updatedAt: new Date(2018, 0, 1, 9, 0),
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    title: 'Test Task12',
    state: 'TASK_PINNED',
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    title: 'Test Task13',
    state: 'TASK_ARCHIVED',
  },
};

export const Lftest = Template.bind({});
Lftest.args = {
  task: {
    ...Default.args.task,
    title: 'Test Task14',
    state: 'TASK_Lftest',
  },
};