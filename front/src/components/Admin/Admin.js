import React, {useState, } from 'react';
import Tabs from '../Tabs/Tabs.js';
import './Admin.css';

const Admin = (props) => {
  const [selectedSemester, setSelectedSemester] = useState({});
  return(
    <>
      <div className="header" id="header">
        <div className="container" >
          <div className="header-logo"></div>
          <h4 className="header-text">Get Connected Guide Admin</h4>
        </div>
      </div>
      <div className="container">
        {/* Put admin stuff here */}
        <Tabs>
          <div label="I-Team">
            <h5>I-Team Stuff</h5>
          </div>
          <div label="Major / College">
            <h5>Academic Connections Stuff</h5>
          </div>
          <div label="Schedule">
            <h5>Schedule Stuff</h5>
          </div>
        </Tabs>
      </div>
    </>
  );
}

export default Admin;