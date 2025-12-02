-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Dec 02. 10:47
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `web2_beadando`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `palyak`
--

CREATE TABLE `palyak` (
  `id` int(11) NOT NULL,
  `orszag` varchar(100) DEFAULT NULL,
  `palya_neve` varchar(150) DEFAULT NULL,
  `hossz_km` decimal(5,3) DEFAULT NULL,
  `elso_verseny` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `palyak`
--

INSERT INTO `palyak` (`id`, `orszag`, `palya_neve`, `hossz_km`, `elso_verseny`) VALUES
(1, 'Bahrein', 'Bahrain International Circuit', 5.412, '2004-04-04'),
(2, 'Szaúd-Arábia', 'Jeddah Corniche Circuit', 6.175, '2021-12-05'),
(3, 'Ausztrália', 'Albert Park Circuit', 5.278, '1996-03-10'),
(4, 'Japán', 'Suzuka International Racing Course', 5.807, '1987-11-01'),
(5, 'Kína', 'Shanghai International Circuit', 5.451, '2004-09-26'),
(6, 'Miami (USA)', 'Miami International Autodrome', 5.412, '2022-05-08'),
(7, 'Olaszország', 'Imola - Autodromo Enzo e Dino Ferrari', 4.909, '1980-09-14'),
(8, 'Monaco', 'Circuit de Monaco', 3.337, '1950-05-21'),
(9, 'Kanada', 'Circuit Gilles Villeneuve', 4.361, '1978-10-08'),
(10, 'Spanyolország', 'Circuit de Barcelona-Catalunya', 4.657, '1991-09-29'),
(11, 'Ausztria', 'Red Bull Ring', 4.318, '1970-08-16'),
(12, 'Egyesült Királyság', 'Silverstone Circuit', 5.891, '1950-05-13'),
(13, 'Magyarország', 'Hungaroring', 4.381, '1986-08-10'),
(14, 'Belgium', 'Circuit de Spa-Francorchamps', 7.004, '1950-06-18'),
(15, 'Hollandia', 'Circuit Zandvoort', 4.259, '1952-08-17'),
(16, 'Olaszország', 'Monza - Autodromo Nazionale Monza', 5.793, '1950-09-03'),
(17, 'Azerbajdzsán', 'Baku City Circuit', 6.003, '2016-06-19'),
(18, 'Szingapúr', 'Marina Bay Street Circuit', 4.940, '2008-09-28'),
(19, 'USA', 'Circuit of the Americas', 5.513, '2012-11-18'),
(20, 'Mexikó', 'Autódromo Hermanos Rodríguez', 4.304, '1963-11-24'),
(21, 'Brazília', 'Interlagos - Autódromo José Carlos Pace', 4.309, '1973-01-28'),
(22, 'Las Vegas (USA)', 'Las Vegas Strip Circuit', 6.120, '2023-11-18'),
(23, 'Katar', 'Lusail International Circuit', 5.419, '2021-11-21'),
(24, 'Abu Dhabi', 'Yas Marina Circuit', 5.554, '2009-11-01');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pilotak`
--

CREATE TABLE `pilotak` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) DEFAULT NULL,
  `szuletesi_ido` date DEFAULT NULL,
  `futamgyozelmek` int(11) DEFAULT NULL,
  `pontszam` int(11) DEFAULT NULL,
  `pole_poziciok` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `pilotak`
--

INSERT INTO `pilotak` (`id`, `nev`, `szuletesi_ido`, `futamgyozelmek`, `pontszam`, `pole_poziciok`) VALUES
(1, 'Max Verstappen', '1997-09-30', 9, 437, 9),
(2, 'Lando Norris', '1999-11-13', 4, 374, 8),
(3, 'Charles Leclerc', '1997-10-16', 3, 356, 3),
(4, 'Carlos Sainz', '1994-09-01', 2, 290, 0),
(5, 'Lewis Hamilton', '1985-01-06', 1, 223, 0),
(6, 'George Russell', '1998-02-15', 0, 245, 0),
(7, 'Oscar Piastri', '2001-04-06', 0, 234, 0),
(8, 'Sergio Perez', '1990-01-26', 0, 152, 0),
(9, 'Fernando Alonso', '1981-07-29', 0, 216, 0),
(10, 'Lance Stroll', '1998-10-29', 0, 74, 0),
(11, 'Yuki Tsunoda', '2000-05-11', 0, 55, 0),
(12, 'Daniel Ricciardo', '1989-07-01', 0, 30, 0),
(13, 'Pierre Gasly', '1996-02-07', 0, 62, 0),
(14, 'Esteban Ocon', '1996-09-17', 0, 58, 0),
(15, 'Alexander Albon', '1996-03-23', 0, 27, 0),
(16, 'Logan Sargeant', '2000-12-31', 0, 1, 0),
(17, 'Valtteri Bottas', '1989-08-28', 0, 6, 0),
(18, 'Guanyu Zhou', '1999-05-30', 0, 0, 0),
(19, 'Kevin Magnussen', '1992-10-05', 0, 6, 0),
(20, 'Nico Hulkenberg', '1987-08-19', 0, 9, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`) VALUES
(1, 'admin', 'admin@admin.hu', '$2a$10$P5fK9hDgwmid8q9hhScv8.56on8e6qr8Ipbh2mkN79PyprsK47pIu', 'admin'),
(2, 'thedunibacsi', 'teszt1@mail.com', '$2a$10$Un7trjDubPnA6kZci35bNeUK/XeIJPlthGqGZyK3.1iAHqjBSahp2', 'user'),
(7, 'teszthaver1', 'teszt22@mail.com', '$2a$10$1DGE5IrJNbuSITJOO6//7.Y6Z6QAptweGmo11EoHOy6IHZsqzeR0O', 'user');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `uzenetek`
--

