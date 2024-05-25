import React from 'react';
import './New.css';
import '../Login/Login.css'
import Item from '../Item/Item.jsx';
import new_videos from '../Assets/newbooks.js'
import Login from '../Login/Login.jsx';
const New = () => {
    // const [newVideos, setNewVideos] = useState([]);


    return (
        <div>
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
                    />
                ))}
            </div>
            </div>
            <div className="login-form">
                <Login></Login>
            </div>
        </div></div>



    );
};

export default New;