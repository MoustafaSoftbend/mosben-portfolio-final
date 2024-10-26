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
  faStackOverflow as stack
} from "@fortawesome/free-brands-svg-icons";

import Link from "next/link";

import { scroller } from "../utils/scroller";

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

// import { fade_left, fade_right, fade_text_svg } from "../utils/faders";
import useFade from "../utils/faders";
import { Typer } from "../utils/typer";
import { cardRotation } from "../utils/cardRotation";
import { useEffect, useState, useCallback } from "react";
import { throttle } from 'lodash';

import Server_svg from "../public/images/server_svg.svg";

import { screenshotsController } from "./controller/screenshotsController";
import {getStaticController} from "./controller/getStaticController"


import Typewriter from "./components/typer";

const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  interface Screen {
    [index: string]: {
      [key: string]: { secure_url: string }[];
    };
    // asset_id: string;
    // public_id: string;
    // folder: string;
    // filename: string;
    // format: string;
    // version: number;
    // resource_type: string;
    // type: string;
    // created_at: string;
    // uploaded_at: string;
    // bytes: number;
    // width: number;
    // height: number;
    // aspect_ratio: number;
    // pixels: number;
    // url: string;
    // secure_url: string;
    // status: string;
    // access_mode: string;
    // access_control: null;
    // etag: string;
    // created_by: string;
    // access_key: string;
    // uploaded_by: string;
  }

  interface StaticData {
    [key: string]: string;
  }

  const [screenShots, setScreenShots] = useState<Screen[]>([]);
  const [urlsState, setUrlsState] = useState<string[]>([]);
  const [staticData, setStaticData] = useState<StaticData | null>(null);
  const card_data = [{"H1":"Portfolio Page","P":"Portfolio built using Next js with CSR UI and SSR api handeling "},{"H1":"Bolg-app","P":"Blog Built using React js implemented with react redux "},{"H1":"Energye","P":"Front End part of a project building web app for Energy company"}]
