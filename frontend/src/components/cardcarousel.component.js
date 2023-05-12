import React, { Component } from "react";
import PostCard from "./postcard.component";
import { Link } from "react-router-dom";
import Carousel from "react-elastic-carousel";

import "../App.css";

const CardCarousel = ({ posts }) => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  const postList = () => {
    return posts.map((post) => {
      return (
        <Link
          to={{ pathname: `/detail/${post._id}` }}
          style={{ textDecoration: "none", color: "black" }}
        >
          <PostCard post={post}></PostCard>
        </Link>
      );
    });
  };

  return (
    <div className="Carousel">
      <Carousel
        breakPoints={breakPoints}
      >
        {postList()}
      </Carousel>
    </div>
  );
};

export default CardCarousel;
