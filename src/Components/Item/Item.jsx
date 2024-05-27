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

    const currentCardRef = cardRef.current; // Lưu trữ giá trị của cardRef.current trong một biến khác
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
    <div className='card' ref={cardRef}>
      <Link to={`/review/${props.id}`} onClick={scrollToTop}>
        <div className="card-image" style={{ backgroundImage: `url(${props.image})` }}></div>
        <div className="top-right">{props.tap}</div>
        <div><p data-content={props.name}>{props.name}</p></div>
      </Link>
    </div>
  );
};


export default Item;
