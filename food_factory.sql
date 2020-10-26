-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Oct 26, 2020 at 07:52 AM
-- Server version: 5.7.17
-- PHP Version: 7.0.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food_factory`
--

-- --------------------------------------------------------

--
-- Table structure for table `foods`
--

CREATE TABLE `foods` (
  `Food_Id` int(11) NOT NULL,
  `Food_Name` varchar(100) NOT NULL,
  `Cost_Of_Production` float(10,2) NOT NULL,
  `Selling_Cost` float(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `foods`
--

INSERT INTO `foods` (`Food_Id`, `Food_Name`, `Cost_Of_Production`, `Selling_Cost`) VALUES
(1, 'Food1', 30000.00, 25000.00),
(2, 'Food2', 1000.00, 1200.00);

-- --------------------------------------------------------

--
-- Table structure for table `food_factory_users`
--

CREATE TABLE `food_factory_users` (
  `User_Id` int(11) NOT NULL,
  `Email_Address` varchar(100) NOT NULL,
  `Password` varchar(1500) NOT NULL,
  `User_Status` varchar(25) DEFAULT NULL,
  `First_Name` varchar(50) NOT NULL,
  `Last_Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `food_factory_users`
--

INSERT INTO `food_factory_users` (`User_Id`, `Email_Address`, `Password`, `User_Status`, `First_Name`, `Last_Name`) VALUES
(11, 'megaladev@gmail.com', '6f8ca04ec0a6f55a87a56117a52ce4423460456d70d272da89993b5f2c459c402c3829362b3107bf673fb15f9a37a05f244cb63dcced475af874e3e524bcbca7c5668a8a3bfdfdfb1b2dbb6821d7016e998ffdded89d88101f454ca2fe140dd1e8c21d255c34115ffb', 'Inactive', 'Manimekakai', 'Devaraj');

-- --------------------------------------------------------

--
-- Table structure for table `food_orders`
--

CREATE TABLE `food_orders` (
  `Order_Id` int(11) NOT NULL,
  `User_Id` int(11) NOT NULL,
  `Amount` float(10,2) NOT NULL,
  `Date` datetime NOT NULL,
  `Food_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `food_orders`
--

INSERT INTO `food_orders` (`Order_Id`, `User_Id`, `Amount`, `Date`, `Food_Id`) VALUES
(1, 11, 25000.00, '2020-10-26 09:00:00', 1),
(2, 11, 1200.00, '2020-10-26 12:00:00', 2);

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `Ingredient_Id` int(11) NOT NULL,
  `Ingredient_Name` varchar(100) NOT NULL,
  `Vendor_Id` int(11) NOT NULL,
  `Threshold_Quantity` float(10,2) DEFAULT NULL,
  `Available_Quantity` float(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`Ingredient_Id`, `Ingredient_Name`, `Vendor_Id`, `Threshold_Quantity`, `Available_Quantity`) VALUES
(1, 'Salt', 1, 1000.00, 800.00),
(2, 'Chilly', 2, 500.00, 600.00),
(3, 'Ginger', 2, 400.00, 350.00),
(4, 'Salt', 1, 100.00, 1000.00);

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `Vendor_Id` int(11) NOT NULL,
  `Vendor_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`Vendor_Id`, `Vendor_name`) VALUES
(1, 'TTS Foods'),
(2, 'Premier Super market');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `foods`
--
ALTER TABLE `foods`
  ADD PRIMARY KEY (`Food_Id`);

--
-- Indexes for table `food_factory_users`
--
ALTER TABLE `food_factory_users`
  ADD PRIMARY KEY (`User_Id`),
  ADD UNIQUE KEY `Email_Address` (`Email_Address`);

--
-- Indexes for table `food_orders`
--
ALTER TABLE `food_orders`
  ADD PRIMARY KEY (`Order_Id`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`Ingredient_Id`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`Vendor_Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `foods`
--
ALTER TABLE `foods`
  MODIFY `Food_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `food_factory_users`
--
ALTER TABLE `food_factory_users`
  MODIFY `User_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `food_orders`
--
ALTER TABLE `food_orders`
  MODIFY `Order_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `Ingredient_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `Vendor_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
