import React from 'react'
import { BsSortAlphaDown, BsSortAlphaDownAlt } from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa'

const Filters = ({ handleSearch, handleSort}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
        <button onClick={handleSort} value='aToZ' style={{ backgroundColor: '#e5f2eb', color: 'black', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <BsSortAlphaDown size='25px' />
        </button>
        <button onClick={handleSort} value='zToA' style={{ backgroundColor: '#e5f2eb', color: 'black', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <BsSortAlphaDownAlt size='25px' />
        </button>
        <div className="search">
        <input type="text" placeholder="Search" onChange={handleSearch} />
        <button>
            <FaSearch />
        </button>
        </div>
    </div>
  )
}

export default Filters