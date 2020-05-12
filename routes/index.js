var express = require('express');
var router = express.Router();
var request = require('sync-request');
var movieModel = require('../models/movies');

var myApiKey='7724e65ce92d6587e5c206541fc415ae';//Clé API themoviedb                           

/* RECUPERE LES FILMS RECENTS VIA L'API */
router.get('/new-movies', async function(req, res, next) {

  var data= await request("GET",`https://api.themoviedb.org/3/discover/movie?api_key=${myApiKey}&language=fr-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
  var dataParse=JSON.parse(data.body);

  res.json({result: true,movies:dataParse.results});
});

/* AJOUTE UN FILM DANS LA BDD */
router.post('/wishlist-movie', async function(req, res, next) {

  var newMovie = new movieModel({
    movieName: req.body.name,
    movieImg: req.body.img,
  })

  var movieSave = await newMovie.save();

  var result = false;
  if(movieSave.movieName){
    result = true;
  }
    res.json({result});
});

/* SUPPRIME UN FILM DANS LA BDD */
router.delete('/wishlist-movie/:name', async function(req, res, next) {
  
  var returnDb= await movieModel.deleteOne({ movieName: req.params.name});
  
  var result = false;
  if(returnDb.deletedCount == 1){
    result = true;
  }

  res.json({result});
});

/* LIT TOUS LES FILMS ENREGISTRES EN BDD */
router.get('/wishlist-movie', async function(req, res, next){

  var movieList= await movieModel.find();

  res.json({result: true,movies:movieList})
})

module.exports = router;
