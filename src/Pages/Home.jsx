import React from 'react';
import Banner from '../Components/Banner/Banner';
import LatestJobs from '../Components/LatestJobs/LatestJobs';
import TopCategories from '../Components/Static/TopCategories';
import AboutFreelify from '../Components/Static/AboutFreelify';
import Features from '../Components/Static/Features';
import Statistics from '../Components/Static/Statistics';
import Testimonials from '../Components/Static/Testimonials';
import WhyChooseUs from '../Components/Static/WhyChooseUs';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LatestJobs></LatestJobs>
      <TopCategories></TopCategories>
      <Features></Features>
      <AboutFreelify></AboutFreelify>
      <Statistics></Statistics>
      <Testimonials></Testimonials>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
};

export default Home;

