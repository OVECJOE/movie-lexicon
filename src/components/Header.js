import React from 'react';
import logo from '../images/logo.png';

export default function Header(props) {
    return (
        <header>
            <nav className='navbar'>
                <div className='nav-logo'>
                    <img src={logo} alt="Movie Lookup Logo" />
                    <h2>Movie Lexicon</h2>
                </div>
                <button type='button'
                    className='lookup-btn'
                    onClick={props.lookupView}
                >
                    {props.lookupActive ?
                        'Home' :
                        'Lookup Movie(s) Info'}
                </button>
            </nav>
        </header>
    )
}