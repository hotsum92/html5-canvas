import React from 'react';
import { ComponentMeta } from '@storybook/react';

function Button() {
  console.log('test addon-console')

  return (
    <button>test</button>
  )
}

export default {
  component: Button,
} as ComponentMeta<typeof Button>;

export function P1() {
  return (
    <Button />
  )
}
