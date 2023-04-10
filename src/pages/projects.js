import AnimatedText from "@/components/AnimatedText";
import { GithubIcon } from "@/components/Icons";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import project1 from "../../public/images/projects/2022_Chism_TemnoNestArch_featured.png";
import project2 from "../../public/images/projects/2022_Chism_TemnoPerf_featured.png";
import project3 from "../../public/images/projects/2022_Chism_HumidityTemno_featured.png";
import project4 from "../../public/images/projects/2020_Rice_ABCTracker_featured.png";
import project5 from "../../public/images/projects/2017_Lichtenstein_BeachSpider_featured.png";
import project6 from "../../public/images/projects/2021_Davis_FlyEggBurying_featured.png";
import { motion } from "framer-motion";
import TransitionEffect from "@/components/TransitionEffect";

const FramerImage = motion(Image);

const FeaturedProject = ({ type, title, summary, img, link, github }) => {
  return (
    <article
      className="w-full flex items-center justify-between relative  rounded-br-2xl
        rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12 dark:bg-dark dark:border-light
        lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4"
    >
      <div
        className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark dark:bg-light
    rounded-br-3xl xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]
    "
      />
      <Link
        href={link}
        target="_blank"
        className="w-1/2 cursor-pointer overflow-hidden rounded-lg lg:w-full"
      >
        <FramerImage
          src={img}
          alt={title}
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          priority
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              50vw"
        />
      </Link>

      <div className="w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
        <span className="text-primary font-medium text-xl dark:text-primaryDark xs:text-base">
          {type}
        </span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-4xl font-bold dark:text-light lg:text-3xl xs:text-2xl">
            {title}
          </h2>
        </Link>
        <p className="my-2 font-medium text-dark dark:text-light sm:text-sm">
          {summary}
        </p>
        <div className="mt-2 flex items-center">
          <Link href={github} target="_blank" className="w-10">
            {" "}
            <GithubIcon />
          </Link>
          <Link
            href={link}
            target="_blank"
            className="ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold
            dark:bg-light dark:text-dark
            sm:px-4 sm:text-base
            "
          >
            Visit Project
          </Link>
        </div>
      </div>
    </article>
  );
};

const Project = ({ title, type, img, link, github }) => {
  return (
    <article
      className="w-full flex flex-col items-center justify-center rounded-2xl 
    border border-solid border-dark bg-light p-6 relative dark:bg-dark dark:border-light xs:p-4
    "
    >
      <div
        className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark
    rounded-br-3xl dark:bg-light md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]
    "
      />
      <Link
        href={link}
        target="_blank"
        className="w-full cursor-pointer overflow-hidden rounded-lg"
      >
        <FramerImage
          src={img}
          alt={title}
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
      </Link>

      <div className="w-full flex flex-col items-start justify-between mt-4">
        <span className="text-primary font-medium text-xl dark:text-primaryDark lg:text-lg md:text-base">
          {type}
        </span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-3xl font-bold lg:text-2xl">
            {title}
          </h2>
        </Link>

        <div className="w-full flex items-center justify-between">
          <Link
            href={link}
            target="_blank"
            className="text-lg font-semibold underline md:text-base"
          >
            Visit
          </Link>
          <Link href={github} target="_blank" className="w-8 md:w-6">
            <GithubIcon />
          </Link>
        </div>
      </div>
    </article>
  );
};

const projects = () => {
  return (
    <>
      <Head>
        <title>Personal Portfolio of Dr. Greg Chism | Projects Page</title>
        <meta
          name="description"
          content="Stories are an important component of human evolution, I help researchers tell stories through their data."
        />
      </Head>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="Empowering insights through data-driven narratives."
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          />

          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
            <div className="col-span-12">
              <FeaturedProject
                type="Featured Project"
                title="Nest shape influences colony organization in ants."
                summary="How the shape of a nest can impact the behavior of the ant colony that inhabits it. We examined the spatial organization of rock ants in two artificial nests with different internal shapes, and found that overall distributions of colony members were influenced by nest shape. However, individual spatial fidelity zone size was not affected by nest shape, despite varying as a function of distance from the nest entrance and brood center. We conclude that physical properties of nests can influence the in-nest spatial organization of ant colonies, and highlights the need to explore nest shape as a direct influence on the organization, movement, and communication of the inhabiting ant colony."
                img={project1}
                link="https://www.biorxiv.org/content/biorxiv/early/2022/07/02/2022.06.30.498314.full.pdf"
                github="https://github.com/Gchism94/NestArchOrg"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                type="Research Project"
                title="Nest shape does not affect ant colony performance against a nest invader"
                img={project2}
                link="https://zenodo.org/record/6872019#.ZDMgL0LMKnA"
                github="https://github.com/Gchism94/AntColonyPerformance"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                type="Research Project"
                title="Temnothorax rugatulus ants do not change their nest walls in response to environmental humidity"
                img={project3}
                link="https://www.biorxiv.org/content/10.1101/2022.06.30.497551v1"
                github="https://github.com/Gchism94/HumidityProject"
              />
            </div>

            <div className="col-span-12">
              <FeaturedProject
                type="Software Development"
                title="ABCTracker: an easy-to-use, cloud-based application for tracking multiple objects"
                summary="Visual multi-object tracking has the potential to accelerate many forms of quantitative analyses, especially in research communities investigating the motion, behavior, or social interactions within groups of animals. Despite its potential for increasing analysis throughput, complications related to accessibility, adaptability, accuracy, or scalable application arise with existing tracking systems. Several iterations of prototyping and testing have led us to a multiobject tracking system – ABCTracker – that is: accessible in both system as well as technical knowledge requirements, easily adaptable to new videos, and capable of producing accurate tracking data through a mixture of automatic and semi-automatic tracking features."
                img={project4}
                link="https://www.abctracker.org/"
                github=""
              />
            </div>

            <div className="col-span-6 sm:col-span-12">
              <Project
                type="Research Project"
                img={project5}
                title="Intraindividual Behavioral Variability Predicts Foraging Outcome in a Beach-dwelling Jumping Spider"
                link="https://www.nature.com/articles/s41598-017-18359-x"
                github=""
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                type="Research Project"
                img={project6}
                title="A hymenopteran odorant alerts flies to bury eggs"
                link="https://www.biorxiv.org/content/10.1101/2021.09.30.462443v2"
                github=""
              />
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default projects;
