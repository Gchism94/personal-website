import React, { useRef } from "react";
import {motion, useScroll } from "framer-motion"
import LiIcon from "./LiIcon";

const Details = ({ position, company, companyLink, time, address, work }) => {
    const ref = useRef(null);
  return (
    <li ref={ref} className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between md:w-[80%]">
      
      <LiIcon reference={ref}/>
      <motion.div
      initial={{y:50}}
      whileInView={{y:0}}
      transition={{duration:0.5, type:"spring"}}
      >
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">
          {position}&nbsp;
          <a
            href={companyLink}
            target="_blank"
            className="text-primary dark:text-primaryDark capitalize"
          >
            @{company}
          </a>
        </h3>
        <span className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm">
          {time} | {address}
        </span>
        <p className="font-medium w-full md:text-sm">{work}</p>
      </motion.div>
    </li>
  );
};

const Experience = () => {
    const ref = useRef(null);
    const {scrollYProgress} = useScroll(
        {
            target: ref,
            offset: ["start end", "center start"]
        }
    )
  return (
    <div className="my-64">
      <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
        Experience
      </h2>

      <div ref={ref} className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">

<motion.div
style={{scaleY: scrollYProgress}}
  className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top 
  md:w-[2px] md:left-[30px] xs:left-[20px] dark:bg-primaryDark dark:shadow-3xl
  "  />

        <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
        <Details
              position="Data Science Educator"
              company="UArizona"
              companyLink="https://datascience.arizona.edu/"
              time="2022-Present"
              address="Tucson, AZ"
              work="Worked on a team responsible for establishing the UArizona Data Science Institute's education efforts, including mentoring over 40 graduate students and post docs in open, reproducible science."
            />

            <Details
              position="Research Scientist"
              company="UArizona"
              companyLink="https://socialinsectlab.arizona.edu/"
              time="2017-2022"
              address="Tucson, AZ"
              work="Completed a novel interdisciplinary dissertation which led to three manuscript and three reproducible Binder containers via GitHub actions."
            />

            <Details
              position="Research Assistant"
              company="UC Santa Barbara"
              companyLink="https://parasitology.msi.ucsb.edu/"
              time="2014-2017"
              address="Santa Barbara, CA"
              work="Authored 3 scientific publications, built and maintained 5 reproducible novel data sets."
            />
        </ul>
      </div>
    </div>
  );
};

export default Experience;
