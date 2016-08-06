const express = require('express');
const router = express.Router();
const models = require('../models');
const methodOverride = require('methodOverride');
const bodyParser = require('body-parser');



//get route -> index
router.get('/', function(req,res) {
		res.redirect('/burgers')
});
router.get('/burgers', function(req,res) {
	models.burgers.findAll().then(function(data){
		res.render('index',{burgers: data});
	});
});

//post route -> back to index
router.post('/burgers/create', function(req, res) {
	models.burger.create({
		burger_name:req.body.name,
		devoured: 0
	}).then(function(){
		res.redirect('/burgers');
	});
});

//put route -> back to index
router.put('/burgers/update/devour/:id', function(req,res){
	models.burger.update({
		devoured:1
	},{where:{
		id:req.params.id
	}}).then(function(){
		res.redirect('/burgers');
	});

});

router.delete('/burgers/delete/:id', function(req, res){
	models.burgers.destroy(
		{where:{
			id:req.params.id
		}}).then(function(){
			res.redirect('/burgers');
		})
})

router.use(function(req, res) {
	res.redirect('/burgers');
})

module.exports = router;