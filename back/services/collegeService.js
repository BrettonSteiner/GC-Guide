module.exports = {
  createCollege: createCollege,
  getColleges: getColleges,
  updateCollege: updateCollege,
  deleteCollege: deleteCollege,
  importColleges: importColleges
};

const collegeDummyData = require('../public/dummyData/collegeDummyData.json');
const {College} = require('../models/college');

function createCollege(req, res, next) {
  College.findOne({ 'name': req.body.name })
  .then(result => {
    if(result != null)
      res.send("A college with that name already exists.");
    else {
      const college = new College({
        name: req.body.name,
        majors: req.body.majors,
        flagColor: req.body.flagColor
      });

      college.save()
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

function getColleges(req, res, next) {
  College.find()
  .then(docs => {
    res.json({colleges: docs});
  })
  .catch(err => {
    console.log(err);
  });
  // res.send(collegeDummyData);
}

function updateCollege(req, res, next) {
  College.findByIdAndUpdate(
    req.body._id,
    {$set:{
      name: req.body.name,
      flagColor: req.body.flagColor,
      majors: req.body.majors
    }},
    {new: true},
    (err, doc) => {
      if (err) {
          console.log("Something wrong when updating college!");
      }
      res.send(doc);
  });
}

function deleteCollege(req, res, next) {
  College.findByIdAndRemove(req.body._id, (err, doc) => {
    if (err) {
        console.log("Something wrong when deleting college!");
    }
    res.send(doc);
  });
}

function importColleges(req, res, next) {
  res.send('Not Implemented');
}