CREATE TABLE `uzenetek` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `uzenet` text NOT NULL,
  `datum` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `uzenetek`
--

INSERT INTO `uzenetek` (`id`, `nev`, `email`, `uzenet`, `datum`) VALUES
(1, 'teszt1', 'teszt1@mail.com', 'asd', '2025-11-29 14:43:15'),
(2, 'teszt1', 'teszt1@mail.com', 'helobelo', '2025-12-01 10:40:22');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `versenyek`
--

CREATE TABLE `versenyek` (
  `id` int(11) NOT NULL,
  `helyszin` varchar(150) DEFAULT NULL,
  `datum` date DEFAULT NULL,
  `elso_hely` varchar(100) DEFAULT NULL,
  `masodik_hely` varchar(100) DEFAULT NULL,
  `harmadik_hely` varchar(100) DEFAULT NULL,
  `leggyorsabb_kor` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `versenyek`
--

INSERT INTO `versenyek` (`id`, `helyszin`, `datum`, `elso_hely`, `masodik_hely`, `harmadik_hely`, `leggyorsabb_kor`) VALUES
(1, 'Bahrein', '2024-03-02', 'Max Verstappen', 'Sergio Perez', 'Carlos Sainz', 'Max Verstappen'),
(2, 'Szaúd-Arábia', '2024-03-09', 'Max Verstappen', 'Charles Leclerc', 'Sergio Perez', 'Charles Leclerc'),
(3, 'Ausztrália', '2024-03-24', 'Carlos Sainz', 'Charles Leclerc', 'Lando Norris', 'Oscar Piastri'),
(4, 'Japán', '2024-04-07', 'Max Verstappen', 'Sergio Perez', 'Carlos Sainz', 'Max Verstappen'),
(5, 'Kína', '2024-04-21', 'Max Verstappen', 'Lando Norris', 'Sergio Perez', 'Max Verstappen'),
(6, 'Miami', '2024-05-05', 'Lando Norris', 'Max Verstappen', 'Charles Leclerc', 'Max Verstappen'),
(7, 'Imola', '2024-05-19', 'Max Verstappen', 'Lando Norris', 'Charles Leclerc', 'George Russell'),
(8, 'Monaco', '2024-05-26', 'Charles Leclerc', 'Oscar Piastri', 'Carlos Sainz', 'Lewis Hamilton'),
(9, 'Kanada', '2024-06-09', 'Max Verstappen', 'Lando Norris', 'George Russell', 'Lewis Hamilton'),
(10, 'Spanyolország', '2024-06-23', 'Max Verstappen', 'Lando Norris', 'Lewis Hamilton', 'George Russell'),
(11, 'Ausztria', '2024-06-30', 'George Russell', 'Oscar Piastri', 'Carlos Sainz', 'Max Verstappen'),
(12, 'Egyesült Királyság', '2024-07-07', 'Lewis Hamilton', 'Max Verstappen', 'Lando Norris', 'Max Verstappen'),
(13, 'Magyarország', '2024-07-21', 'Oscar Piastri', 'Lando Norris', 'Max Verstappen', 'Lewis Hamilton'),
(14, 'Belgium', '2024-07-28', 'Max Verstappen', 'Lando Norris', 'Oscar Piastri', 'Charles Leclerc'),
(15, 'Hollandia', '2024-08-25', 'Max Verstappen', 'Lando Norris', 'George Russell', 'Max Verstappen'),
(16, 'Monza', '2024-09-01', 'Charles Leclerc', 'Lando Norris', 'Max Verstappen', 'Lewis Hamilton'),
(17, 'Baku', '2024-09-15', 'Lando Norris', 'Max Verstappen', 'Carlos Sainz', 'Charles Leclerc'),
(18, 'Szingapúr', '2024-09-22', 'Carlos Sainz', 'Lando Norris', 'Lewis Hamilton', 'George Russell'),
(19, 'Austin (USA)', '2024-10-20', 'Max Verstappen', 'Lando Norris', 'Carlos Sainz', 'Charles Leclerc'),
(20, 'Mexikó', '2024-10-27', 'Max Verstappen', 'Lando Norris', 'Sergio Perez', 'Lewis Hamilton'),
(21, 'Brazília', '2024-11-03', 'Max Verstappen', 'Lando Norris', 'Fernando Alonso', 'Lando Norris'),
(22, 'Las Vegas', '2024-11-23', 'Charles Leclerc', 'Max Verstappen', 'Oscar Piastri', 'Lando Norris'),
(23, 'Katar', '2024-12-01', 'Max Verstappen', 'Lando Norris', 'Oscar Piastri', 'Charles Leclerc'),
(24, 'Abu Dhabi', '2024-12-08', 'Max Verstappen', 'Lando Norris', 'George Russell', 'Lando Norris');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `palyak`
--
ALTER TABLE `palyak`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `pilotak`
--
ALTER TABLE `pilotak`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `uzenetek`
--
ALTER TABLE `uzenetek`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `versenyek`
--
ALTER TABLE `versenyek`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `palyak`
--
ALTER TABLE `palyak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT a táblához `pilotak`
--
ALTER TABLE `pilotak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `uzenetek`
--
ALTER TABLE `uzenetek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `versenyek`
--
ALTER TABLE `versenyek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
