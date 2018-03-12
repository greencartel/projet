-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Lun 12 Mars 2018 à 22:56
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
  `couleur` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `categories`
--

INSERT INTO `categories` (`id`, `nom`, `cheminIcone`, `couleur`) VALUES
(1, 'Eau', 'img/categories/eau.jpeg', '66b3ff'),
(2, 'Nature', 'img/categories/nature.png', '87e210'),
(3, 'Santé & bien-être', 'img/categories/bienetre.jpg', 'ff471a'),
(4, 'Energie', 'img/categories/energie.png', 'f8e273'),
(5, 'Alimentation', 'img/categories/alimentation.jpg', 'ff9933'),
(6, 'Transports', 'img/categories/transports.png', '999999');

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
(1, 'Adopte une plante !', 50, '<p>Achète une plante verte en pot et installe-là chez toi ! Rendre son intérieur plus vert et prendre soin d\'une plante est une première étape vers une meilleure compréhension de la nature.</p><p>Rendre son intérieur plus vert et prendre soin de plantes est une première étape vers une meilleure compréhension de la nature.</p><p>Installe la au plus près d\'une source de lumière, ou dehors si tu peux !</p>', '<div><p><i class=\"fas fa-circle-notch\"></i> Les arbres produisent de l\'oxygène au contact de la lumière du soleil ! C\'est la #photosynthèse. Planter un arbre permet donc de limiter les émissions de CO2 dans l’atmosphère à notre échelle.</p></div><div><p><i class=\"fas fa-circle-notch\"></i> S\'entourer de plantes est aussi un gage de bien-être au quotidien.</p><p>Verdir son habitat et sa ville permet d\'apprécier davantage son cadre de vie en le rendant visuellement plus joli et plus sain.</p></div>', 'img/defis/nature/adopte_plante.jpeg', 1, 2, 0),
(2, 'Trie tes poubelles !', 100, '<p>Trier ses poubelles c\'est ultra cool !</p><p>Si tu tries tes poubelles, fais attention, c\'est un peu comme la langue française, il y a plein d\'exceptions !</p>', '<div><p><i class=\"fas fa-circle-notch\"></i> Trier ce n\'est pas compliqué et ça a vraiment un impact !</p></div><div><p><i class=\"fas fa-circle-notch\"></i> Ça permet de ne pas tout brûler !</p></div>', 'img/defis/nature/poubelle_tri.jpg', 1, 2, 0),
(3, 'J\'installe des économiseurs d\'eau', 50, 'L\'eau est une ressource naturelle précieuse, nous devons la préserver !', 'En installant des économiseurs d\'eau, je peux économiser jusqu\'à 50% de l\'eau que je consomme !', 'img/defis/eau/eco_eau.png', 1, 1, 0),
(4, 'J\'installe une chasse d\'eau à deux débits', 75, 'L\'eau est une ressource naturelle précieuse, nous devons la préserver !', 'Je gâche moins d\'eau en installant deux débits pour mon système de chasse d\'eau', 'img/defis/eau/eco_eau.png', 1, 1, 0),
(5, 'Je prends des douches', 75, 'L\'eau est une ressource naturelle précieuse, nous devons la préserver !', 'J\'arrête de gâcher de l\'eau sans arrêt pour mon confort personnel !', 'img/defis/eau/douche.png', 1, 1, 0),
(6, 'J\'arrose mes plantes avec l\'eau de pluie', 50, 'L\'eau est une ressource naturelle précieuse, nous devons la préserver !', 'Arroser ses plantes avec l\'eau de pluie récupérée leur sera aussi bénéfique et ne gâchera pas de l\'eau potable inutilement !', 'img/defis/eau/arrosoir.jpg', 1, 1, 0),
(7, 'Je vérifie que mes robinets ne fuient pas', 25, 'L\'eau est une ressource naturelle précieuse, nous devons la préserver !', 'Une fuite d\'eau peut faire beaucoup de mal au portefeuille comme à la planète !', 'img/defis/eau/eco_eau.png', 1, 1, 0),
(8, 'Je colle un autocollant Stop Pub sur ma boîte aux lettres', 20, 'Les prospectus sont un vrai gâchis de papier ! Je leur fais la guerre en mettant un autocollant sur ma boîte aux lettres.', 'En relevant ce défi, je contribue grandement à la préservation de la nature !', 'img/defis/nature/stop_pub.jpg', 1, 2, 0),
(9, 'J\'achète un sac de course réutilisable', 50, 'Le plastique ne se dégrade pas et est très polluant !', 'Au lieu d\'utiliser plein de sacs en plastique, je m\'achète un sac réutilisable à l\'infini que je n\'oublie pas de prendre avant d\'aller faire des courses !', 'img/defis/nature/sac_tissu.jpg', 1, 2, 0),
(10, 'Je supprime mes mails inutiles', 125, 'Les data-centers demandent énormément d\'énergie : il faut les refroidir...', 'En supprimant les mails inutiles de mes boîtes mail, je peux contribuer à la diminution de la consommation d\'énergie et donc à la préservation de la nature !', 'img/defis/nature/mail.png', 1, 2, 0),
(11, 'Je fais pousser des légumes sur mon balcon', 100, 'Les plantes aromatiques et certains fruits et légumes peuvent être cultivés sur mon balcon !', 'En relevant ce défi, j\'ai la satisfaction de faire pousser ce que je mange et j\'apprends les bases du jardinage !', 'img/defis/nature/jardinage.png', 1, 2, 0),
(12, 'Je bois l\'eau du robinet', 125, 'Je n\'achète plus de bouteilles en plastique contenant de l\'eau, je bois l\'eau du robinet.', 'En France, l\'eau du robinet est parfaitement potable, je n\'ai pas besoin d\'acheter de l\'eau du robinet !\r\nJe peux aussi aller remplir ma gourde aux points d\'eaux \"Eau de Paris\" !', 'img/defis/nature/eau_de_paris.png', 1, 2, 0),
(13, 'J\'adopte le vinaigre pour le ménage !', 50, 'Certains produits ménagers sont très polluants, ils contaminent l\'eau et les sols.', 'En utilisant du vinaigre, je ne pollue pas et je peux nettoyer de façon aussi efficace ! En plus je fais des économies car les produits ménagers sont souvent chers !', 'img/defis/sante/ch3cooh.png', 1, 3, 0),
(14, 'Je débranche mes appareils non utilisés', 50, 'Quand je n\'utilise pas un appareil électronique, il reste consommateur d\'énergie ! Inutile de le laisser branché...', 'Le mode veille de tous les appareils électroniques peut représenter jusqu’à 10 % de ma consommation annuelle d’électricité !\r\nEn relevant ce défi, je lutte contre le gaspillage énergétique !', 'img/defis/energie/prise.png', 1, 4, 0),
(15, 'J\'utilise des prises multiples avec interrupteur', 25, 'Mieux gérer sa consommation d\'énergie est une étape importante !\r\nLorsque je pars en voyage, je n\'oublie pas de débrancher les divers appareils électroniques qui restent allumés et consomment beaucoup d\'énergie !', 'Le plus facile est de s\'équiper d\'interrupteurs pour les appareils les plus énergivores ! Il suffira alors de les désactiver aux moments ou ils sont inutiles ! En relevant ce défi, je lutte contre le gaspillage énergétique !', 'img/defis/energie/prise.png', 1, 4, 0),
(16, 'Je mets un pull au lieu de monter le chauffage', 30, 'Le gaspillage énergétique est un vrai problème ! L\'hiver, les logements sont souvent surchauffés !', 'Au lieu de monter le chauffage pour me balader en maillot de bain, je mets un pull !', 'img/defis/energie/thermometre.jpg', 1, 4, 0),
(17, 'J\'apprends à identifier les conditions de production des œufs', 50, 'L\'élevage intensif contribue au réchauffement climatique. En relevant ce défi, je fais attention aux conditions d\'élevage des animaux.', 'De nombreux oeufs sont produits dans des conditions qui ne sont pas favorables à l\'environnement : j\'apprends à les identifier pour faire un choix plus écologique lors de mes courses.', 'img/defis/alimentation/poule.png', 1, 5, 0),
(18, 'J\'affiche le calendrier des fruits et légumes de saison dans ma cuisine', 30, 'Manger local contribue à la préservation de la planète : moins d\'émissions de gaz à effet de serre puisque moins de transport !', 'En choisissant de préparer des produits de saison, je peux choisir d\'acheter local et je ne vais pas contre la nature.', 'img/defis/alimentation/cerise.png', 1, 5, 0),
(19, 'Je ne mange pas de viande ce midi', 35, 'La production intensive de viande est un réel problème pour l\'environnement. Notre consommation de viande n\'a fait qu\'augmenter ces dernières décennies.', 'Ce midi, je m\'engage à ne pas consommer de viande ! C\'est un premier pas vers la diminution de ma consommation !', 'img/defis/alimentation/veggie.jpg', 1, 5, 0),
(20, 'Je rejoins une ruche', 95, 'Je rejoins une ruche : ça me permet de rencontrer des agriculteurs de ma région, de discuter avec eux et de consommer local !', 'En plus, je n\'ai plus besoin d\'aller faire mes courses au supermarché et de faire la queue !', 'img/defis/alimentation/ruche.png', 1, 5, 0),
(21, 'Je prends les transports en commun', 50, 'La voiture emet des gaz à effet de serre.', 'J\'essaie aussi souvent que possible de ne pas utiliser ma voiture au profit de transports moins polluants : transports en commun, co-voiturage, je peux même me déplacer à pied !', 'img/defis/transports/transport_commun.jpg', 1, 6, 0),
(22, 'J\'utilise une voiture électrique en libre service', 75, 'Aujourd\'hui, autolib me permets de louer une voiture en libre service et la déposer la ou je le souhaite (dans la limite des places disponibles !).', 'En utilisant une voiture électrique plutot qu\'une voiture à essence, je pollue moins et en plus je fais moins de bruit :)', 'img/defis/transports/autolib.png', 1, 6, 0),
(23, 'J\'essaie le vélo pour aller au travail', 150, 'En allant en vélo au travail tous les jours, je fais du sport et je pollue moins !', 'Même si ça peut faire peur au début, on s\'habitue vite à aller en vélo au travail et on ne peut plus s\'en passer !', 'img/defis/transports/velo.png', 1, 6, 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT pour la table `defis`
--
ALTER TABLE `defis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
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