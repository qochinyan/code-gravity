import TechGravity from "../TechGravity/TechGravity";
import "./AnimatedBlock.scss";

export default function AnimatedBlock() {
  return (
    <div className="animated-block__container">
      <span className="animated-block__header">
        <div className="edge-cube cube-lt"></div>
        <div className="edge-cube cube-rt"></div>
        <div className="edge-cube cube-lb"></div>
        <div className="edge-cube cube-rb"></div>
        <h2 className="header__heading">Technologies We Master</h2>
        <p className="header__description">
          From backend architecture to frontend experiences, our expertise ensures seamless and efficient digital
          products.
        </p>
      </span>
      <TechGravity />
    </div>
  );
}
