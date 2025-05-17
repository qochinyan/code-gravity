import AnimatedBlock from "../AnimatedBlock/AnimatedBlock";
import CustomBox from "../CustomBox/CustomBox";
import "./Footer.scss";
import linkedIn from "../../assets/linkedin.svg";
import facebook from "../../assets/facebook.svg";

const servicesForContact = [
  { name: "OTHER", active: true },
  { name: "CUSTOM AI-DEVELOPMENT", active: false },
  { name: "MARKETING AUTOMATION", active: false },
  { name: "MOBILE APP DEVELOPMENT", active: false },
  { name: "CUSTOM AI-DEVELOPMENT", active: false },
  { name: "ACCESSIBILITY COMPLIANCE", active: false },
  { name: "CUSTOM MARKETING WEBSITES", active: false },
  { name: "WEB APPLICATION DEVELOPMENT", active: false },
  { name: "SERVER DEVELOPMENT & OPTIMIZATION", active: false },
  { name: "BLOCKCHAIN & DECENTRALIZED APPS", active: false },
  { name: "QUALITY ASSURANCE & TDD", active: false },
  { name: "A/B TESTING", active: false },
  { name: "E-COMMERCE SOLUTIONS", active: false },
];

const servicesForView = [
  "SERVER DEVELOPMENT & OPTIMIZATION",
  "BLOCKCHAIN & DECENTRALIZED APPS",
  "WEB APPLICATION DEVELOPMENT",
  "E-COMMERCE SOLUTIONS",
  "CUSTOM AI-DEVELOPMENT",
  "MOBILE APP DEVELOPMENT",
  "ACCESSIBILITY COMPLIANCE",
  "CUSTOM MARKETING WEBSITES",
  "MARKETING AUTOMATION",
  "QUALITY ASSURANCE & TDD",
  "CLOUD ARCHITECTURE",
  "A/B TESTING",
];

const techsLeft = [
  "MEDUSA COMMERCE",
  "POSTGRE SQL",
  "KUBERNETES",
  "CASSANDRA",
  "MONGO DB",
  "SHOPIFY",
  "VITESS",
  "MY SQL",
  "REDIS",
];
const techsRight = [
  "PAYLOAD CMS",
  "WORDPRESS",
  "TYPESCRIPT",
  "JAVASCRIPT",
  "HEADLESS",
  "NODE.JS",
  "REACT.JS",
  "NEXT.JS",
  "JAVA",
];
export default function Footer() {
  return (
    <div className="footer__container">
      <CustomBox customClass="footer-top">
        <div className="footer-top__heading">
          <span className="heading__first-part">innovate</span>
          <span className="cube-devider"></span>
          <span className="heading__second-part">code</span>
          <span className="cube-devider"></span>
          <span className="heading__third-part">deploy</span>
        </div>
        <div className="services__container">
          <span className="services__description">What we can do for you?</span>
          <div className="services__content">
            {servicesForContact.map((service, index) => {
              return (
                <CustomBox
                  key={service.name + index}
                  customClass={`service__box ${service.active && "service__box--active"}`}
                >
                  {service.name}
                </CustomBox>
              );
            })}
          </div>
        </div>
        <div className="footer-form__container">
          <form action="#" className="footer-form">
            <div className="information-inputs">
              <input type="text" name="name" placeholder="enter your name*" />
              <input type="text" name="email" placeholder="enter your email*" />
              <input type="text" name="phone" placeholder="enter your phone" />
            </div>
            <input type="text" name="description" placeholder="describe your project" />
            <label htmlFor="agreement-checkbox" className="agreement-checkbox--label">
              <input type="checkbox" name="agree" id="agreement-checkbox" className="agreement__checkbox" />
              <span className="checkbox-display"></span>
              <span className="checkbox__description">I agree to Terms of Service & Privacy Policy</span>
            </label>
            <button className="submit-button"></button>
          </form>
        </div>
      </CustomBox>
      <div className="footer-links__container">
        <CustomBox customClass="footer-techs">
          <h2 className="footer-techs__heading">[ technologies ]</h2>
          <div className="techs__content">
            <span className="techs-left">
              {techsLeft.map((e) => {
                return <p key={e}>{e}</p>;
              })}
            </span>
            <span className="techs-right">
              {techsRight.map((e) => {
                return <p key={e}>{e}</p>;
              })}
            </span>
          </div>
        </CustomBox>
        <CustomBox customClass="footer-services">
          <div className="services__heading">
            <h2 className="heading__text">
              <div className="heading__line heading__line--left"></div>
              <span className="green">[ </span>
              <span className="text__content">services</span>
              <span className="green"> ]</span>
              <div className="heading__line heading__line--rigth"></div>
            </h2>
          </div>
          <div className="services__content">
            {servicesForView.map((service) => {
              return (
                <span key={service} className="service__item">
                  {service}
                </span>
              );
            })}
          </div>
        </CustomBox>
        <div className="footer-social__box">
          <div className="footer-accounts">
            <CustomBox>
              <a href="https://www.linkedin.com/" target="_blank">
                <img src={linkedIn} alt="" />
              </a>
            </CustomBox>
            <CustomBox>
              <a href="https://www.facebook.com/" target="_blank">
                <img src={facebook} alt="" />
              </a>{" "}
            </CustomBox>
          </div>
          <div className="footer-terms">
            <CustomBox>
              <a href="#">Terms of Service</a>
            </CustomBox>
            <CustomBox>
              <a href="#">Privacy Policy</a>
            </CustomBox>
          </div>
          <CustomBox customClass="footer-year">@2025</CustomBox>
        </div>
      </div>
    </div>
  );
}
