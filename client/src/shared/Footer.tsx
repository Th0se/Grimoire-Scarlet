/** @format */

import React from 'react';

const Footer: React.FunctionComponent = () => {
    return (
        <footer className='footer bg-base-300 p-4'>
            <nav>
                <p className='font-bold'>Contact</p>
                <a
                    href='https://github.com/Th0se'
                    className='link link-hover'
                >
                    Github
                </a>
                <a
                    href='mailto:thomasap1464@gmail.com'
                    className='link link-hover'
                >
                    thomasap1464@gmail.com
                </a>
            </nav>{' '}
            <p>Made by Thomas Praselino (2024)</p>
        </footer>
    );
};

export default Footer;
