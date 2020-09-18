import React from 'react';
import StudentContextProvider from '../contexts/StudentContext';
import Email from './Email';
import ITeam from './ITeam';
import MajorCollege from './MajorCollege';
import Schedule from './Schedule';

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