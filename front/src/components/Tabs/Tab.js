import React, {useCallback} from 'react';
import './Tabs.css';

const Tab = (props) => {
  const {activeTab, label, onClick} = props;

  let clickTab = () => {
    onClick(label);
  }

  const getClass = useCallback(() => {
    let myClass = "tab-list-item";

    if (activeTab === label)
      myClass += " tab-list-active";
      
    return myClass;
  }, [activeTab, label]);

  return(
    <>
      <li className={getClass()}
        onClick={clickTab} >
          {label}
      </li>
    </>
  );
}

export default Tab;