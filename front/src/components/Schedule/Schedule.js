import React/*, {useState, useEffect}*/ from 'react';
import './Schedule.css';

const Schedule = (props) => {
  // useEffect(() => {
  //   //Call database for data
  // }, [])
  return (<>
  <ul class="nav nav-tabs" id="scheduleDayTab" role="tablist">
    <li class="nav-item" role="presentation">
      <a class="nav-link active" id="friday-tab" data-toggle="tab" href="#friday" role="tab" aria-controls="friday" aria-selected="true">Friday</a>
    </li>
    <li class="nav-item" role="presentation">
      <a class="nav-link"  id="saturday-tab" data-toggle="tab" href="#saturday" role="tab" aria-controls="saturday" aria-selected="false">Saturday</a>
    </li>
  </ul>
  <br></br>
  <div class="row">
    <div class="col-lg tab-content">
      <div class="tab-pane fade show active" id="friday" role="tabpanel" aria-labelledby="friday-tab">
        <h5>September 13th, 2019</h5>
        <table class="table table-hover" id="fridayTable">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Time</th>
              <th scope="col">Event</th>
            </tr>
          </thead>
          <tbody>
            <tr class="accordion-toggle collapsed" id="trAccordion1" data-toggle="collapse" data-parent="#trAccordion1" href="#trCollapse1">
              <td class="expand-button"></td>
              <td>8:00 a.m.</td>
              <td>Housing Complex Check-Ins</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapse1" class="collapse in p-3">
                  Location: <a href="#selectedEventName">Rexburg, Idaho</a>
                </div>
              </td>
            </tr>
            <tr class="accordion-toggle collapsed" id="trAccordion2" data-toggle="collapse" data-parent="#trAccordion2" href="#trCollapse2">
              <td class="expand-button"></td>
              <td>8:00 a.m. - 5:00 p.m.</td>
              <td>Get Connected Registration</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapse2" class="collapse in p-3">
                  Location: <a href="#selectedEventName">Manwaring Center (MC) and Kimball Building</a>
                </div>
              </td>
            </tr>
            <tr class="accordion-toggle collapsed" id="trAccordion3" data-toggle="collapse" data-parent="#trAccordion3" href="#trCollapse3">
              <td class="expand-button"></td>
              <td>9:00 a.m. - 5:00 p.m.</td>
              <td>Student Services</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapse3" class="collapse in p-3">
                  Location: <a href="#selectedEventName">Manwaring Center (MC) and Kimball Building</a>
                </div>
              </td>
            </tr>
            <tr class="accordion-toggle collapsed" id="trAccordion4" data-toggle="collapse" data-parent="#trAccordion4" href="#trCollapse4">
              <td class="expand-button"></td>
              <td>9:00 a.m. - 1:00 p.m.</td>
              <td>Talent Show Auditions</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapse4" class="collapse in p-3">
                  Location: <a href="#selectedEventName">Manwaring Center (MC) 201</a>
                </div>
              </td>
            </tr>
            <tr class="accordion-toggle collapsed" id="trAccordion5" data-toggle="collapse" data-parent="#trAccordion5" href="#trCollapse5">
              <td class="expand-button"></td>
              <td>1:30 p.m. - 2:00 p.m.</td>
              <td>President's Welcome</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapse5" class="collapse in p-3">
                  <p>At 1:30 p.m. on September 13 the BYU-Idaho President's Welcome for new students and parents will take place in the BYU-Idaho Center Auditorium. Participants will have the opportunity to hear from President Henry J. and Sister Kelly C. Eyring. They will provide council on how to have a successful college experience.</p>
                  <p>Location: <a href="#selectedEventName">BYU-Idaho Center Auditorium</a></p>
                </div>
              </td>
            </tr>
            <tr class="accordion-toggle collapsed" id="trAccordion6" data-toggle="collapse" data-parent="#trAccordion6" href="#trCollapse6">
              <td class="expand-button"></td>
              <td>2:00 p.m. - 3:00 p.m.</td>
              <td>Secrets of Student Success</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapse6" class="collapse in p-3">
                  <p>Parents and students together will find out the secrets that lead to success at BYU-Idaho. This will take place at 2:00 p.m. on September 13 in the BYU-Idaho Center Auditorium directly after the BYU-Idaho Welcome.</p>
                  <p>Location: <a href="#selectedEventName">BYU-Idaho Center Auditorium</a></p>
                </div>
              </td>
            </tr>
            <tr class="accordion-toggle collapsed" id="trAccordion7" data-toggle="collapse" data-parent="#trAccordion7" href="#trCollapse7">
              <td class="expand-button"></td>
              <td>3:00 p.m. - 3:40 p.m.</td>
              <td>Meet Your I-Team</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapse7" class="collapse in p-3">
                  <p>At 3:00 p.m. on September 13 students will meet their New Student Mentor at the Meet Your I-Team gathering. Here, students will make new friends and get acquanted with other new students at BYU-Idaho. Meet Your I-Team will take place at the BYU-Idaho Stadium adjacent to the Hart Building.</p>
                  <p>Location: <a href="#selectedEventName">BYU-Idaho Stadium</a></p>
                </div>
              </td>
            </tr>
            <tr class="accordion-toggle collapsed" id="trAccordion8" data-toggle="collapse" data-parent="#trAccordion8" href="#trCollapse8">
              <td class="expand-button"></td>
              <td>3:00 p.m. - 5:00 p.m.</td>
              <td>Parent Reception/Info Fair</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapse8" class="collapse in p-3">
                  <p>Parents have the opportunity to learn about resources available for their student during their time at BYU-Idaho. Representatives will be present to answer any questions they might have and campus tours will be offered to anyone interested in getting to know the campus better.</p>
                  <p>Location: <a href="#selectedEventName">BYU-Idaho Center - Courts</a></p>
                </div>
              </td>
            </tr>
            <tr class="accordion-toggle collapsed" id="trAccordion9" data-toggle="collapse" data-parent="#trAccordion9" href="#trCollapse9">
              <td class="expand-button"></td>
              <td>3:00 p.m. - 5:00 p.m.</td>
              <td>Parent Campus Tours</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapse9" class="collapse in p-3">
                  Location: <a href="#selectedEventName">BYU-Idaho Center - Courts</a>
                </div>
              </td>
            </tr>
            <tr class="accordion-toggle collapsed" id="trAccordion10" data-toggle="collapse" data-parent="#trAccordion10" href="#trCollapse10">
              <td class="expand-button"></td>
              <td>4:00 p.m. - 5:00 p.m.</td>
              <td>Academic Connections</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapse10" class="collapse in p-3">
                  <p>This is a great opportunity for students to meet and get acquanted with their college dean, faculty, and academic advisors in their chosen major. Meetings will be held across campus.</p>
                  <p>Location: <a href="#selectedEventName">Various BYU-Idaho Campus locations</a></p>
                </div>
              </td>
            </tr>
            <tr class="accordion-toggle collapsed" id="trAccordion11" data-toggle="collapse" data-parent="#trAccordion11" href="#trCollapse11">
              <td class="expand-button"></td>
              <td>5:30 p.m. - 7:30 p.m.</td>
              <td>New Student / Parent Luau (Ticketed Event)</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapse11" class="collapse in p-3">
                  <p>Enjoy Polynesian food, dance, and music. Entertainment will be provided by Ailine's Touch of Polynesia, from Salt Lake City, Utah. This event typically sells out, so purchase your tickets early for $18 per person.</p>
                  <p>Location: <a href="#selectedEventName">Manwaring Center (MC) Grand Ballroom & The Crossroads</a></p>
                </div>
              </td>
            </tr>
            <tr class="accordion-toggle collapsed" id="trAccordion12" data-toggle="collapse" data-parent="#trAccordion12" href="#trCollapse12">
              <td class="expand-button"></td>
              <td>8:00 p.m. - 9:00 p.m.</td>
              <td>New Student Service Project</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapse12" class="collapse in p-3">
                  <p>Want to help in a great cause? Join fellow students at the BYU-Idaho Center Courts at 8:00 p.m. to create and organize items for local humanitarian center. Projects include: plarn mats for homeless to sleep on, dog toys for animal shelters, and jump ropes for children in need.</p>
                  <p>Location: <a href="#selectedEventName">BYU-Idaho Center - Courts</a></p>
                </div>
              </td>
            </tr>
            <tr class="accordion-toggle collapsed" id="trAccordion13" data-toggle="collapse" data-parent="#trAccordion13" href="#trCollapse13">
              <td class="expand-button"></td>
              <td>9:15 p.m. - 10:30 p.m.</td>
              <td>New Student Talent Show</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapse13" class="collapse in p-3">
                  <p>Come check out the talent show! Please be seated fifteen minutes before the show. Auditions are September 13 from 9:00 a.m. to 1:00 p.m. in MC 201. Wristbands are required for this event.</p>
                  <p>Location: <a href="#selectedEventName">Hart Building - Auditorium</a></p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tab-pane fade" id="saturday" role="tabpanel" aria-labelledby="saturday-tab">
        <h5>September 14th, 2019</h5>
        <table class="table table-hover" id="saturdayTable">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Time</th>
              <th scope="col">Event</th>
            </tr>
          </thead>
          <tbody>
            <tr class="accordion-toggle collapsed" id="trAccordionS1" data-toggle="collapse" data-parent="#trAccordionS1" href="#trCollapseS1">
              <td class="expand-button"></td>
              <td>8:00 a.m. - 12:00 p.m.</td>
              <td>Get Connected Late Registration</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapseS1" class="collapse in p-3">
                  Location: <a href="#selectedEventName">Manwaring Center (MC) and Kimball Building - Foyer</a>
                </div>
              </td>
            </tr>
            <tr class="accordion-toggle collapsed" id="trAccordionS2" data-toggle="collapse" data-parent="#trAccordionS2" href="#trCollapseS2">
              <td class="expand-button"></td>
              <td>9:00 a.m. - 2:00 p.m.</td>
              <td>Student Services</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapseS2" class="collapse in p-3">
                  Location: <a href="#selectedEventName">Manwaring Center (MC) and Kimball Building</a>
                </div>
              </td>
            </tr>
            <tr class="accordion-toggle collapsed" id="trAccordionS3" data-toggle="collapse" data-parent="#trAccordionS3" href="#trCollapseS3">
              <td class="expand-button"></td>
              <td>10:00 a.m. - 11:00 a.m.</td>
              <td>I-Strive</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapseS3" class="collapse in p-3">
                  <p>Students will gather with their I-Team in the Hart Auditorium to learn about the unique culture of BYU-Idaho. Through this interactive forum hour, students will learn about Student Honor and Student Living.</p>
                  <p>Location: <a href="#selectedEventName">Hart Building - Auditorium</a></p>
                </div>
              </td>
            </tr>
            <tr class="accordion-toggle collapsed" id="trAccordionS4" data-toggle="collapse" data-parent="#trAccordionS4" href="#trCollapseS4">
              <td class="expand-button"></td>
              <td>11:00 a.m. - 12:00 p.m.</td>
              <td>Campus Connections Tours</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapseS4" class="collapse in p-3">
                  <p>New Student Mentors will guide students on a tour of campus, highlighting all major student services offered at BYU-Idaho.</p>
                  <p>Location: <a href="#selectedEventName">BYU-Idaho Campus</a></p>
                </div>
              </td>
            </tr>
            <tr class="accordion-toggle collapsed" id="trAccordionS5" data-toggle="collapse" data-parent="#trAccordionS5" href="#trCollapseS5">
              <td class="expand-button"></td>
              <td>12:00 p.m. - 1:15 p.m.</td>
              <td>Lunch and Mentor Connections</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapseS5" class="collapse in p-3">
                  <p>Mentor Connections provides an opportunity for students to meet with their New Student Mentor. Students will learn more about how New Student Mentors will help them navigate their first semester at BYU-Idaho. Lunch will also be provided. Wristbands are required for this event.</p>
                  <p>Location: <a href="#selectedEventName">BYU-Idaho Center Courts</a></p>
                </div>
              </td>
            </tr>
            <tr class="accordion-toggle collapsed" id="trAccordionS6" data-toggle="collapse" data-parent="#trAccordionS6" href="#trCollapseS6">
              <td class="expand-button"></td>
              <td>1:30 p.m. - 2:30 p.m.</td>
              <td>Spirit of BYU-Idaho Showcase</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapseS6" class="collapse in p-3">
                  <p>New students will learn about the history of the Spirit of BYU-Idaho. Students will also learn how to reach their full potential while at BYU-Idaho, as they are introduced to the many ways they can be involved on campus, and gain leadership experience which will benefit them during their time here and after graduation.</p>
                  <p>Location: <a href="#selectedEventName">Hart Building - Auditorium</a></p>
                </div>
              </td>
            </tr>
            <tr class="accordion-toggle collapsed" id="trAccordionS7" data-toggle="collapse" data-parent="#trAccordionS7" href="#trCollapseS7">
              <td class="expand-button"></td>
              <td>2:30 p.m. - 3:30 p.m.</td>
              <td>Get Involved Fair</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapseS7" class="collapse in p-3">
                  <p>Real world preparation means more than just getting a degree. Directly following the Spirit of BYU-Idaho Showcase, students will attend the Get Involved Fair. Booths will be placed around the courts to give students the opportunity to receive more information and sign up to volunteer or get involved at BYU-Idaho.</p>
                  <p>Location: <a href="#selectedEventName">BYU-Idaho Center Courts</a></p>
                </div>
              </td>
            </tr>
            <tr class="accordion-toggle collapsed" id="trAccordionS8" data-toggle="collapse" data-parent="#trAccordionS8" href="#trCollapseS8">
              <td class="expand-button"></td>
              <td>3:30 p.m. - 5:00 p.m.</td>
              <td>International Student Orientation</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapseS8" class="collapse in p-3">
                  <p>All new international students are required to attend the International Student Orientation meeting. Many important regulations will be discussed that students need to be aware of regarding visa requirements while they are studying at BYU-Idaho.</p>
                  <p>Location: <a href="#selectedEventName">Manwaring Center (MC) Little Theater</a></p>
                </div>
              </td>
            </tr>
            <tr class="accordion-toggle collapsed" id="trAccordionS9" data-toggle="collapse" data-parent="#trAccordionS9" href="#trCollapseS9">
              <td class="expand-button"></td>
              <td>7:00 p.m. - 11:00 p.m.</td>
              <td>I-Night (Ticketed Event)</td>
            </tr>
            <tr class="hide-table-padding no-hover">
              <td></td>
              <td colspan="3">
                <div id="trCollapseS9" class="collapse in p-3">
                  <p>Events will be held in the BYU-Idaho Center courts, the Hart Building, and the Manwaring Center. Tickets are $5 per person.</p>
                  <p>Location: <a href="#selectedEventName">Manwaring Center (MC) and BYU-Idaho Center Courts</a></p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-lg">
      <h5 class="centered" id="selectedEventName">Name of Event</h5>
      <div id="map"></div>
    </div>
  </div>
  </>);
}

export default Schedule;