import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";



const StarRating = (props) => {

    console.log("Props from Rate Comment:", props);
    
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    
const onSetClick=(ratingValue)=>{

    setRating(ratingValue)

     props.ratingValue(ratingValue);
    
}


return (

<div>
<span>Rate: </span>



{[...Array(5)].map((star, i) => {

    const ratingValue = i + 1;


    return (

    <label key={ratingValue}>
        <input 
        type="radio" 
        name="rating" 
        value={ratingValue} 
        onClick={()=>onSetClick(ratingValue)}
        />
        <FaStar 
        className="star" 
        size={20} 
        onMouseEnter={() => setHover(ratingValue)}
        onMouseLeave={() => setHover(null)}
        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}/>
        </label>
    );
})}

</div>
);
};

StarRating.propTypes = {
    ratingValue: PropTypes.func,
    ratingVal: PropTypes.func,
  };


export default StarRating;