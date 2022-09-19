import React, { useState } from 'react';

import { Col, ButtonGroup } from 'reactstrap';
import { Card, CardImg, CardBody, CardText, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faVideo, faHeart } from '@fortawesome/free-solid-svg-icons'

export default function Movie(props) {
    var iconGold = {
        color: '#f1c40e',
    };

    const [watchMovie, setWatchMovie] = useState(false);
    const [countWatchMovie, setCountWatchMovie] = useState(0);
    const [myRatingMovie, setMyRatingMovie] = useState(0);
    const [isRating, setIsRating] = useState(false)



    //mise en forme dynamique des pictos coeur et camera
    var heartCheck = () => {
        console.log(props.isInWishlist)
        let movie = {
            name: props.movieName,
            img: props.movieImg,
        }
        if (props.isInWishlist) {
            props.handleClickDeleteMovieParent(movie)
        } else {
            props.handleClickAddMovieParent(movie)
        }

        // likeMovie ? props.handleClickDeleteMovieParent(movie) : props.handleClickAddMovieParent(movie)

    }
    function cameraCheck() {
        setWatchMovie(true)
        setCountWatchMovie(countWatchMovie + 1)
    }


    var colorHeart
    if (props.isInWishlist) {
        colorHeart = {
            color: '#e74c3c',
        };
    }

    var colorCamera
    if (watchMovie) {
        colorCamera = {
            color: '#e74c3c',
        };
    }

    //mise en forme dynamique de la note utilisateur
    function incrementRating() {
        if (myRatingMovie < 10) {
            setMyRatingMovie(myRatingMovie + 1)
            setIsRating(true)
        }
    }

    function decrementRating() {
        if (myRatingMovie > 0) {
            setMyRatingMovie(myRatingMovie - 1)
            setIsRating(true)
        }
    }

    //integration avis user dans la moyenne => need useEffect pour maj dynamique sur onclick button
    let sumRatings = props.globalCountRating * props.globalRating;
    let sumCountRatings = props.globalCountRating

    if (isRating) {
        sumCountRatings += 1
        sumRatings += myRatingMovie
    }
    let newGlobalRating = Math.round(sumRatings / sumCountRatings)

    // mise en forme dynamique du nombre d'etoiles avis global
    let starArray = []
    for (let i = 0; i < newGlobalRating; i++) {
        starArray.push(<FontAwesomeIcon key={i} icon={faStar} style={iconGold} />)
    }
    for (let i = 0; i < 10 - newGlobalRating; i++) {
        starArray.push(<FontAwesomeIcon key={10 - i} icon={faStar} />)
    }


    //mise en forme dynamique etoiles user
    var tabMyRating = []
    for (var i = 0; i < 10; i++) {
        var color = {}
        if (i < myRatingMovie) {
            color = { color: '#f1c40f' }
        }
        let count = i + 1;
        tabMyRating.push(<FontAwesomeIcon key={i} style={color} icon={faStar} onClick={() => countStars(count)} />)
    }

    //define star count on click
    function countStars(count) {
        setMyRatingMovie(count)
        setIsRating(true)
    }

    return (
        <Col xs="12" lg="6" xl="4">
            <Card className="mb-3">
                <CardImg
                    alt={props.movieName}
                    src={props.movieImg}
                    top
                    width="100%"
                    height="50%"
                />
                <CardBody>
                    <CardText>
                        Like {props.isInWishlist} <FontAwesomeIcon className='likeIcon' icon={faHeart} style={colorHeart} onClick={() => heartCheck()} />
                    </CardText>
                    <CardText>
                        Nombre de vues  <FontAwesomeIcon icon={faVideo} onClick={() => cameraCheck()} style={colorCamera} /> <Button bg="secondary" size="sm" > {countWatchMovie} </Button>
                    </CardText>
                    <CardText className='d-inline'>
                        Mon avis:
                        {tabMyRating}
                    </CardText>
                    <ButtonGroup aria-label="Basic example" size="sm">
                        <Button variant="secondary" onClick={() => incrementRating()}>+</Button>
                        <Button variant="secondary" onClick={() => decrementRating()}>-</Button>
                    </ButtonGroup>
                    <CardText>
                        Avis Global:
                        {starArray}
                        <span>({sumCountRatings})</span>
                    </CardText>
                    <CardText>
                        {props.movieName}
                    </CardText>
                    <CardText>
                        {props.movieDesc}
                    </CardText>



                </CardBody>
            </Card>
        </Col>
    )
}