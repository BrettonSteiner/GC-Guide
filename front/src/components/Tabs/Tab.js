import React from 'react';
import './Tabs.css';

const Tab = (props) => {
  const {activeTab, label, recordCount, onClick} = props;

  let clickTab = () => {
    onClick(label);
  }

  return(
    <>
      <li className={activeTab === label ? "tab-list-item d-flex justify-content-between tab-list-active" : "tab-list-item d-flex justify-content-between"}
        onClick={clickTab} >
          {label}
          <div className="d-flex flex-row-reverse">
            <span className="badge badge-secondary align-self-center">{recordCount? recordCount : 0}</span>
          </div>
      </li>
    </>
  );
}

export default Tab;