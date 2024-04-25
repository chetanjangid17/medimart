import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";


const Navbar = () => {
    // get user from localStorage 
    const user = JSON.parse(localStorage.getItem('users'));

    // navigate 
    const navigate = useNavigate();
    

    // logout function 
    const logout = () => {
        localStorage.clear('users');
        navigate("/login")
    }

    // CartItems
    const cartItems = useSelector((state) => state.cart);

    // navList Data
    const navList = (
        <ul className="flex  md:space-x-4 text-white font-medium text-md px-5 ">
            {/* Home */}
            <li className="  hover:bg-purple-300 btn btn-ghost ">
                <Link to={'/'}>Home</Link>
            </li>

            {/* All Product */}
            <li className="  hover:bg-purple-300  btn btn-ghost ">
                <Link to={'/allproduct'}>All Product</Link>
            </li>

            {/* Signup */}
            {!user ? <li className="  hover:bg-purple-300 btn btn-ghost ">
                <Link to={'/signup'}>Signup</Link>
            </li> : ""}

            {/* Signup */}
            {!user ? <li className="  hover:bg-purple-300  btn btn-ghost ">
                <Link to={'/login'}>Login</Link>
            </li> : ""}

            {/* User */}
            {user?.role === "user" && <li className="  capitalize hover:bg-purple-300 btn btn-ghost ">
                <Link to={'/user-dashboard'}>{user.name}</Link>
            </li>}

            {/* Admin */}
            {user?.role === "admin" && <li className="  hover:bg-purple-300  btn btn-ghost ">
                <Link to={'/admin-dashboard'}>Admin</Link>
            </li>}

            {/* logout */}
            {user && <li className="  hover:bg-purple-300  cursor-pointer btn btn-ghost " onClick={logout}>
                Logout
            </li>}

            {/* Cart */}
            <li>
                <Link to={'/cart'}>
                <div tabIndex={0} role="button" className="  hover:bg-purple-300 btn btn-ghost ">
        <div className="flex-none">
    <div className="dropdown dropdown-end">
      
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge badge-sm indicator-item">{cartItems.length}</span>
        </div>
    
      </div>
      </div>
      </div>

    
                </Link>
            </li>
        </ul>
    )
    return (
        <nav className="bg-gray-900 sticky  top-0 ">
            {/* main  */}
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
                {/* left  */}
                <div className="left py-3 lg:py-0">
                    <Link to={'/'}>
                        <h2 className=" font-bold text-white text-2xl text-center  ">MeDiMart</h2>
                    </Link>
                    
                </div>

                {/* right  */}
                <div className="right flex justify-center mb-4 lg:mb-0">
                    {navList}
                </div>

                {/* Search Bar  */}
                <SearchBar />
            </div>
        </nav>
    );
}

export default Navbar;
