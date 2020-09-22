import React from 'react';
import StudentContextProvider from '../../contexts/StudentContext/StudentContext';
import Email from '../Email/Email';
import ITeam from '../ITeam/ITeam';
import MajorCollege from '../MajorCollege/MajorCollege';
import Schedule from '../Schedule/Schedule';

const Home = (props) => {
  return(
    <>
      {/* header */}
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