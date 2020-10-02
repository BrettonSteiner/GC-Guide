import React, {useState, useEffect, Fragment} from 'react';
import './Schedule.css';

const dummyData = [
  {
    date: "09/13/2019",
    time: "8:00 a.m.",
    name: "Housing Complex Check-Ins",
    details: "",
    location: "Rexburg, Idaho",
    mapSpots: [{
      lat: 'latitude', // for Rexburg Idaho
      lng: 'longitude',
    },],
  },
  {
    date: "09/13/2019",
    time: "3:00 p.m. - 3:40 p.m.",
    name: "New Student / Parent Luau (Ticketed Event)",
    details: "Enjoy Polynesian food, dance, and music. Entertainment will be provided by Ailine's Touch of Polynesia, from Salt Lake City, Utah. This event typically sells out, so purchase your tickets early for $18 per person.",
    location: "Manwaring Center (MC) Grand Ballroom & The Crossroads",
    mapSpots: [{
      lat: 'latitude', // for MC ballrooms
      lng: 'longitude',
    },
    {
      lat: 'latitude', // for MC Crossroads
      lng: 'longitude',
    },],
  },
]

const ScheduleTable = (props) => {
  const [tableData, setTableData] = useState([]);
  
  useEffect(() => {
    //Call database for data
    setTableData(dummyData);
  }, []);

  return (<>
  <table className="table table-hover" id="scheduleTable">
    <thead>
      <tr>
        <th scope="col">Time</th>
        <th scope="col">Event</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      {
        tableData.map( (row, index) => (
          <Fragment key={"tableData" + index}>
            <tr className="accordion-toggle collapsed" 
              id={"trAccordionHeader" + index}
              data-toggle="collapse" 
              data-target={"#trCollapse" + index} 
              aria-controls={"#trCollapse" + index} 
              onClick={() => props.changeEvent(row)}>
              <td>{row.date}<br/>{row.time}</td>
              <td>{row.name}</td>
              <td className="align-middle"><i className="fas fa-chevron-down"></i></td>
            </tr>
            <tr className="hide-table-padding no-hover">
              <td colSpan="3">
                <div id={"trCollapse" + index} className="collapse" data-parent="#scheduleTable">
                  <div className="in p-3">
                    {row.details && row.details !== `` ? (<p>{row.details}</p>) : null}
                    {row.location && row.location !== `` ? (<p>Location: <a href="#selectedEventName">{row.location}</a></p>) : null}
                    {row.mapSpots && row.mapSpots.length > 0 ? (<div className="mobileMap"></div>) : null}
                  </div>
                </div>
              </td>
            </tr>
          </Fragment>
        ))
      }

      {/* <tr class="accordion-toggle collapsed" id="trAccordion1" data-toggle="collapse" data-target="#trCollapse1" aria-controls="#trCollapse1">
        <td>09/13/2019<br/>8:00 a.m.</td>
        <td>Housing Complex Check-Ins</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapse1" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>Location: <a href="#selectedEventName">Rexburg, Idaho</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordion2" data-toggle="collapse" data-target="#trCollapse2" aria-controls="#trCollapse2">
        <td>09/13/2019<br/>8:00 a.m. - 5:00 p.m.</td>
        <td>Get Connected Registration</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapse2" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>Location: <a href="#selectedEventName">Manwaring Center (MC) and Kimball Building</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordion3" data-toggle="collapse" data-target="#trCollapse3" aria-controls="#trCollapse3">
        <td>09/13/2019<br/>9:00 a.m. - 5:00 p.m.</td>
        <td>Student Services</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapse3" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>Location: <a href="#selectedEventName">Manwaring Center (MC) and Kimball Building</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordion4" data-toggle="collapse"  data-target="#trCollapse4" aria-controls="#trCollapse4">
        <td>09/13/2019<br/>9:00 a.m. - 1:00 p.m.</td>
        <td>Talent Show Auditions</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapse4" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>Location: <a href="#selectedEventName">Manwaring Center (MC) 201</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordion5" data-toggle="collapse"  data-target="#trCollapse5" aria-controls="#trCollapse5">
        <td>09/13/2019<br/>1:30 p.m. - 2:00 p.m.</td>
        <td>President's Welcome</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapse5" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>At 1:30 p.m. on September 13 the BYU-Idaho President's Welcome for new students and parents will take place in the BYU-Idaho Center Auditorium. Participants will have the opportunity to hear from President Henry J. and Sister Kelly C. Eyring. They will provide council on how to have a successful college experience.</p>
              <p>Location: <a href="#selectedEventName">BYU-Idaho Center Auditorium</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordion6" data-toggle="collapse"  data-target="#trCollapse6" aria-controls="#trCollapse6">
        <td>09/13/2019<br/>2:00 p.m. - 3:00 p.m.</td>
        <td>Secrets of Student Success</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapse6" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>Parents and students together will find out the secrets that lead to success at BYU-Idaho. This will take place at 2:00 p.m. on September 13 in the BYU-Idaho Center Auditorium directly after the BYU-Idaho Welcome.</p>
              <p>Location: <a href="#selectedEventName">BYU-Idaho Center Auditorium</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordion7" data-toggle="collapse"  data-target="#trCollapse7" aria-controls="#trCollapse7">
        <td>09/13/2019<br/>3:00 p.m. - 3:40 p.m.</td>
        <td>Meet Your I-Team</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapse7" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>At 3:00 p.m. on September 13 students will meet their New Student Mentor at the Meet Your I-Team gathering. Here, students will make new friends and get acquanted with other new students at BYU-Idaho. Meet Your I-Team will take place at the BYU-Idaho Stadium adjacent to the Hart Building.</p>
              <p>Location: <a href="#selectedEventName">BYU-Idaho Stadium</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordion8" data-toggle="collapse"  data-target="#trCollapse8" aria-controls="#trCollapse8">
        <td>09/13/2019<br/>3:00 p.m. - 5:00 p.m.</td>
        <td>Parent Reception/Info Fair</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapse8" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>Parents have the opportunity to learn about resources available for their student during their time at BYU-Idaho. Representatives will be present to answer any questions they might have and campus tours will be offered to anyone interested in getting to know the campus better.</p>
              <p>Location: <a href="#selectedEventName">BYU-Idaho Center - Courts</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordion9" data-toggle="collapse"  data-target="#trCollapse9" aria-controls="#trCollapse9">
        <td>09/13/2019<br/>3:00 p.m. - 5:00 p.m.</td>
        <td>Parent Campus Tours</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapse9" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>Location: <a href="#selectedEventName">BYU-Idaho Center - Courts</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordion10" data-toggle="collapse"  data-target="#trCollapse10" aria-controls="#trCollapse10">
        <td>09/13/2019<br/>4:00 p.m. - 5:00 p.m.</td>
        <td>Academic Connections</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapse10" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>This is a great opportunity for students to meet and get acquanted with their college dean, faculty, and academic advisors in their chosen major. Meetings will be held across campus.</p>
              <p>Location: <a href="#selectedEventName">Various BYU-Idaho Campus locations</a></p>
              <div class="mobileMap"></div>
              </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordion11" data-toggle="collapse" data-target="#trCollapse11" aria-controls="#trCollapse11">
        <td>09/13/2019<br/>5:30 p.m. - 7:30 p.m.</td>
        <td>New Student / Parent Luau (Ticketed Event)</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapse11" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>Enjoy Polynesian food, dance, and music. Entertainment will be provided by Ailine's Touch of Polynesia, from Salt Lake City, Utah. This event typically sells out, so purchase your tickets early for $18 per person.</p>
              <p>Location: <a href="#selectedEventName">Manwaring Center (MC) Grand Ballroom & The Crossroads</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordion12" data-toggle="collapse" data-target="#trCollapse12" aria-controls="#trCollapse12">
        <td>09/13/2019<br/>8:00 p.m. - 9:00 p.m.</td>
        <td>New Student Service Project</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapse12" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>Want to help in a great cause? Join fellow students at the BYU-Idaho Center Courts at 8:00 p.m. to create and organize items for local humanitarian center. Projects include: plarn mats for homeless to sleep on, dog toys for animal shelters, and jump ropes for children in need.</p>
              <p>Location: <a href="#selectedEventName">BYU-Idaho Center - Courts</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordion13" data-toggle="collapse" data-target="#trCollapse13" aria-controls="#trCollapse13">
        <td>09/13/2019<br/>9:15 p.m. - 10:30 p.m.</td>
        <td>New Student Talent Show</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapse13" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>Come check out the talent show! Please be seated fifteen minutes before the show. Auditions are September 13 from 9:00 a.m. to 1:00 p.m. in MC 201. Wristbands are required for this event.</p>
              <p>Location: <a href="#selectedEventName">Hart Building - Auditorium</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordionS1" data-toggle="collapse" data-target="#trCollapseS1" aria-controls="#trCollapseS1">
        <td>09/14/2019<br/>8:00 a.m. - 12:00 p.m.</td>
        <td>Get Connected Late Registration</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapseS1" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>Location: <a href="#selectedEventName">Manwaring Center (MC) and Kimball Building - Foyer</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordionS2" data-toggle="collapse" data-target="#trCollapseS2" aria-controls="#trCollapseS2">
        <td>09/14/2019<br/>9:00 a.m. - 2:00 p.m.</td>
        <td>Student Services</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapseS2" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>Location: <a href="#selectedEventName">Manwaring Center (MC) and Kimball Building</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordionS3" data-toggle="collapse" data-target="#trCollapseS3" aria-controls="#trCollapseS3">
        <td>09/14/2019<br/>10:00 a.m. - 11:00 a.m.</td>
        <td>I-Strive</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapseS3" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>Students will gather with their I-Team in the Hart Auditorium to learn about the unique culture of BYU-Idaho. Through this interactive forum hour, students will learn about Student Honor and Student Living.</p>
              <p>Location: <a href="#selectedEventName">Hart Building - Auditorium</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordionS4" data-toggle="collapse" data-target="#trCollapseS4" aria-controls="#trCollapseS4">
        <td>09/14/2019<br/>11:00 a.m. - 12:00 p.m.</td>
        <td>Campus Connections Tours</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapseS4" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>New Student Mentors will guide students on a tour of campus, highlighting all major student services offered at BYU-Idaho.</p>
              <p>Location: <a href="#selectedEventName">BYU-Idaho Campus</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordionS5" data-toggle="collapse" data-target="#trCollapseS5" aria-controls="#trCollapseS5">
        <td>09/14/2019<br/>12:00 p.m. - 1:15 p.m.</td>
        <td>Lunch and Mentor Connections</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapseS5" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>Mentor Connections provides an opportunity for students to meet with their New Student Mentor. Students will learn more about how New Student Mentors will help them navigate their first semester at BYU-Idaho. Lunch will also be provided. Wristbands are required for this event.</p>
              <p>Location: <a href="#selectedEventName">BYU-Idaho Center Courts</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordionS6" data-toggle="collapse" data-target="#trCollapseS6" aria-controls="#trCollapseS6">
        <td>09/14/2019<br/>1:30 p.m. - 2:30 p.m.</td>
        <td>Spirit of BYU-Idaho Showcase</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapseS6" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>New students will learn about the history of the Spirit of BYU-Idaho. Students will also learn how to reach their full potential while at BYU-Idaho, as they are introduced to the many ways they can be involved on campus, and gain leadership experience which will benefit them during their time here and after graduation.</p>
              <p>Location: <a href="#selectedEventName">Hart Building - Auditorium</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordionS7" data-toggle="collapse" data-target="#trCollapseS7" aria-controls="#trCollapseS7">
        <td>09/14/2019<br/>2:30 p.m. - 3:30 p.m.</td>
        <td>Get Involved Fair</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapseS7" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>Real world preparation means more than just getting a degree. Directly following the Spirit of BYU-Idaho Showcase, students will attend the Get Involved Fair. Booths will be placed around the courts to give students the opportunity to receive more information and sign up to volunteer or get involved at BYU-Idaho.</p>
              <p>Location: <a href="#selectedEventName">BYU-Idaho Center Courts</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordionS8" data-toggle="collapse" data-target="#trCollapseS8" aria-controls="#trCollapseS8">
        <td>09/14/2019<br/>3:30 p.m. - 5:00 p.m.</td>
        <td>International Student Orientation</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapseS8" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>All new international students are required to attend the International Student Orientation meeting. Many important regulations will be discussed that students need to be aware of regarding visa requirements while they are studying at BYU-Idaho.</p>
              <p>Location: <a href="#selectedEventName">Manwaring Center (MC) Little Theater</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="accordion-toggle collapsed" id="trAccordionS9" data-toggle="collapse" data-target="#trCollapseS9" aria-controls="#trCollapseS9">
        <td>09/14/2019<br/>7:00 p.m. - 11:00 p.m.</td>
        <td>I-Night (Ticketed Event)</td>
        <td class="align-middle"><i class="fas fa-chevron-down"></i></td>
      </tr>
      <tr class="hide-table-padding no-hover">
        <td colspan="3">
          <div id="trCollapseS9" class="collapse" data-parent="#scheduleTable">
            <div class="in p-3">
              <p>Events will be held in the BYU-Idaho Center courts, the Hart Building, and the Manwaring Center. Tickets are $5 per person.</p>
              <p>Location: <a href="#selectedEventName">Manwaring Center (MC) and BYU-Idaho Center Courts</a></p>
              <div class="mobileMap"></div>
            </div>
          </div>
        </td>
      </tr> */}
    </tbody>
  </table>
  </>);
}

export default ScheduleTable;