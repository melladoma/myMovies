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

    async function loadWishlist() {
      var rawResponse = await fetch('/wishlist-movie');
      var response = await rawResponse.json()
      let wishlistIni = [];
      response.movies.map(item => {
        let movie =
        {
          name: item.title,
          img: item.img
        }
        return wishlistIni.push(movie)
      })
      setMoviesWishList(wishlistIni)
      setMoviesCount(wishlistIni.length)
    }
    loadWishlist();
  }, [])

  async function addData(movie) {
    await fetch('/wishlist-movie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `movieName=${movie.name}&movieUrl=${movie.img}`
    })
  }

  async function deleteData(movie) {
    let urlDelete = `/wishlist-movie/:${movie.name}`
    console.log(urlDelete)
    await fetch(urlDelete, {
      method: 'DELETE',
    })
  }

  // let movieInfo = [
  //   {
  //     name: 'BadBoy 3',
  //     desc: "Marcus Burnett est maintenant inspecteur de police. Mike Lowery est, quant à lui, en pleine crise de la quarantaine. Ils s'unissent à nouveau lorsqu'un mercenaire albanais, dont ils ont tué le frère, leur promet une importante prime.",
  //     img: './img/badboy3.jpg',
  //     note: 9.2,
  //     vote: 3,
  //     isInWishlist: false,
  //   }
  // ]

  //Mise a jour dynamique de la wishlist

  var handleClickDeleteMovie = (movie) => {
    deleteData(movie);
    setMoviesWishList(moviesWishList.filter(e => e.name !== movie.name))
    setMoviesCount(moviesCount - 1)
  }

  var handleClickAddMovie = (movie) => {
    addData(movie);
    setMoviesWishList([...moviesWishList, movie])
    setMoviesCount(moviesCount + 1)
  }

  var handleWishlistClick = (movie) => {
    deleteData(movie);
    setMoviesWishList(moviesWishList.filter(e => e.name !== movie.name))
    setMoviesCount(moviesCount - 1)
  }



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
