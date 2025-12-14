-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2025 at 03:00 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dept_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(140) NOT NULL,
  `email` varchar(254) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `subject` varchar(120) NOT NULL DEFAULT 'General Inquiry',
  `message` text NOT NULL,
  `status` enum('new','read','closed') NOT NULL DEFAULT 'new',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `user_id`, `name`, `email`, `phone`, `subject`, `message`, `status`, `created_at`) VALUES
(1, 1, 'Smith', 'smith@yahoo.com', '03121245126', 'Order Issue', 'My order hasn\'t been delivered yet.', 'new', '2025-12-13 23:31:56'),
(2, 1, 'Charles', 'charles@yahoo.com', '03124589561', 'Delivery / Shipping', 'Hello! I haven\'t received my order yet.', 'new', '2025-12-14 00:25:45');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` varchar(40) NOT NULL DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total`, `status`, `created_at`) VALUES
(1, 2, 2900.00, 'Pending', '2025-09-24 10:41:16'),
(2, 1, 850.00, 'Pending', '2025-09-24 11:28:06'),
(3, 1, 999.00, 'Pending', '2025-09-24 11:53:46'),
(4, 3, 1999.00, 'Pending', '2025-09-24 12:01:56');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `qty`, `price`) VALUES
(1, 1, 1, 1, 3.49),
(2, 2, 1, 2, 3.49),
(3, 3, 1, 1, 3.49);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `category` varchar(80) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `rating` decimal(3,2) NOT NULL DEFAULT 0.00,
  `image` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `category`, `price`, `rating`, `image`, `description`, `created_at`) VALUES
(1, 'Organic Apples (1kg)', 'Grocery', 3.49, 4.50, 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=1200&auto=format&fit=crop', 'Crisp, sweet, pesticide-free apples from local farms.', '2025-09-24 10:26:54'),
(2, 'Whole Wheat Bread', 'Bakery', 699.00, 4.20, 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Whole_Wheat_Bread_01.jpg', 'Freshly baked bread with whole grains and no added sugar.', '2025-10-10 13:10:32'),
(3, 'Extra Virgin Olive Oil (1L)', 'Grocery', 3799.00, 4.70, 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Extra_Virgin_Olive_Oil.jpg', 'Cold-pressed olive oil perfect for salads and light cooking.', '2025-10-10 13:10:32'),
(5, 'Chocolate Cookies', 'Snacks', 599.00, 4.30, 'https://upload.wikimedia.org/wikipedia/commons/5/50/Chocolate_chip_cookies.jpg', 'Crunchy cookies with rich chocolate chips.', '2025-10-10 13:10:32'),
(7, 'Greek Yogurt (500g)', 'Dairy', 799.00, 4.60, 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Greek_yoghurt_with_honey.jpg', 'Creamy yogurt high in protein and low in sugar.', '2025-10-10 13:10:32'),
(8, 'LED Bulb (9W)', 'Electronics', 399.00, 4.40, 'https://upload.wikimedia.org/wikipedia/commons/d/d6/LED-E27-Light-Bulb-1134.jpg', 'Energy-efficient LED bulb with 20,000 hours lifespan.', '2025-10-10 13:10:32'),
(9, 'Premium Basmati Rice (5kg)', 'Grocery', 3299.00, 4.80, 'https://tse2.mm.bing.net/th/id/OIP.SyiAOsfWZAuD17BBUgxWdAHaLG?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3', 'Long-grain, aromatic basmati rice perfect for daily meals.', '2025-10-10 13:10:32');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(140) NOT NULL,
  `city` varchar(80) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `email` varchar(254) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `city`, `contact_number`, `email`, `password_hash`, `role`, `created_at`) VALUES
(1, 'Admin', '', '', 'admin@example.com', '$2y$10$CvuEwVha.I7yq8rlgh1lB.nHcnJdyyYgJObLC1Healaircld5.riG', 'admin', '2025-09-24 09:52:47'),
(2, 'Admin', '', '', 'adminnew@example.com', '$2y$10$LMpUNLnKIT7RY5u8DifHye8jmyZAnTkC.GtQWRTyHvLQkzeJTqbia', 'user', '2025-09-24 10:05:46'),
(3, 'test', '', '', 'new1@example.com', '$2y$10$dEg4NBix2sNn8mlhwPTQ2.nZ9ZqJllfH/NCZuwgT5VRZ7RbdHs5Rm', 'user', '2025-09-24 11:55:32'),
(4, 'Smith', 'Berlin', '+92135462982', 'smith@yahoo.com', '$2y$10$6dKzL8aRgBdBkwu2BmWCVOEQaJ.7iGgJzdUorI7LENcaekfWTPKVK', 'user', '2025-12-14 01:59:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `fk_contact_user` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD CONSTRAINT `fk_contact_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