const url_names = ["mosben-portfolio-final.vercel.app",
  "blog-dusky-psi.vercel.app",
  "grte-front.vercel.app"]
  const updateStaticData = (key:string, value: any) => {
    setStaticData(prevState => ({
      ...prevState,
      [key]: value // Using computed property names to set the value
    }));
  };

  useFade(".fade_left", 0, "translateX(0)");
  useFade(".fade_right", 0, "translateX(0)");
  useFade(
  ".orbit-svg-container h1.pivot-text",
  0,
  "translateX(100%)",
  2000,
  0.75
  );
  useFade(".orbit-svg-container svg");

  useEffect(() => {

    cardRotation();
    // Typer();
    scroller();
    // fade_text_svg();
    const fetchData = async (urls: string[]) => {
      try {
        const screens = await screenshotsController(urls);
        if (screens.length > 0){
          setScreenShots(screens);

        }
        console.log(screenShots);
      } catch (error) {
        console.error("Error fetching screenshots:", error);
      }
    };

    const fetchStatic = async () =>{
      try {
        const stat:any[] = await getStaticController()
        // console.log(stat)
        if (Array.isArray(stat)){
          stat.map((el,index) =>{
            // console.log(el.folder,el.secure_url)
            updateStaticData(el.folder,el.secure_url)
          })
        // console.log(Object.keys(staticData).length)
        }
      }catch (error){
        console.error("Error fetching screenshots:", error);

      }
    }
    // console.log(staticData["static/band"])

    // console.log(staticData)

    // console.log(staticData)

    // const urls = Array.from(document.querySelectorAll("a.card")).map(
    //   (a) => a.href,
    // );

    // const urls = ["https://7kwlxf-3000.csb.app/", "https://ygh6gy-3000.csb.app/"];
    if (urlsState.length <= 0) {
      setUrlsState(["https://mosben-portfolio-final.vercel.app",
        "https://blog-dusky-psi.vercel.app",
        "https://grte-front.vercel.app"]);
    }
    // console.log(urlsState);
    // const linkLength = urls.length;
    // let screenShots = screenshotsController(urls);

    console.log(
      urlsState.length > 0,
      screenShots.length == 0 ,
      urlsState.length != screenShots.length
    )

    if (
      urlsState.length > 0 &&
      screenShots.length == 0 &&
      urlsState.length != screenShots.length
    ) {
      setTimeout(() => {
        fetchData(urlsState)
      }, 3000);
      // fetchData(urlsState);
      // const intervalId = setInterval(fetchData(urlsState), 6000);
    }

    console.log(screenShots)

    if (urlsState.length > 0 && screenShots.length>0) {
      // console.log(screenShots[0]["Folder_0/7kwlxf-3000.csb.app"][0].secure_url);
      screenShots.forEach((screen, index) => {
      //   console.log(`Screens/Screen_0`)
      // console.log(screenShots)
      console.log(urlsState[index])
        
      });
      
    }
if(screenShots.length > 0 && urlsState.length > 0) {
    screenShots.forEach((screen,index) => {
      // console.log(urlsState[index])

      // const parsedUrl = new URL(urlsState[index]);
      // const folderName = urlsState[index].hostname;
      console.log(screen[index][`Screens/${urlsState[index]}`])
    })}
    // let screenShots = screenshotsController("https://7kwlxf-3000.csb.app/");
    // Set up an interval to fetch data periodically
    //   const intervalId = setInterval(fetchData, 2000); // Fetch data every 5 seconds
    if (staticData && Object.keys(staticData).length <= 0){
      fetchStatic()
    }

  }, [screenShots, urlsState,staticData]);
  return (
    <>
      <header className="page-head intersect">
        <div className="slider-band absolute w-[50%] top-0 left-0 h-fit">
          
          <Image
            src={staticData && staticData['static/band']? staticData['static/band'] :"/images/band.png"}
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
               Crafting 
              {/* Elevate your */}
              <span className="highlight-primary">
              Digital Experiences,
                {/* software solution , */}
              </span>
              One Line at a Time
              {/* Crafting Beautiful Interfaces */}
              <span className="highlight-secondary">
              Turning Code into Creativity
                {/* One Line of Code at a Time! */}
              </span>
              and 
              {/* and */}
              <span className="highlight-secondary">
                {/* escalte your buisness */}
                Empowering Ideas Through 
              </span>
              Web Development
            </h1>
            <div className="nav-footer flex flex-row ">
              <Link href="#contact-section">
                <FontAwesomeIcon
                  className="icon-lg clr-secondary h-auto"
                  icon={faSquarePhone}
                  size="5x"
                />
              </Link>
              <Link className="btn btn-primary btn-round " href="#projects-section">
                Explore
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section id="about-section" className="about-section intersect">
        <div className="container">
          <div className="section-title-container">
            <div className="title-overlay"></div>

            <h1 className="section-title">About</h1>
          </div>

          <div className="about-section-container flex flex-col">
            <div className="profile-img-container block relative">
              <div className="profile-overlay color-[white]">
                <Typewriter />
              </div>
              <div className="profile-picture profile">
                <Image
                  src={staticData && staticData['static/profile']? staticData['static/profile'] :"/images/profile.jpg"}
                  layout="fill"
                  alt="Profile pic"
                />
              </div>
            </div>

            <div className="profile-content">
              <h1 className="profile-title fade_right">
              Hi there, I&apos;m MOUSTAFA, a driven electrical engineer turned full-stack developer. 
              </h1>
              <p className="fade_right">
              I bring engineering precision and problem-solving expertise to the world of code, with a specialization in frontend technologies Combining my technical foundation with a passion for innovation, I create seamless, scalable, and high-performance digital solutions that elevate both user experience and functionality. Let’s power up the future, one line of code at a time.
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

      <section id="services-section" className="services-section">
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
      <section id="projects-section" className="portfolio-section">
        <div className="section-title-container">
          <div className="title-overlay"></div>

          <h1 className="section-title">Portfolio</h1>
        </div>
        <div className="carousel container">
          <button className="btn btn-arrow-right">
          <FontAwesomeIcon
            className="icon arrow-right"
            icon={faCircleArrowRight}
          />
          </button>
          <button className="btn btn-arrow-left">

          <FontAwesomeIcon
            className="icon arrow-left"
            icon={faCircleArrowLeft}
          />
          </button>

          <div className="carousel-container">
            {screenShots && screenShots.length > 0 ? 
            (
              screenShots.map((screen,index) => (
                <Link
                  href={urlsState && urlsState.length > 0 ? `${urlsState[index]}` : "/"}
                  className="card"
                  key={index}
                  target="_blank"
  rel="noopener noreferrer"
                >
                  <div className="card-img-grid">
                    <div>
                    { screen
                            ? 
                      <Image key={index}
                        src={screen[index][`Screens/${url_names[index]}`] &&
                          screen[index][`Screens/${url_names[index]}`][0]
                            ? screen[index][`Screens/${url_names[index]}`][0].secure_url
                            : "/images/img-loader.svg"
                        }
                        
                        layout="fill"
                        alt="Screenshot of the portfolio"
                      /> : <Skeleton sx={{animationDuration: '1.5s',}} variant="rounded" />} 

                    </div>
                    <div>
                    {screen                         
                            ? 
                      <Image key={index}
                        src={
                          screen[index][`Screens/${url_names[index]}`] &&
                          screen[index][`Screens/${url_names[index]}`][1]
                            ? screen[index][`Screens/${url_names[index]}`][1].secure_url
                            : "/images/img-loader.svg"
                        }
                        layout="fill"
                        alt="Screenshot of the portfolio"
                      />:<Skeleton sx={{animationDuration: '1.5s',width: '100%',height: '100%'}} variant="rounded"  />}
                    </div>
                    <div>
                    {screen 
                            ? 
                      <Image key={index}
                        src={
                          screen[index][`Screens/${url_names[index]}`] &&
                          screen[index][`Screens/${url_names[index]}`][2]
                            ? screen[index][`Screens/${url_names[index]}`][2].secure_url
                            : "/images/img-loader.svg"
                        }
                        layout="fill"
                        alt="Screenshot of the portfolio"
                      />:<Skeleton sx={{animationDuration: '1.5s',width: '100%',height: '100%'}} variant="rounded"  />}
                    </div>
                    <div>
                    {screen 
                            ? 
                      <Image key={index}
                        src={
                          screen[index][`Screens/${url_names[index]}`] &&
                          screen[index][`Screens/${url_names[index]}`][3]
                            ? screen[index][`Screens/${url_names[index]}`][3].secure_url
                            : "/images/img-loader.svg"
                        }
                        layout="fill"
                        alt="Screenshot of the portfolio"
                      />:<Skeleton sx={{animationDuration: '1.5s',width: '100%',height: '100%'}} variant="rounded" />
                    }
                    </div>

                  </div>
                  <div className="card-body">
                    <h1 className="card-title">{card_data ? card_data[index].H1 : <Skeleton variant="text" sx={{ fontSize: '1rem',animationDuration: '1.5s', }} />}</h1>
                    <small className="card-text">
                    {card_data ? card_data[index].P : <Skeleton variant="text" sx={{ fontSize: '1rem',animationDuration: '1.5s', }} />}
                    </small>
                  </div>
                </Link>
              )
            )
            ) : 
            (
              <Link href="/" className="card flex flex-row gap-[3em]">
                {/* <div className="card-img-grid">
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
                </div> */}

<Stack spacing={1} >
      {/* For variant="text", adjust the height via font-size */}

      {/* For other variants, adjust the size with `width` and `height` */}
      {/* <Skeleton variant="circular" width={40} height={40} /> */}
      {/* <Skeleton variant="rectangular" width={210} height={60} /> */}
      <Skeleton sx={{animationDuration: '1.5s',}} variant="rounded" width={400} height={200} />
      <div className="flex flex-row gap-2 w-[400px]">
      <Skeleton sx={{animationDuration: '1.5s',}} variant="rounded" width={210} height={60} />
      <Skeleton sx={{animationDuration: '1.5s',}} variant="rounded" width={210} height={60} />
      <Skeleton sx={{animationDuration: '1.5s',}} variant="rounded" width={210} height={60} />

      </div>
      <Skeleton variant="text" sx={{ fontSize: '1rem',animationDuration: '1.5s', }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' ,animationDuration: '1.5s',}} />
      <Skeleton variant="text" sx={{ fontSize: '1rem',animationDuration: '1.5s', }} />

    </Stack>
<Stack spacing={1} >
      {/* For variant="text", adjust the height via font-size */}

      {/* For other variants, adjust the size with `width` and `height` */}
      {/* <Skeleton variant="circular" width={40} height={40} /> */}
      {/* <Skeleton variant="rectangular" width={210} height={60} /> */}
      <Skeleton sx={{animationDuration: '1.5s',}} variant="rounded" width={400} height={200} />
      <div className="flex flex-row gap-2 w-[400px]">
      <Skeleton sx={{animationDuration: '1.5s',}} variant="rounded" width={210} height={60} />
      <Skeleton sx={{animationDuration: '1.5s',}} variant="rounded" width={210} height={60} />
      <Skeleton sx={{animationDuration: '1.5s',}} variant="rounded" width={210} height={60} />

      </div>
      <Skeleton variant="text" sx={{ fontSize: '1rem',animationDuration: '1.5s', }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' ,animationDuration: '1.5s',}} />
      <Skeleton variant="text" sx={{ fontSize: '1rem',animationDuration: '1.5s', }} />

    </Stack>
<Stack spacing={1} >
      {/* For variant="text", adjust the height via font-size */}

      {/* For other variants, adjust the size with `width` and `height` */}
      {/* <Skeleton variant="circular" width={40} height={40} /> */}
      {/* <Skeleton variant="rectangular" width={210} height={60} /> */}
      <Skeleton sx={{animationDuration: '1.5s',}} variant="rounded" width={400} height={200} />
      <div className="flex flex-row gap-2 w-[400px]">
      <Skeleton sx={{animationDuration: '1.5s',}} variant="rounded" width={210} height={60} />
      <Skeleton sx={{animationDuration: '1.5s',}} variant="rounded" width={210} height={60} />
      <Skeleton sx={{animationDuration: '1.5s',}} variant="rounded" width={210} height={60} />

      </div>
      <Skeleton variant="text" sx={{ fontSize: '1rem',animationDuration: '1.5s', }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' ,animationDuration: '1.5s',}} />
      <Skeleton variant="text" sx={{ fontSize: '1rem',animationDuration: '1.5s', }} />

    </Stack>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="certificates">
      <div className="section-title-container m-[2em]">
            <div className="title-overlay"></div>

            <h1 className="section-title">Certificates </h1>
      </div>
        
        <div className="certificates-container flex flex-row flex-wrap container gap-[2em] h-[auto] p-[2em] m-[3em] justify-center">
        <Link className="block w-[300px]" href="https://www.coursera.org/verify/AGBFD8K4BQB2" target="_blank" rel="noopener noreferrer">
        <img src="https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~AGBFD8K4BQB2/CERTIFICATE_LANDING_PAGE~AGBFD8K4BQB2.jpeg" alt="Coursera Certificate" width="600" />
        </Link>
        <Link className="block w-[300px]" href="https://www.coursera.org/verify/HC3K6FW95BQN" target="_blank" rel="noopener noreferrer">
        <img src="https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~HC3K6FW95BQN/CERTIFICATE_LANDING_PAGE~HC3K6FW95BQN.jpeg" alt="Coursera Certificate" width="600" />
        </Link>
        
        <Link className="block w-[300px]" href="https://www.coursera.org/verify/855C2EBAQ92U" target="_blank" rel="noopener noreferrer">
        <img src="https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~855C2EBAQ92U/CERTIFICATE_LANDING_PAGE~855C2EBAQ92U.jpeg" alt="Coursera Certificate" width="600" />
        </Link>
        <Link className="block w-[300px]" href="https://www.coursera.org/verify/PUWQWD7BAL27" target="_blank" rel="noopener noreferrer">
        <img src="https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~PUWQWD7BAL27/CERTIFICATE_LANDING_PAGE~PUWQWD7BAL27.jpeg" alt="Coursera Certificate" width="600" />
        </Link>


        </div>
      </section>

      <section id="contact-section" className="contact-section">
        <div className="container m-[3em]">
          <div className="section-title-container">
            <div className="title-overlay"></div>

            <h1 className="section-title">Contact</h1>
          </div>
          <div className="contact-body">
            <div className="contact-container">
              <div className="server-svg-container m-[0 auto] relative">
                <span className="warning-form-data">warning fix the errors</span>
                <Server_svg />
              </div>
              <h1 className="contact-logo-title p-3">
                <small className="camel-case-logo">MB</small> Tech
              </h1>
              <p className="contact-text p-2">
              Cutting-edge solutions at your fingertips... let’s bring your vision to life. Reach out to us today!
              </p>
              <div className="social-links-container">
                <Link className="Social-logo" target="_blank" rel="noopener noreferrer" href="https://stackoverflow.com/users/10722090/moustafa-bendib">
                  <FontAwesomeIcon className="icon-lg" icon={stack} />
                </Link>
                <Link className="Social-logo" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/moustafa-bendib-b5a965aa/">
                  <FontAwesomeIcon className="icon-lg" icon={linkedin} />
                </Link>
                <Link className="Social-logo" target="_blank" rel="noopener noreferrer" href="https://github.com/MoustafaSoftbend">
                  <FontAwesomeIcon className="icon-lg" icon={gitAwsome} />
                </Link>
                <Link className="Social-logo" target="_blank" rel="noopener noreferrer" href="https://www.x.com">
                  <FontAwesomeIcon className="icon-lg" icon={x} />
                </Link>
              </div>
            </div>

            <div className="form-container">
              <h1 className="form-title">Lets Connect</h1>
              <p>
              Have a project in mind or just want to say hello? I&apos;d love to hear from you! Whether you&apos;re looking to collaborate, have a question, or want to discuss new opportunities, feel free to reach out.
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

        <div className="social-links container w-[700px]">
          <Link className="Social-logo" href="https://stackoverflow.com/users/10722090/moustafa-bendib">
            <FontAwesomeIcon className="icon-lg" icon={stack} />
          </Link>
          <Link className="Social-logo" href="https://www.linkedin.com/in/moustafa-bendib-b5a965aa/">
            <FontAwesomeIcon className="icon-lg" icon={linkedin} />
          </Link>
          <Link className="Social-logo" href="https://github.com/MoustafaSoftbend">
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
