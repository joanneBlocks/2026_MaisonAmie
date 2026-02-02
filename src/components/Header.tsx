import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">Maison Amie</div>
      <nav className="nav">
        <a href="#">Home</a>
        <a href="#">Members</a>
        <a href="#">About</a>
        <a href="#">Sign In</a>
      </nav>
    </header>
  );
};

export default Header;
