import React from 'react';
import Sidebar, { SidebarItem } from '../components/SideBar';
import { useNavigate } from 'react-router-dom';
import {
  LifeBuoy,
  Receipt,
  Boxes,
  Package,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
  FileX,
} from 'lucide-react';

import VideoComp from '../components/VideoComp';
import { Typography } from '@mui/material';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const handleDirectoryClick = () => {
    console.log("Clicked ");
  };
  const videoData = [
    {
      id: 1,
      youtubeVideoId: 'kxfNza6Q1sA', // YouTube video ID
      title: 'Overcoming Past Regrets',
      description: 'Healthy gamer gg - Youtube',
      previewImage: '/img1.jpg', // URL to the video's preview image
    },
    {
      id: 2,
      youtubeVideoId: 'nCrjevx3-Js',
      title: 'Talking Mental Health',
      description: 'Anna Freud - Youtube',
      previewImage: '/img2.jpg',
    },
    {
      id: 3,
      youtubeVideoId: '8Su5VtKeXU8',
      title: 'How to cope with depression ',
      description: 'The school of life - Youtube',
      previewImage: '/img3.jpg',
    },
    // Add more video objects as needed
  ];

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" alert />
        <SidebarItem icon={<BarChart3 size={20} />} text="Meditation" active />
        <SidebarItem icon={<UserCircle size={20} />} text="Chatbot" />
        <SidebarItem icon={<Receipt size={20} />} text="Directory" />
      </Sidebar>

      <div style={{ flex: 1, padding: '20px' }}>
        <Typography variant='h2' style={{display: 'flex', justifyContent: 'center'}}> Welcome Back !</Typography>
        {/* Add your content here */}
        <Typography variant='h5' style={{display: 'flex', justifyContent: 'center', marginTop: '3rem'}}>Recommended Videos</Typography>
        <VideoComp videoData={videoData} />
      </div>
    </div>
  );
};

export default DashboardLayout;

