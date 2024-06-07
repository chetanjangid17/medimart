import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import {
  CircleUserRoundIcon,
  Heart,
  HomeIcon,
  LogOutIcon,
  PackageSearch,
  User,
} from "lucide-react";

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
  const wishlistItems = useSelector((state) => state.wishlist);

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
      {user?.role !== "admin" && (
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

      )}

      {/* Wishlist */}
      <li>
        <Link to={"/wishlist"}>
          <div
            tabIndex={0}
            role="button"
            className="  hover:bg-purple-300 btn btn-ghost "
          >
            <div className="flex-none">
              <div className="dropdown dropdown-end">
                <div className="indicator">
                  <svg
                    fill="white"
                    className="h-5 w-5"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 471.701 471.701"
                    xml:space="preserve"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1 c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3 l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4 C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3 s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4 c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3 C444.801,187.101,434.001,213.101,414.401,232.701z"></path>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {wishlistItems.length}
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
    <nav className="bg-gradient-to-l from-pink-200 to-[#3B4A61] sticky top-0 px-1 pt-3 pb-4">
      {/* main */}
      <div className="flex ml-auto mr-auto">
        <button
          type="button"
          className="rounded-md bg-white p-2 h-8 mt-3 text-gray-400 lg:hidden"
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
          <div className="flex justify-center mt-1 items-center">
            <h1 className="text-4xl font-bold text-white px-2 py-1 rounded lg:hidden">
              MeDiMart
            </h1>
          </div>
        </Link>
        <div className="lg:hidden pb-2 mt-1">
          <SearchBar />
        </div>
      </div>
      <div className="lg:flex lg:justify-between items-center lg:px-3">
        <div className="ml-4 flex lg:ml-0">
          <Link to={"/"} className="flex">
            <div className="flex">
              <h1 className="sm:text-3xl font-bold text-[#ED6653] px-2 py-1 rounded hidden lg:block">
                MeDiMart
              </h1>
            </div>
          </Link>
        </div>
        {/* left */}

        {/* right */}
        <div className="ml-auto flex items-center">
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
            <div className="right flex justify-center mb-4 lg:mb-0">
              {navList}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:block mb-1">
          <SearchBar />
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
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
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-gradient-to-l from-pink-200 to-[#3B4A61] pb-12 shadow-xl">
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

                <div className="space-y-6 border-gray-200 px-4 py-6">
                  <ul className="flex-col flex text-white font-medium text-md px-5">
                    <Link to={"/"} className="">
                      <div className="flex justify-center items-center">
                        <h1 className="text-2xl font-bold text-white px-2 py-1 rounded">
                          MeDiMart
                        </h1>
                      </div>
                    </Link>
                    {/* Home */}
                    <li className="hover:bg-purple-300 btn btn-ghost text-white">
                      <Link to={"/"}>Home</Link>
                    </li>

                    {/* All Product */}
                    <li className="hover:bg-purple-300 btn btn-ghost text-white">
                      <Link to={"/allproduct"}>All product</Link>
                    </li>

                    {/* Signup */}
                    {!user ? (
                      <li className="hover:bg-purple-300 btn btn-ghost text-white">
                        <Link to={"/signup"}>Signup</Link>
                      </li>
                    ) : (
                      ""
                    )}

                    {/* Signup */}
                    {!user ? (
                      <li className="hover:bg-purple-300 btn btn-ghost text-white">
                        <Link to={"/login"}>Login</Link>
                      </li>
                    ) : (
                      ""
                    )}

                    {/* User */}
                    {user?.role === "user" && (
                      <li className="capitalize hover:bg-purple-300 btn btn-ghost text-white">
                        <Link to={"/user-dashboard"}>{user.name}</Link>
                      </li>
                    )}

                    {/* Admin */}
                    {user?.role === "admin" && (
                      <li className="hover:bg-purple-300 btn btn-ghost text-white">
                        <Link to={"/admin-dashboard"}>Admin</Link>
                      </li>
                    )}

                    {/* logout */}
                    {user && (
                      <li
                        className="hover:bg-purple-300 cursor-pointer btn btn-ghost text-white"
                        onClick={logout}
                      >
                        Logout
                      </li>
                    )}

                    {/* Cart */}
                    {user?.role !== "admin" && (

                    <li>
                      <Link
                        to={"/cart"}
                        className="flex justify-center items-center"
                      >
                        <div
                          tabIndex={0}
                          role="button"
                          className="hover:bg-purple-300 btn btn-ghost text-white"
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
                    )
                      
                    }

                    {/* Wishlist */}
                    <li>
                      <Link to={"/wishlist"} className="flex justify-center items-center">
                      
                        <div
                          tabIndex={0}
                          role="button"
                          className="  hover:bg-purple-300 btn btn-ghost "
                        >
                          <div className="flex-none">
                            <div className="dropdown dropdown-end">
                              <div className="indicator">
                                <svg
                                  fill="white"
                                  className="h-5 w-5"
                                  version="1.1"
                                  id="Capa_1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                  viewBox="0 0 471.701 471.701"
                                  xml:space="preserve"
                                >
                                  <g
                                    id="SVGRepo_bgCarrier"
                                    stroke-width="0"
                                  ></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <g>
                                      {" "}
                                      <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1 c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3 l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4 C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3 s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4 c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3 C444.801,187.101,434.001,213.101,414.401,232.701z"></path>{" "}
                                    </g>{" "}
                                  </g>
                                </svg>
                                <span className="badge badge-sm indicator-item">
                                  {wishlistItems.length}
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
