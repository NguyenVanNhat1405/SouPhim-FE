import React, { useEffect, useRef } from 'react';
import style from'./Item.module.css';
import { Link } from 'react-router-dom';

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const Item = (props) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(style.visible); // Thêm tiền tố của tên lớp CSS module
          } else {
            entry.target.classList.remove(style.visible); // Thêm tiền tố của tên lớp CSS module
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    const currentCardRef = cardRef.current;
    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, []);


  return (
    <div className={style.card} ref={cardRef}>
      <Link to={`/review/${props.id}`} onClick={scrollToTop}>
        <div className={style.cardImage} style={{ backgroundImage: `url(${props.image})` }}></div>
        <div className={style.topRight}>{props.tapco}/{props.tap}</div>
        <div><p data-content={props.name}>{props.name}</p></div>
      </Link>
    </div>
  );
};


export default Item;
