import Link from 'next/link'
import React from 'react'
import { BsInstagram, BsFacebook } from  'react-icons/bs'
const Footer = () => {
  return (
    <footer style={{ background: '#008039', padding: '2rem', color: 'white', display: 'flex', flexDirection: 'column', gap: '2rem'}}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)'}}>
        <div>
          <p className='footerTitle'>Liens</p>
          <p style={{ fontSize: '20px'}}>
          <Link style={{ color: '#fff'}} href='/'>Accueil</Link>
          </p>
          <p style={{ fontSize: '20px'}}>
            <Link style={{ color: '#fff'}} href='/legalnotice'>Règle du jeu</Link>
          </p>
        </div>
        <div>
          <div>
            <p className='footerTitle'>Nous Contactez</p>
            <Link style={{ color: '#fff'}} href='tel:+2120671050786'>(+212) 0671050786</Link>
            <div className='socials'>
              <Link style={{ color: '#fff'}} href='https://www.facebook.com/people/Th%C3%A9tiptop/100088238727194/'>
                <BsFacebook size='20px' />
              </Link>
              <Link style={{ color: '#fff'}} href='https://www.instagram.com/thetiptop.store/'>
                <BsInstagram size='20px' />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='footerBottom' style={{ padding: '2rem 0 0', borderTop: '1px solid white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <p className='footerText'>Projet étudiant ief2i digital school </p>
      <p className='footerText'>Mention légal @2022 </p>
      </div>
    </footer>
  )
}

export default Footer