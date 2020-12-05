module.exports = {
  createSemester: createSemester,
  getSemesters: getSemesters,
  getSemester: getSemester,
  getActiveSemesterId: getActiveSemesterId,
  isSemesterActive: isSemesterActive,
  updateSemesterActiveFlag: updateSemesterActiveFlag,
  updateSemesterColleges: updateSemesterColleges,
  updateSemesterITeams: updateSemesterITeams,
  updateSemesterEvents: updateSemesterEvents,
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
      res.send("A Semester with that name already exists.");
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
        res.send(result);
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
    res.json({semesters: docs});
  })
  .catch(err => {
    console.log(err);
  });
}

function getSemester(req, res, next)  {
  Semester.findById(req.body._id)
  .populate('colleges')
  .populate('iTeams')
  .populate('events')
  .then(docs => {
    res.json(docs);
  })
  .catch(err => {
    console.log(err);
  });
}

async function getActiveSemesterId() {
  var activeSemesterId = await Semester.findOne({ 'activeFlag': true })
  .then(result => {
    return result ? result._id : null;
  })
  .catch(err => {
    console.log(err);
  });

  return activeSemesterId;
}

async function isSemesterActive(semesterId) {
  var activeSemesterId = await getActiveSemesterId();
  return activeSemesterId ? activeSemesterId == semesterId : false;
}

async function updateSemesterActiveFlag(req, res, next) {
  // Check if another semester has the activeFlag set to true.
  var activeSemesterId = await Semester.findOne({ 'activeFlag': true })
  .then(result => {
    if (result != null && result._id != req.body._id) {
      return result._id;
    }
    else {
      return null;
    }
  })
  .catch(err => {
    console.log(err);
  });

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
    req.body._id,
    {$set:{ activeFlag: req.body.activeFlag }},
    {new: true})
  .populate('iTeams')
  .exec((err, doc) => {
    if (err) {
        console.log("Something wrong when updating Semester activeFlag!");
    }
    // If setting to the active semester, Redo all Complexes
    complexService.deleteAllComplexes();
    if (doc.activeFlag == true && doc.iTeams != null && doc.iTeams != []) {
      complexService.createComplexes(doc.iTeams);
    }
    res.send(doc);
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

async function deleteSemester(req, res, next) {
  // Async Parallel Limit
  var semester = await Semester.findById(req.body._id)
  .then(result => {
    return result;
  })
  .catch(err => {
    console.log(err);
  });

  // Delete all associated objects!!
  // TODO: Async.ParallelLimit
  if (semester != null) {
    if (semester.activeFlag == true) {
      complexService.deleteAllComplexes();
    }

    semester.colleges.forEach(collegeId => {
      collegeService.deleteCollegeById(semester._id, collegeId);
      console.log("Deleted college:", collegeId);
    });

    semester.iTeams.forEach(iTeamId => {
      iTeamService.deleteITeamById(semester._id, iTeamId);
      console.log("Deleted iTeam:", iTeamId);
    });

    semester.events.forEach(eventId => {
      scheduleService.deleteEventById(semester._id, eventId);
      console.log("Deleted event:", eventId);
    });
  }

  Semester.findByIdAndRemove(semester._id, (err, doc) => {
    if (err) {
        console.log("Something wrong when deleting Semester!");
    }
    res.send(doc);
  });
}
