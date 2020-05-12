import React, {useState, useEffect} from 'react';
import './App.css';
import {Container, Row, Button, Nav, NavItem, NavLink, Popover, PopoverHeader, PopoverBody, ListGroup, ListGroupItem, ListGroupItemText} from 'reactstrap';
import Movie from './components/Movie';
 
function App() {

  /* INITIALISATION DES ETATS */
  const [popoverOpen, setPopoverOpen] = useState(false); //Popover
  const [moviesWishList, setMoviesWishList]=useState([]); //Wishlist
  const [moviesCount, setMoviesCount]= useState(0); //Compteur Wishlist
  const [movieList, setMovieList]= useState([]); //Liste des films
 

  /* EVENEMENT POPOVER */ 
  const toggle = () => setPopoverOpen(!popoverOpen);

  /* EVENEMENT AJOUT MOVIE WISHLIST */
  var handleClickAddMovie = async (name,img) => {
    setMoviesCount(moviesCount+1)
    setMoviesWishList([...moviesWishList, {name:name,img:img}]);
    const response = await fetch('http://localhost:3000/wishlist-movie', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `name=${name}&img=${img}`
     });
  }

  /* EVENEMENT SUPPRESSION MOVIE WISHLIST */
  var handleClickDeleteMovie= async (name)=>{
    console.log('click détécté!')
    setMoviesCount(moviesCount-1); //Décrémente le compteur de la Wishlist
    setMoviesWishList(moviesWishList.filter(object => object.name != name)); 
    const response = await fetch('http://localhost:3000/wishlist-movie/'+ name, {
      method: 'DELETE',
     });
  }


  useEffect(()=>{
    async function loadData() {
      var rawResponse= await fetch('/new-movies') //requête API
      var response= await rawResponse.json(); //Conversion format JSON
      setMovieList(response.movies) //Ajoutes les films de l'API dans movieList

      var rawResponseWish= await fetch(`/wishlist-movie`); //requête BDD
      var responseWish = await rawResponseWish.json(); //Conversion format JSON
      var wishListFromDB = responseWish.movies.map((movie,i) => {
      return {name:movie.movieName,img:movie.movieImg}
    })
    setMoviesWishList(wishListFromDB) //Ajoute les films séléctionnée dans la wishlist et en BDD
    setMoviesCount(responseWish.movies.length) //Incrémente le compteur Wishlist
  } 
    loadData();
  }, [])
  
   /* CREATION DE LA WISHLIST */
  var cardWish=moviesWishList.map((movie, i) => {
    return(
      <ListGroupItem>
        <ListGroupItemText onClick={() => {handleClickDeleteMovie(movie.name)}}>
          <img width="25%" src={movie.img} alt={movie.name}/> {movie.name}
        </ListGroupItemText>
      </ListGroupItem>
    )
  })

   /* CREATION LISTE MOVIES */
   var movieListItems = movieList.map((movie, i) => {
    var result = moviesWishList.find(element => element.name == movie.title)
    var isSee = false
    if(result != undefined){
      isSee = true
    }
    var image;
    //Si le film ne possède pas d'image, je lui met une image générique
    if(movie.backdrop_path ==null){
      image= './generique.jpg';
    }else{
      image= 'https://image.tmdb.org/t/p/w500/'+ movie.backdrop_path;
    }
    var description =movie.overview;
    //Si la decription fait plus de 80 caractère je l'a réduit
    if(description.length>80){
      description= description.slice(0,80)+'...'
    }

    return(<Movie key={i} movieName={movie.title} movieDesc={description} movieImg={image} globalRating={movie.popularity} globalCountRating={movie.vote_count} handleClickAddMovieParent={handleClickAddMovie} handleClickDeleteMovieParent={handleClickDeleteMovie} movieSee={isSee} />)
  
  })


  return (
    <div style={{backgroundColor:"#222f3e"}}>
      <Container>

        <Nav className="align-items-center">
          <span className="navbar-brand">
            <img src="./logo.png"width="30" height="30" className="d-inline-block align-top" alt="logo" />
          </span>
          <NavItem>
            <NavLink id='navName' style={{color:'white'}}>Last Releases</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Button id="Popover1" type="button">{moviesCount} films 
              <div>
                <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                  <PopoverHeader>WishList</PopoverHeader>
                  <PopoverBody>
                    <ListGroup>
                      {cardWish}
                    </ListGroup>
                  </PopoverBody>
                </Popover>
              </div>
              </Button>
            </NavLink>
          </NavItem>
        </Nav>
      
        <Row>
          {movieListItems}
        </Row>

      </Container>
    </div>
  );
}

export default App;
