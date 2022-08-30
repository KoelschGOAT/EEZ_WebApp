import React, { ReactNode, useState } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  width: string | number;
}

const Collapse: React.FC<Props> = ({ title, children, width }) => {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(!open);
  return (
    <div
      tabIndex={0}
      className={`${width} collapse ${
        open ? 'collapse-open' : 'collapse-close'
      } collapse-arrow border border-base-300 bg-base-100 rounded-box mb-6 overflow-auto max-h-fit`}
    >
      <div
        onClick={handleOpen}
        className=" cursor-pointer collapse-title text-center text-xl font-medium"
      >
        {title}
      </div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};

export default Collapse;
