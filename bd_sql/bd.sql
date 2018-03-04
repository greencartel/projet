-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Lun 05 Mars 2018 à 00:05
-- Version du serveur :  5.6.35
-- Version de PHP :  7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `greencartel`
--

-- --------------------------------------------------------

--
-- Structure de la table `amis`
--

CREATE TABLE `amis` (
  `idUtilisateur1` int(11) NOT NULL,
  `idUtilisateur2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `cheminIcone` varchar(255) NOT NULL,
  `couleur` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `categories`
--

INSERT INTO `categories` (`id`, `nom`, `cheminIcone`, `couleur`) VALUES
(1, 'eau', '', '0'),
(2, 'nature', '', '87e211'),
(3, 'déchets', '', '');

-- --------------------------------------------------------

--
-- Structure de la table `defis`
--

CREATE TABLE `defis` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `nbPoints` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `descriptionSup` varchar(1000) NOT NULL,
  `cheminImage` varchar(255) NOT NULL,
  `niveau` int(11) NOT NULL,
  `idCategorie` int(11) NOT NULL,
  `idSponsor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Contenu de la table `defis`
--

INSERT INTO `defis` (`id`, `titre`, `nbPoints`, `description`, `descriptionSup`, `cheminImage`, `niveau`, `idCategorie`, `idSponsor`) VALUES
(1, 'Adopte une plante !', 50, '<p>Achète une plante verte en pot et installe-là chez toi ! Rendre son intérieur plus vert et prendre soin d\'une plante est une première étape vers une meilleure compréhension de la nature.</p><p>Rendre son intérieur plus vert et prendre soin de plantes est une première étape vers une meilleure compréhension de la nature.</p><p>Installe la au plus près d\'une source de lumière, ou dehors si tu peux !</p>', '<div><p><i class=\"fas fa-circle-notch\"></i> Les arbres produisent de l\'oxygène au contact de la lumière du soleil ! C\'est la #photosynthèse. Planter un arbre permet donc de limiter les émissions de CO2 dans l’atmosphère à notre échelle.</p></div><div><p><i class=\"fas fa-circle-notch\"></i> S\'entourer de plantes est aussi un gage de bien-être au quotidien.</p><p>Verdir son habitat et sa ville permet d\'apprécier davantage son cadre de vie en le rendant visuellement plus joli et plus sain.</p></div>', 'img/defi1.jpeg', 1, 2, 0),
(2, 'Trie tes poubelles !', 100, '<p>Trier ses poubelles c\'est ultra cool !</p><p>Si tu tries tes poubelles, fais attention, c\'est un peu comme la langue française, il y a plein d\'exceptions !</p>', '<div><p><i class=\"fas fa-circle-notch\"></i> Trier ce n\'est pas compliqué et ça a vraiment un impact !</p></div><div><p><i class=\"fas fa-circle-notch\"></i> Ça permet de ne pas tout brûler !</p></div>', 'img/defi2.jpg', 1, 3, 0);

-- --------------------------------------------------------

--
-- Structure de la table `defis_releves`
--

CREATE TABLE `defis_releves` (
  `idUtilisateur` int(11) NOT NULL,
  `idDefi` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `sponsor`
--

CREATE TABLE `sponsor` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `cheminLogo` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `score` int(11) NOT NULL,
  `cheminPhoto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Contenu de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `login`, `mdp`, `score`, `cheminPhoto`) VALUES
(1, 'sophia', 'sophia', 0, ''),
(2, 'thomas', 'thomas', 0, ''),
(3, 'linda', 'linda', 0, '');

-- --------------------------------------------------------

--
-- Structure de la table `wishlist`
--

CREATE TABLE `wishlist` (
  `idUtilisateur` int(11) NOT NULL,
  `idDefi` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `defis`
--
ALTER TABLE `defis`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `sponsor`
--
ALTER TABLE `sponsor`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `defis`
--
ALTER TABLE `defis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `sponsor`
--
ALTER TABLE `sponsor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;