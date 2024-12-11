import React, { useEffect, useState } from "react";
import Typed from "typed.js";
import AboutInfo from "../Layouts/AboutInfo";
import axios from "axios";
import HeaderNavigation from "../Layouts/HeaderNavigation";

function Intro() {
  const title = ["Name", "Date of Brith", "Email", "Country"];
  const value = ["Myat Thuta", "2003", "myatthuta232@gmail.com", "Myanmar"];
  const [info, setInfo] = useState({});
  const [projects, setProject] = useState([]);

  useEffect(() => {
    const typed = new Typed("#auto-type", {
      strings: ["MYAT THUTA", "A Full-stack developer"],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    //--------This is for fetch data process---//
    async function fetchData() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/landinginfo");
        const data1 = response.data;
        setInfo(data1);
        //console.log(data1);

        console.log(info.ProjectProfile);
        if (data1) {
          setInfo(data1);
          // console.log(info);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const dataFetch = async () => {
      let data = await axios.get("http://127.0.0.1:8000/ProjectData");

      const projectArray = Object.values(data.data);
      setProject(projectArray[0]);

      console.log(projects);
    };

    dataFetch();
  }, []);

  // Group projects into pairs of 2 for carousel slides
  const groupProjects = (projects) => {
    const grouped = [];
    for (let i = 0; i < projects.length; i += 2) {
      grouped.push(projects.slice(i, i + 2));
    }
    return grouped;
  };

  const groupedProjects = groupProjects(projects);
  return (
    <div>
      <HeaderNavigation />
      <section
        className="container mt-5"
        id="intro"
        style={{ marginBottom: "15%" }}
      >
        <div className="row">
          <div
            className="col-md-7 my-1 text-white"
            id="name"
            data-aos="fade-right"
          >
            <h3 className="fs-1 ms-5" style={{ marginTop: "14%" }}>
              Hi, everyone! <span className="name-font"> I'm </span>
            </h3>

            <span
              id="auto-type"
              className="text-warning mt-5 ms-5"
              style={{ fontSize: "60px" }}
            ></span>

            <div className="w-75 ms-5 fs-5">
              <p>{info.Description}</p>
              <div
                className="d-flex justify-content-between"
                style={{ width: "35%" }}
              >
                <a href={info.IconLink1} className="btn btn-outline-warning">
                  <i className={info.Icon1}></i>
                </a>
                <a href={info.IconLink1} className="btn btn-outline-warning">
                  <i className={info.Icon2}></i>
                </a>
                <a href={info.IconLink1} className="btn btn-outline-warning">
                  <i className={info.Icon3}></i>
                </a>
                <a href={info.IconLink1} className="btn btn-outline-warning">
                  <i className={info.Icon4}></i>
                </a>
              </div>
            </div>
            <div className="ms-5 mt-4 w-50">
              <button className="bg-warning p-2 rounded-pill text-white p-2">
                Contact Me
              </button>
              <button className="btn btn-outline-warning border-white px-4 rounded-2 text-white p-2">
                Heir
              </button>
            </div>
          </div>
          <div className="col-md-5" data-aos="fade-left">
            <img
              src={`http://127.0.0.1:8000/img/${info.ProfilePhoto}`}
              alt=""
              className="img-fluid rounded-circle border border-5 border-warning my-5 ms-5"
              id="mainImg"
            />
          </div>
        </div>
      </section>

      <section className="mt-4 container" style={{ marginBottom: "10%" }}>
        <h2 className="main-header text-uppercase text-warning fs-1 text-center">
          About Me
        </h2>
        <div className="line"></div>
        <p className="text-center w-75 mx-auto fs-5 text-white">
          Hi! I am Myat Thuta. I am from Myanmar and I am a junior full-stack
          developer. I can develop website and mobile application with popular
          font-end and back-end programming languages such as PHP,JavaScript
          Java and Kotlin. Moreover, I can use modern programming framework like
          laravel,React,Spring and BootStrap. I have 2 years experiences in web
          development and one year experiences in mobile application
          development.
        </p>

        <div className="row mx-auto mt-4 text-center w-75 text-white">
          {title.map((title, i) => {
            return <AboutInfo key={i} title={title} value={value[i]} />;
          })}
        </div>

        <div className="row mx-auto mt-4 text-center w-75 text-white" id="bYoe">
          <div className="col-md-3">
            <h4 className="text-warning">Experiencs</h4>
            <h6 className="text-uppercase">2 Years</h6>
          </div>
        </div>

        <div className="mx-auto mt-5 w-50 position-relative" id="dYoe">
          <div
            className="bg-warning mx-auto w-25 rounded-circle p-5"
            id="circle"
          >
            <p className="text-center position-absolute" id="experience">
              2
            </p>
            <p className="text-white fs-1 position-absolute top-1" id="yoe">
              Years Of experience
            </p>
          </div>
        </div>
      </section>

      <section className="container" style={{ marginBottom: "7%" }}>
        <h2 className="main-header text-uppercase text-warning fs-1 text-center">
          What I do?
        </h2>
        <div className="line"></div>
        <div className="row">
          <div
            className="col-lg-6"
            data-aos="fade-right"
            data-aos-duration="3000"
          >
            <div className="d-flex mt-2 border rounded-4 overflow-hidden border-1 border-white">
              <img
                src="img/w1.jpg"
                alt=""
                className="image-fluid border-0 CanImg h-auto"
              />
              <div className="p-2 mx-1 text-white">
                <h5 className="text-uppercase text-center text-warning">
                  Font-end development
                </h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati non placeat error quis, distinctio pariatur?Lorem
                  ipsum dolor
                </p>
              </div>
            </div>

            <div className="d-flex mt-2 border rounded-4 overflow-hidden border-1 border-white">
              <img
                src="img/w3.png"
                alt=""
                className="image-fluid border-0 CanImg h-auto"
              />
              <div className="p-2 mx-1 text-white">
                <h5 className="text-uppercase text-center text-warning">
                  UI/UX development
                </h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati non placeat error quis, distinctio pariatur?Lorem
                  ipsum dolor
                </p>
              </div>
            </div>

            <div className="d-flex mt-2 border rounded-4 overflow-hidden border-1 border-white">
              <img
                src="img/w5.jpg"
                alt=""
                className="image-fluid border-0 CanImg h-auto"
              />
              <div className="p-2 mx-1 text-white">
                <h5 className="text-uppercase text-center text-warning">
                  Database design development
                </h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati non placeat error quis, distinctio pariatur?Lorem
                  ipsum dolor
                </p>
              </div>
            </div>
          </div>

          <div
            className="col-lg-6"
            data-aos="fade-left"
            data-aos-duration="3000"
          >
            <div className="d-flex border rounded-4 overflow-hidden border-1 border-white">
              <img
                src="img/w2.jpg"
                alt=""
                className="image-fluid border-0 CanImg h-auto"
              />
              <div className="p-2 mx-1 text-white">
                <h5 className="text-uppercase text-center text-warning">
                  Back-end development
                </h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati non placeat error quis, distinctio pariatur?Lorem
                  ipsum dolor
                </p>
              </div>
            </div>

            <div className="d-flex mt-2 border rounded-4 overflow-hidden border-1 border-white">
              <img
                src="img/w4.jpg"
                alt=""
                className="image-fluid border-0 CanImg h-auto"
              />
              <div className="p-2 mx-1 text-white">
                <h5 className="text-uppercase text-center text-warning">
                  APP development
                </h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati non placeat error quis, distinctio pariatur?Lorem
                  ipsum dolor
                </p>
              </div>
            </div>

            <div className="d-flex mt-2 border rounded-4 overflow-hidden border-1 border-white">
              <img
                src="img/w6.png"
                alt=""
                className="image-fluid border-0 CanImg h-auto"
              />
              <div className="p-2 mx-1 text-white">
                <h5 className="text-uppercase text-center text-warning">
                  Desktop application development
                </h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati non placeat error quis, distinctio pariatur?Lorem
                  ipsum dolor
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="project"
        data-aos-anchor-placement="bottom-bottom"
        className="container py-5 overflow-hidden"
        style={{ marginBottom: "3%" }}
      >
        <h2 className="main-header text-uppercase text-warning fs-1 text-center">
          Previous Projects
        </h2>
        <div className="line"></div>

        <div id="my-project" className="carousel slide">
          <div className="container carousel-inner">
            {groupedProjects.map((group, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <div className="row gy-2">
                  {group.map((project, i) => (
                    <div key={i} className="col-lg-6">
                      <div className="card border-0 overflow-hidden bg-dark">
                        <div className="row">
                          <div className="col-sm-7 py-3 px-4">
                            <h4 className="text-white">
                              {project.ProjectName}
                            </h4>
                            <h6 className="badge text-bg-warning">
                              {project.ProjectType}
                            </h6>
                            <p className="text-white">
                              {project.ProjectDescription}
                            </p>
                            <div className="text-warning">
                              <a
                                href={project.ProjectLink}
                                className="btn btn-warning"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Project
                              </a>
                            </div>
                          </div>
                          <div className="col-sm-5">
                            <img
                              src={`http://127.0.0.1:8000/img/${project.ProjectProfile}`}
                              alt={project.ProjectName}
                              className="img-fluid border border-3 border-warning"
                              style={{
                                height: "300px",
                                objectFit: "cover",
                                width: "100%",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev justify-content-start"
            type="button"
            data-bs-target="#my-project"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon text-bg-warning"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next justify-content-end"
            type="button"
            data-bs-target="#my-project"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon text-bg-warning"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="mx-auto my-3" style={{ width: "10vw" }}>
          <a href="#" className="btn mx-auto btn-warning">
            See more <i className="bi bi-arrow-right-circle"></i>
          </a>
        </div>
      </section>

      <section
        id="faq"
        className="p-5"
        data-aos="zoom-out-left"
        data-aos-duration="3000"
      >
        <h2 className="main-header text-uppercase text-warning fs-1 text-center">
          Questions?
        </h2>
        <div className="line"></div>

        <div className="accordion w-75 mx-auto" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header text-white">
              <button
                className="accordion-button bg-warning text-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                What is your favourite programming language?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam inventore debitis veniam nulla maxime ea atque,
                  cumque, perferendis esse molestias error asperiores voluptate
                  dolore hic veritatis quo suscipit sed est.
                </p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button bg-warning collapsed text-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Are you skilled in team contribution?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta earum perspiciatis sequi quam ex ratione ducimus animi
                  minima, architecto, odio maiores neque, veniam tempora?
                  Perferendis odit id dicta deserunt distinctio!
                </p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button bg-warning collapsed text-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                What is your future plan?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Dolorem officiis repellendus nulla quod voluptas eveniet rerum
                voluptatum amet eius molestiae perspiciatis obcaecati unde fugit
                molestias at, odit quam. Obcaecati, assumenda!
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button bg-warning collapsed text-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                Which is your favourite between front-end and back-end?
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Dolorem officiis repellendus nulla quod voluptas eveniet rerum
                voluptatum amet eius molestiae perspiciatis obcaecati unde fugit
                molestias at, odit quam. Obcaecati, assumenda!
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button bg-warning collapsed text-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                Do you know UI/UX design principles?
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Dolorem officiis repellendus nulla quod voluptas eveniet rerum
                voluptatum amet eius molestiae perspiciatis obcaecati unde fugit
                molestias at, odit quam. Obcaecati, assumenda!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="w-100 overflow-hidden py-5" id="contact">
        <h2 className="main-header text-uppercase text-warning fs-1 text-center">
          Contact Me
        </h2>
        <div className="line"></div>
        <div className="row text-white w-100">
          <div
            className="col-lg-4"
            data-aos="fade-left"
            data-aos-duration="3000"
            style={{ marginLeft: "7%" }}
          >
            <div className="mt-2">
              <h1 className="fs-2">Let's get in touch!</h1>
              <p className="text-left w-75 text-warning">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi
                repellat amet pariatur explicabo reiciendis nulla.
              </p>
            </div>

            <div className="mt-3">
              <h2 className="fs-4">
                <i className="bi bi-envelope-open-fill fs-5 me-3"></i>Email
                Address
              </h2>
              <a href="" className="text-warning">
                myatthuta232@gmail.com
              </a>
            </div>

            <div className="mt-3">
              <h2 className="fs-4">
                <i className="bi bi-telephone-fill fs-5 me-3"></i>Phone Number
              </h2>
              <a href="" className="text-warning">
                Call me:{" "}
                <a href="" className="text-warning">
                  +959407692392
                </a>
              </a>
            </div>

            <div className="w-25 mt-3">
              <h2 className="fs-4">CV</h2>
              <div className="w-100">
                <button className="btn-warning w-100 btn px-4 py-1">
                  Download CV
                </button>
              </div>
            </div>

            <div className="w-50 mt-3">
              <h2 className="fs-4">
                <i className="bi bi-link-45deg fs-6 me-1"></i>Click links
              </h2>
              <div className="w-50 d-flex justify-content-around">
                <a href="" className="text-white">
                  <i className="bi bi-github"></i>
                </a>
                <a href="" className="text-white">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="" className="text-white">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="" className="text-white">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="" className="text-white">
                  <i className="bi bi-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>

          <div
            className="col-lg-6"
            data-aos="fade-right"
            data-aos-duration="3000"
          >
            <h1 className="fs-3 text-center">Send me message for contact...</h1>
            <form action="">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput" style={{ color: "black" }}>
                  Please type your email address...
                </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword" style={{ color: "black" }}>
                  Please type your Name...
                </label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword" style={{ color: "black" }}>
                  Please type your Phone Number...
                </label>
              </div>

              <div className="form-floating">
                <textarea
                  className="form-control"
                  style={{ height: "25vh" }}
                  placeholder="Leave a comment here"
                  id="floatingTextarea"
                ></textarea>
                <label htmlFor="floatingTextarea" style={{ color: "black" }}>
                  Please type message....
                </label>
              </div>
              <button className="btn-warning btn py-2 px-4 mt-2">Submit</button>
            </form>
          </div>
        </div>
      </section> */}

      <footer id="footer" className="container-fluid p-5 text-light">
        <div className="row g-5">
          <div className="col-md-4">
            <div className="sub-heading text-center text-warning fs-4 text-uppercase">
              About Me
            </div>
            <div className="heading-line"></div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              unde cumque voluptate mollitia quas veritatis sapiente, adipisci
              autem. Perferendis, iure. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Cum, provident.
            </p>
            <div>
              <a href="" className="btn mx-1 btn-outline-warning text-white">
                <i className="bi bi-github"></i>
              </a>
              <a href="" className="btn mx-1 btn-outline-warning text-white">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="" className="btn mx-1 btn-outline-warning text-white">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="" className="btn mx-1 btn-outline-warning text-white">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="" className="btn mx-1 btn-outline-warning text-white">
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="sub-heading text-uppercase text-center fs-4 text-warning">
              Quick Contact
            </div>
            <div className="heading-line"></div>
            <ul>
              <li>
                <i className="bi bi-telephone text-warning"></i>+95 92282882
              </li>
              <li>
                <i className="bi bi-envelope text-warning"></i>
                myatthtua232@gmail.com
              </li>
              <li>
                <i className="bi bi-globe-americas text-warning"></i>
                <a href="" className="text-white">
                  www.myatportfolio.com
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <div className="sub-heading text-uppercase text-center fs-4 text-warning">
              Send Us a Message
            </div>
            <div className="heading-line"></div>
            <form action="">
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control border border-danger"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button className="btn btn-warning">
                <i className="bi bi-send"></i> Send
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <section id="copyright" className="container-fluid text-light p-5">
          <p className="text-center text-white">
            &copy; Copyright 2024 & All Rights Reserved
          </p>
        </section>
      </footer>
    </div>
  );
}

export default Intro;
