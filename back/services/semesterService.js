module.exports = {
    createSemester: createSemester,
    getSemesters: getSemesters,
    updateSemester: updateSemester,
    deleteSemester: deleteSemester
  };
  
  const {Semester} = require('../models/Semester');
  
  function createSemester(req, res, next) {
    Semester.findOne({ 'name': req.body.name })
    .then(result => {
      if(result != null)
        res.send("A Semester with that name already exists.");
      else {
        const Semester = new Semester({
          name: req.body.name,
          activeFlag: false,
          colleges: [],
          iteams: [],
          events: []
        });
  
        Semester.save()
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
  
  function updateSemesterActiveFlag(req, res, next) {
		// If not this semester, set previously true semester to false.
		// If setting to the active semester, Redo all Complexes
    Semester.findByIdAndUpdate(
      req.body._id,
      {$set:{ activeFlag: req.body.activeFlag }},
      {new: true},
      (err, doc) => {
        if (err) {
            console.log("Something wrong when updating Semester!");
        }
        res.send(doc);
    });
	}
	
	// function updateSemesterColleges(collegeId) {

  //   Semester.findByIdAndUpdate(
  //     req.body._id,
  //     {$set:{ colleges: req.body.activeFlag }},
  //     {new: true},
  //     (err, doc) => {
  //       if (err) {
  //           console.log("Something wrong when updating Semester!");
  //       }
  //       res.send(doc);
  //   });
	// }
	
	// function updateSemesterITeams(req, res, next) {
  //   Semester.findByIdAndUpdate(
  //     req.body._id,
  //     {$set:{ activeFlag: req.body.activeFlag }},
  //     {new: true},
  //     (err, doc) => {
  //       if (err) {
  //           console.log("Something wrong when updating Semester!");
  //       }
  //       res.send(doc);
  //   });
	// }
	
	// function updateSemesterEvents(req, res, next) {
  //   Semester.findByIdAndUpdate(
  //     req.body._id,
  //     {$set:{ activeFlag: req.body.activeFlag }},
  //     {new: true},
  //     (err, doc) => {
  //       if (err) {
  //           console.log("Something wrong when updating Semester!");
  //       }
  //       res.send(doc);
  //   });
  // }
  
  function deleteSemester(req, res, next) {
		// Delete all associated objects!!
		// Async Parallel Limit
    Semester.findByIdAndRemove(req.body._id, (err, doc) => {
      if (err) {
          console.log("Something wrong when deleting Semester!");
      }
      res.send(doc);
    });
  }
