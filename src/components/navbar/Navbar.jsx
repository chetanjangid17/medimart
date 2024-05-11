import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import { CircleUserRoundIcon, HomeIcon ,LogOutIcon,PackageSearch, User} from "lucide-react";

const Navbar = () => {
  // get user from localStorage
  const user = JSON.parse(localStorage.getItem("users"));

  // navigate
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // logout function
  const logout = () => {
    localStorage.clear("users");
    navigate("/login");
  };

  // CartItems
  const cartItems = useSelector((state) => state.cart);

  // navList Data
  const navList = (
    <ul className="flex  md:space-x-4 text-white font-medium text-md px-10 ">
      {/* Home */}
      <li className="  hover:bg-purple-300 btn btn-ghost ">
        <Link to={"/"}>Home</Link>
      </li>

      {/* All Product */}
      <li className="  hover:bg-purple-300  btn btn-ghost ">
        <Link to={"/allproduct"}>All Product</Link>
      </li>

      {/* Signup */}
      {!user ? (
        <li className="  hover:bg-purple-300 btn btn-ghost ">
          <Link to={"/signup"}>Signup</Link>
        </li>
      ) : (
        ""
      )}

      {/* Signup */}
      {!user ? (
        <li className="  hover:bg-purple-300  btn btn-ghost ">
          <Link to={"/login"}>Login</Link>
        </li>
      ) : (
        ""
      )}

      {/* User */}
      {user?.role === "user" && (
        <li className="  capitalize hover:bg-purple-300 btn btn-ghost ">
          <Link to={"/user-dashboard"}>{user.name}</Link>
        </li>
      )}

      {/* Admin */}
      {user?.role === "admin" && (
        <li className="  hover:bg-purple-300  btn btn-ghost ">
          <Link to={"/admin-dashboard"}>Admin</Link>
        </li>
      )}

      {/* logout */}
      {user && (
        <li
          className="  hover:bg-purple-300  cursor-pointer btn btn-ghost "
          onClick={logout}
        >
          Logout
        </li>
      )}

      {/* Cart */}
      
        <li>
          <Link to={"/cart"}>
            <div
              tabIndex={0}
              role="button"
              className="  hover:bg-purple-300 btn btn-ghost "
            >
              <div className="flex-none">
                <div className="dropdown dropdown-end">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        strokeWidth="2"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item">
                      {cartItems.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>
   
    </ul>
    
  );
  return (
    <nav className="bg-[#091434] sticky top-0 ">
     
      {/* main  */}

      <div className="flex ml-auto  mr-auto">
        <button
          type="button"
          className="rounded-md bg-white p-2 h-8 mt-7 text-gray-400 lg:hidden"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <Link to={"/"} className="">
          <div className="flex justify-center mt-5 items-center">
            <h1 className=" text-4xl font-bold text-white  px-2 py-1 rounded lg:hidden">
              MeDiMart
            </h1>
          </div>
        </Link>
        <div className="lg:hidden mt-5">

        <SearchBar />
        </div>
      </div>
      <div className="lg:flex lg:justify-between items-center  py-3 lg:px-3 ">
        <div className="ml-4 flex lg:ml-0">
          <Link to={"/"} className="flex">
            <div className="flex ">
              <h1 className=" sm:text-3xl font-bold text-white   px-2 py-1 rounded  hidden lg:block ">
                MeDiMart
              </h1>
            </div>
          </Link>
        </div>
        {/* left  */}

        {/* right  */}
        <div className="ml-auto flex items-center">
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
            <div className="right flex justify-center mb-4 lg:mb-0">
              {navList}
            </div>
          </div>
        </div>

        {/* Search Bar  */}
        <div className="hidden lg:block">

        <SearchBar />
        </div>
      </div>
       <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40  lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-gray-900 pb-12 shadow-xl">
                <div className="flex justify-end items-start absolute top-0 right-0">
                  <button
                    type="button"
                    className=""
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>

                <div className="space-y-6 border-gray-200 px-4 py-6 ">
                  <ul className="flex-col flex  text-white font-medium text-md px-5  ">
                    <Link to={"/"} className="">
                      <div className="flex justify-center items-center">
                        <h1 className=" text-2xl font-bold text-white  px-2 py-1 rounded">
                          MeDiMart
                        </h1>
                      </div>
                    </Link>
                    {/* Home */}
                    <li className="  hover:bg-purple-300 btn btn-ghost  text-white">
                      <Link to={"/"}>Home</Link>
                    </li>

                    {/* All Product */}
                    <li className="  hover:bg-purple-300  btn btn-ghost text-white">
                      <Link to={"/allproduct"}>All product</Link>
                    </li>

                    {/* Signup */}
                    {!user ? (
                      <li className="  hover:bg-purple-300 btn btn-ghost text-white">
                        <Link to={"/signup"}>Signup</Link>
                      </li>
                    ) : (
                      ""
                    )}

                    {/* Signup */}
                    {!user ? (
                      <li className="  hover:bg-purple-300  btn btn-ghost text-white ">
                        <Link to={"/login"}>Login</Link>
                      </li>
                    ) : (
                      ""
                    )}

                    {/* User */}
                    {user?.role === "user" && (
                      <li className="  capitalize hover:bg-purple-300 btn btn-ghost text-white">
                        <Link to={"/user-dashboard"}>{user.name}</Link>
                      </li>
                    )}

                    {/* Admin */}
                    {user?.role === "admin" && (
                      <li className="  hover:bg-purple-300  btn btn-ghost text-white ">
                        <Link to={"/admin-dashboard"}>Admin</Link>
                      </li>
                    )}

                    {/* logout */}
                    {user && (
                      <li
                        className="  hover:bg-purple-300  cursor-pointer btn btn-ghost text-white "
                        onClick={logout}
                      >
                        Logout
                      </li>
                    )}

                    {/* Cart */}
                   
                      <li>
                        <Link to={"/cart"} className=" flex justify-center items-center">
                          <div
                            tabIndex={0}
                            role="button"
                            className="  hover:bg-purple-300 btn btn-ghost text-white"
                          >
                            <div className="flex-none">
                              <div className="dropdown dropdown-end">
                                <div className="indicator">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                      strokeWidth="2"
                                    />
                                  </svg>
                                  <span className="badge badge-sm indicator-item">
                                    {cartItems.length}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                   
                  </ul>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </nav>
  );
};

export default Navbar;
