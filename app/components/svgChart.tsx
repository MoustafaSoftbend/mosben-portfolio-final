"use client";

import Image from "next/image";
import LgSvg from "../../public/images/svg-chart.svg";

const SvgChart = () => {
  return (
    <div className="orbit-svg-container w-fit relative">
      <h1 className="pivot-text pivot-text-right">
        WEB DEVELOPPEMENT CREATING STRONG FULLSTACK APPS WITH STRONG AND MODERN
        UI AND WELL BUILT BACKENDS
      </h1>
      <h1 className="pivot-text pivot-text-right pivot-bottom">
        SOFTWARE SOLUTION BUILDING CMS SOLUTIONS CONVENIENT TO YOUR BUISNESS
        SOLUTIONS
      </h1>
      <h1 className="pivot-text pivot-text-left">
        BUILDING DATABASES WITH SQL AND NO SQL BASED DATABASES
      </h1>
      <h1 className="pivot-text pivot-text-left pivot-bottom">
        USING TRENDING TECHNOLOGIES AND FRAMEWORK IN BOTH PYTHON AND JAVASCRIPT
      </h1>
      <LgSvg height={800} width={"100%"} />
    </div>
    // <object
    //   className="svg-chart"
    //   data="/images/svg-chart.svg"
    //   type="image/svg+xml"
    // ></object>

    // <Image
    //   src="/images/svg-chart.svg"
    //   alt="Description"
    //   height={1200}
    //   width={1200}
    //   layout="responsive"
    // />
  );
};
export default SvgChart;
