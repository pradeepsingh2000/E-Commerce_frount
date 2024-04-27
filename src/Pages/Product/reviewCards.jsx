import { Rating } from "@mui/material";
import React from "react";
import { BACKEND_URL } from "../../Constants/constant";

const ReviewCard = ({ review }) => {
    console.log(review.user_id,'>>');
  return (
    <div className="reviewCard">
         <img src={`${BACKEND_URL}/${review.user_id.image}`} alt="User" />
      <p>{review.user_id.name}</p>
      <Rating precision={0.5} name="read-only" readOnly value={review.rating} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
