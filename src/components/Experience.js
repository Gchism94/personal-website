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
  style={{ scaleY: scrollYProgress }}
  className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top 
  md:w-[2px] md:left-[30px] xs:left-[20px] dark:bg-primaryDark dark:shadow-3xl
  "
/>

        <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
          <Details
            position="Assistant Professor of Practice"
            company="UArizona"
            companyLink="https://ischool.arizona.edu/person/greg-chism"
            time="2023–Present"
            address="Tucson, AZ"
            work="Evaluate empirical evidence and methodological approaches to guide research design and decision-oriented data science initiatives. Lead applied, project-based work emphasizing reproducibility, uncertainty-aware interpretation, and clear communication of findings for practical decisions."
          />

          <Details
            position="Data Science Educator"
            company="UArizona"
            companyLink="https://datascience.arizona.edu/"
            time="2022–2023"
            address="Tucson, AZ"
            work="Supported the University of Arizona Data Science Institute’s education and research enablement efforts by mentoring researchers in evidence-driven analytical methods, reproducible workflows, and careful interpretation under uncertainty. Advised 40+ graduate students and postdocs on strengthening research quality and decision relevance."
          />

          <Details
            position="Research Scientist"
            company="UArizona"
            companyLink="https://socialinsectlab.arizona.edu/"
            time="2017–2022"
            address="Tucson, AZ"
            work="Designed and executed interdisciplinary empirical research aimed at generating robust, decision-relevant evidence. Built reproducible analysis pipelines (including Binder containers via GitHub Actions) to improve transparency, reliability, and collaboration."
          />

          <Details
            position="Research Assistant"
            company="UC Santa Barbara"
            companyLink="https://parasitology.msi.ucsb.edu/"
            time="2014–2017"
            address="Santa Barbara, CA"
            work="Contributed to applied research projects, including a Red Cross–facing initiative in Central America, using empirically driven data collection to support humanitarian decision-making. Co-authored peer-reviewed publications and maintained reproducible datasets to ensure reliable downstream analysis."
          />
        </ul>
      </div>
    </div>
  );
};

export default Experience;
