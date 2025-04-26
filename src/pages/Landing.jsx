import React from "react";
import Wallet from "./../assets/wallet.png";
import flightIcon from "./../assets/flight.png";
import homeIcon from "./../assets/home.png";
import dineIcon from "./../assets/dine.png";
import tripIcon from "./../assets/trip.png";
import moneyIcon from "./../assets/money.png";
import { Link } from "react-router-dom";

function LandingPage (props) {
  return (
    <div className={`w-full h-screen flex flex-col pt-20 md:flex-row-reverse md:p-24 ${props.theme}`}>
      <div className="w-fit m-auto bg-transparent">
        <img className="size-72 md:size-80 lg:size-96 bg-transparent" src={Wallet} alt="heroImage" />
      </div>
      <div className="flex flex-col pl-1 gap-3 m-auto bg-transparent">
        <div className={`text-2xl lg:text-3xl ${props.theme==="bg-black"?"text-white":"text-black"} w-72 font-semibold bg-transparent`}>
          <h1 className="bg-transparent">Stress free expense splitting, at your fingertips.</h1>
        </div>
        <div className="flex gap-1 w-72 bg-transparent">
          <img className={`size-10 md:size-100 ${props.theme==="bg-black"?"invert-0":"invert"}`} src={flightIcon} alt="heroImage" />
          <img className={`size-10 md:size-100 ${props.theme==="bg-black"?"invert-0":"invert"}`} src={dineIcon} alt="heroImage" />
          <img className={`size-10 md:size-100 ${props.theme==="bg-black"?"invert-0":"invert"}`} src={tripIcon} alt="heroImage" />
          <img className={`size-10 md:size-100 ${props.theme==="bg-black"?"invert-0":"invert"}`} src={moneyIcon} alt="heroImage" />
          <img className={`size-10 md:size-100 ${props.theme==="bg-black"?"invert-0":"invert"}`} src={homeIcon} alt="heroImage" />
        </div>
        <div className="text-lg text-white w-72 font-light bg-transparent">
          <h1 className={`bg-transparent ${props.theme==="bg-black"?"text-white":"text-black"}`} style={{fontFamily: "Readex Pro", fontWeight: "300"}}>Keep track of your shared expenses and balances with housemates, trips, groups, friends and family.</h1>
        </div>
        <div className="w-72 lg:mt-2 flex items-start bg-transparent">
        <Link to='/signup'>
          <button className={`transition active:scale-95 ease-in-out hover:scale-105 w-fit px-2 h-10 ${props.theme==="bg-black"?"text-black":"text-white"} ${props.theme==="bg-black"?"bg-white":"bg-black"} rounded-xl font-semibold`}>
            Get Started
          </button>
        </Link>
      </div>
      </div>
    </div>
  );
}

export default LandingPage;