import React from 'react';
import './About.css';
import '../../index.css';
import estyimg from '../../assets/aboutimage.jpg';

function About() {
  return (
    <div className="m-2 m-sm-5">
      <h1 className="text-center mb-4 mt-4">About Us</h1>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 text-center">
          <img src={estyimg} alt="Amazon Office" className="img-fluid mb-4" />
        </div>
        <div className="col-12 col-md-10">
          <p className="text-justify">
          Etsy is the global marketplace for unique and creative goods. It’s home to a universe of special, extraordinary items, from unique handcrafted pieces to vintage treasures.

In a time of increasing automation, it’s our mission to keep human connection at the heart of commerce. That’s why we built a place where creativity lives and thrives because it’s powered by people. We help our community of sellers turn their ideas into successful businesses. Our platform connects them with millions of buyers looking for an alternative - something special with a human touch, for those moments in life that deserve imagination.

As a company, we strive to lead with our guiding principles and to help spread ideas of sustainability and responsibility whose impact can reach far beyond our own business.          </p>
        </div>
      </div>
    </div>
  );
}

export default About;