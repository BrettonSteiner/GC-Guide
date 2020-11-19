import React from 'react';
import './Tabs.css';

const Tab = (props) => {
  const {activeTab, label, onClick} = props;

  let clickTab = () => {
    onClick(label);
  }

  return(
    <>
      <li className={activeTab === label ? "tab-list-item tab-list-active" : "tab-list-item"}
        onClick={clickTab} >
          {label}
      </li>
    </>
  );
}

export default Tab;