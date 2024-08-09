import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="mb-4 text-sm text-gray-500">
      <Link to="/" className="hover:text-gray-700">
        Home
      </Link>
      {pathnames.map((name, index) => {
        const last = index === pathnames.length - 1;
        const href = `/${pathnames.slice(0, index + 1).join("/")}`;

        return (
          <React.Fragment key={href}>
            {!last && (
              <>
                <FaChevronRight className="inline mx-2 text-xs" />
                <Link to={href} className="hover:text-gray-700">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Link>
              </>
            )}
            {last && (
              <>
                <FaChevronRight className="inline mx-2 text-xs" />
                <span className="text-gray-700">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </span>
              </>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
