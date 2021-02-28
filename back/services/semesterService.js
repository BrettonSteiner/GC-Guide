module.exports = {
  createSemester: createSemester,
  getSemesters: getSemesters,
  getSemester: getSemester,
  getActiveSemester: getActiveSemester,
  getActiveSemesterId: getActiveSemesterId,
  isSemesterActive: isSemesterActive,
  updateSemesterActiveFlag: updateSemesterActiveFlag,
  updateSemesterColleges: updateSemesterColleges,
  updateReplaceSemesterColleges: updateReplaceSemesterColleges,
  updateSemesterITeams: updateSemesterITeams,
  updateReplaceSemesterITeams: updateReplaceSemesterITeams,
  updateSemesterEvents: updateSemesterEvents,
  updateReplaceSemesterEvents: updateReplaceSemesterEvents,
  deleteSemester: deleteSemester
};

const {Semester} = require('../models/semester');

var collegeService = require('./collegeService');
var iTeamService = require('./iteamService');
var scheduleService = require('./scheduleService');
var complexService = require('./complexService');

function createSemester(req, res, next) {
  Semester.findOne({ 'name': req.body.name })
  .then(result => {
    if(result != null)
      res.status(400).send("A Semester with that name already exists.");
    else {
      const semester = new Semester({
        name: req.body.name,
        activeFlag: false,
        colleges: [],
        iteams: [],
        events: []
      });

      semester.save()
      .then(result => {
        res.status(201).send(result);
      })
      .catch(err => {
        console.log(err);
      });
    }
  })
  .catch(err => {
    console.log(err);
  });
}

function getSemesters(req, res, next) {
  Semester.find()
  .then(docs => {
    res.status(200).json({semesters: docs});
  })
  .catch(err => {
    console.log(err);
  });
}

function getSemester(req, res, next)  {
  Semester.findById(req.body.semesterId)
  .populate('colleges')
  .populate('iTeams')
  .populate('events')
  .then(docs => {
    res.status(200).json(docs);
  })
  .catch(err => {
    console.log(err);
  });
}

async function findActiveSemester() {
  var activeSemester = await Semester.findOne({ 'activeFlag': true })
  .then(result => {
    return result;
  })
  .catch(err => {
    console.log(err);
  });

  return activeSemester;
}

async function getActiveSemester(req, res, next)  {
  res.status(200).json(await findActiveSemester());
}

async function getActiveSemesterId() {
  var activeSemester = await findActiveSemester();
  return activeSemester? activeSemester._id : null;
}

async function isSemesterActive(semesterId) {
  var activeSemesterId = await getActiveSemesterId();
  return activeSemesterId ? activeSemesterId == semesterId : false;
}

async function updateSemesterActiveFlag(req, res, next) {
  // Check if another semester has the activeFlag set to true.
  var activeSemesterId = await getActiveSemesterId();
  if (activeSemesterId != null && activeSemesterId == req.body.semesterId) {
    activeSemesterId = null;
  }

  // Set previously true semester to false.
  if (activeSemesterId != null) {
    await Semester.findByIdAndUpdate(
      activeSemesterId,
      {$set:{ activeFlag: false }},
      {new: true},
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating previous active semester to deactive!");
        }
        else {
          console.log("Updated Semester ActiveFlag:", doc.name, "-", doc.activeFlag);
        }
    });
  }

  Semester.findByIdAndUpdate(
    req.body.semesterId,
    {$set:{ activeFlag: req.body.activeFlag }},
    {new: true})
  .populate('iTeams')
  .exec((err, doc) => {
    if (err) {
        console.log("Something wrong when updating Semester activeFlag!");
    }
    // If setting to the active semester, Redo all Complexes
    if (doc.activeFlag == true && doc.iTeams != null && doc.iTeams != []) {
      complexService.replaceComplexes(doc.iTeams);
    }
    else {
      complexService.deleteAllComplexes();
    }
    res.status(200).send(doc);
  });
}

async function updateSemesterColleges(semesterId, collegeId) {
  // Get semester
  var colleges = await Semester.findById(semesterId)
  .then(docs => {
    return docs ? docs.colleges : null;
  })
  .catch(err => {
    console.log(err);
  });

  if (colleges != null) {
    // If collegeId is already in there, remove it, otherwise add it
    if (colleges.includes(collegeId)) {
      colleges = colleges.filter(college => { return college != collegeId; });
    }
    else {
      colleges.push(collegeId);
    }

    // Save changes to the semester colleges list
    Semester.findByIdAndUpdate(
      semesterId,
      {$set:{ colleges: colleges }},
      {new: true},
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating Semester colleges!");
          return;
        }
        console.log("Successfully updated Semester colleges.")
    });
  }
}

