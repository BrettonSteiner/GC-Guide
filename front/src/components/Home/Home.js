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
      <div className="container accordion" id="homeAccordion">
      <StudentContextProvider>
        <div className="card">
          <button className="btn btn-light btn-block text-left card-header" id="headingOne" type="button" data-toggle="collapse" data-target="#homeCollapseOne" aria-expanded="true" aria-controls="homeCollapseOne">
            <h5 className="mb-0">
              My I-Team <i className="fas fa-chevron-down fa-vc"></i>
            </h5>
          </button>
          <div id="homeCollapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#homeAccordion">
            <div className="card-body">
              <ITeam/>
            </div>
          </div>
        </div>
        <div className="card">
          <button className="btn btn-light btn-block text-left card-header" id="headingTwo" type="button" data-toggle="collapse" data-target="#homeCollapseTwo" aria-controls="homeCollapseTwo">
            <h5 className="mb-0">
              Academic Connections <i className="fas fa-chevron-down fa-vc"></i>
            </h5>
          </button>
          <div id="homeCollapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#homeAccordion">
            <div className="card-body">
              <MajorCollege/> 
            </div>
          </div>
        </div>
        <div className="card">
          <button className="btn btn-light btn-block text-left card-header" id="headingThree" type="button" data-toggle="collapse" data-target="#homeCollapseThree" aria-controls="homeCollapseThree">
            <h5 className="mb-0">
              Get Connected Schedule <i className="fas fa-chevron-down fa-vc"></i>
            </h5>
          </button>
          <div id="homeCollapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#homeAccordion">
            <div className="card-body">
              <Schedule/>
            </div>
          </div>
        </div>
        <div className="card">
          <button className="btn btn-light btn-block text-left card-header" id="headingFour" type="button" data-toggle="collapse" data-target="#homeCollapseFour" aria-controls="homeCollapseFour">
            <h5 className="mb-0">
              Email Me <i className="fas fa-chevron-down fa-vc"></i>
            </h5>
          </button>
          <div id="homeCollapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#homeAccordion">
            <div className="card-body">
              <Email/>
            </div>
          </div>
        </div>
      </StudentContextProvider>
      </div>
      <div className="footer" id="footer">
        <div className="container">
          <h6 className="footer-text">Questions? Ask an I-Rep wearing a blue shirt.</h6>
        </div>
      </div>
    </>
  );
}

export default Home;