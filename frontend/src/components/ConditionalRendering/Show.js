import { Children } from 'react';

function Show({ condition = false }) {
  if (condition) {
    return { ...Children };
  }
}

export default Show;
