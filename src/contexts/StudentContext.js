import React, {createContext, useState} from 'react';

export const StudentContext = createContext();

const StudentContextProvider = (props) => {
  const [college, setCollege] = useState("");
  const [major, setMajor] = useState("");
  const [ITeamNumber, setITeamNumber] = useState(0);
  const [ITeamError, setITeamError] = useState(false);
  const [collegeError, setCollegeError] = useState(false);
  return (
    <StudentContext.Provider 
      value={{college, setCollege, 
              major, setMajor, 
              ITeamNumber, setITeamNumber,
              ITeamError, setITeamError,
              collegeError, setCollegeError}}>
      {props.children}
    </StudentContext.Provider>
  );
}

export default StudentContextProvider;