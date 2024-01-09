import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import article1 from "../../public/images/articles/info526Logo.png";
import article2 from "../../public/images/articles/info523Logo.png";
import article3 from "../../public/images/articles/EDA_Plot.jpg";
import article4 from "../../public/images/articles/EDA_Python_Plot.png";
import article5 from "../../public/images/articles/rrtools_repro-research.jpeg";
import article6 from "../../public/images/articles/KEYS-featured.jpg";
import article7 from "../../public/images/articles/unix-featured.png";
import article8 from "../../public/images/articles/SQL-featured.png";
import TransitionEffect from "@/components/TransitionEffect";

const FramerImage = motion(Image);

const MovingImg = ({ title, img, link }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgRef = useRef(null);

  function handleMouse(event) {
    imgRef.current.style.display = "inline-block";
    x.set(event.pageX);
    y.set(-10);
  }

  function handleMouseLeave(event) {
    imgRef.current.style.display = "none";
    x.set(0);
    y.set(0);
  }

  return (
    <Link
      href={link}
      target="_blank"
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="capitalize text-xl font-semibold hover:underline">
        {title}
      </h2>
      <FramerImage
        style={{ x: x, y: y }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
        ref={imgRef}
        src={img}
        alt={title}
        className="z-10 w-96 h-auto hidden absolute rounded-lg md:!hidden"
      />
    </Link>
  );
};

const Article = ({ img, title, date, link }) => {
  return (
    <motion.li
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      viewport={{ once: true }}
      className="relative w-full p-4 py-6 my-2 rounded-xl flex items-center
        justify-between bg-light text-dark first:mt-0 border border-solid border-dark
        border-r-4 border-b-4 dark:border-light dark:bg-dark dark:text-light
        sm:flex-col
        "
    >
      <MovingImg title={title} img={img} link={link} />
      <span className="text-primary font-semibold pl-4 dark:text-primaryDark sm:self-start sm:pl-0 xs:text-sm">
        {date}
      </span>
    </motion.li>
  );
};

const FeaturedArticle = ({ img, title, time, summary, link }) => {
  return (
    <li className="relative col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl dark:bg-dark dark:border-light">
      <div
        className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark
    rounded-br-3xl
    "
      />
      <Link
        href={link}
        target="_blank"
        className="w-full inline-block cursor-pointer overflow-hidden rounded-lg"
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
      <Link href={link} target="_blank">
        <h2 className="capitalize text-2xl font-bold my-2 mt-4 hover:underline xs:text-lg">
          {title}
        </h2>
      </Link>
      <p className="text-sm mb-2">{summary}</p>
      <span className="text-primary font-semibold dark:text-primaryDark">
        {time}
      </span>
    </li>
  );
};

const articles = () => {
  return (
    <>
      <Head>
        <title>Personal Portfolio of Dr. Greg Chism | Articles Page</title>
        <meta
          name="description"
          content="Stories are an important component of human evolution, I help researchers tell stories through their data."
        />
      </Head>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="Unlocking potential by illuminating the path to data literacy."
            className="mb-16
          lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl
          "
          />
          <ul className="grid grid-cols-2 gap-16 lg:gap-8 md:grid-cols-1 md:gap-y-16">
            <FeaturedArticle
              img={article1}
              title="INFO 526: Data Analysis and Visualization"
              time=""
              summary="INFO 526 Data Analysis and Visualization - This course provides an overview of the various concepts and skills required for effective data visualization. It presents principles of graphic design, programming skills, and statistical knowledge required to build compelling visualizations that communicate effectively to target audiences."
              link="https://datavizaz.org/"
            />

            <FeaturedArticle
              img={article2}
              title="INFO 523: Data Mining and Discovery"
              time=""
              summary="INFO 523 Data Mining and Discovery- This course will introduce students to the concepts and techniques of data mining for knowledge discovery. It includes methods developed in the fields of statistics, large-scale data analytics, machine learning, pattern recognition, database technology and artificial intelligence for automatic or semi-automatic analysis of large quantities of data to extract previously unknown patterns."
              link="https://datamineaz.org/"
            />
          </ul>
          <h2 className="font-bold text-4xl w-full text-center my-16 mt-32">
            All Articles
          </h2>
          <ul className="flex flex-col items-center relative">
            <Article
              title="Exploratory Data Analysis in R Book"
              img={article3}
              date=""
              link="https://gchism94.github.io/Data7_EDA_In_R_Workshops/"
            />
            <Article
              title="Exploratory Data Analysis in Python Book"
              img={article4}
              date=""
              link="https://gchism94.github.io/Data7_EDA_In_Python_Book/"
            />
            <Article
              title="Data7 Reproducible Research with GitHub and RStudio Workshop Series"
              img={article5}
              date=""
              link="https://gchism94.github.io/Data7-rrtools-repro-research/"
            />
            <Article
              title="Data7 KEYS Internship Open Science and Machine Learning materials"
              img={article6}
              date=""
              link="https://github.com/Gchism94/DSI-KEYS2022-DataSci/"
            />
            <Article
              title="Data7 Exploratory Data Analysis in SQL"
              img={article7}
              date=""
              link="https://gchism94.github.io/Data7_EDA_In_SQL/"
            />
            <Article
              title="Data7 Exploratory Data Analysis in Unix Shell"
              img={article8}
              date=""
              link="https://gchism94.github.io/Data7_EDA_In_Shell/"
            />
          </ul>
        </Layout>
      </main>
    </>
  );
};

export default articles;
