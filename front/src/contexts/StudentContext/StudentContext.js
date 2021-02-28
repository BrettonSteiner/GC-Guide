import React, {createContext, useState} from 'react';

export const StudentContext = createContext();

const StudentContextProvider = (props) => {
  const [college, setCollege] = useState("");
  const [major, setMajor] = useState("");
  const [iTeam, setITeam] = useState("");
  const [iTeamError, setITeamError] = useState(false);
  const [collegeError, setCollegeError] = useState(false);
  return (
    <StudentContext.Provider 
      value={{college, setCollege, 
              major, setMajor, 
              iTeam, setITeam,
              iTeamError, setITeamError,
              collegeError, setCollegeError}}>
      {props.children}
    </StudentContext.Provider>
  );
}

export default StudentContextProvider;