import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div>
    <Link to="/">Movies</Link>
    <Link to="/about">About</Link>
  </div>
);

export default Sidebar;
