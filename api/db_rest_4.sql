-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: mysqlserver:3306
-- Generation Time: Jun 10, 2019 at 02:14 AM
-- Server version: 8.0.16
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_rest`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id_category` smallint(6) NOT NULL,
  `name` varchar(32) NOT NULL,
  `english` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id_category`, `name`, `english`) VALUES
(1, 'Comida', 'Food'),
(2, 'Bebida', 'Drink'),
(3, 'Postre', 'Dessert');

-- --------------------------------------------------------

--
-- Table structure for table `dining_table`
--

CREATE TABLE `dining_table` (
  `id_dining_table` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `name` varchar(32) DEFAULT NULL,
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dining_table`
--

INSERT INTO `dining_table` (`id_dining_table`, `number`, `name`, `status`) VALUES
(1, 1, 'Centro', 1),
(2, 2, 'Esquina', 1),
(3, 3, '  Derecha', 1),
(4, 4, ' Esquina inferior', 1);

-- --------------------------------------------------------

--
-- Table structure for table `food_order`
--

CREATE TABLE `food_order` (
  `id_food_order` int(11) NOT NULL,
  `id_dining_table` int(11) DEFAULT NULL,
  `id_food_order_type` tinyint(4) NOT NULL,
  `total` decimal(11,2) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `food_order`
--

INSERT INTO `food_order` (`id_food_order`, `id_dining_table`, `id_food_order_type`, `total`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '0.00', 1, '2019-06-09 23:21:14', '2019-06-09 23:21:14'),
(2, 2, 1, '0.00', 1, '2019-06-09 23:23:26', '2019-06-09 23:23:26'),
(3, 3, 1, '0.00', 1, '2019-06-10 00:13:53', '2019-06-10 00:13:53'),
(4, 4, 1, '0.00', 1, '2019-06-10 02:09:57', '2019-06-10 02:09:57');

-- --------------------------------------------------------

--
-- Table structure for table `food_order_description`
--

CREATE TABLE `food_order_description` (
  `id_food_order_description` int(11) NOT NULL,
  `id_food_order` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `product_name` text NOT NULL,
  `price` decimal(11,2) NOT NULL,
  `total` decimal(11,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `food_order_type`
--

CREATE TABLE `food_order_type` (
  `id_food_order_type` tinyint(4) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `food_order_type`
--

INSERT INTO `food_order_type` (`id_food_order_type`, `description`) VALUES
(1, 'Mesa'),
(2, 'Llevar');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id_product` int(11) NOT NULL,
  `id_category` smallint(11) NOT NULL,
  `id_unit` smallint(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` text NOT NULL,
  `quantity_package` varchar(50) NOT NULL,
  `price` double(11,2) NOT NULL,
  `image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id_product`, `id_category`, `id_unit`, `code`, `name`, `quantity_package`, `price`, `image_url`, `status`, `created_at`, `updated_at`) VALUES
(21, 1, 1, '000001', ' Pizza mediana', ' 1', 57.00, NULL, 1, NULL, NULL),
(22, 1, 1, '00002', ' Alitas', ' .500', 70.00, NULL, -1, NULL, NULL),
(23, 1, 1, '00002', ' Hamburgesa', ' 1', 50.00, NULL, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `unit`
--

CREATE TABLE `unit` (
  `id_unit` smallint(6) NOT NULL,
  `name` varchar(32) NOT NULL,
  `abbreviation` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `unit`
--

INSERT INTO `unit` (`id_unit`, `name`, `abbreviation`) VALUES
(1, 'Kilogramo', 'Kg'),
(2, 'Litro', 'L');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indexes for table `dining_table`
--
ALTER TABLE `dining_table`
  ADD PRIMARY KEY (`id_dining_table`);

--
-- Indexes for table `food_order`
--
ALTER TABLE `food_order`
  ADD PRIMARY KEY (`id_food_order`),
  ADD KEY `id_dining_table` (`id_dining_table`,`id_food_order_type`),
  ADD KEY `id_food_order_type` (`id_food_order_type`);

--
-- Indexes for table `food_order_description`
--
ALTER TABLE `food_order_description`
  ADD PRIMARY KEY (`id_food_order_description`),
  ADD KEY `id_food_order` (`id_food_order`,`id_product`),
  ADD KEY `id_product` (`id_product`);

--
-- Indexes for table `food_order_type`
--
ALTER TABLE `food_order_type`
  ADD PRIMARY KEY (`id_food_order_type`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `id_package_type` (`id_category`,`id_unit`),
  ADD KEY `id_unit` (`id_unit`);

--
-- Indexes for table `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`id_unit`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id_category` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `dining_table`
--
ALTER TABLE `dining_table`
  MODIFY `id_dining_table` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `food_order`
--
ALTER TABLE `food_order`
  MODIFY `id_food_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `food_order_description`
--
ALTER TABLE `food_order_description`
  MODIFY `id_food_order_description` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `food_order_type`
--
ALTER TABLE `food_order_type`
  MODIFY `id_food_order_type` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `unit`
--
ALTER TABLE `unit`
  MODIFY `id_unit` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `food_order`
--
ALTER TABLE `food_order`
  ADD CONSTRAINT `food_order_ibfk_1` FOREIGN KEY (`id_dining_table`) REFERENCES `dining_table` (`id_dining_table`),
  ADD CONSTRAINT `food_order_ibfk_2` FOREIGN KEY (`id_food_order_type`) REFERENCES `food_order_type` (`id_food_order_type`);

--
-- Constraints for table `food_order_description`
--
ALTER TABLE `food_order_description`
  ADD CONSTRAINT `food_order_description_ibfk_1` FOREIGN KEY (`id_food_order`) REFERENCES `food_order` (`id_food_order`),
  ADD CONSTRAINT `food_order_description_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `product` (`id_product`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`id_unit`) REFERENCES `unit` (`id_unit`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
