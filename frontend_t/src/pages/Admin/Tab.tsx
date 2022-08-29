import React from 'react';

interface Props {
  tab: number;
  onClick: any;
}
const Tab: React.FC<Props> = ({ tab, onClick }) => {
  return (
    <div className="tabs tabs-boxed  flex justify-center">
      <a
        onClick={onClick(0)}
        className={`tab ${tab === 0 ? 'tab-active' : null}`}
      >
        Übersicht
      </a>
      <a
        onClick={onClick(1)}
        className={`tab ${tab === 1 ? 'tab-active' : null}`}
      >
        Videos
      </a>
      <a
        onClick={onClick(2)}
        className={`tab ${tab === 2 ? 'tab-active' : null}`}
      >
        Clients
      </a>
    </div>
  );
};

export default Tab;
