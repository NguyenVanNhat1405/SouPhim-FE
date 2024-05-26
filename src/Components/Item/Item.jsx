import React, { useEffect, useRef } from 'react';
import './Item.css';
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
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div className='card' ref={cardRef}>
      <Link to={`/video/${props.id}`} onClick={scrollToTop}>
        <div className="card-image" style={{ backgroundImage: `url(${props.image})` }}></div>
        <div className="top-right">{props.tap}</div>
        <div><p data-content={props.name}>{props.name}</p></div>
      </Link>
    </div>
  );
};

export default Item;
