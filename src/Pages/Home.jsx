import React from 'react';
import Banner from '../Components/Banner/Banner';
import LatestJobs from '../Components/LatestJobs/LatestJobs';
import TopCategories from '../Components/Static/TopCategories';
import AboutFreelify from '../Components/Static/AboutFreelify';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LatestJobs></LatestJobs>
      <TopCategories></TopCategories>
      <AboutFreelify></AboutFreelify>
    </div>
  );
};

export default Home;
