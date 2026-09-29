-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 08, 2026 at 02:30 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aetheria_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
CREATE TABLE IF NOT EXISTS `authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `avatar` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `social_links` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_authors_slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `name`, `slug`, `bio`, `avatar`, `website`, `social_links`, `created_at`, `updated_at`) VALUES
(1, 'Dr. Eleanor Vance', 'eleanor-vance', 'Chair of Applied Ethics at the Institute for Humanistic Futures. Her essays investigate moral responsibility in automated systems and digital privacy.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', 'https://eleanorvance.org', '{\"twitter\": \"https://x.com/eleanor_vance\", \"linkedin\": \"https://linkedin.com/in/eleanorvance\"}', '2026-08-18 13:33:52', '2026-08-18 13:33:52'),
(2, 'Marcus Aurelius Vance', 'marcus-vance', 'Behavioral psychologist and author of \"The Subtle Currents\". He writes on why people act against their own interests and the psychology of silence.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', 'https://marcusvance.com', '{\"twitter\": \"https://x.com/marcusvance\"}', '2026-08-18 13:33:52', '2026-08-18 13:33:52'),
(3, 'Julian Thorne', 'julian-thorne', 'Technology strategist and former cybernetics researcher. Julian examines how network protocols transform human ritual and social cohesion.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', 'https://julianthorne.io', '{\"github\": \"https://github.com/jthorne\", \"twitter\": \"https://x.com/jthorne_tech\"}', '2026-08-18 13:33:52', '2026-08-18 13:33:52'),
(4, 'Sophia Lin', 'sophia-lin', 'Cultural essayist and philosopher in residence. She writes about quiet seasons, memory, everyday aesthetics, and personal growth.', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', 'https://sophialin.writer', '{\"instagram\": \"https://instagram.com/sophialin_notes\"}', '2026-08-18 13:33:52', '2026-08-18 13:33:52');

-- --------------------------------------------------------

--
-- Table structure for table `bookmarks`
--

DROP TABLE IF EXISTS `bookmarks`;
CREATE TABLE IF NOT EXISTS `bookmarks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `essay_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_essay` (`user_id`,`essay_id`),
  KEY `essay_id` (`essay_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `accent_color` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT '#8B263E',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_categories_slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `accent_color`, `created_at`, `updated_at`) VALUES
(1, 'Spirituality', 'spirituality', 'Meditations on purpose, transcendence, quiet consciousness, and inner depth.', '#0284C7', '2026-08-18 13:33:51', '2026-08-18 13:33:51'),
(3, 'Wisdom', 'wisdom', 'Timeless insights, moral integrity, ethics, and enduring human life lessons.', '#8B263E', '2026-08-18 13:33:51', '2026-08-18 13:33:51'),
(4, 'Reflections', 'reflections', 'Thoughtful examinations of time, personal growth, quiet wisdom, and life reflections.', '#A67C46', '2026-08-18 13:33:51', '2026-08-18 13:33:51'),
(5, 'Technology', 'technology', 'Critical perspectives on artificial intelligence, digital culture, cybersecurity, and human-machine coexistence.', '#2E8B80', '2026-08-18 13:33:51', '2026-08-18 13:33:51');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `essay_id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci DEFAULT 'approved',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_comments_essay` (`essay_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `essay_id`, `name`, `email`, `content`, `status`, `created_at`) VALUES
(1, 1, 'Clara Vance', 'clara@example.com', 'A deeply moving reflection. The point regarding intentional friction resonates profoundly with my own work.', 'approved', '2026-08-18 13:33:52'),
(2, 1, 'David Miller', 'david.m@example.com', 'Splendid essay. I find myself constantly caught in the friction-free trap. Thank you for this reminder.', 'approved', '2026-08-18 13:33:52'),
(3, 6, 'Clara Vance', 'clara@example.com', 'A deeply moving reflection. The point regarding intentional friction resonates profoundly with my own work.', 'approved', '2026-08-18 13:33:52'),
(4, 6, 'David Miller', 'david.m@example.com', 'Splendid essay. I find myself constantly caught in the friction-free trap. Thank you for this reminder.', 'approved', '2026-08-18 13:33:52'),
(5, 11, 'Clara Vance', 'clara@example.com', 'A deeply moving reflection. The point regarding intentional friction resonates profoundly with my own work.', 'approved', '2026-08-18 13:33:53'),
(6, 11, 'David Miller', 'david.m@example.com', 'Splendid essay. I find myself constantly caught in the friction-free trap. Thank you for this reminder.', 'approved', '2026-08-18 13:33:53'),
(7, 16, 'Clara Vance', 'clara@example.com', 'A deeply moving reflection. The point regarding intentional friction resonates profoundly with my own work.', 'approved', '2026-08-18 13:33:53'),
(8, 16, 'David Miller', 'david.m@example.com', 'Splendid essay. I find myself constantly caught in the friction-free trap. Thank you for this reminder.', 'approved', '2026-08-18 13:33:53');

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('unread','read','archived') COLLATE utf8mb4_unicode_ci DEFAULT 'unread',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `subject`, `message`, `status`, `created_at`) VALUES
(1, 'kamal', 'ankitguraya3@gmail.com', 'mam please help me i listen nirvair too much', 'mam please help me', 'unread', '2026-08-20 04:31:09'),
(2, 'kamal', 'ankitguraya3@gmail.com', 'mam please help me i listen nirvair too much', 'help me', 'unread', '2026-08-24 15:18:16');

