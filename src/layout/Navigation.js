import { NavLink } from "react-router-dom"


const Navigation = () => {
  return (
    <main className='main-header'>
      <nav className='main-header__nav'>
        <ul className="main-header__item-list">
          <li className='main-header__item'>
            <NavLink to='/'>Shop</NavLink>
          </li>
          <li className='main-header__item'>
            <NavLink to='/product'>Products</NavLink>
          </li>
          <li className='main-header__item'>
            <NavLink to='/cart'>Cart</NavLink>
          </li>
          <li className='main-header__item'>
            <NavLink to='/order'>Orders</NavLink>
          </li>
          <li className='main-header__item'>
            <NavLink to='/add-product'>Add product</NavLink>
          </li>
          <li className='main-header__item'>
            <NavLink to='/admin'>Admin Products</NavLink>
          </li>
        </ul>
        <ul className="main-header__item-list">
          <li className='main-header__item'>
            <NavLink to='/form/login'>Login</NavLink>
          </li>
          <li className='main-header__item'>
            <NavLink to='/form/signup'>Signup</NavLink>
          </li>
        </ul>
      </nav>
    </main>
  )
};

export default Navigation;