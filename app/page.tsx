"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import SvgChart from "./components/svgChart";
import Form from "./components/form";

import Lottie from "react-lottie";
import animationData from "../public/lottiefiles/mobileDeskAn.json";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePhone,
  faCircleArrowRight,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import {
  faSquareFacebook as facebook,
  faLinkedinIn as linkedin,
  faSquareGithub as gitAwsome,
  faSquareTwitter as x,
} from "@fortawesome/free-brands-svg-icons";

import Link from "next/link";

import { scroller } from "../utils/scroller";

import { fade_left, fade_right, fade_text_svg } from "../utils/faders";
import useFade from "../utils/faders";
import { typer } from "../utils/typer";
import { cardRotation } from "../utils/cardRotation";
import { useEffect, useState } from "react";

import Server_svg from "../public/images/server_svg.svg";

import { screenshotsController } from "./controller/screenshotsController";
import getStatic from "./controller/getStatic"

const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [screenShots, setScreenShots] = useState([]);
  const [urlsState, setUrlsState] = useState([]);
  const [staticImages, setStaticImages] = useState([]);

  scroller();
  useFade(".fade_left", 0, "translateX(0)");
  useFade(".fade_right", 0, "translateX(0)");
  useFade(
    ".orbit-svg-container h1.pivot-text",
    0,
    "translateX(100%)",
    2000,
    0.75,
  );
  useFade(".orbit-svg-container svg");

  typer();

  useEffect(() => {
    cardRotation();
    // fade_text_svg();

    const fetchData = async (urls: string[]) => {
      try {
        const screens = await screenshotsController(urls);
        // const images = await getStatic();
        console.log(screens, images)
        if (Array.isArray(screens)) {
          // setScreenShots(screens);
          setStaticImages(images)
        }
      } catch (error) {
        console.error("Error fetching screenshots:", error);
      }
    };
    // const urls = Array.from(document.querySelectorAll("a.card")).map(
    //   (a) => a.href,
    // );

    const urls = ["https://7kwlxf-3000.csb.app/", "https://ygh6gy-3000.csb.app/"];
    if (urlsState.length == 0) {
      setUrlsState(urls);
    }
    // const linkLength = urls.length;
    // let screenShots = screenshotsController(urls);
    console.log(urlsState.length > 0,
      screenShots.length == 0,
      urlsState.length != screenShots.length)

    if (
      urlsState.length > 0 &&
      screenShots.length == 0 &&
      urlsState.length != screenShots.length
    ) {
      // fetchData(urlsState);
      fetchData(urlsState);
      console.log(screenShots)

    }
    if (screenShots.length > 0) {
      // console.log(screenShots[0]["Folder_0/7kwlxf-3000.csb.app"][0].secure_url);
      screenShots.forEach((screen, index) => {
        console.log(screen[Object.keys(screen)[0]][0].secure_url);
      });
    }

    // links.forEach((link) => {});
    // let screenShots = screenshotsController("https://7kwlxf-3000.csb.app/");
    // Set up an interval to fetch data periodically
    //   const intervalId = setInterval(fetchData, 2000); // Fetch data every 5 seconds
  }, [screenShots, urlsState]);
  return (
    <>
      <header className="page-head intersect">
        <div className="slider-band absolute w-[50%] top-0 left-0 h-fit">
          <Image
            src="/images/band.png"
            layout="fill"
            className="silder-band"
            alt="Band image"
          />
        </div>

        <Navbar />
        <div className="nav-content container">
          <div className="nav-img-container">
            <Lottie
              className="dev-animation"
              options={defaultOptions}
            // height={"auto"}
            // width={"100%"}
            />
          </div>
          <div className="nav-body">
            <h1 className="nav-title clr-white ">
              <span className="typed-char">E</span>
              <span className="typed-char">l</span>
              <span className="typed-char">e</span>
              <span className="typed-char">v</span>
              <span className="typed-char">a</span>
              <span className="typed-char">t</span>
              <span className="typed-char">e</span>
              <span className="typed-char"> y</span>
              <span className="typed-char">o</span>
              <span className="typed-char">u</span>
              <span className="typed-char">r</span>
              {/* Elevate your */}
              <span className="highlight-primary">
                <span className="typed-char">S</span>
                <span className="typed-char">o</span>
                <span className="typed-char">f</span>
                <span className="typed-char">t</span>
                <span className="typed-char">w</span>
                <span className="typed-char">a</span>
                <span className="typed-char">r</span>
                <span className="typed-char">e</span>
                <span className="typed-char"> s</span>
                <span className="typed-char">l</span>
                <span className="typed-char">u</span>
                <span className="typed-char">t</span>
                <span className="typed-char">i</span>
                <span className="typed-char">o</span>
                <span className="typed-char">n</span>
                <span className="typed-char"> ,</span>
                {/* software solution , */}
              </span>
              <span className="typed-char">C</span>
              <span className="typed-char">r</span>
              <span className="typed-char">a</span>
              <span className="typed-char">f</span>
              <span className="typed-char">t</span>
              <span className="typed-char">i</span>
              <span className="typed-char">n</span>
              <span className="typed-char">g</span>
              <span className="typed-char"> B</span>
              <span className="typed-char">e</span>
              <span className="typed-char">a</span>
              <span className="typed-char">u</span>
              <span className="typed-char">t</span>
              <span className="typed-char">i</span>
              <span className="typed-char">f</span>
              <span className="typed-char">u</span>
              <span className="typed-char">l</span>
              <span className="typed-char"> I</span>
              <span className="typed-char">n</span>
              <span className="typed-char">t</span>
              <span className="typed-char">e</span>
              <span className="typed-char">r</span>
              <span className="typed-char">f</span>
              <span className="typed-char">a</span>
              <span className="typed-char">c</span>
              <span className="typed-char">e</span>
              <span className="typed-char">s</span>
              {/* Crafting Beautiful Interfaces */}
              <span className="highlight-secondary">
                <span className="typed-char">O</span>
                <span className="typed-char">n</span>
                <span className="typed-char">e</span>
                <span className="typed-char"> L</span>
                <span className="typed-char">i</span>
                <span className="typed-char">n</span>
                <span className="typed-char">e</span>
                <span className="typed-char"> o</span>
                <span className="typed-char">f</span>
                <span className="typed-char"> C</span>
                <span className="typed-char">o</span>
                <span className="typed-char">d</span>
                <span className="typed-char">e</span>
                <span className="typed-char"> a</span>
                <span className="typed-char">t</span>
                <span className="typed-char"> a</span>
                <span className="typed-char"> T</span>
                <span className="typed-char">i</span>
                <span className="typed-char">m</span>
                <span className="typed-char">e</span>
                <span className="typed-char">!</span>
                {/* One Line of Code at a Time! */}
              </span>
              <span className="typed-char">a</span>
              <span className="typed-char">n</span>
              <span className="typed-char">d</span>
              {/* and */}
              <span className="highlight-secondary">
                <span className="typed-char">e</span>
                <span className="typed-char">s</span>
                <span className="typed-char">c</span>
                <span className="typed-char">a</span>
                <span className="typed-char">l</span>
                <span className="typed-char">t</span>
                <span className="typed-char">e</span>
                <span className="typed-char"> y</span>
                <span className="typed-char">o</span>
                <span className="typed-char">u</span>
                <span className="typed-char">r</span>
                <span className="typed-char"> b</span>
                <span className="typed-char">u</span>
                <span className="typed-char">i</span>
                <span className="typed-char">s</span>
                <span className="typed-char">n</span>
                <span className="typed-char">e</span>
                <span className="typed-char">s</span>
                <span className="typed-char">s</span>
                {/* escalte your buisness */}
              </span>
            </h1>
            <div className="nav-footer flex flex-row ">
              <Link href="">
                <FontAwesomeIcon
                  className="icon-lg clr-secondary h-auto"
                  icon={faSquarePhone}
                  size="5x"
                />
              </Link>
              <Link className="btn btn-primary btn-round " href="">
                Explore
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="about-section intersect">
        <div className="container">
          <div className="section-title-container">
            <div className="title-overlay"></div>

            <h1 className="section-title">About</h1>
          </div>

          <div className="about-section-container flex flex-col">
            <div className="profile-img-container block relative">
              <div className="profile-overlay"></div>
              <div className="profile-picture profile">
                <Image
                  src="/images/profile.jpg"
                  layout="fill"
                  alt="Profile pic"
                />
              </div>
            </div>

            <div className="profile-content">
              <h1 className="profile-title fade_right">
                Hi there , I am MOUSTAFA your coolest full stack developper. I
                specialize in front end technologies used with passion and
                precision
              </h1>
              <p className="fade_right">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
                ratione culpa nostrum enim porro corrupti assumenda consectetur
                eum inventore esse.
              </p>
              <div className="profile-buttons flex flex-row fade_right">
                <Link href="">
                  <FontAwesomeIcon
                    className="icon-lg clr-secondary"
                    icon={faSquarePhone}
                  />
                </Link>
                <Link className="btn btn-primary btn-round " href="">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className=" flex flex-row">
          <div className="section-title-container">
            <div className="title-overlay services-overlay"></div>

            <h1 className="section-title">Services</h1>
          </div>
          <div className="nav-img-container container">
            <SvgChart />
          </div>
        </div>
      </section>
      <section className="portfolio-section">
        <div className="section-title-container">
          <div className="title-overlay"></div>

          <h1 className="section-title">Portfolio</h1>
        </div>
        <div className="carousel container">
          <FontAwesomeIcon
            className="icon arrow-right"
            icon={faCircleArrowRight}
          />
          <FontAwesomeIcon
            className="icon arrow-left"
            icon={faCircleArrowLeft}
          />
          <div className="carousel-container">
            {screenShots && screenShots.length > 0 ? (
              screenShots.map((screen, index) =>
                <Link href=
                  {urlsState && urlsState.length > 0 ? urlsState[0] : '/'} className="card">
                  <div className="card-img-grid">
                    <div>
                      <Image
                        src={
                          screen && screen[Object.keys(screen)[0]][0]
                            ? screen[Object.keys(screen)[0]][0].url
                            : "/images/img-loader.svg"
                        }
                        layout="fill"
                        alt="Screenshot of the portfolio"
                      />
                    </div>
                    <div>
                      <Image
                        src={
                          screen && screen[Object.keys(screen)[0]][1]
                            ? screen[Object.keys(screen)[0]][1].url
                            : "/images/img-loader.svg"
                        }
                        layout="fill"
                        alt="Screenshot of the portfolio"
                      />
                    </div>
                    <div>
                      <Image
                        src={
                          screen && screen[Object.keys(screen)[0]][2]
                            ? screen[Object.keys(screen)[0]][2].url
                            : "/images/img-loader.svg"
                        }
                        layout="fill"
                        alt="Screenshot of the portfolio"
                      />
                    </div>
                    <div>
                      <Image
                        src={
                          screen && screen[Object.keys(screen)[0]][3]
                            ? screen[Object.keys(screen)[0]][3].url
                            : "/images/img-loader.svg"
                        }
                        layout="fill"
                        alt="Screenshot of the portfolio"
                      />
                    </div>

                  </div>
                  <div className="card-body">
                    <h1 className="card-title">Tech Blog</h1>
                    <small className="card-text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolore, quod.
                    </small>
                  </div>
                </Link>
              )
            ) : (
              <Link href="/" className="card">
                <div className="card-img-grid">
                  <div className="img-loader">
                    <Image
                      className="img-loader p-[3]"
                      src="/images/img-loader.svg"
                      layout="fill"
                      alt="Screenshot of the portfolio"
                    />
                  </div>
                  <div className="img-loader">
                    <Image
                      className="img-loader"
                      src="/images/img-loader.svg"
                      layout="fill"
                      alt="Screenshot of the portfolio"
                    />
                  </div>
                  <div className="img-loader">
                    <Image
                      className="img-loader"
                      src="/images/img-loader.svg"
                      layout="fill"
                      alt="Screenshot of the portfolio"
                    />
                  </div>
                  <div className="img-loader">
                    <Image
                      className="img-loader"
                      src="/images/img-loader.svg"
                      layout="fill"
                      alt="Screenshot of the portfolio"
                    />
                  </div>
                </div>
                <div className="card-body">
                  <h1 className="card-title">Tech Blog</h1>
                  <small className="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore, quod.
                  </small>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="section-title-container">
            <div className="title-overlay"></div>

            <h1 className="section-title">Contact</h1>
          </div>
          <div className="contact-body">
            <div className="contact-container">
              <div className="server-svg-container m-[0 auto]">
                <Server_svg />
              </div>
              <h1 className="contact-logo-title p-3">
                <small className="camel-case-logo">MB</small> Tech
              </h1>
              <p className="contact-text p-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus reiciendis veritatis, amet totam suscipit voluptates?
              </p>
              <div className="social-links-container">
                <Link className="Social-logo" href="https://www.facebook.com">
                  <FontAwesomeIcon className="icon-lg" icon={facebook} />
                </Link>
                <Link className="Social-logo" href="https://www.linkedin.com">
                  <FontAwesomeIcon className="icon-lg" icon={linkedin} />
                </Link>
                <Link className="Social-logo" href="https://www.github.com">
                  <FontAwesomeIcon className="icon-lg" icon={gitAwsome} />
                </Link>
                <Link className="Social-logo" href="https://www.x.com">
                  <FontAwesomeIcon className="icon-lg" icon={x} />
                </Link>
              </div>
            </div>

            <div className="form-container">
              <h1 className="form-title">Lets Connect</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi
                aliquid explicabo vero error. Ullam quos quas tenetur?
                Voluptatum, suscipit quaerat?
              </p>
              <Form />
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <div className="footer-container container">
          <h1 className="logo">
            <span>MB</span>- SOFT
          </h1>
        </div>

        <div className="social-links container">
          <Link className="Social-logo" href="/">
            <FontAwesomeIcon className="icon-lg" icon={facebook} />
          </Link>
          <Link className="Social-logo" href="/">
            <FontAwesomeIcon className="icon-lg" icon={linkedin} />
          </Link>
          <Link className="Social-logo" href="/">
            <FontAwesomeIcon className="icon-lg" icon={gitAwsome} />
          </Link>
          <Link className="Social-logo" href="/">
            <FontAwesomeIcon className="icon-lg" icon={x} />
          </Link>
        </div>
        <div className="author-right">
          <h1 className="rights-statement text-center bold p-3">
            MB-soft copywrite @ inspired by / designed and impleneted by
            moustafa
          </h1>
        </div>
      </footer>
    </>
  );
};

export default Home;
