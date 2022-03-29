import React, { useEffect } from "react";

export default function NftCard(props){

        //FAVORITE STAR LOGIC AND RENDER
        const starFullPath = require('../images/star-full.png');
        const starEmptyPath = require('../images/star-empty.png');

        const fullStar = <img className="star fullStar" src={starFullPath} onClick={() =>props.toggleStar(props.id)} alt="full favorite star"/>
        const emptyStar = <img className="star" src={starEmptyPath} onClick={() =>props.toggleStar(props.id)} alt="empty favorite star"/>

    //SORT EACH TIME A FAVORITE IS ADDED
    useEffect(() => {
        props.sortFavorites()
    },[props.isFavorite])

        //RENDER INDIVIDUAL CARD
    return(
        <>
            <div className="card">
                {props.isFavorite? fullStar : emptyStar}
                <a href={`https://solscan.io/token/${props.mint}`} target="_blank">
                    
                    <img className="img" src={props.imgUrl} alt="loading"/>
                    <p className='numEdition'>{props.numEdition}</p>
                    <p className="card-title">{props.name}</p>
                </a>
            </div>
        </>


    )
}