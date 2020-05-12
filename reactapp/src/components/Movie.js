import React, {useState} from 'react';
import '../App.css';
import { Button, Col,Card,CardImg,CardBody,CardTitle,CardText,Badge, ButtonGroup,} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faVideo} from '@fortawesome/free-solid-svg-icons';

function Movie(props) {

  /* INITIALISATION DES ETATS */
  
  const [watchMovie, setWatchMovie] = useState(false) //Picto camera
  const [countWatchMovie, setCountWatchMovie] = useState(0) //Compteur caméra
  const [myRatingMovie, setMyRatingMovie] = useState(0) //Note de l'utilisateur

  const [isRatingMovie, setIsRatingMovie] = useState(false) //Si l'utilisateur à attribué une note
  const [rating, setRating] = useState(props.globalRating) //Sur le nombre de vote
  const [countRating, setCountRating] = useState(props.globalCountRating) //Sur la note global

  /* INITIALISATION  DES EVENEMENTS */

  /* Sur le picto like */
  var changeLiked=(name, img)=>{
    if(props.movieSee == true){
      props.handleClickDeleteMovieParent(name)
    } else {
      props.handleClickAddMovieParent(name, img)
    }
    console.log(props.movieSee)
  }
  

  /* Sur le picto caméra */
  var addWatch = () => {
    setWatchMovie(true)
    setCountWatchMovie(countWatchMovie+1)
  }

  /* Je fixe une limite entre 0 et 10 sur le vote de l'utilisateur */
  var setMyRating = (rating) => {
    if(rating < 0){
      rating = 0
    }
    if(rating > 10){
      rating = 10
    }
    setMyRatingMovie(rating)
    setIsRatingMovie(true)
  }

  /* MET EN JAUNES LES ETOILES EN FONCTION DE LA NOTE DONNEE PAR L'UTILISATEUR */
  var tabRating = []
  for(var i=0;i<10;i++){
      var color = {}
      if(i<myRatingMovie){
          color = {color: '#feca57'}
      }
      let count = i+1
      tabRating.push(<FontAwesomeIcon onClick={() => setMyRating(count)} style={color} icon={faStar} /> )
  }

  /* MAJ DE LA MOYENNE DES VOTES DU FILM (prend en compte new note utilisateur) */
  var nbTotalNote = rating * countRating
  var nbTotalVote = countRating

  if(isRatingMovie){
    nbTotalVote +=1
    nbTotalNote += myRatingMovie
  }

  var avgTotal = Math.round(nbTotalNote / nbTotalVote) //Nouvelle moyenne
 
 /* MET EN JAUNE LES ETOILES EN FONCTION DE LA MOYENNE DES VOTES */
  var tabGlobalRating = []
  for(var i=0;i<10;i++){
      var color = {}
      if(i<avgTotal){
          color = {color: '#feca57'}
      }
      tabGlobalRating.push(<FontAwesomeIcon style={color} icon={faStar} /> )
  }

  /* CHANGE LE PICTO DE COULEUR QUAND ON CLICK DESSUS */
  // Picto like
  if(props.movieSee){
    var colorLike = {color: '#ee5253',cursor:'pointer'}
  } else {
    var colorLike = {cursor:'pointer'}
  }

  //Picto caméra
  if(watchMovie){
    var colorWatch = {color: '#ee5253'}
  } else {
    var colorWatch = {}
  }

  return (
    <Col xs="12" lg="6" xl="4">
      <Card style={{backgroundColor: '#576574', marginBottom: 30, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 6, borderRightWidth: 6, borderColor: '#39444f', borderRadius: 12}}>
        <CardImg /* style={{width: '344px', height: '193.33px'}} */ top src={props.movieImg} alt={props.movieName} />
        <CardBody>

            <p>Like <FontAwesomeIcon style={colorLike} icon={faHeart} onClick={()=> changeLiked(props.movieName, props.movieImg)}/> </p>
            <p>Nombre de vues  <FontAwesomeIcon style={colorWatch} icon={faVideo} onClick={() => addWatch()} /> <Badge color="secondary" style={{marginLeft:3}}>{countWatchMovie}</Badge> </p>
            <p>Mon avis {tabRating}
              <ButtonGroup size="sm">
                  <Button onClick={() => setMyRating(myRatingMovie-1)} color="secondary" style={{marginLeft:3}}>-</Button>
                  <Button onClick={() => setMyRating(myRatingMovie+1)} color="secondary" style={{marginLeft:1}}>+</Button>
              </ButtonGroup>
            </p>
            <p>Moyenne{tabGlobalRating}({nbTotalVote})</p>
            <CardTitle className="text-center" style={{fontWeight: "bold", fontFamily: 'Oswald', fontSize: "20px"}}>{props.movieName}</CardTitle>
            <CardText>{props.movieDesc}</CardText>

        </CardBody>
      </Card>
    </Col>


  );
}

export default Movie;
