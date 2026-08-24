const bcrypt = require('bcryptjs');

async function seedDatabase(pool) {
  try {
    console.log('[Seed] Checking database seeding status...');

    // 0. Auto-migration for essays table columns
    try {
      await pool.query("ALTER TABLE essays ADD COLUMN type ENUM('essay', 'blog') DEFAULT 'essay'");
    } catch (e) {
      // Ignore if column already exists
    }
    try {
      await pool.query("UPDATE essays SET type = 'essay' WHERE type IS NULL");
    } catch (e) {}

    // 1. Seed Categories
    const [existingCategories] = await pool.query('SELECT COUNT(*) as count FROM categories');
    if (existingCategories[0].count === 0) {
      console.log('[Seed] Seeding categories...');
      const categories = [
        ['Ethics', 'ethics', 'Essays on morality, responsibility, digital ethics, truth, and the choices that shape human society.', '#8B263E'],
        ['Human Behaviour', 'human-behaviour', 'Exploring psychology, human nature, habits, subtle social dynamics, and decision-making.', '#2B59C3'],
        ['Life Reflection', 'life-reflection', 'Thoughtful examinations of time, personal growth, loneliness, purpose, failure, and quiet wisdom.', '#A67C46'],
        ['Technology', 'technology', 'Critical perspectives on artificial intelligence, digital culture, cybersecurity, and human-machine coexistence.', '#2E8B80']
      ];

      for (const cat of categories) {
        await pool.query(
          'INSERT IGNORE INTO categories (name, slug, description, accent_color) VALUES (?, ?, ?, ?)',
          cat
        );
      }
    }

    // 2. Seed Default Admin User
    const [existingUsers] = await pool.query('SELECT COUNT(*) as count FROM users');
    if (existingUsers[0].count === 0) {
      console.log('[Seed] Creating default admin user...');
      const hashedPassword = await bcrypt.hash('adminpassword123', 10);
      await pool.query(
        'INSERT IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Editor in Chief', 'admin@aetheria.com', hashedPassword, 'admin']
      );
    }

    // 3. Seed & Update Editorial Author (Prof. Monika Chopra)
    await pool.query(
      `UPDATE authors SET name = 'Prof. Monika Chopra', slug = 'prof-monika-chopra', bio = 'Professor, Scholar, and Writer specializing in ethics, human behavior, technology, and reflective thought.' WHERE id = 1 OR slug = 'prof-monika-chopra' OR slug = 'marcus-vance'`
    );

    const [existingAuthors] = await pool.query('SELECT COUNT(*) as count FROM authors');
    if (existingAuthors[0].count === 0) {
      console.log('[Seed] Seeding Prof. Monika Chopra as primary author...');
      await pool.query(
        'INSERT IGNORE INTO authors (name, slug, bio, avatar, website, social_links) VALUES (?, ?, ?, ?, ?, ?)',
        [
          'Prof. Monika Chopra',
          'prof-monika-chopra',
          'Professor, Scholar, and Writer specializing in ethics, human behavior, technology, and reflective thought.',
          '',
          'https://profmonikachopra.org',
          JSON.stringify({ twitter: 'https://x.com/profmonikachopra', linkedin: 'https://linkedin.com/in/profmonikachopra' })
        ]
      );
    }

    // Re-assign all existing essays to Prof. Monika Chopra
    const [monikaAuthor] = await pool.query("SELECT id FROM authors ORDER BY id ASC LIMIT 1");
    if (monikaAuthor.length > 0) {
      await pool.query("UPDATE essays SET author_id = ?", [monikaAuthor[0].id]);
    }

    // 4. Seed Essays (20 High-Quality Essays across 4 categories)
    const [existingEssays] = await pool.query('SELECT COUNT(*) as count FROM essays');
    if (existingEssays[0].count === 0) {
      console.log('[Seed] Seeding 20 editorial essays...');

      const [cats] = await pool.query('SELECT id, slug FROM categories');
      const [auths] = await pool.query('SELECT id, slug FROM authors');

      const catMap = {};
      cats.forEach(c => { catMap[c.slug] = c.id; });

      const authMap = {};
      auths.forEach(a => { authMap[a.slug] = a.id; });

      const sampleEssays = [
        // --- ETHICS ---
        {
          title: 'When Convenience Becomes a Moral Choice',
          slug: 'when-convenience-becomes-a-moral-choice',
          subtitle: 'How seamless technology subtly erodes our capacity for ethical friction',
          excerpt: 'We rarely notice the point at which efficiency replaces intentionality. In a friction-free world, doing what is right often requires choosing to slow down.',
          content: `
<p>Modern design preaches a single gospel: eliminate friction. Every tap saved, every auto-complete suggestion accepted, every automated delivery scheduled is celebrated as a victory of human ingenuity. Yet in our relentless crusade for convenience, we have quietly surrendered something crucial—the fertile space of moral reflection.</p>

<h2>The Hidden Cost of Seamlessness</h2>
<p>Ethics is rarely convenient. It demands pause, hesitation, and occasionally discomfort. When an algorithm automatically selects the fastest route, the cheapest product, or the most digestible opinion, it removes the tiny pauses where conscience traditionally operated.</p>

<blockquote class="editorial-quote">
  "When every choice is pre-packaged for maximum ease, moral agency degrades into passive consumption."
</blockquote>

<p>Consider how we interact with information. Decades ago, evaluating a claim required physical trips to libraries, comparing cross-references, or engaging in debate. Today, an algorithmic feed serves confirmation directly to our retinas before a skeptical thought can even take root. The friction that once allowed us to ask <em>'Is this true?'</em> has been engineered away.</p>

<h2>Choosing Intentional Friction</h2>
<p>Reclaiming our moral clarity does not mean abandoning technology or retreating to primitive lifestyles. It means cultivating intentional friction—deliberately building moments of pause into our daily rituals.</p>

<ul>
  <li><strong>Pause before reacting:</strong> Institute a mandatory 10-second reflection period before sharing or commenting on provocative news.</li>
  <li><strong>Audit your defaults:</strong> Question automated decisions, from subscription renewals to suggested replies.</li>
  <li><strong>Embrace non-optimized time:</strong> Allow space for open-ended conversations that lack immediate utility.</li>
</ul>

<p>Ultimately, a life without friction is a life without traction. If we wish to walk upright as ethical beings, we must welcome the bumps in the road.</p>
          `,
          featured_image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
          author_id: authMap['eleanor-vance'],
          category_id: catMap['ethics'],
          featured: 1,
          reading_time: 7,
          views: 1420,
          seo_title: 'When Convenience Becomes a Moral Choice | Aetheria Ethics',
          seo_description: 'An inquiry into how frictionless technology alters human morality and decision-making.'
        },
        {
          title: 'The Cost of Knowing Everything',
          slug: 'the-cost-of-knowing-everything',
          subtitle: 'On global awareness, emotional exhaustion, and the ethics of attention',
          excerpt: 'Human empathy was forged in small villages. Today, the global stream delivers infinite tragedy directly into our pockets. What happens when our moral bandwidth is overwhelmed?',
          content: `
<p>For most of human history, a person’s world was defined by their immediate horizon—the village, the valley, the surrounding woods. News from distant lands arrived in months, filtered through travelers or letters. Today, every catastrophe on earth broadcasts live to the palm of our hand in high definition.</p>

<h2>The Saturation of Empathy</h2>
<p>Our nervous systems were never evolved to process universal suffering concurrently. When we are exposed to dozens of crises every hour, two dangerous symptoms emerge: emotional numbness or performative outrage.</p>

<p>When empathy is stretched across eight billion soul-events, it thins into a translucent film. We feel guilty for looking away, yet paralyzed when looking on.</p>

<h2>An Ethics of Attention</h2>
<p>Attention is the currency of consciousness. Where we direct it is fundamentally a moral choice. To care deeply about everything simultaneously is to care effectively about nothing.</p>

<blockquote class="editorial-quote">
  "True moral engagement requires depth, not breath. We must learn the quiet discipline of local devotion."
</blockquote>

<p>By establishing boundaries around our digital consumption, we preserve the emotional vitality required to make meaningful, concrete impacts in our immediate communities.</p>
          `,
          featured_image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80',
          author_id: authMap['eleanor-vance'],
          category_id: catMap['ethics'],
          featured: 0,
          reading_time: 6,
          views: 980,
          seo_title: 'The Cost of Knowing Everything | Aetheria',
          seo_description: 'Exploring global awareness, emotional exhaustion, and the moral limits of attention.'
        },
        {
          title: 'Who Is Responsible When Machines Decide?',
          slug: 'who-is-responsible-when-machines-decide',
          subtitle: 'Navigating moral vacuum in the age of algorithmic governance',
          excerpt: 'When automated credit scoring, medical triage, or autonomous cars make life-altering decisions, who bears the moral burden? The engineer, the training data, or the algorithm itself?',
          content: `
<p>As artificial intelligence shifts from predictive advisory roles to autonomous decision-makers, humanity faces a novel philosophical dilemma: the diffusion of responsibility. When a system makes a decision that yields tragic consequences, traditional frameworks of fault crumble.</p>

<h2>The Moral Buffer</h2>
<p>Bureaucracy has always used protocol as a shield against personal guilt. AI represents the ultimate culmination of this trend—a non-human shield that executes decisions without hesitation, doubt, or remorse.</p>

<p>When an algorithm denies a mortgage loan or prioritizes one patient over another, stakeholders can point to statistical weights rather than human judgment. The responsibility dissolves into a sea of gradient descent updates.</p>

<h2>Reclaiming Accountability</h2>
<p>If we are to maintain a humane society, we must institute strict principles of ethical accountability:</p>

<ol>
  <li>Every automated outcome must have a designated human steward who assumes ultimate legal and moral responsibility.</li>
  <li>Algorithms must maintain explainability standards before deployment in civic infrastructure.</li>
  <li>Citizens must retain the right to appeal machine decisions to a human review board.</li>
</ol>
          `,
          featured_image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
          author_id: authMap['eleanor-vance'],
          category_id: catMap['ethics'],
          featured: 0,
          reading_time: 8,
          views: 1150,
          seo_title: 'Who Is Responsible When Machines Decide? | Ethics',
          seo_description: 'Analyzing the moral vacuums and accountability gaps created by automated decision systems.'
        },
        {
          title: 'The Mirage of Absolute Transparency',
          slug: 'the-mirage-of-absolute-transparency',
          subtitle: 'Why privacy is not secrecy, but the right to human complexity',
          excerpt: 'In a culture obsessed with radical openness, we often forget that mystery and private interiority are essential for personal growth and authentic relationships.',
          content: `
<p>The popular modern refrain <em>'If you have nothing to hide, you have nothing to fear'</em> rests on a fundamental misunderstanding of human nature. Privacy was never merely about concealing wrongdoing; it is the sanctuary in which the self develops.</p>

<h2>The Loss of Sanctuary</h2>
<p>Without private space—free from public evaluation and social metrics—individuals tend toward safe, conformist behavior. We censor our early drafts, withhold unfinished thoughts, and perform curated idealizations of our lives.</p>

<p>When everything is recorded, indexed, and visible, forgiveness becomes rare and context vanishes. True vulnerability requires a quiet room, not an arena.</p>
          `,
          featured_image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1200&q=80',
          author_id: authMap['eleanor-vance'],
          category_id: catMap['ethics'],
          featured: 0,
          reading_time: 5,
          views: 820,
          seo_title: 'The Mirage of Absolute Transparency | Aetheria Ethics',
          seo_description: 'Why privacy is crucial for human nuance, authentic selfhood, and moral freedom.'
        },
        {
          title: 'The Ethos of Digital Minimalism',
          slug: 'the-ethos-of-digital-minimalism',
          subtitle: 'Reclaiming autonomy in an attention economy designed for distraction',
          excerpt: 'Digital minimalism is not a trendy phone aesthetic; it is an act of ethical resistance against corporate capture of human focus.',
          content: `
<p>Every notification banner, red badge, and auto-playing feed is engineered by hundreds of cognitive scientists working to capture one thing: your temporal awareness. To resist this pull is not merely a productivity hack; it is a declaration of personal sovereignty.</p>

<h2>Rebuilding Focus as a Virtue</h2>
<p>When we allow our attention to be continuously fragmented, our capacity for deep contemplation, empathetic listening, and sustained creation shrinks. Intentional solitude becomes an endangered experience.</p>
          `,
          featured_image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80',
          author_id: authMap['eleanor-vance'],
          category_id: catMap['ethics'],
          featured: 0,
          reading_time: 6,
          views: 940,
          seo_title: 'The Ethos of Digital Minimalism | Aetheria',
          seo_description: 'How reducing digital noise restores focus, moral agency, and deep intentionality.'
        },

        // --- HUMAN BEHAVIOUR ---
        {
          title: 'Why We Pretend Not to Care',
          slug: 'why-we-pretend-not-to-care',
          subtitle: 'The psychological defense mechanisms of emotional detachment in modern culture',
          excerpt: 'Apathy has become the defining aesthetic of the 21st century. By projecting indifference, we shield ourselves from rejection, but also forfeit true intimacy.',
          content: `
<p>Observe modern social interactions: the delayed text responses, the ironic humor, the carefully calibrated detachment. We live in an era where caring deeply is viewed as a vulnerability, while nonchalance is mistaken for strength.</p>

<h2>The Armor of Coolness</h2>
<p>Psychologically, cynicism and detachment are protective shields. If I do not invest hope in a project, a relationship, or an ideal, its failure cannot hurt me. Irony becomes a bunker against disappointment.</p>

<blockquote class="editorial-quote">
  "Indifference protects us from pain, but it also starves us of joy. You cannot selectively numb emotion."
</blockquote>

<h2>The Courage of Sincerity</h2>
<p>To state plainly what you desire, what moves you, or what breaks your heart requires immense courage. Sincerity exposes us to ridicule, yet it remains the only bridge to genuine human connection.</p>
          `,
          featured_image: 'https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?auto=format&fit=crop&w=1200&q=80',
          author_id: authMap['marcus-vance'],
          category_id: catMap['human-behaviour'],
          featured: 1,
          reading_time: 6,
          views: 1890,
          seo_title: 'Why We Pretend Not to Care | Human Behaviour',
          seo_description: 'An analysis of emotional detachment, irony, and the psychological courage of sincerity.'
        },
        {
          title: 'The Strange Comfort of Being Understood',
          slug: 'the-strange-comfort-of-being-understood',
          subtitle: 'How deep validation recalibrates the human nervous system',
          excerpt: 'Few experiences equal the quiet shock of meeting someone who sees your unvarnished internal reality without offering judgment or unsolicited advice.',
          content: `
<p>Human beings spend immense energy constructing public masks. We translate complex, chaotic inner landscapes into neat conversational summaries. When someone pierces through that translation and grasps our exact meaning, the body responds with a physiological sigh of relief.</p>

<h2>Attunement and Belonging</h2>
<p>Psychologists call this experience <em>attunement</em>. It is not agreement; it is recognition. To feel seen is to realize that our inner world is intelligible to another mind.</p>
          `,
          featured_image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
          author_id: authMap['marcus-vance'],
          category_id: catMap['human-behaviour'],
          featured: 0,
          reading_time: 5,
          views: 1320,
          seo_title: 'The Strange Comfort of Being Understood | Human Behaviour',
          seo_description: 'Exploring the psychology of psychological safety, attunement, and deep validation.'
        },
        {
          title: 'Why People Change When Nobody Is Watching',
          slug: 'why-people-change-when-nobody-is-watching',
          subtitle: 'Integrity, private habits, and the unseen forces of self-perception',
          excerpt: 'Our true character is built not in public speeches or curated posts, but in the micro-choices we make when we believe no audience will ever witness them.',
          content: `
<p>Social approval acts as a powerful external regulator. When eyes are on us, we instinctively stand straighter, speak more politely, and adhere to social norms. But what happens when the theater lights go dark?</p>

<h2>The Feedback Loop of Secret Choices</h2>
<p>Every time you keep a promise to yourself in private—or break one—you cast a vote for your internal self-concept. Integrity is simply the absence of discrepancy between your public persona and private conduct.</p>
          `,
          featured_image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
          author_id: authMap['marcus-vance'],
          category_id: catMap['human-behaviour'],
          featured: 0,
          reading_time: 7,
          views: 1100,
          seo_title: 'Why People Change When Nobody Is Watching | Aetheria',
          seo_description: 'A study on private habits, personal integrity, and subconscious identity formation.'
        },
        {
          title: 'The Psychology of Unspoken Expectations',
          slug: 'the-psychology-of-unspoken-expectations',
          subtitle: 'Why silent contracts tear relationships apart from within',
          excerpt: 'We often expect those we love to read our minds, treating our unexpressed desires as obvious facts. Uncommunicated expectations are premeditated disappointments.',
          content: `
<p>In almost every conflict between partners, friends, or colleagues lies a hidden root: a tacit rule that was never verbalized. We assume that because a preference feels natural to us, it should be universally understood.</p>

<h2>Communicating the Invisible</h2>
<p>Maturity requires translating our subtle internal longings into clear, compassionate speech before resentment gathers interest.</p>
          `,
          featured_image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80',
          author_id: authMap['marcus-vance'],
          category_id: catMap['human-behaviour'],
          featured: 0,
          reading_time: 6,
          views: 890,
          seo_title: 'The Psychology of Unspoken Expectations | Aetheria',
          seo_description: 'Understanding silent relationship contracts and how to communicate unexpressed needs.'
        },
        {
          title: 'The Paradox of Choice in Modern Belonging',
          slug: 'the-paradox-of-choice-in-modern-belonging',
          subtitle: 'Why infinite connection leaves us feeling fundamentally alone',
          excerpt: 'When options seem limitless, commitment feels like a sacrifice. Yet true depth in friendship and community can only grow in the soil of dedicated permanence.',
          content: `
<p>Modern apps offer endless networking, dating, and community options. But an abundance of choices creates a lingering anxiety that something better lies just beyond the next swipe or click, preventing us from planting deep roots anywhere.</p>
          `,
          featured_image: 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?auto=format&fit=crop&w=1200&q=80',
          author_id: authMap['marcus-vance'],
          category_id: catMap['human-behaviour'],
          featured: 0,
          reading_time: 6,
          views: 1040,
          seo_title: 'The Paradox of Choice in Belonging | Human Behaviour',
          seo_description: 'How endless choices undermine community commitment and emotional stability.'
        },

        // --- LIFE REFLECTION ---
        {
          title: 'Things We Understand Too Late',
          slug: 'things-we-understand-too-late',
          subtitle: 'Reflections on youth, urgency, and the quiet beauty of ordinary afternoons',
          excerpt: 'In our twenties and thirties, we mistake busyness for achievement and intensity for depth. Wisdom usually arrives softly, long after the noise has settled.',
          content: `
<p>Youth is marked by an urgent desire to arrive—to reach the destination, secure the title, build the legacy. We move through days as if they were obstacles standing between us and our real life. Only in quiet hindsight do we realize that those mundane afternoons <em>were</em> the real life.</p>

<h2>The Illusion of the Next Phase</h2>
<p>We tell ourselves: <em>'Once this project finishes, once I move, once I earn more, I will begin living peacefully.'</em> But peace is not a reward earned at the end of a marathon; it is the posture with which you run.</p>

<blockquote class="editorial-quote">
  "The tragedy of life is not that it ends so soon, but that we wait so long to begin noticing it."
</blockquote>

<h2>Simple Truths Worth Holding</h2>
<ol>
  <li><strong>Time moves unevenly:</strong> Painful hours linger, but golden years evaporate in a blink.</li>
  <li><strong>Validation expires quickly:</strong> The applause of strangers brings warmth for an hour; self-respect sustains for a lifetime.</li>
  <li><strong>Presence is rare:</strong> Giving someone your unhurried attention is the highest form of generosity.</li>
</ol>
          `,
          featured_image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
          author_id: authMap['sophia-lin'],
          category_id: catMap['life-reflection'],
          featured: 1,
          reading_time: 8,
          views: 2310,
          seo_title: 'Things We Understand Too Late | Life Reflection',
          seo_description: 'Meditation on presence, time, peace, and the timeless truths revealed through quiet observation.'
        },
        {
          title: 'The Life We Keep Postponing',
          slug: 'the-life-we-keep-postponing',
          subtitle: 'Overcoming conditional living and the phantom of perfect timing',
          excerpt: 'Most people spend their lives waiting for ideal conditions before starting their creative work, expressing love, or honoring their true priorities.',
          content: `
<p>We are experts at conditional living. We put our deepest creative impulses and personal desires into a mental drawer labeled 'someday'. But ideal conditions are a myth created by fear to defer risk.</p>
          `,
          featured_image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80',
          author_id: authMap['sophia-lin'],
          category_id: catMap['life-reflection'],
          featured: 0,
          reading_time: 5,
          views: 1250,
          seo_title: 'The Life We Keep Postponing | Life Reflection',
          seo_description: 'Breaking free from conditional living and embracing present creative action.'
        },
        {
          title: 'What Quiet Seasons Teach Us',
          slug: 'what-quiet-seasons-teach-us',
          subtitle: 'Finding solace and hidden growth in periods of stillness and obscurity',
          excerpt: 'Not every chapter of life is meant for public victory or grand acceleration. Winter in nature looks like death, yet underground, roots are deepening.',
          content: `
<p>Society celebrates momentum. We congratulate promotions, published books, and rapid expansion. But life moves in cyclical tides. Quiet seasons—where progress feels stagnant and external validation vanishes—are where deep character matures.</p>
          `,
          featured_image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80',
          author_id: authMap['sophia-lin'],
          category_id: catMap['life-reflection'],
          featured: 0,
          reading_time: 6,
          views: 1480,
          seo_title: 'What Quiet Seasons Teach Us | Life Reflection',
          seo_description: 'Embracing slow periods of life for underground personal growth and renewal.'
        },
        {
          title: 'The Art of Unlearning',
          slug: 'the-art-of-unlearning',
          subtitle: 'Shedding inherited beliefs to discover authentic conviction',
          excerpt: 'Much of adult intellectual life is not about acquiring new information, but carefully dismantling assumptions handed down to us by culture and upbringing.',
          content: `
<p>By the time we reach maturity, our minds are cluttered with secondhand opinions about success, beauty, romance, and duty. True freedom begins when we interrogate these inherited scripts and retain only what survives our own lived experience.</p>
          `,
          featured_image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
          author_id: authMap['sophia-lin'],
          category_id: catMap['life-reflection'],
          featured: 0,
          reading_time: 7,
          views: 970,
          seo_title: 'The Art of Unlearning | Aetheria Life Reflection',
          seo_description: 'How dismantling inherited cultural beliefs unlocks personal clarity and truth.'
        },
        {
          title: 'On Friendship in the Second Half of Life',
          slug: 'on-friendship-in-the-second-half-of-life',
          subtitle: 'Nurturing lasting bonds past the era of easy proximity',
          excerpt: 'In school and early adulthood, friendships form effortlessly through shared spaces. Later, maintaining connection requires intentional care, vulnerability, and forgiveness.',
          content: `
<p>As careers, families, and geographic moves reshuffle our priorities, casual friendships tend to fade. The relationships that endure are those nurtured by deliberate maintenance and honest communication across distance.</p>
          `,
          featured_image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
          author_id: authMap['sophia-lin'],
          category_id: catMap['life-reflection'],
          featured: 0,
          reading_time: 6,
          views: 1120,
          seo_title: 'On Friendship in the Second Half of Life | Life Reflection',
          seo_description: 'Cultivating enduring personal friendships past youth and easy proximity.'
        },

        // --- TECHNOLOGY ---
        {
          title: 'When AI Starts Knowing Us Better Than We Know Ourselves',
          slug: 'when-ai-starts-knowing-us-better-than-we-know-ourselves',
          subtitle: 'Algorithmic intimacies, predictive psychology, and the future of human identity',
          excerpt: 'Predictive models don’t just anticipate our purchases; they track our emotional fluctuations, latent desires, and micro-attentions. What remains of human free will when prediction becomes infallible?',
          content: `
<p>We are crossing a subtle threshold. For centuries, self-knowledge was considered the exclusive domain of human introspection. Philosophers urged <em>'Know thyself.'</em> Today, a machine learning model analyzing your typing cadence, gaze duration, and purchase history can predict your depressive episodes before your spouse notices a change.</p>

<h2>The Mirror That Shapes the Face</h2>
<p>When recommendation systems predict what you will want to read, listen to, or buy, they are not merely reflecting your taste—they are actively steering it into predictable behavioral buckets for commercial optimization.</p>

<blockquote class="editorial-quote">
  "When an algorithm knows what you will choose before you choose it, choice ceases to be an act of freedom and becomes an execution of code."
</blockquote>

<h2>Guarding the Unquantifiable</h2>
<p>To preserve human spontaneity, we must cultivate spaces of unmonitored existence. We must protect our right to be erratic, unpredictable, and inefficient in an increasingly optimized world.</p>
          `,
          featured_image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
          author_id: authMap['julian-thorne'],
          category_id: catMap['technology'],
          featured: 1,
          reading_time: 9,
          views: 2890,
          seo_title: 'When AI Starts Knowing Us Better Than We Know Ourselves | Tech',
          seo_description: 'Predictive psychology, AI intimacies, and preserving human free will in an algorithmic era.'
        },
        {
          title: 'The Internet We Built and the World It Changed',
          slug: 'the-internet-we-built-and-the-world-it-changed',
          subtitle: 'From utopian decentralized commons to algorithmic enclosures',
          excerpt: 'Early internet pioneers envisioned a global public library and democratic forum. How did that vision transform into curated walled gardens optimized for engagement?',
          content: `
<p>In the 1990s, the web was open, chaotic, and personal. Blogs, independent forums, and hand-coded homepages dominated the landscape. Over the past two decades, financial incentives consolidated this vast archipelago into four or five central platforms.</p>

<h2>Reclaiming the Independent Web</h2>
<p>A new movement of writers, creators, and technologists is returning to independent protocols, RSS feeds, and personal publications to build a quieter, more thoughtful digital ecosystem.</p>
          `,
          featured_image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
          author_id: authMap['julian-thorne'],
          category_id: catMap['technology'],
          featured: 0,
          reading_time: 7,
          views: 1650,
          seo_title: 'The Internet We Built and the World It Changed | Technology',
          seo_description: 'Tracing the evolution of the web from open commons to walled gardens and back again.'
        },
        {
          title: 'What Happens When Technology Becomes Invisible?',
          slug: 'what-happens-when-technology-becomes-invisible',
          subtitle: 'Ambient computing, ubiquitous sensors, and the fading boundary of reality',
          excerpt: 'When screens fade into smart glass, ambient voice assistants, and neural interfaces, technology ceases to be a tool we use and becomes the environment we inhabit.',
          content: `
<p>When technology required physical interaction—clicking a mouse or typing on a keyboard—we retained a clear mental boundary between digital and physical space. As computing becomes ambient and voice-activated, that boundary dissolves into a continuous hybrid reality.</p>
          `,
          featured_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
          author_id: authMap['julian-thorne'],
          category_id: catMap['technology'],
          featured: 0,
          reading_time: 6,
          views: 1390,
          seo_title: 'What Happens When Technology Becomes Invisible? | Technology',
          seo_description: 'Exploring ambient computing, spatial interfaces, and the blurring of physical-digital realities.'
        },
        {
          title: 'The Architecture of Cyber Security in an Interconnected World',
          slug: 'the-architecture-of-cyber-security',
          subtitle: 'Why trust is the most fragile vulnerability in modern network infrastructure',
          excerpt: 'Beyond firewalls and encryption keys, modern cybersecurity is fundamentally a discipline of managing human trust and systemic dependencies.',
          content: `
<p>As supply chains, electrical grids, and personal identity systems rely on interconnected microservices, single-point vulnerabilities can cascade across continents. Security is no longer an isolated technical feature; it is foundational civic infrastructure.</p>
          `,
          featured_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
          author_id: authMap['julian-thorne'],
          category_id: catMap['technology'],
          featured: 0,
          reading_time: 8,
          views: 1020,
          seo_title: 'The Architecture of Cyber Security | Aetheria Technology',
          seo_description: 'An inquiry into systemic trust, digital vulnerabilities, and infrastructure resilience.'
        },
        {
          title: 'Programming as a Medium for Thought',
          slug: 'programming-as-a-medium-for-thought',
          subtitle: 'How code alters how we structure logic, problems, and creativity',
          excerpt: 'Writing software is not merely a vocational skill; it is a way of formalizing abstract concepts, building mental models, and exploring complex systemic behavior.',
          content: `
<p>When you write code, you construct a microworld governed by precise rules. Learning to structure algorithms refines how you analyze real-world problems, decompose complexity, and communicate logic.</p>
          `,
          featured_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
          author_id: authMap['julian-thorne'],
          category_id: catMap['technology'],
          featured: 0,
          reading_time: 7,
          views: 1280,
          seo_title: 'Programming as a Medium for Thought | Technology',
          seo_description: 'How writing software shapes human cognition, systemic thinking, and problem solving.'
        }
      ];

      for (const item of sampleEssays) {
        const [res] = await pool.query(
          `INSERT IGNORE INTO essays (
            title, slug, subtitle, excerpt, content, featured_image,
            author_id, category_id, status, featured, reading_time, views,
            seo_title, seo_description, published_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'published', ?, ?, ?, ?, ?, NOW())`,
          [
            item.title, item.slug, item.subtitle, item.excerpt, item.content, item.featured_image,
            item.author_id, item.category_id, item.featured, item.reading_time, item.views,
            item.seo_title, item.seo_description
          ]
        );

        const essayId = res.insertId;

        if (item.featured && essayId) {
          await pool.query(
            `INSERT IGNORE INTO comments (essay_id, name, email, content, status) VALUES 
             (?, 'Clara Vance', 'clara@example.com', 'A deeply moving reflection. The point regarding intentional friction resonates profoundly with my own work.', 'approved'),
             (?, 'David Miller', 'david.m@example.com', 'Splendid essay. I find myself constantly caught in the friction-free trap. Thank you for this reminder.', 'approved')`,
            [essayId, essayId]
          );
        }
      }
      console.log('[Seed] 20 sample essays successfully seeded!');
    }

    console.log('[Seed] Database initialization complete.');
  } catch (error) {
    console.error('[Seed Error]:', error.message);
  }
}

module.exports = { seedDatabase };
