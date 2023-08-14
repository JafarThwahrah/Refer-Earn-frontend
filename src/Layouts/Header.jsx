const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-primary bg-gradient ">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/">
            Home
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link text-white"
                  aria-current="page"
                  href="/dashboard"
                >
                  Dashboard
                </a>
              </li>
            </ul>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end w-100">
              <li className="nav-item">
                <a
                  className="nav-link text-white"
                  aria-current="page"
                  href="login"
                >
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white"
                  aria-current="page"
                  href="/profile"
                >
                  Profile
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
