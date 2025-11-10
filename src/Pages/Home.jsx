import React from 'react';
import Banner from '../Components/Banner/Banner';
import LatestJobs from '../Components/LatestJobs/LatestJobs';
import TopCategories from '../Components/Static/TopCategories';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LatestJobs></LatestJobs>
      <TopCategories></TopCategories>
    </div>
  );
};

export default Home;
