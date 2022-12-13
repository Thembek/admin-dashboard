import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, useMediaQuery } from '@mui/material';
import { useGetUserQuery } from '../../state/api';

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/'