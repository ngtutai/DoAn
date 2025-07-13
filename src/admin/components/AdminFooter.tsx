import React from "react";

export default function AdminFooter() {
  return (
    <footer className="bg-primary bg-opacity-10 p-3 border-top">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-muted">
              &copy; {new Date().getFullYear()} Admin Dashboard. All rights
              reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a href="#" className="text-muted">
                  About
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-muted">
                  Privacy Policy
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-muted">
                  Terms
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-muted">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
