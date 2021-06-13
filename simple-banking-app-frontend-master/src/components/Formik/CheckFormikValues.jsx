import React from 'react';

export const CheckFormikValues = (props) => {
  return (
    <pre
      style={{
        margin: '1rem 0',
        background: '#f6f8fa',
        overflow: 'scroll',
      }}
    >
      {JSON.stringify(props, null, 2)}
    </pre>
  );
};
