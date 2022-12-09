import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="138" cy="141" r="125" />
    <rect x="111" y="316" rx="0" ry="0" width="0" height="1" />
    <rect x="-2" y="277" rx="10" ry="10" width="280" height="25" />
    <rect x="0" y="312" rx="10" ry="10" width="280" height="88" />
    <rect x="8" y="422" rx="9" ry="9" width="92" height="30" />
    <rect x="119" y="413" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
