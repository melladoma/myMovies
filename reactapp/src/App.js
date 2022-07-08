import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'reactstrap';
import { useEffect, useState } from 'react';
import Movie from './components/Movie'
import { Nav, NavItem, NavLink, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { PopoverHeader, UncontrolledPopover, PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';


function App() {
  //hooks d'etat
  const [moviesCount, setMoviesCount] = useState(0);
  const [moviesWishList, setMoviesWishList] = useState([]);
  const [moviesList, setMoviesList] = useState([])


  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch('/new-movies');
      var response = await rawResponse.json()

      let movieInfo = []
      for (let i = 0; i < 20; i++) {
        if (response.movies[i].overview.length > 80) {
          var desc = response.movies[i].overview.substring(0, 80) + "...";
        } else {
          desc = response.movies[i].overview;
        }
        if (response.movies[i].poster_path == null) {
          var image = "/img/generique.jpg"
        } else {
          image = "https://image.tmdb.org/t/p/w500" + response.movies[i].poster_path
        }

        let movie = {
          name: response.movies[i].title,
          desc: `${desc}`,
          img: `${image}`,
          note: response.movies[i].vote_average,
          vote: response.movies[i].vote_count,
        }
        movieInfo.push(movie)
      }
      setMoviesList(movieInfo)
    }
    loadData();

  }, [])



  // let movieInfo = [
  //   {
  //     name: 'BadBoy 3',
  //     desc: "Marcus Burnett est maintenant inspecteur de police. Mike Lowery est, quant à lui, en pleine crise de la quarantaine. Ils s'unissent à nouveau lorsqu'un mercenaire albanais, dont ils ont tué le frère, leur promet une importante prime.",
  //     img: './img/badboy3.jpg',
  //     note: 9.2,
  //     vote: 3,
  //     isInWishlist: false,
  //   },
  //   {
  //     name: 'Frozen',
  //     desc: "Anna, une jeune fille audacieuse, se lance dans un incroyable voyage en compagnie de Kristoff, montagnard expérimenté, et de son renne Sven, à la recherche de sa soeur, Elsa, la reine des neiges qui a plongé le royaume d'Arendelle dans un hiver éternel.",
  //     img: './img/frozen.jpg',
  //     note: 4,
  //     vote: 7,
  //     isInWishlist: false,
  //   },
  //   {
  //     name: 'Jumanji : Next Level',
  //     desc: "Lorsque Spencer retourne dans le monde fantastique de Jumanji, ses amis Martha, Fridge et Bethany y retournent aussi pour le sauver mais le jeu est maintenant brisé.",
  //     img: './img/jumanji.jpg',
  //     note: 7,
  //     vote: 3,
  //     isInWishlist: false,
  //   },
  //   {
  //     name: 'Maléfique : le pouvoir du mal',
  //     desc: "Maléfique grandit en menant une vie idyllique, jusqu'à ce qu'une armée d'invasion menace l'harmonie. Lorsque Maléfique devient la protectrice du territoire, elle se retrouve victime d'une trahison impitoyable.",
  //     img: './img/maleficent.jpg',
  //     note: 7,
  //     vote: 3,
  //     isInWishlist: false,
  //   },
  //   {
  //     name: "Star Wars, épisode IX : L'ascension de Skywalker",
  //     desc: "Un an a passé depuis que Kylo Ren a tué Snoke, le Leader suprême et pris sa place. Bien que largement décimée, la Résistance est prête à renaître de ses cendres.",
  //     img: './img/starwars.jpg',
  //     note: 5,
  //     vote: 2,
  //     isInWishlist: false,
  //   },
  //   {
  //     name: "Terminator: Dark Fate",
  //     desc: "De nos jours, à Mexico. Dani Ramos, 21 ans, travaille sur une chaîne de montage dans une usine automobile.",
  //     img: './img/terminator.jpg',
  //     note: 5,
  //     vote: 4,
  //     isInWishlist: false,
  //   },
  //   {
  //     name: "Once Upon a Time… in Hollywood",
  //     desc: "Rick Dalton, un acteur de télévision qui a déjà vécu de meilleures années, et son cascadeur de longue date Cliff Booth s'efforcent d'atteindre la gloire et le succès dans l'industrie cinématographique au cours de l'âge d'or d'Hollywood en 1969.",
  //     img: './img/once_upon.jpg',
  //     note: 4,
  //     vote: 6,
  //     isInWishlist: false,
  //   },
  // ];

  //Mise a jour dynamique de la wishlist





  var handleClickDeleteMovie = (movie) => {
    // let index = 0;
    // movieInfo.forEach(function (item, i) {
    //   if (item.name === movie.name) {
    //     index = i;
    //   }
    // })
    // movieInfo[index].isInWishlist = false;
    setMoviesWishList(moviesWishList.filter(e => e.name !== movie.name))
    setMoviesCount(moviesCount - 1)
  }

  var handleClickAddMovie = (movie) => {
    // let index = 0;
    // movieInfo.forEach(function (item, i) {
    //   if (item.name === movie.name) {
    //     index = i;
    //   }
    // })
    setMoviesWishList([...moviesWishList, movie])
    // movieInfo[index].isInWishlist = true;
    setMoviesCount(moviesCount + 1)
  }

  var handleWishlistClick = (movie) => {
    // let index = 0;
    // movieInfo.forEach(function (item, i) {
    //   if (item.name === movie.name) {
    //     index = i;
    //   }
    // })

    setMoviesWishList(moviesWishList.filter(e => e.name !== movie.name))
    // movieInfo[index].isInWishlist = false;
    setMoviesCount(moviesCount - 1)
  }


  // var filmList = movieInfo.map(function (movie, i) {
  var filmList = moviesList.map(function (movie, i) {

    var result = moviesWishList.find(element => element.name === movie.name);
    var isSee = false
    if (result !== undefined) {
      isSee = true
    }
    return <Movie key={i} movieName={movie.name} movieDesc={movie.desc} movieImg={movie.img} globalRating={movie.note} globalCountRating={movie.vote} isInWishlist={isSee} handleClickAddMovieParent={handleClickAddMovie} handleClickDeleteMovieParent={handleClickDeleteMovie} />;
  })

  //compteur de films
  let content = "Films"
  if (moviesCount === 1) {
    content = "Film"
  }


  //affichage dynamique de la liste de films wishlist
  let movieListDisplay = [];
  if (moviesWishList) {
    movieListDisplay = moviesWishList.map(function (movie, i) {
      return <ListGroupItem className="d-flex gap-2 align-items-center" key={i}>
        <div className="d-flex gap-2 align-items-center" >
          <img src={movie.img} className="w-25" alt={movie.name}></img>
          {movie.name}
        </div>
        <FontAwesomeIcon className="mr-auto ml-0" onClick={() => handleWishlistClick(movie)} icon={faXmark} />
      </ListGroupItem>
    })

  }



  return (
    <div className="App">

      <Container>
        <Row>
          <div>
            <Nav
            >
              <NavItem>
                <img
                  alt="Logo"
                  src="./img/logo.png"
                />

              </NavItem>

              <NavItem>
                <NavLink
                  active
                  href="#"
                  className='text-white'
                >
                  Last Releases
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  <Button
                    id="PopoverClick"
                    type="button"
                  >
                    {moviesCount} {content}
                  </Button>

                  <UncontrolledPopover
                    placement="bottom"
                    target="PopoverClick"
                    trigger="click"
                  >
                    <PopoverHeader>
                      Wishlist
                    </PopoverHeader>
                    <PopoverBody>
                      <ListGroup>
                        {movieListDisplay}
                      </ListGroup>
                    </PopoverBody>
                  </UncontrolledPopover>

                </NavLink>
              </NavItem>

            </Nav>
          </div >
          {/* <Header movieCount={moviesCount} movieList={moviesWishList} handleWishlistClickParent={handleWishlistClick} /> */}
        </Row>

        <Row>
          {filmList}
        </Row>

      </Container>

    </div>
  );
}

export default App;