-- --------------------------------------------------------

--
-- Table structure for table `essays`
--

DROP TABLE IF EXISTS `essays`;
CREATE TABLE IF NOT EXISTS `essays` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `featured_image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author_id` int NOT NULL,
  `category_id` int NOT NULL,
  `status` enum('draft','published','archived') COLLATE utf8mb4_unicode_ci DEFAULT 'published',
  `featured` tinyint(1) DEFAULT '0',
  `reading_time` int DEFAULT '5',
  `views` int DEFAULT '0',
  `seo_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `seo_description` text COLLATE utf8mb4_unicode_ci,
  `published_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` enum('essay','blog') COLLATE utf8mb4_unicode_ci DEFAULT 'essay',
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `author_id` (`author_id`),
  KEY `idx_essays_slug` (`slug`),
  KEY `idx_essays_status` (`status`),
  KEY `idx_essays_featured` (`featured`),
  KEY `idx_essays_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `essays`
--

INSERT INTO `essays` (`id`, `title`, `slug`, `subtitle`, `excerpt`, `content`, `featured_image`, `author_id`, `category_id`, `status`, `featured`, `reading_time`, `views`, `seo_title`, `seo_description`, `published_at`, `created_at`, `updated_at`, `type`) VALUES
(1, 'When Convenience Becomes a Moral Choice', 'when-convenience-becomes-a-moral-choice', 'How seamless technology subtly erodes our capacity for ethical friction', 'We rarely notice the point at which efficiency replaces intentionality. In a friction-free world, doing what is right often requires choosing to slow down.', '\n<p>Modern design preaches a single gospel: eliminate friction. Every tap saved, every auto-complete suggestion accepted, every automated delivery scheduled is celebrated as a victory of human ingenuity. Yet in our relentless crusade for convenience, we have quietly surrendered something crucial—the fertile space of moral reflection.</p>\n\n<h2>The Hidden Cost of Seamlessness</h2>\n<p>Ethics is rarely convenient. It demands pause, hesitation, and occasionally discomfort. When an algorithm automatically selects the fastest route, the cheapest product, or the most digestible opinion, it removes the tiny pauses where conscience traditionally operated.</p>\n\n<blockquote class=\"editorial-quote\">\n  \"When every choice is pre-packaged for maximum ease, moral agency degrades into passive consumption.\"\n</blockquote>\n\n<p>Consider how we interact with information. Decades ago, evaluating a claim required physical trips to libraries, comparing cross-references, or engaging in debate. Today, an algorithmic feed serves confirmation directly to our retinas before a skeptical thought can even take root. The friction that once allowed us to ask <em>\'Is this true?\'</em> has been engineered away.</p>\n\n<h2>Choosing Intentional Friction</h2>\n<p>Reclaiming our moral clarity does not mean abandoning technology or retreating to primitive lifestyles. It means cultivating intentional friction—deliberately building moments of pause into our daily rituals.</p>\n\n<ul>\n  <li><strong>Pause before reacting:</strong> Institute a mandatory 10-second reflection period before sharing or commenting on provocative news.</li>\n  <li><strong>Audit your defaults:</strong> Question automated decisions, from subscription renewals to suggested replies.</li>\n  <li><strong>Embrace non-optimized time:</strong> Allow space for open-ended conversations that lack immediate utility.</li>\n</ul>\n\n<p>Ultimately, a life without friction is a life without traction. If we wish to walk upright as ethical beings, we must welcome the bumps in the road.</p>\n          ', 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80', 1, 1, 'published', 1, 7, 1420, 'When Convenience Becomes a Moral Choice | Spirituality', 'An inquiry into how frictionless technology alters human morality and decision-making.', '2026-08-18 13:33:52', '2026-08-18 13:33:52', '2026-08-18 13:33:52', 'essay'),
(2, 'The Cost of Knowing Everything', 'the-cost-of-knowing-everything', 'On global awareness, emotional exhaustion, and the ethics of attention', 'Human empathy was forged in small villages. Today, the global stream delivers infinite tragedy directly into our pockets. What happens when our moral bandwidth is overwhelmed?', '\n<p>For most of human history, a person’s world was defined by their immediate horizon—the village, the valley, the surrounding woods. News from distant lands arrived in months, filtered through travelers or letters. Today, every catastrophe on earth broadcasts live to the palm of our hand in high definition.</p>\n\n<h2>The Saturation of Empathy</h2>\n<p>Our nervous systems were never evolved to process universal suffering concurrently. When we are exposed to dozens of crises every hour, two dangerous symptoms emerge: emotional numbness or performative outrage.</p>\n\n<p>When empathy is stretched across eight billion soul-events, it thins into a translucent film. We feel guilty for looking away, yet paralyzed when looking on.</p>\n\n<h2>An Ethics of Attention</h2>\n<p>Attention is the currency of consciousness. Where we direct it is fundamentally a moral choice. To care deeply about everything simultaneously is to care effectively about nothing.</p>\n\n<blockquote class=\"editorial-quote\">\n  \"True moral engagement requires depth, not breath. We must learn the quiet discipline of local devotion.\"\n</blockquote>\n\n<p>By establishing boundaries around our digital consumption, we preserve the emotional vitality required to make meaningful, concrete impacts in our immediate communities.</p>\n          ', 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80', 1, 1, 'published', 0, 6, 980, 'The Cost of Knowing Everything | Spirituality', 'Exploring global awareness, emotional exhaustion, and the moral limits of attention.', '2026-08-18 13:33:52', '2026-08-18 13:33:52', '2026-08-18 13:33:52', 'essay'),
(3, 'Who Is Responsible When Machines Decide?', 'who-is-responsible-when-machines-decide', 'Navigating moral vacuum in the age of algorithmic governance', 'When automated credit scoring, medical triage, or autonomous cars make life-altering decisions, who bears the moral burden? The engineer, the training data, or the algorithm itself?', '\n<p>As artificial intelligence shifts from predictive advisory roles to autonomous decision-makers, humanity faces a novel philosophical dilemma: the diffusion of responsibility. When a system makes a decision that yields tragic consequences, traditional frameworks of fault crumble.</p>\n\n<h2>The Moral Buffer</h2>\n<p>Bureaucracy has always used protocol as a shield against personal guilt. AI represents the ultimate culmination of this trend—a non-human shield that executes decisions without hesitation, doubt, or remorse.</p>\n\n<p>When an algorithm denies a mortgage loan or prioritizes one patient over another, stakeholders can point to statistical weights rather than human judgment. The responsibility dissolves into a sea of gradient descent updates.</p>\n\n<h2>Reclaiming Accountability</h2>\n<p>If we are to maintain a humane society, we must institute strict principles of ethical accountability:</p>\n\n<ol>\n  <li>Every automated outcome must have a designated human steward who assumes ultimate legal and moral responsibility.</li>\n  <li>Algorithms must maintain explainability standards before deployment in civic infrastructure.</li>\n  <li>Citizens must retain the right to appeal machine decisions to a human review board.</li>\n</ol>\n          ', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80', 1, 1, 'published', 0, 8, 1150, 'Who Is Responsible When Machines Decide? | Spirituality', 'Analyzing the moral vacuums and accountability gaps created by automated decision systems.', '2026-08-18 13:33:52', '2026-08-18 13:33:52', '2026-08-18 13:33:52', 'essay'),
(4, 'The Mirage of Absolute Transparency', 'the-mirage-of-absolute-transparency', 'Why privacy is not secrecy, but the right to human complexity', 'In a culture obsessed with radical openness, we often forget that mystery and private interiority are essential for personal growth and authentic relationships.', '\n<p>The popular modern refrain <em>\'If you have nothing to hide, you have nothing to fear\'</em> rests on a fundamental misunderstanding of human nature. Privacy was never merely about concealing wrongdoing; it is the sanctuary in which the self develops.</p>\n\n<h2>The Loss of Sanctuary</h2>\n<p>Without private space—free from public evaluation and social metrics—individuals tend toward safe, conformist behavior. We censor our early drafts, withhold unfinished thoughts, and perform curated idealizations of our lives.</p>\n\n<p>When everything is recorded, indexed, and visible, forgiveness becomes rare and context vanishes. True vulnerability requires a quiet room, not an arena.</p>\n          ', 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1200&q=80', 1, 1, 'published', 0, 5, 820, 'The Mirage of Absolute Transparency | Spirituality', 'Why privacy is crucial for human nuance, authentic selfhood, and moral freedom.', '2026-08-18 13:33:52', '2026-08-18 13:33:52', '2026-08-18 13:33:52', 'essay'),
(5, 'The Ethos of Digital Minimalism', 'the-ethos-of-digital-minimalism', 'Reclaiming autonomy in an attention economy designed for distraction', 'Digital minimalism is not a trendy phone aesthetic; it is an act of ethical resistance against corporate capture of human focus.', '\n<p>Every notification banner, red badge, and auto-playing feed is engineered by hundreds of cognitive scientists working to capture one thing: your temporal awareness. To resist this pull is not merely a productivity hack; it is a declaration of personal sovereignty.</p>\n\n<h2>Rebuilding Focus as a Virtue</h2>\n<p>When we allow our attention to be continuously fragmented, our capacity for deep contemplation, empathetic listening, and sustained creation shrinks. Intentional solitude becomes an endangered experience.</p>\n          ', 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80', 1, 1, 'published', 0, 6, 942, 'The Ethos of Digital Minimalism | Spirituality', 'How reducing digital noise restores focus, moral agency, and deep intentionality.', '2026-08-18 13:33:52', '2026-08-18 13:33:52', '2026-08-19 13:46:15', 'essay'),
(6, 'Why We Pretend Not to Care', 'why-we-pretend-not-to-care', 'The psychological defense mechanisms of emotional detachment in modern culture', 'Apathy has become the defining aesthetic of the 21st century. By projecting indifference, we shield ourselves from rejection, but also forfeit true intimacy.', '\n<p>Observe modern social interactions: the delayed text responses, the ironic humor, the carefully calibrated detachment. We live in an era where caring deeply is viewed as a vulnerability, while nonchalance is mistaken for strength.</p>\n\n<h2>The Armor of Coolness</h2>\n<p>Psychologically, cynicism and detachment are protective shields. If I do not invest hope in a project, a relationship, or an ideal, its failure cannot hurt me. Irony becomes a bunker against disappointment.</p>\n\n<blockquote class=\"editorial-quote\">\n  \"Indifference protects us from pain, but it also starves us of joy. You cannot selectively numb emotion.\"\n</blockquote>\n\n<h2>The Courage of Sincerity</h2>\n<p>To state plainly what you desire, what moves you, or what breaks your heart requires immense courage. Sincerity exposes us to ridicule, yet it remains the only bridge to genuine human connection.</p>\n          ', 'https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?auto=format&fit=crop&w=1200&q=80', 2, 3, 'published', 1, 6, 1896, 'Why We Pretend Not to Care | Wisdom', 'An analysis of emotional detachment, irony, and the psychological courage of sincerity.', '2026-08-18 13:33:52', '2026-08-18 13:33:52', '2026-08-19 13:46:08', 'essay'),
(7, 'The Strange Comfort of Being Understood', 'the-strange-comfort-of-being-understood', 'How deep validation recalibrates the human nervous system', 'Few experiences equal the quiet shock of meeting someone who sees your unvarnished internal reality without offering judgment or unsolicited advice.', '\n<p>Human beings spend immense energy constructing public masks. We translate complex, chaotic inner landscapes into neat conversational summaries. When someone pierces through that translation and grasps our exact meaning, the body responds with a physiological sigh of relief.</p>\n\n<h2>Attunement and Belonging</h2>\n<p>Psychologists call this experience <em>attunement</em>. It is not agreement; it is recognition. To feel seen is to realize that our inner world is intelligible to another mind.</p>\n          ', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80', 2, 3, 'published', 0, 5, 1320, 'The Strange Comfort of Being Understood | Wisdom', 'Exploring the psychology of psychological safety, attunement, and deep validation.', '2026-08-18 13:33:52', '2026-08-18 13:33:52', '2026-08-18 13:33:52', 'essay'),
(8, 'Why People Change When Nobody Is Watching', 'why-people-change-when-nobody-is-watching', 'Integrity, private habits, and the unseen forces of self-perception', 'Our true character is built not in public speeches or curated posts, but in the micro-choices we make when we believe no audience will ever witness them.', '\n<p>Social approval acts as a powerful external regulator. When eyes are on us, we instinctively stand straighter, speak more politely, and adhere to social norms. But what happens when the theater lights go dark?</p>\n\n<h2>The Feedback Loop of Secret Choices</h2>\n<p>Every time you keep a promise to yourself in private—or break one—you cast a vote for your internal self-concept. Integrity is simply the absence of discrepancy between your public persona and private conduct.</p>\n          ', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80', 2, 3, 'published', 0, 7, 1108, 'Why People Change When Nobody Is Watching | Aetheria', 'A study on private habits, personal integrity, and subconscious identity formation.', '2026-08-18 13:33:53', '2026-08-18 13:33:53', '2026-08-20 04:27:39', 'essay'),
(9, 'The Psychology of Unspoken Expectations', 'the-psychology-of-unspoken-expectations', 'Why silent contracts tear relationships apart from within', 'We often expect those we love to read our minds, treating our unexpressed desires as obvious facts. Uncommunicated expectations are premeditated disappointments.', '\n<p>In almost every conflict between partners, friends, or colleagues lies a hidden root: a tacit rule that was never verbalized. We assume that because a preference feels natural to us, it should be universally understood.</p>\n\n<h2>Communicating the Invisible</h2>\n<p>Maturity requires translating our subtle internal longings into clear, compassionate speech before resentment gathers interest.</p>\n          ', 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80', 2, 3, 'published', 0, 6, 890, 'The Psychology of Unspoken Expectations | Aetheria', 'Understanding silent relationship contracts and how to communicate unexpressed needs.', '2026-08-18 13:33:53', '2026-08-18 13:33:53', '2026-08-18 13:33:53', 'essay'),
(10, 'The Paradox of Choice in Modern Belonging', 'the-paradox-of-choice-in-modern-belonging', 'Why infinite connection leaves us feeling fundamentally alone', 'When options seem limitless, commitment feels like a sacrifice. Yet true depth in friendship and community can only grow in the soil of dedicated permanence.', '\n<p>Modern apps offer endless networking, dating, and community options. But an abundance of choices creates a lingering anxiety that something better lies just beyond the next swipe or click, preventing us from planting deep roots anywhere.</p>\n          ', 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?auto=format&fit=crop&w=1200&q=80', 2, 3, 'published', 0, 6, 1040, 'The Paradox of Choice in Belonging | Wisdom', 'How endless choices undermine community commitment and emotional stability.', '2026-08-18 13:33:53', '2026-08-18 13:33:53', '2026-08-18 13:33:53', 'essay'),
(11, 'Things We Understand Too Late', 'things-we-understand-too-late', 'Reflections on youth, urgency, and the quiet beauty of ordinary afternoons', 'In our twenties and thirties, we mistake busyness for achievement and intensity for depth. Wisdom usually arrives softly, long after the noise has settled.', '\n<p>Youth is marked by an urgent desire to arrive—to reach the destination, secure the title, build the legacy. We move through days as if they were obstacles standing between us and our real life. Only in quiet hindsight do we realize that those mundane afternoons <em>were</em> the real life.</p>\n\n<h2>The Illusion of the Next Phase</h2>\n<p>We tell ourselves: <em>\'Once this project finishes, once I move, once I earn more, I will begin living peacefully.\'</em> But peace is not a reward earned at the end of a marathon; it is the posture with which you run.</p>\n\n<blockquote class=\"editorial-quote\">\n  \"The tragedy of life is not that it ends so soon, but that we wait so long to begin noticing it.\"\n</blockquote>\n\n<h2>Simple Truths Worth Holding</h2>\n<ol>\n  <li><strong>Time moves unevenly:</strong> Painful hours linger, but golden years evaporate in a blink.</li>\n  <li><strong>Validation expires quickly:</strong> The applause of strangers brings warmth for an hour; self-respect sustains for a lifetime.</li>\n  <li><strong>Presence is rare:</strong> Giving someone your unhurried attention is the highest form of generosity.</li>\n</ol>\n          ', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', 4, 4, 'published', 1, 8, 2316, 'Things We Understand Too Late | Life Reflection', 'Meditation on presence, time, peace, and the timeless truths revealed through quiet observation.', '2026-08-18 13:33:53', '2026-08-18 13:33:53', '2026-08-20 05:09:40', 'essay'),
(12, 'The Life We Keep Postponing', 'the-life-we-keep-postponing', 'Overcoming conditional living and the phantom of perfect timing', 'Most people spend their lives waiting for ideal conditions before starting their creative work, expressing love, or honoring their true priorities.', '\n<p>We are experts at conditional living. We put our deepest creative impulses and personal desires into a mental drawer labeled \'someday\'. But ideal conditions are a myth created by fear to defer risk.</p>\n          ', 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80', 4, 4, 'published', 0, 5, 1250, 'The Life We Keep Postponing | Life Reflection', 'Breaking free from conditional living and embracing present creative action.', '2026-08-18 13:33:53', '2026-08-18 13:33:53', '2026-08-18 13:33:53', 'essay'),
(13, 'What Quiet Seasons Teach Us', 'what-quiet-seasons-teach-us', 'Finding solace and hidden growth in periods of stillness and obscurity', 'Not every chapter of life is meant for public victory or grand acceleration. Winter in nature looks like death, yet underground, roots are deepening.', '\n<p>Society celebrates momentum. We congratulate promotions, published books, and rapid expansion. But life moves in cyclical tides. Quiet seasons—where progress feels stagnant and external validation vanishes—are where deep character matures.</p>\n          ', 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80', 4, 4, 'published', 0, 6, 1480, 'What Quiet Seasons Teach Us | Life Reflection', 'Embracing slow periods of life for underground personal growth and renewal.', '2026-08-18 13:33:53', '2026-08-18 13:33:53', '2026-08-18 13:33:53', 'essay'),
(14, 'The Art of Unlearning', 'the-art-of-unlearning', 'Shedding inherited beliefs to discover authentic conviction', 'Much of adult intellectual life is not about acquiring new information, but carefully dismantling assumptions handed down to us by culture and upbringing.', '\n<p>By the time we reach maturity, our minds are cluttered with secondhand opinions about success, beauty, romance, and duty. True freedom begins when we interrogate these inherited scripts and retain only what survives our own lived experience.</p>\n          ', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80', 4, 4, 'published', 0, 7, 970, 'The Art of Unlearning | Aetheria Life Reflection', 'How dismantling inherited cultural beliefs unlocks personal clarity and truth.', '2026-08-18 13:33:53', '2026-08-18 13:33:53', '2026-08-18 13:33:53', 'essay'),
(15, 'On Friendship in the Second Half of Life', 'on-friendship-in-the-second-half-of-life', 'Nurturing lasting bonds past the era of easy proximity', 'In school and early adulthood, friendships form effortlessly through shared spaces. Later, maintaining connection requires intentional care, vulnerability, and forgiveness.', '\n<p>As careers, families, and geographic moves reshuffle our priorities, casual friendships tend to fade. The relationships that endure are those nurtured by deliberate maintenance and honest communication across distance.</p>\n          ', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80', 4, 4, 'published', 0, 6, 1120, 'On Friendship in the Second Half of Life | Life Reflection', 'Cultivating enduring personal friendships past youth and easy proximity.', '2026-08-18 13:33:53', '2026-08-18 13:33:53', '2026-08-18 13:33:53', 'essay'),
(16, 'When AI Starts Knowing Us Better Than We Know Ourselves', 'when-ai-starts-knowing-us-better-than-we-know-ourselves', 'Algorithmic intimacies, predictive psychology, and the future of human identity', 'Predictive models don’t just anticipate our purchases; they track our emotional fluctuations, latent desires, and micro-attentions. What remains of human free will when prediction becomes infallible?', '\n<p>We are crossing a subtle threshold. For centuries, self-knowledge was considered the exclusive domain of human introspection. Philosophers urged <em>\'Know thyself.\'</em> Today, a machine learning model analyzing your typing cadence, gaze duration, and purchase history can predict your depressive episodes before your spouse notices a change.</p>\n\n<h2>The Mirror That Shapes the Face</h2>\n<p>When recommendation systems predict what you will want to read, listen to, or buy, they are not merely reflecting your taste—they are actively steering it into predictable behavioral buckets for commercial optimization.</p>\n\n<blockquote class=\"editorial-quote\">\n  \"When an algorithm knows what you will choose before you choose it, choice ceases to be an act of freedom and becomes an execution of code.\"\n</blockquote>\n\n<h2>Guarding the Unquantifiable</h2>\n<p>To preserve human spontaneity, we must cultivate spaces of unmonitored existence. We must protect our right to be erratic, unpredictable, and inefficient in an increasingly optimized world.</p>\n          ', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80', 3, 5, 'published', 1, 9, 2890, 'When AI Starts Knowing Us Better Than We Know Ourselves | Tech', 'Predictive psychology, AI intimacies, and preserving human free will in an algorithmic era.', '2026-08-18 13:33:53', '2026-08-18 13:33:53', '2026-08-18 13:33:53', 'essay'),
(17, 'The Internet We Built and the World It Changed', 'the-internet-we-built-and-the-world-it-changed', 'From utopian decentralized commons to algorithmic enclosures', 'Early internet pioneers envisioned a global public library and democratic forum. How did that vision transform into curated walled gardens optimized for engagement?', '\n<p>In the 1990s, the web was open, chaotic, and personal. Blogs, independent forums, and hand-coded homepages dominated the landscape. Over the past two decades, financial incentives consolidated this vast archipelago into four or five central platforms.</p>\n\n<h2>Reclaiming the Independent Web</h2>\n<p>A new movement of writers, creators, and technologists is returning to independent protocols, RSS feeds, and personal publications to build a quieter, more thoughtful digital ecosystem.</p>\n          ', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80', 3, 5, 'published', 0, 7, 1650, 'The Internet We Built and the World It Changed | Technology', 'Tracing the evolution of the web from open commons to walled gardens and back again.', '2026-08-18 13:33:53', '2026-08-18 13:33:53', '2026-08-18 13:33:53', 'essay'),
(18, 'What Happens When Technology Becomes Invisible?', 'what-happens-when-technology-becomes-invisible', 'Ambient computing, ubiquitous sensors, and the fading boundary of reality', 'When screens fade into smart glass, ambient voice assistants, and neural interfaces, technology ceases to be a tool we use and becomes the environment we inhabit.', '\n<p>When technology required physical interaction—clicking a mouse or typing on a keyboard—we retained a clear mental boundary between digital and physical space. As computing becomes ambient and voice-activated, that boundary dissolves into a continuous hybrid reality.</p>\n          ', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', 3, 5, 'published', 0, 6, 1390, 'What Happens When Technology Becomes Invisible? | Technology', 'Exploring ambient computing, spatial interfaces, and the blurring of physical-digital realities.', '2026-08-18 13:33:53', '2026-08-18 13:33:53', '2026-08-18 13:33:53', 'essay'),
(19, 'The Architecture of Cyber Security in an Interconnected World', 'the-architecture-of-cyber-security', 'Why trust is the most fragile vulnerability in modern network infrastructure', 'Beyond firewalls and encryption keys, modern cybersecurity is fundamentally a discipline of managing human trust and systemic dependencies.', '\n<p>As supply chains, electrical grids, and personal identity systems rely on interconnected microservices, single-point vulnerabilities can cascade across continents. Security is no longer an isolated technical feature; it is foundational civic infrastructure.</p>\n          ', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80', 3, 5, 'published', 0, 8, 1020, 'The Architecture of Cyber Security | Aetheria Technology', 'An inquiry into systemic trust, digital vulnerabilities, and infrastructure resilience.', '2026-08-18 13:33:53', '2026-08-18 13:33:53', '2026-08-18 13:33:53', 'essay'),
(20, 'Programming as a Medium for Thought', 'programming-as-a-medium-for-thought', 'How code alters how we structure logic, problems, and creativity', 'Writing software is not merely a vocational skill; it is a way of formalizing abstract concepts, building mental models, and exploring complex systemic behavior.', '\n<p>When you write code, you construct a microworld governed by precise rules. Learning to structure algorithms refines how you analyze real-world problems, decompose complexity, and communicate logic.</p>\n          ', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80', 3, 5, 'published', 0, 7, 1280, 'Programming as a Medium for Thought | Technology', 'How writing software shapes human cognition, systemic thinking, and problem solving.', '2026-08-18 13:33:53', '2026-08-18 13:33:53', '2026-08-18 13:33:53', 'essay'),
(21, 'why people dont listen', 'why-people-dont-listen', 'oh sunde kyu nhu', 'kyuki koi kise di nhi sunda...', 'kyuki koi kise di nhi sunda', '', 1, 3, 'published', 0, 1, 4, 'why people dont listen', 'kyuki koi kise di nhi sunda', '2026-08-19 13:52:58', '2026-08-19 13:52:58', '2026-08-20 04:27:15', 'essay'),
(22, 'desrire vs deserve', 'desrire-vs-deserve', 'Karma\'s Role', 'we desire so many things in life, but get only what we deserve and that too as per God\'s wish but after giving the 100 % efforts ....', 'we desire so many things in life, but get only what we deserve and that too as per God\'s wish but after giving the 100 % efforts .', '', 1, 3, 'published', 0, 1, 0, 'desrire vs deserve', 'we desire so many things in life, but get only what we deserve and that too as per God\'s wish but after giving the 100 % efforts .', '2026-08-20 05:17:14', '2026-08-20 05:17:14', '2026-08-20 05:17:14', 'blog');

-- --------------------------------------------------------

--
-- Table structure for table `essay_tags`
--

DROP TABLE IF EXISTS `essay_tags`;
CREATE TABLE IF NOT EXISTS `essay_tags` (
  `essay_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`essay_id`,`tag_id`),
  KEY `tag_id` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `newsletter_subscribers`
--

DROP TABLE IF EXISTS `newsletter_subscribers`;
CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subscribed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('active','unsubscribed') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `newsletter_subscribers`
--

INSERT INTO `newsletter_subscribers` (`id`, `email`, `subscribed_at`, `status`) VALUES
(1, 'ankitguraya3@gmail.com', '2026-08-19 13:25:14', 'active'),
(2, 'agglobalfacts@gmail.com', '2026-08-20 04:29:34', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_tags_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','editor','user') COLLATE utf8mb4_unicode_ci DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_users_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Editor in Chief', 'admin@aetheria.com', '$2b$10$QYzwwTbyxnsS93KBlGGdJ.PjTyB9af0lcwi5AVng0.SnzB/8ai/au', 'admin', '2026-08-18 13:33:52', '2026-08-18 13:33:52');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD CONSTRAINT `bookmarks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookmarks_ibfk_2` FOREIGN KEY (`essay_id`) REFERENCES `essays` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`essay_id`) REFERENCES `essays` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `essays`
--
ALTER TABLE `essays`
  ADD CONSTRAINT `essays_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `essays_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `essay_tags`
--
ALTER TABLE `essay_tags`
  ADD CONSTRAINT `essay_tags_ibfk_1` FOREIGN KEY (`essay_id`) REFERENCES `essays` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `essay_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
