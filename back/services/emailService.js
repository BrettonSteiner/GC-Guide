module.exports = {
  sendEmail: sendEmail,
};

const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config();

var iteamService = require('../services/iteamService');
var collegeService = require('../services/collegeService');
var scheduleService = require('../services/scheduleService');

// This is from: https://stackoverflow.com/questions/14696326/break-array-of-objects-into-separate-arrays-based-on-a-property
function groupBy(array, prop) {
  var grouped = {};
  array.forEach(item => {
    var p = item[prop];
    if (!grouped[p]) {
      grouped[p] = [];
    }
    grouped[p].push(item);
  });
  return grouped;
}

async function getITeamHtml(iTeamId) {
  return await iteamService.getITeam(iTeamId)
  .then(iTeam => {
    if (iTeam != null) {
      return '<h2>Your I-Team</h2><h3>I-Team:</h3><p><b>'+ iTeam.iTeamNumber 
      + '</b></p><h3>Mentors:</h3><b><p>' + iTeam.mentor1.name + ': '
      + iTeam.mentor1.phone + '</p><p>' + iTeam.mentor2.name + ': '
      + iTeam.mentor2.phone + '</p></b></br>';
    }
    else {
      return '';
    }
  });
}

async function getCollegeHtml(collegeId) {
  return await collegeService.getCollege(collegeId)
  .then(college => {
    if (college != null) {
      return '<h2>Your Academic Connection</h2><h3>College Name:</h3><p><b>'
      + college.name + '</b></p><h3>Flag Color:</h3><p class="color-box '
      + college.flagColor + '-box"><b>' + college.flagColor + '</p><b></br>';
    }
    else {
      return '';
    }
  });
}

async function getScheduleHtml(semesterId) {
  return await scheduleService.getScheduleData(semesterId)
  .then(schedule => {
    if (schedule != null) {
      var tableStyle = 'border="0" cellpadding="0" cellspacing="0" style="font-family: Helvetica, Arial, sans-serif; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0px; border-collapse: collapse; width: 100%; max-width: 100%;"';
      var thStyle = 'style="line-height: 24px; font-size: 16px; border-bottom-width: 2px; border-bottom-color: #dee2e6; border-bottom-style: solid; border-top-width: 1px; border-top-color: #dee2e6; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top"';
      var tdStyle = 'style="border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #dee2e6; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top"';
      var stripeStyle = 'style="" bgcolor="#f2f2f2"';
      var html = '<h2>Get Connected Schedule</h2>';

      var grouped = groupBy(schedule, 'date');
      var keys = Object.keys(grouped).sort((a,b) => new Date(a).getTime() - new Date(b).getTime());
      keys.forEach(key => {
        html += '<h3>' + new Date(key).toDateString() + '</h3>'
        + '<table ' + tableStyle + '><thead><tr>'
        + '<th scope="col" ' + thStyle + '>Time</th>'
        + '<th scope="col" ' + thStyle + '>Event</th>'
        + '<th scope="col" ' + thStyle + '>Location</th>'
        + '</tr></thead><tbody>';

        var rowNum = 0;
        var events = grouped[key].sort((a,b) => new Date('1970/01/01 ' + a.startTime.toUpperCase()).getTime() - new Date('1970/01/01 ' + b.startTime.toUpperCase()).getTime())
        events.forEach(event => {
          html += '<tr ' + (rowNum % 2 == 0? stripeStyle : '') + '><td ' + tdStyle + '>' + (event.startTime? event.startTime : '')
          + (event.endTime? " - " + event.endTime : '') + '</td><td ' + tdStyle + '>'
          + event.name + '</td><td ' + tdStyle + '>' + event.location + '</td></tr>';
          rowNum++;
        });

        html += '</tbody></table>';
      });

      return html;
    }
    else {
      return '';
    }
  });
}

async function createhtml(req) {
  var flagColorBoxStyle = '<style>.color-box {max-width:100px;height:40px;line-height:40px;margin:auto;border-radius:4px;} ' 
    + '.Orange-box {background-color:orange;} '
    + '.Purple-box {background-color:purple;color:white;} '
    + '.Green-box {background-color:green;color:white;} '
    + '.Red-box {background-color:red;color:white;} '
    + '.Blue-box {background-color:blue;color:white;} '
    + '.Yellow-box {background-color:yellow;} '
    + '.Grey-box {background-color:grey;color:white;}</style>';
  var header = '<div style="background-color: #0076B6"><img style="height: auto; line-height: 100%; outline: none; text-decoration: none; '
    + 'border: 0.25pt solid #959595;" height="72px" width="72px" src="https://www.byui.edu/images/Branding/BYU-Idaho-Box-Black.png" '
    + 'alt="BYU-Idaho Logo" align="left"><h1 class="text-center text-white" style="line-height: 74px; margin: auto; margin-right: 74px; '
    + 'font-weight: 500; vertical-align: baseline; font-size: 36px; color: #ffffff;" align="center">Get Connected Guide</h1></div>';
  var html = '<html><head>' + flagColorBoxStyle  + '</head><body>' + header + '<div style="text-align: center;"><p>'
  + new Date().toLocaleDateString() + '</p>';

  if (req.body.includeITeam) {
    html += await getITeamHtml(req.body.iTeamId);
  }

  if (req.body.includeAcademicConnections) {
    html += await getCollegeHtml(req.body.collegeId);
  }

  if (req.body.includeSchedule) {
    html += await getScheduleHtml(req.body.semesterId);
  }

  html += "<p>Please do not reply to this email.</p></div></body></html>"

  return html;
}

async function sendEmail(req, res, next) {
  // Construct and send email
  var transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: req.body.emailAddress,
    subject: 'Get Connected Guide - No Reply',
    html: await createhtml(req)
  };

  transporter.sendMail(mailOptions)
    .then(response => {
      console.log('Email sent!');
      res.status(200).json({success: true, message: 'Email sent.'});
    })
    .catch(error => {
      console.log('Error: ', error);
      res.status(500).json({success: false, message: error});
    });
}