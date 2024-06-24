import { Link } from "react-router-dom";
import Jumbotron from "../Fragments/Jumbotron";
import { Button } from "../ui/button";
import LandingNav from "../ui/landingNav";
import Footer from "../Fragments/Footer";
import ProductSection from "../Layouts/ProductSection";
import AboutUs from "../Layouts/AboutUs";

const LandingPage = () => {
  return (
    <>
      <LandingNav></LandingNav>
      <Jumbotron></Jumbotron>
      <AboutUs></AboutUs>
      <ProductSection></ProductSection>
      <Footer></Footer>
    </>
  );
};
export default LandingPage;
