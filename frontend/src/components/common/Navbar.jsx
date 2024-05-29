import React, { useState, useEffect } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavbarLinks } from '../../../data/navbar-links';
import WebMineLogo from '../../assets/Logo/Logo-Full-Light.png';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import MobileProfileDropDown from '../core/Auth/MobileProfileDropDown';

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const location = useLocation();

    // Function to match routes
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    // Function to control navbar visibility on scroll
    const [showNavbar, setShowNavbar] = useState('top');
    const [lastScrollY, setLastScrollY] = useState(0);
    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);

        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, []);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY) setShowNavbar('hide');
            else setShowNavbar('show');
        } else setShowNavbar('top');

        setLastScrollY(window.scrollY);
    };

    return (
        <nav className={`z-[10] flex h-14 w-full items-center justify-center border-b-[1px] border-b-richblack-700 text-white translate-y-0 transition-all ${showNavbar}`}>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between '>
                {/* Logo */}
                <Link to='/'>
                    <img src={WebMineLogo} width={105} height={42} loading='lazy' />
                </Link>

                {/* Nav Links - visible for only large devices */}
                <ul className='hidden sm:flex gap-x-6 text-richblack-25'>
                    {NavbarLinks.map((link, index) => (
                        <li key={index}>
                            {link.title === 'Scrape' && token ? (
                                <Link to={link.path}>
                                    <p className={`${matchRoute(link.path) ? 'bg-yellow-25 text-black' : 'text-richblack-25'} rounded-xl p-1 px-3 `}>
                                        {link.title}
                                    </p>
                                </Link>
                            ) : null}
                            {link.title !== 'Scrape' && (
                                <Link to={link.path}>
                                    <p className={`${matchRoute(link.path) ? 'bg-yellow-25 text-black' : 'text-richblack-25'} rounded-xl p-1 px-3 `}>
                                        {link.title}
                                    </p>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Login/SignUp/Dashboard */}
                <div className='flex gap-x-4 items-center'>
                    {token === null && (
                        <Link to='/login'>
                            <button className={` px-[12px] py-[8px] text-richblack-100 rounded-md ${matchRoute('/login') ? 'border-[2.5px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'}`}>
                                Log in
                            </button>
                        </Link>
                    )}
                    {token === null && (
                        <Link to='/signup'>
                            <button className={` px-[12px] py-[8px] text-richblack-100 rounded-md ${matchRoute('/signup') ? 'border-[2.5px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'}`}>
                                Sign Up
                            </button>
                        </Link>
                    )}

                    {/* For large devices */}
                    {token !== null && <ProfileDropDown />}

                    {/* For small devices */}
                    {token !== null && <MobileProfileDropDown />}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
