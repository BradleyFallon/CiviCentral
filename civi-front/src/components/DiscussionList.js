import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DiscussionList = () => {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:8000/api/discussions/');
      setDiscussions(result.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Discussions</h2>
      <ul>
        {discussions.map((discussion) => (
          <li key={discussion.id}>
            <Link to={`/discussion/${discussion.id}`}>{discussion.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiscussionList;
