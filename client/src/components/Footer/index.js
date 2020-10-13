import React from "react";
import "./style.css";

function Footer() {
    return (
        <footer className="footer py-4 bg-dark text-white-50">
            <div className="container text-center">
                <div className="row footer-links">
                    <div className="col-md-12">
                        <a className="footer-link" target="_blank" rel="noopener noreferrer" href="https://github.com/CR-53">
                            <i className="fa fa-github contact-icons">
                                <span className="footer-link-text">&nbsp;GitHub</span>
                            </i>
                        </a>
                    </div>
                </div>
                <div className="row copyright-text">
                    <div className="col-md-12">
                        <p className="footer-text">Copyright &copy; Chris Roschi 2020</p>
                    </div>   
                </div>
            </div>
        </footer>
    );
  }
  
  export default Footer;

