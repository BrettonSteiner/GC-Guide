import React from 'react';
import StudentContextProvider from '../../contexts/StudentContext/StudentContext';
import Email from '../Email/Email';
import ITeam from '../ITeam/ITeam';
import MajorCollege from '../MajorCollege/MajorCollege';
import Schedule from '../Schedule/Schedule';
import './Home.css';

const Home = (props) => {
  return(
    <>
      <div className="header" id="header">
        <div className="container" >
          <div className="header-logo"></div>
          <h4 className="header-text">Get Connected Guide</h4>
        </div>
      </div>
      <StudentContextProvider>
        <ITeam/>
        <MajorCollege/>
        <Schedule/>
        <Email/>
      </StudentContextProvider>
      <div className="footer" id="footer">
        <div className="container">
          <h6 className="footer-text">Questions? Ask an I-Rep in a blue shirt.</h6>
        </div>
      </div>
    </>
  );
}

export default Home;