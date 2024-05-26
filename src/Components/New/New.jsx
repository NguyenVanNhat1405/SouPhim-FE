import React,{useState} from 'react';
import './New.css';
import '../Login/Login.css';
import Item from '../Item/Item.jsx';
import new_videos from '../Assets/newphim.js';
import Login from '../Login/Login.jsx';

const New = () => {
    const [isLoginVisible, setIsLoginVisible] = useState(false);

  const showLogin = () => {
    setIsLoginVisible(true);
  };

  const closeLogin = () => {
    setIsLoginVisible(false);
  };
  return (
    <div>
      <div className="new-video">
        <h1>Phim mới ra mắt</h1>
        <div className="videos">
          {new_videos.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              tap={item.tap}
            />
          ))}
        </div>
      </div>
      <div className="login-form" showLogin={showLogin} closeLogin={closeLogin}>
        
        {isLoginVisible && <Login onClose={closeLogin} />}
      </div>
    </div>
  );
};

export default New;
