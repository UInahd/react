import { Link } from 'react-router-dom';

function HeaderSection() {
  return (
    <header className="header-section">
      <h1>UPMS</h1>
      <p>Manage your user profiles with ease.</p>
      <nav>
        <Link to="/">Home</Link> | <Link to="/messages">Messages</Link>
      </nav>
    </header>
  );
}

export default HeaderSection;