import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen, Headphones, Tablet, ArrowRight, Calendar,
  Clock, MapPin, Users,
} from "lucide-react";
import {
  PreviewLinkCard,
  PreviewLinkCardTrigger,
  PreviewLinkCardContent,
  PreviewLinkCardImage,
} from "@/components/animate-ui/components/radix/preview-link-card";
import ThreeDSlider from "./ThreeDSlider";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

/* ─────────────────────────────────────────────────────────────
   1. PARTNERS & SPONSORS
───────────────────────────────────────────────────────────── */
const PARTNERS = [
  { name: "City Council",        abbr: "CC",  color: "bg-primary" },
  { name: "Edu Foundation",      abbr: "EF",  color: "bg-secondary" },
  { name: "Open Books Fund",     abbr: "OBF", color: "bg-accent" },
  { name: "Literate Future",     abbr: "LF",  color: "bg-success" },
  { name: "PageTurn Media",      abbr: "PTM", color: "bg-primary" },
  { name: "ReadRight NGO",       abbr: "RR",  color: "bg-secondary" },
  { name: "National Archives",   abbr: "NA",  color: "bg-accent" },
  { name: "Print & Press Co.",   abbr: "PPC", color: "bg-success" },
];

export const PartnersSection = () => (
  <section className="py-20 px-6 bg-muted/30">
    <div className="container mx-auto">
      <motion.div
        className="text-center mb-12"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
      >
        <motion.p variants={fadeUp} className="font-heading font-bold text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">
          Trusted By
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-black">
          Our Partners &amp; Sponsors
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground font-body mt-3 max-w-xl mx-auto">
          Proudly supported by organizations that believe in the power of reading and open access to knowledge.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-5"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
      >
        {PARTNERS.map(({ name, abbr, color }) => (
          <motion.div
            key={name}
            variants={fadeUp}
            className="brutal-card p-5 rounded-lg flex flex-col items-center gap-3 group hover:-translate-y-1 transition-transform cursor-pointer"
          >
            <div className={`${color} w-14 h-14 brutal-border rounded-lg flex items-center justify-center font-heading font-black text-sm group-hover:scale-110 transition-transform`}>
              {abbr}
            </div>
            <p className="font-heading font-bold text-sm text-center leading-tight">{name}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="text-center text-sm text-muted-foreground mt-8 font-body"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
      >
        Interested in partnering with LibraVault?{" "}
        <a href="#contact" className="font-heading font-bold underline hover:text-foreground transition-colors">
          Get in touch →
        </a>
      </motion.p>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   2. GENRE EXPLORER GRID
───────────────────────────────────────────────────────────── */
const GENRES = [
  { name: "Fiction",    count: "2,340 books", color: "bg-primary",   textColor: "text-primary-foreground",   rotate: -2, imageUrl: "https://i.pinimg.com/736x/f6/df/43/f6df43c1f2d7376cdeedcf4603be46c5.jpg" },
  { name: "Sci-Fi",    count: "1,120 books", color: "bg-secondary", textColor: "text-secondary-foreground", rotate: 1,  imageUrl: "https://i.pinimg.com/736x/ef/46/7f/ef467f446262375f139b75e63e6daaf9.jpg" },
  { name: "History",   count: "980 books",   color: "bg-accent",    textColor: "text-accent-foreground",    rotate: -1, imageUrl: "https://i.pinimg.com/1200x/58/01/1a/58011a854c28215a4c8d25ade6e0aa9a.jpg" },
  { name: "Mystery",   count: "870 books",   color: "bg-success",   textColor: "text-success-foreground",   rotate: 2,  imageUrl: "https://i.pinimg.com/736x/56/22/b2/5622b21c74eef9e94a3c44de6eed78d7.jpg" },
  { name: "Romance",   count: "1,450 books", color: "bg-primary",   textColor: "text-primary-foreground",   rotate: 1,  imageUrl: "https://i.pinimg.com/736x/f9/78/a9/f978a9e4cd1d0be424bdf37e5725ded8.jpg" },
  { name: "Biography", count: "640 books",   color: "bg-foreground", textColor: "text-background",          rotate: -2, imageUrl: "https://i.pinimg.com/736x/e1/6e/1f/e16e1f8e6dcf99651a45612faf922c8f.jpg" },
  { name: "Children's",count: "760 books",   color: "bg-secondary", textColor: "text-secondary-foreground", rotate: 1,  imageUrl: "https://i.pinimg.com/1200x/e6/f1/8d/e6f18df315395d3d8635b950cfd9aa0f.jpg" },
  { name: "Self-Help", count: "530 books",   color: "bg-accent",    textColor: "text-accent-foreground",    rotate: -1, imageUrl: "https://i.pinimg.com/1200x/31/64/b4/3164b4a90268d2f65147219e5650bbc6.jpg" },
  { name: "Fantasy",   count: "1,200 books", color: "bg-success",   textColor: "text-success-foreground",   rotate: 2,  imageUrl: "https://i.pinimg.com/736x/6c/d0/c6/6cd0c6f8669d70bcce1604e9216a3ee3.jpg" },
  { name: "Thriller",  count: "890 books",   color: "bg-primary",   textColor: "text-primary-foreground",   rotate: -1, imageUrl: "https://i.pinimg.com/736x/de/1a/5c/de1a5cb626115ca2950583b8f324ea71.jpg" },
  { name: "Poetry",    count: "310 books",   color: "bg-secondary", textColor: "text-secondary-foreground", rotate: 1,  imageUrl: "https://i.pinimg.com/736x/2b/1d/ca/2b1dca2b4b4c1192201d1d23445bc861.jpg" },
  { name: "Technology",count: "720 books",   color: "bg-foreground", textColor: "text-background",          rotate: -2, imageUrl: "https://i.pinimg.com/736x/1d/ff/81/1dff8198d3e2749c9907ab44060800bc.jpg" },
];

export const GenreExplorerSection = () => (
  <section className="py-20 px-6">
    <div className="container mx-auto">
      <motion.div
        className="text-center mb-12"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
      >
        <motion.p variants={fadeUp} className="font-heading font-bold text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">
          Browse by Genre
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-black">
          Genre Explorer
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground font-body mt-3 max-w-lg mx-auto">
          Dive into any world you want. Pick a genre and start exploring thousands of titles.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
      >
        {GENRES.map(({ name, count, color, textColor, rotate, imageUrl }) => (
          <motion.div key={name} variants={fadeUp} style={{ rotate: `${rotate}deg` }}>
            <PreviewLinkCard href="/dashboard/books" followCursor="x" className="block">
              <PreviewLinkCardTrigger className="block">
                <motion.div
                  whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }}
                  className={`${color} ${textColor} brutal-border rounded-lg p-4 md:p-6 cursor-pointer relative group h-full`}
                >
                  <h3 className="font-heading text-xl md:text-2xl font-black leading-tight mb-1 break-words hyphens-auto">{name}</h3>
                  <p className="font-body text-xs md:text-sm opacity-80">{count}</p>
                  <ArrowRight className="absolute bottom-4 right-4 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </PreviewLinkCardTrigger>

              <PreviewLinkCardContent side="top" sideOffset={14} align="center">
                <PreviewLinkCardImage src={imageUrl} alt={name} />
                <div className="p-3 border-t-2 border-border">
                  <p className="font-heading font-black text-sm">{name}</p>
                  <p className="text-xs text-muted-foreground font-body">{count} available</p>
                </div>
              </PreviewLinkCardContent>
            </PreviewLinkCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="text-center mt-10"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
      >
        <Link to="/dashboard/books" className="brutal-btn bg-foreground text-background rounded-md font-heading inline-flex items-center gap-2">
          Browse All Genres <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   3. NEW ARRIVALS
───────────────────────────────────────────────────────────── */
const NEW_ARRIVALS = [
  { title: "The Quiet Algorithm",     author: "Nadia Cross",       genre: "Sci-Fi",    rating: 4.8, color: "bg-primary",   days: 2, imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&q=80" },
  { title: "Echoes of the Forgotten", author: "Marcus Afolabi",    genre: "Mystery",   rating: 4.6, color: "bg-secondary", days: 4, imageUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&q=80" },
  { title: "A Thousand Paper Suns",   author: "Yuki Tanaka",       genre: "Fiction",   rating: 4.9, color: "bg-accent",    days: 5, imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&q=80" },
  { title: "The Iron Diplomat",       author: "Sofia Reyes",       genre: "History",   rating: 4.5, color: "bg-success",   days: 6, imageUrl: "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=300&q=80" },
  { title: "Beyond the Fold",         author: "James Okafor",      genre: "Thriller",  rating: 4.7, color: "bg-primary",   days: 7, imageUrl: "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?w=300&q=80" },
  { title: "Roots & Satellites",      author: "Amara Diallo",      genre: "Biography", rating: 4.4, color: "bg-foreground",days: 7, imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&q=80" },
  { title: "Neon Prophecy",           author: "Lin Fei",           genre: "Sci-Fi",    rating: 4.7, color: "bg-secondary", days: 8, imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&q=80" },
  { title: "The Last Cartographer",   author: "Elena Vasquez",     genre: "Adventure", rating: 4.5, color: "bg-accent",    days: 9, imageUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300&q=80" },
];

const sliderItems = NEW_ARRIVALS.map((book, i) => ({
  title: book.title,
  num: String(i + 1).padStart(2, "0"),
  imageUrl: book.imageUrl,
  data: book,
}));

export const NewArrivalsSection = () => (
  <section className="relative bg-white flex flex-col">
    <div className="px-6 pt-16 pb-8">
      <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <p className="font-heading font-bold text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Fresh Off the Shelf
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-foreground">
            New Arrivals
          </h2>
        </div>
        <Link
          to="/dashboard/books"
          className="brutal-btn bg-background text-foreground rounded-md font-heading text-sm inline-flex items-center gap-2"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>

    <ThreeDSlider
      items={sliderItems}
      speedWheel={0.04}
      speedDrag={-0.15}
      containerStyle={{ height: '80vh', background: 'white' }}
    />
  </section>
);

/* ─────────────────────────────────────────────────────────────
   4. LIBRARY EVENTS & PROGRAMS
───────────────────────────────────────────────────────────── */
const EVENTS = [
  {
    title: "Mystery Book Club",
    date: "Apr 5, 2026",
    time: "6:00 PM – 8:00 PM",
    location: "Reading Room A",
    seats: 12,
    tag: "Book Club",
    tagColor: "bg-primary",
    desc: "This month we explore Agatha Christie's overlooked masterpiece. All genres welcome!",
  },
  {
    title: "Author Talk: Nadia Cross",
    date: "Apr 10, 2026",
    time: "5:30 PM – 7:00 PM",
    location: "Main Hall",
    seats: 80,
    tag: "Author Talk",
    tagColor: "bg-secondary",
    desc: "Bestselling Sci-Fi author Nadia Cross discusses her new novel and answers your questions.",
  },
  {
    title: "Kids' Reading Hour",
    date: "Apr 12, 2026",
    time: "10:00 AM – 11:00 AM",
    location: "Children's Corner",
    seats: 30,
    tag: "Children's",
    tagColor: "bg-accent",
    desc: "A fun-filled morning of stories, illustrations, and interactive reading for ages 4–10.",
  },
  {
    title: "Creative Writing Workshop",
    date: "Apr 18, 2026",
    time: "2:00 PM – 5:00 PM",
    location: "Study Room 3",
    seats: 16,
    tag: "Workshop",
    tagColor: "bg-success",
    desc: "Guided exercises on character building, world-making, and narrative structure.",
  },
  {
    title: "Poetry Open Mic Night",
    date: "Apr 22, 2026",
    time: "7:00 PM – 9:00 PM",
    location: "Courtyard",
    seats: 50,
    tag: "Open Mic",
    tagColor: "bg-primary",
    desc: "Take the mic or just listen — all styles, all voices, all levels welcome.",
  },
  {
    title: "Digital Literacy for Seniors",
    date: "Apr 26, 2026",
    time: "10:00 AM – 12:00 PM",
    location: "Computer Lab",
    seats: 20,
    tag: "Workshop",
    tagColor: "bg-secondary",
    desc: "Hands-on help with smartphones, e-readers, and library digital resources.",
  },
];

export const EventsSection = () => (
  <section className="py-20 px-6">
    <div className="container mx-auto">
      <motion.div
        className="text-center mb-12"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
      >
        <motion.p variants={fadeUp} className="font-heading font-bold text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">
          What's On
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-black">
          Events &amp; Programs
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground font-body mt-3 max-w-lg mx-auto">
          Book clubs, author talks, kids' reading hour and more — there's always something happening at LibraVault.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
      >
        {EVENTS.map(({ title, date, time, location, seats, tag, tagColor, desc }) => (
          <motion.div
            key={title}
            variants={fadeUp}
            className="brutal-card rounded-lg p-6 flex flex-col gap-4 group hover:-translate-y-1 transition-transform"
          >
            <div className="flex items-start justify-between gap-2">
              <span className={`${tagColor} font-heading font-black text-xs px-2 py-1 rounded brutal-border`}>
                {tag}
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground font-heading font-semibold">
                <Users className="w-3.5 h-3.5" /> {seats} seats
              </div>
            </div>

            <div>
              <h3 className="font-heading font-black text-xl leading-tight mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground font-body">{desc}</p>
            </div>

            <div className="space-y-1.5 mt-auto pt-2 border-t-2 border-border">
              <div className="flex items-center gap-2 text-sm font-heading font-semibold">
                <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" /> {date}
              </div>
              <div className="flex items-center gap-2 text-sm font-heading font-semibold">
                <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" /> {time}
              </div>
              <div className="flex items-center gap-2 text-sm font-heading font-semibold">
                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" /> {location}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="text-center mt-10"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
      >
        <Link to="/dashboard" className="brutal-btn bg-primary text-primary-foreground rounded-md font-heading inline-flex items-center gap-2">
          View All Events <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   5. DIGITAL LIBRARY PREVIEW
───────────────────────────────────────────────────────────── */
const DIGITAL_ITEMS = [
  { type: "E-Book",     title: "The Quiet Algorithm",     author: "Nadia Cross",    icon: BookOpen, color: "bg-primary" },
  { type: "Audiobook",  title: "Echoes of the Forgotten", author: "Marcus Afolabi", icon: Headphones, color: "bg-secondary" },
  { type: "E-Book",     title: "A Thousand Paper Suns",   author: "Yuki Tanaka",    icon: Tablet, color: "bg-accent" },
  { type: "Audiobook",  title: "The Iron Diplomat",       author: "Sofia Reyes",    icon: Headphones, color: "bg-success" },
];

export const DigitalLibrarySection = () => (
  <section className="py-20 px-6 bg-foreground text-background overflow-hidden relative">
    <div
      className="absolute inset-0 opacity-5 pointer-events-none"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg,transparent,transparent 20px,currentColor 20px,currentColor 21px)",
      }}
    />
    <div className="container mx-auto relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* Left: Copy */}
        <motion.div className="flex-1" initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="font-heading font-bold text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Read Anywhere
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-6xl font-black leading-tight mb-6">
            Digital<br />
            <span className="text-primary">Library.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body text-background/70 text-lg mb-6 max-w-md">
            Access thousands of e-books and audiobooks instantly — no waitlists, no physical pick-ups. Read on your device, listen on the go.
          </motion.p>
          <motion.ul variants={stagger} className="space-y-3 mb-8">
            {[
              { icon: BookOpen,   label: "5,000+ e-books across all genres" },
              { icon: Headphones, label: "1,200+ audiobooks narrated by professionals" },
              { icon: Tablet,     label: "Available on all devices — phone, tablet, desktop" },
            ].map(({ icon: Icon, label }) => (
              <motion.li key={label} variants={fadeUp} className="flex items-center gap-3 font-heading font-semibold">
                <div className="w-8 h-8 bg-primary brutal-border rounded flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary-foreground" />
                </div>
                {label}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-8">
            <Link
              to="/signup"
              className="brutal-btn bg-primary text-primary-foreground rounded-md font-heading inline-flex items-center gap-2"
              style={{ borderColor: "hsl(var(--primary))" }}
            >
              Access Digital Library <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/dashboard/books"
              className="brutal-btn font-heading inline-flex items-center gap-2"
              style={{ borderColor: "hsl(var(--background))", color: "hsl(var(--background))" }}
            >
              Browse E-Books
            </Link>
          </motion.div>
        </motion.div>
        {/* Right: (animation removed) */}
      </div>
    </div>
  </section>
);
