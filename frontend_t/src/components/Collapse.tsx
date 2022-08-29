import React, { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  width: string | number;
}

const Collapse: React.FC<Props> = ({ title, children, width }) => {
  return (
    <div
      tabIndex={0}
      className={`${width} collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-6`}
    >
      <div className="collapse-title text-center text-xl font-medium">
        {title}
      </div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};

export default Collapse;
