import React from 'react';
import StudentContextProvider from '../../contexts/StudentContext/StudentContext';
import Email from '../Email/Email';
import ITeam from '../ITeam/ITeam';
import MajorCollege from '../MajorCollege/MajorCollege';
import Schedule from '../Schedule/Schedule';
// import logo from './byuiLogo.jpg';
import './Home.css';

const Home = (props) => {
  return(
    <>
      <div className="header" id="header">
        {/* <img href={logo} alt="test" className="rounded float-left"/> */}
        <div className="header-text"><h2>Get Connected Guide</h2></div>
      </div>
      <StudentContextProvider>
        <ITeam/>
        <MajorCollege/>
        <Schedule/>
        <Email/>
      </StudentContextProvider>
      {/* footer */}
    </>
  );
}

export default Home;