var express = require('express');
var PsychologistModel = require("../models/Psychologists")
var router = express.Router();

/* GET home page. */
router.get('/', (req, res)=> {
  res.json({status:'success'});
});

router.post('/allCityData', async (req, res) => {
  try {
    const cities = await PsychologistModel.distinct("address");
    res.json({cities});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/allPsyData', async (req, res) => {
  console.log(req.body);
  const {city} = req.body;
  try {
    const psychologists = await PsychologistModel.find({address: city })
    return res.json(psychologists);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