async function updateReplaceSemesterColleges(semesterId, collegeIds) {
  // Save changes to the semester colleges list
  await Semester.findByIdAndUpdate(
    semesterId,
    {$set:{ colleges: collegeIds }},
    {new: true},
    (err, doc) => {
      if (err) {
        console.log("Something wrong when replacing Semester college IDs!");
        return;
      }
      console.log("Successfully replaced Semester college IDs.")
      // console.log("Semester collegeId list: " + doc.colleges);
  });
}

async function updateSemesterITeams(semesterId, iTeamId) {
  // Get semester
  var iTeams = await Semester.findById(semesterId)
  .then(docs => {
    return docs ? docs.iTeams : null;
  })
  .catch(err => {
    console.log(err);
  });

  if (iTeams != null) {
    // If iTeamId is already in there, remove it, otherwise add it
    if (iTeams.includes(iTeamId)) {
      iTeams = iTeams.filter(iTeam => { return iTeam != iTeamId; });
    }
    else {
      iTeams.push(iTeamId);
    }

    // Save changes to the semester iTeams list
    Semester.findByIdAndUpdate(
      semesterId,
      {$set:{ iTeams: iTeams }},
      {new: true},
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating Semester iTeams!");
          return;
        }
        console.log("Successfully updated Semester iTeams.")
    });
  }
}

async function updateReplaceSemesterITeams(semesterId, iTeamIds) {
  // Save changes to the semester colleges list
  await Semester.findByIdAndUpdate(
    semesterId,
    {$set:{ iTeams: iTeamIds }},
    {new: true},
    (err, doc) => {
      if (err) {
        console.log("Something wrong when replacing Semester I-Team IDs!");
        return;
      }
      console.log("Successfully replaced Semester I-Team IDs.")
      console.log("Semester iTeamId list: " + doc.iTeams);
  });
}

async function updateSemesterEvents(semesterId, eventId) {
  // Get semester
  var events = await Semester.findById(semesterId)
  .then(docs => {
    return docs ? docs.events : null;
  })
  .catch(err => {
    console.log(err);
  });

  if (events != null) {
    // If eventId is already in there, remove it, otherwise add it
    if (events.includes(eventId)) {
      events = events.filter(event => { return event != eventId; });
    }
    else {
      events.push(eventId);
    }

    // Save changes to the semester events list
    Semester.findByIdAndUpdate(
      semesterId,
      {$set:{ events: events }},
      {new: true},
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating Semester events!");
          return;
        }
        console.log("Successfully updated Semester schedule.")
    });
  }
}

async function updateReplaceSemesterEvents(semesterId, eventIds) {
  // Save changes to the semester colleges list
  await Semester.findByIdAndUpdate(
    semesterId,
    {$set:{ events: eventIds }},
    {new: true},
    (err, doc) => {
      if (err) {
        console.log("Something wrong when replacing Semester Event IDs!");
        return;
      }
      console.log("Successfully replaced Semester Event IDs.")
      console.log("Semester eventId list: " + doc.events);
  });
}

async function deleteSemester(req, res, next) {
  // Async Parallel Limit
  var semester = await Semester.findById(req.body.semesterId)
  .then(result => {
    return result;
  })
  .catch(err => {
    console.log(err);
  });

  // Delete all associated objects!!
  if (semester != null) {
    if (semester.activeFlag == true) {
      complexService.deleteAllComplexes();
    }

    if (semester.colleges.length > 0) {
      collegeService.deleteManyCollegesById(semester.colleges);
    }

    if (semester.iTeams.length > 0) {
      iTeamService.deleteManyITeamsById(semester.iTeams);
    }

    if (semester.events.length > 0) {
      scheduleService.deleteManyEventsById(semester.events);
    }
  }

  Semester.findByIdAndRemove(semester._id, (err, doc) => {
    if (err) {
        console.log("Something went wrong when deleting Semester " + semester._id);
    }
    res.status(204).send();
  });
}
