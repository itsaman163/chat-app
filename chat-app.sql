-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 15, 2025 at 09:39 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `discord_master`
--

CREATE TABLE `discord_master` (
  `iDiscordMasterId` int(11) NOT NULL,
  `vShortCode` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `discord_master`
--

INSERT INTO `discord_master` (`iDiscordMasterId`, `vShortCode`) VALUES
(1, 'gaming_discord');

-- --------------------------------------------------------

--
-- Table structure for table `discord_message`
--

CREATE TABLE `discord_message` (
  `iDiscordMessageId` int(11) NOT NULL,
  `iSysRecDeleted` int(11) NOT NULL,
  `iAdminId` int(11) NOT NULL,
  `iDiscordMasterId` int(11) NOT NULL,
  `tMessage` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `discord_message`
--

INSERT INTO `discord_message` (`iDiscordMessageId`, `iSysRecDeleted`, `iAdminId`, `iDiscordMasterId`, `tMessage`) VALUES
(1, 0, 1, 1, 'test'),
(2, 0, 1, 1, 'sdd'),
(3, 1, 1, 1, 'sdsd'),
(4, 0, 1, 1, 'asasa'),
(5, 0, 1, 1, 'sdsds'),
(6, 0, 2, 1, 'sdsd'),
(7, 0, 1, 1, 'sdsd'),
(8, 0, 1, 1, 'sdsdsdsds'),
(9, 0, 1, 1, 'test'),
(10, 0, 1, 1, 'test'),
(11, 0, 1, 1, 'aman'),
(12, 0, 1, 1, 'ram'),
(13, 0, 2, 1, 'syamdsd');

-- --------------------------------------------------------

--
-- Table structure for table `mod_user`
--

CREATE TABLE `mod_user` (
  `iAdminId` int(11) NOT NULL,
  `vName` varchar(255) NOT NULL,
  `eStatus` enum('Active','Inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mod_user`
--

INSERT INTO `mod_user` (`iAdminId`, `vName`, `eStatus`) VALUES
(1, 'Aman', 'Active'),
(2, 'Raj', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `user_discord_transition`
--

CREATE TABLE `user_discord_transition` (
  `iUserDiscordTransitionId` int(11) NOT NULL,
  `iDiscordMasterId` int(11) NOT NULL,
  `iAdminId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_discord_transition`
--

INSERT INTO `user_discord_transition` (`iUserDiscordTransitionId`, `iDiscordMasterId`, `iAdminId`) VALUES
(1, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `discord_master`
--
ALTER TABLE `discord_master`
  ADD PRIMARY KEY (`iDiscordMasterId`);

--
-- Indexes for table `discord_message`
--
ALTER TABLE `discord_message`
  ADD PRIMARY KEY (`iDiscordMessageId`),
  ADD KEY `iAdminId` (`iAdminId`),
  ADD KEY `iDiscordMasterId` (`iDiscordMasterId`);

--
-- Indexes for table `mod_user`
--
ALTER TABLE `mod_user`
  ADD PRIMARY KEY (`iAdminId`);

--
-- Indexes for table `user_discord_transition`
--
ALTER TABLE `user_discord_transition`
  ADD PRIMARY KEY (`iUserDiscordTransitionId`),
  ADD KEY `iDiscordMasterId` (`iDiscordMasterId`),
  ADD KEY `iAdminId` (`iAdminId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `discord_master`
--
ALTER TABLE `discord_master`
  MODIFY `iDiscordMasterId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `discord_message`
--
ALTER TABLE `discord_message`
  MODIFY `iDiscordMessageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `mod_user`
--
ALTER TABLE `mod_user`
  MODIFY `iAdminId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_discord_transition`
--
ALTER TABLE `user_discord_transition`
  MODIFY `iUserDiscordTransitionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
