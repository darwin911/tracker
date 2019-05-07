import React from "react";

const Footer = () => {
  return (
    <footer>

      <div className="contact-links">
        <a href="mailto:darwinpsmith@gmail.com">
          <i className="envelope" />
        </a>
        <a href="https://www.linkedin.com/in/darwinpsmith/">
          <i className="linkedin" />
        </a>
        <a href="https://github.com/darwin911">
          <i className="github" />
        </a>
      </div>

      <h6>
        &copy; <a href="mailto:darwinpsmith@gmail.com">Darwin Smith 2019</a>
      </h6>
    </footer>
  );
};

export default Footer;