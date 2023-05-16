import { NavLink, useNavigate } from "react-router-dom";
import { context } from "../store/store";
import { useContext } from "react";
import { url } from "../App";
import refreshToken from "../util/refreshToken";

const Navigation = () => {
  const { user, setUser } = useContext(context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      const res = await fetch(`${url}logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.refreshToken}`,
        },
      });
      const data = await res.json();
      if(data.message !== 'ok') {
        console.log('ok');
        await refreshToken(user, setUser);
      }
      if (data.message === 'ok') {
        localStorage.removeItem('userCurrent');
        setUser(null);
        navigate('/form/login')
      }
    }catch(err) {
      console.log(err);
    }
  };

  return (
    <main className="main-header">
      <nav className="main-header__nav">
        <ul className="main-header__item-list">
          <li className="main-header__item">
            <NavLink to="/">Shop</NavLink>
          </li>
          <li className="main-header__item">
            <NavLink to="/product">Products</NavLink>
          </li>
          {user && (
            <>
              <li className="main-header__item">
                <NavLink to="/cart">Cart</NavLink>
              </li>
              <li className="main-header__item">
                <NavLink to="/order">Orders</NavLink>
              </li>
              <li className="main-header__item">
                <NavLink to="/add-product">Add product</NavLink>
              </li>
              <li className="main-header__item">
                <NavLink to="/admin">Admin Products</NavLink>
              </li>
            </>
          )}
        </ul>
        {user ? (
          <div className="user-info">
            <div className="user-info_item">{user.email}</div>
            <div className="user-info_item" onClick={handleLogout}>
              Logout
            </div>
          </div>
        ) : (
          <ul className="main-header__item-list">
            <li className="main-header__item">
              <NavLink to="/form/login">Login</NavLink>
            </li>
            <li className="main-header__item">
              <NavLink to="/form/signup">Signup</NavLink>
            </li>
          </ul>
        )}
      </nav>
    </main>
  );
};

export default Navigation;
