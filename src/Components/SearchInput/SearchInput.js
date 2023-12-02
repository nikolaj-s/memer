import React from 'react'

import "./SearchInput.css";

export const SearchInput = () => {

    const [value, inputValue] = React.useState("");

    const search = () => {
        if (value.length === 0) return;

        let new_url = window.location.protocol + '//' + window.location.host + `/${value}`;

        window.location.href = new_url;
    }

    const onKeyCode = (e) => {

        if (e.keyCode === 13) {
            search();
        }
    
    }

    return (
        <div className='search-input-container'>
            <input onKeyUp={onKeyCode} value={value} onChange={(e) => {inputValue(e.target.value)}} placeholder='Search' type='text' />
            <svg onClick={search} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.125 13.125L10.4106 10.4106M10.4106 10.4106C10.8749 9.94633 11.2432 9.39512 11.4945 8.78847C11.7458 8.18183 11.8751 7.53163 11.8751 6.87501C11.8751 6.21838 11.7458 5.56818 11.4945 4.96154C11.2432 4.3549 10.8749 3.80369 10.4106 3.33938C9.94633 2.87508 9.39512 2.50677 8.78847 2.25549C8.18183 2.00421 7.53163 1.87488 6.87501 1.87488C6.21838 1.87488 5.56818 2.00421 4.96154 2.25549C4.3549 2.50677 3.80369 2.87508 3.33938 3.33938C2.40168 4.27709 1.87488 5.54889 1.87488 6.87501C1.87488 8.20112 2.40168 9.47292 3.33938 10.4106C4.27709 11.3483 5.54889 11.8751 6.87501 11.8751C8.20112 11.8751 9.47292 11.3483 10.4106 10.4106Z" stroke="#F8F8F8" strokeOpacity="0.44" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

        </div>
    )
}
