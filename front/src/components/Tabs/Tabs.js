import React, {useState, } from 'react';
import Tab from './Tab.js';
import './Tabs.css';

const Tabs = (props) => {
  const [activeTab, setActiveTab] = useState(props?.children[0]?.props?.label || "");

  let onClickTabItem = (tabLabel) => {
    setActiveTab(tabLabel);
  }

  return(
    <>
      <div className="tabs">
        <ul className="tab-list">
          {props.children.map((child) => {
            const { label } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </ul>
        <div className="tab-content">
          {props.children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    </>
  );
}

export default Tabs;