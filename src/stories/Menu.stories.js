import React from 'react';

import { Menu } from './Menu';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Menu',
  component: Menu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Menu {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Menu',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Menu',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Menu',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Menu',
};
