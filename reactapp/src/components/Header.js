import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Nav, NavItem, NavLink, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { PopoverHeader, UncontrolledPopover, PopoverBody } from 'reactstrap';



export default function Header(props) {

//compteur de films
    let content = "Films"
    if (props.movieCount === 1) {
        content = "Film"
    }
//suppression d'un film de la wishlist au clic
let handleWishlistClick = (indexMovie, movieToDeleteName) =>{
    props.handleWishlistClickParent(indexMovie,movieToDeleteName);
}


//affichage dynamique de la liste de films wishlist
    let movieListDisplay = [];
    if (props.movieList) {
        movieListDisplay = props.movieList.map(function (movie, i) {
            return <ListGroupItem className="d-flex gap-2 align-items-center" key={i}>
                <div className="d-flex gap-2 align-items-center" >
                <img src={movie.img} className="w-25"  alt={movie.name}></img>
                {movie.name} 
                </div>
                <FontAwesomeIcon className="mr-auto ml-0" onClick={()=> handleWishlistClick(movie)} icon={faXmark} />
            </ListGroupItem>
        })

    }

    return (
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
                            {props.movieCount} {content}
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
    )
}



