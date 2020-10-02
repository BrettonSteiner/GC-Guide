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
      <div className="container accordion" id="accordionExample">
      <StudentContextProvider>
        <div className="card">
          <button className="btn btn-light btn-block text-left card-header" id="headingOne" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            <h5 className="mb-0">
              My I-Team <i className="fas fa-chevron-down fa-vc"></i>
            </h5>
          </button>
          <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div className="card-body">
              <ITeam/>
            </div>
          </div>
        </div>
        <div className="card">
          <button className="btn btn-light btn-block text-left card-header" id="headingTwo" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-controls="collapseTwo">
            <h5 className="mb-0">
              Academic Connections <i className="fas fa-chevron-down fa-vc"></i>
            </h5>
          </button>
          <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
            <div className="card-body">
              <MajorCollege/> 
            </div>
          </div>
        </div>
        <div className="card">
          <button className="btn btn-light btn-block text-left card-header" id="headingThree" type="button" data-toggle="collapse" data-target="#collapseThree" aria-controls="collapseThree">
            <h5 className="mb-0">
              Get Connected Schedule <i className="fas fa-chevron-down fa-vc"></i>
            </h5>
          </button>
          <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
            <div className="card-body">
              <Schedule/>
            </div>
          </div>
        </div>
        <div className="card">
          <button className="btn btn-light btn-block text-left card-header" id="headingFour" type="button" data-toggle="collapse" data-target="#collapseFour" aria-controls="collapseFour">
            <h5 className="mb-0">
              Email Me <i className="fas fa-chevron-down fa-vc"></i>
            </h5>
          </button>
          <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
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