import { AiFillCheckSquare } from 'react-icons/ai';
import Header from '../components/Header';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Autoplay,Pagination }  from "swiper";
import Image from 'next/image';
import Image2 from '../public/images/Image2.jpeg'
import Image5 from '../public/images/Image5.jpeg'
import Image6 from '../public/images/Image6.jpeg'
import Image7 from '../public/images/Image7.jpeg'
import Image8 from '../public/images/Image8.jpeg'
import { useRef, useState } from 'react';

const LegalNotice = () => {
    const [emailInput, setEmailInput] = useState(false);
    const [success, setSuccess] = useState(false);
    const inputRef = useRef();

    const handleSubmitEmail = (e) => {
        e.preventDefault();
        if(!inputRef.current.value) return false;
        setSuccess(true)
    }



    SwiperCore.use([Autoplay])
    return (
        <div className="legalnotice">


            {/* NAVIGATION */}
            <Header/>



            {/* MAIN BODY */}
            <div className="main-body">

                {/* Left */}
                <div className="left">
                    <h1 style={{fontSize: "5rem", marginBottom: "5rem"}}>Règle du jeu</h1>
                    <p>Un infuseur à thé. </p>
                    <p>Une boite de 100g d’un thé détox ou d’infusion</p> 
                    <p>Une boite de 100g d’un thé signature</p>  
                    <p>Un coffret découverte d’une valeur de 39€ </p>
                    <p>Un coffret découverte d’une valeur de 69€</p>
                    <p>Une chance de gagné un an de thé d’une valeur de 360€ vers la fin du concours.</p>
                    <div className="check">
                        <h3>Les étapes pour participer </h3>
                        <div className='check-item'>
                            <AiFillCheckSquare className='ai'/>
                            <p>S’inscrire / Se connecter.</p>
                        </div>
                        <div className='check-item'>
                            <AiFillCheckSquare className='ai'/>
                            <p>Entrer le numéro de ticket a 10 chiffres une fois. </p>
                        </div>
                        <div className='check-item'>
                            <AiFillCheckSquare className='ai'/>
                            <p>Jouer et recevoir un gain. </p>
                        </div>
                        <div className='check-item'>
                            <AiFillCheckSquare className='ai'/>
                            <p>Récupérer du magasin en fournissant la pièce d’identité entrant lors de l’inscription.</p>
                        </div>
                    </div>
                    <div className='legalnotice-btn'>
                        <button className='legalnotice-btn'>Participer</button>
                    </div>
                </div>

                {/* Right */}
                <div className="right">
                    <div className="image">
                        <img src="joy.jpg"/>
                    </div>
                </div>

            </div>



            {/* Slider Section */}
            <div className='slider-section'>
                <h1>Les Gains</h1>
                <Swiper
                  breakpoints={{
                    // when window width is >= 640px
                    640: {
                     
                      slidesPerView: 1,
                    },
                    // when window width is >= 768px
                    768: {
                    
                      slidesPerView: 2,
                    },
                    // when window width is >= 768px
                    1200: {
                        slidesPerView: 3
                    }
                  }}
                    pagination={{
                    dynamicBullets: true,
                    }}
                    
                    autoplay={true}
                    loop={true}
                    modules={[Pagination]}
                    className="mySwiper"
                    style={{width: "80%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2rem"}}
                >
                    <SwiperSlide >
                        <div style={{backgroundColor: "#4a4d50", height: "35rem", width: "35rem", borderRadius: "50%" ,margin:"0 auto",display:"flex",justifyContent:"center",alignItems:"center", position: 'relative', overflow: 'hidden'}}>
                        <Image src={Image5} alt='Image' width={300} height={400} style={{ position: 'absolute', backgroundSize: 'cover'}} />
                        <p style={{color:"#fff",padding:"10px"}}>
                        un infuseur à thé  
                        </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div style={{backgroundColor: "#4a4d50", height: "35rem", width: "35rem", borderRadius: "50%",margin:"0 auto",display:"flex",justifyContent:"center",alignItems:"center", position: 'relative', overflow: 'hidden'}}>
                        <Image src={Image6} alt='Image' width={300} height={400} style={{ position: 'absolute', backgroundSize: 'cover'}} />

                            <p style={{color:"#fff",padding:"10px"}}>
                            une boite de 100g d’un thé détox ou d’infusion
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div style={{backgroundColor: "#4a4d50", height: "35rem", width: "35rem", borderRadius: "50%",margin:"0 auto",display:"flex",justifyContent:"center",alignItems:"center", position: 'relative', overflow: 'hidden'}}>
                        <Image src={Image7} alt='Image' width={300} height={400} style={{ position: 'absolute', backgroundSize: 'cover'}} />

                            <p style={{color:"#fff",padding:"10px"}}>
                            une boite de 100g d’un thé signature
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div style={{backgroundColor: "#4a4d50", height: "35rem", width: "35rem", borderRadius: "50%",margin:"0 auto",display:"flex",justifyContent:"center",alignItems:"center", position: 'relative', overflow: 'hidden',}}>
                        <Image src={Image8} alt='Image' width={400} height={400} style={{ position: 'absolute', backgroundSize: 'cover'}} />

                            <p style={{color:"#fff",padding:"10px"}}>
                            un coffret découverte d’une valeur de 39€
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div style={{backgroundColor: "#4a4d50", height: "35rem", width: "35rem", borderRadius: "50%",margin:"0 auto",display:"flex",justifyContent:"center",alignItems:"center", position: 'relative', overflow: 'hidden'}}>
                        <Image src={Image2} alt='Image' width={300} height={400} style={{ position: 'absolute', backgroundSize: 'cover'}} />

                            <p style={{color:"#fff",padding:"10px"}}>
                            un coffret découverte d’une valeur de 69€
                            </p>
                        </div>
                    </SwiperSlide>
                 
                </Swiper>
                <div className='grand-prix'>
                    <h1>grand prix</h1>
                    <p>Après la fin du concours un de nos chers clients gagnera un an de thé d’une valeur de 360 €.</p>
                </div>
                <p className='newsletter-p'>inscrivez vouz a notre newsletter <br/> pour rester informer a notre prochains jeux</p>
                {!emailInput && <button onClick={() => setEmailInput(true)} className='newsletter-button'>S’inscrire</button>}
                {emailInput && <div style={{ marginBottom: '20px'}} className="container">
                         <div id="mc_embed_signup">
              {success && <h3 style={{ color: '#008039'}} className="tst">Email submitted successfully</h3>}
              {!success && <form
                // action="https://gmail.us11.list-manage.com/subscribe/post?u=17eb0fc9f60a035f869b0fafd&amp;id=5805488496&amp;f_id=00b18de0f0"
                // method="post"
                onSubmit={handleSubmitEmail}
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                className="validate"
                target="_blank"
                noValidate
              >
                <div id="mc_embed_signup_scroll">
                  <div id="mce-responses" className="clear foot">
                    <div
                      className="response"
                      id="mce-error-response"
                      // style={{display: none}}
                    ></div>
                    <div
                      className="response"
                      id="mce-success-response"
                      // style={{display: none}}
                    ></div>
                  </div>
                  <div className="signup">
                    <div className="mc-field-group">
                      <input
                        style={{ border: '1px solid #88ff55', borderRight: 0}}
                        ref={inputRef}
                        type="email"
                        name="EMAIL"
                        placeholder="Email"
                        className="required email"
                        id="mce-EMAIL"
                        required
                      />
                      <span
                        id="mce-EMAIL-HELPERTEXT"
                        className="helper_text"
                      ></span>
                    </div>
                    <div className="optionalParent">
                      <div className="clear foot">
                        <button
                          type="submit"
                          value="Subscribe"
                          name="subscribe"
                          id="mc-embedded-subscribe"
                          className="button"
                        >
                           S’inscrire 
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
                  <div
                    style={{ position: "absolute", left: "-5000px" }}
                    aria-hidden="true"
                  >
                    <input
                      type="text"
                      name="b_17eb0fc9f60a035f869b0fafd_5805488496"
                      tabIndex="-1"
                    />
                  </div>
                </div>
              </form>}
                        </div>
            {/* <script
              type="text/javascript"
              src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
            ></script> */}
            {/* <script type="text/javascript">
          (function ($) {
            window.fnames = new Array();
            window.ftypes = new Array();
            fnames[0] = "EMAIL";
            ftypes[0] = "email";
            fnames[1] = "FNAME";
            ftypes[1] = "text";
            fnames[2] = "LNAME";
            ftypes[2] = "text";
            fnames[3] = "ADDRESS";
            ftypes[3] = "address";
            fnames[4] = "PHONE";
            ftypes[4] = "phone";
            fnames[5] = "BIRTHDAY";
            ftypes[5] = "birthday";
          })(jQuery);
          var $mcj = jQuery.noConflict(true);
        </script> */}
            {/* End mc_embed_signup */}

            <div className="other-info"></div>
                </div>}
            </div>
        </div>
    );
}

export default LegalNotice;