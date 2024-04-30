import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { navLinks } from "../utils";
import { closeSidebar } from "../features/user/userSlice";

const NavLinks = () => {
  const { user } = useSelector((store) => {
    return store.userState;
  });
  const dispatch = useDispatch();

  return (
    <>
      {navLinks.map((link) => {
        const { id, url, text } = link;
        if (!user && text === "checkout") {
          return null;
        }
        return (
          <li key={id}>
            <NavLink
              to={url}
              onClick={() => {
                dispatch(closeSidebar());
              }}
            >
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;
