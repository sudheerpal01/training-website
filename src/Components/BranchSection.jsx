import { IoCall } from "react-icons/io5";
import { MdLocationOn, MdEmail, MdAccessTime } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

const lucknow = "/Images/hero1.jpg";
const kanpur  = "/Images/hero2.jpg";

const branches = [
  {
    city: "Lucknow",
    image: lucknow,
    location:
      "2nd Floor, B-36, Sector O, Near Ram Ram Bank Chauraha, Aliganj, Lucknow UP 226021",
    contact: "+91 9198483820",
    email: "info@thedigicoders.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM",
  },
  {
    city: "Kanpur",
    image: kanpur,
    location:
      "128/3/98, Yashoda Nagar, Kanpur UP 208011, Opp. Shivaji Park",
    contact: "+91 6394 296 293",
    email: "info@thedigicoders.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM",
  },
  {
    city: "Gorakhpur",
    image: kanpur,
    location:
      "128/3/98, Yashoda Nagar, Kanpur UP 208011, Opp. Shivaji Park",
    contact: "+91 6394 296 293",
    email: "info@thedigicoders.com",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM",
  },
];

// ─── Custom Hook: Intersection Observer ───────────────────────────────────────
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
};

// ─── BranchCard Component ──────────────────────────────────────────────────────
const BranchCard = ({ image, city, location, contact, email, hours, index }) => {
  const [cardRef, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  const animationDelay = `${index * 150}ms`;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(48px)",
        transition: `opacity 0.6s ease ${animationDelay}, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${animationDelay}`,
        flex: "1 1 0",
        minWidth: "260px",
        maxWidth: "380px",
      }}
      className="bg-white rounded-2xl shadow-md overflow-hidden border border-orange-100"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "176px" }}>
        <img
          src={image}
          alt={city}
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(13,27,42,0.55) 0%, transparent 60%)",
          }}
        />
        {/* City badge */}
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
          style={{ background: "#0d1b2a" }}
        >
          {city}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-900 mb-1">{city} Branch</h2>
        <div className="mb-3 h-[2px] w-38 rounded-full bg-gradient-to-r from-orange-500 to-transparent" />

        {/* Info rows */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <MdLocationOn className="text-xl mt-0.5 shrink-0" style={{ color: "#ff8c00" }} />
            <div>
              <p className="font-semibold text-xs text-gray-800">Location</p>
              <p className="text-xs text-gray-500">{location}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <IoCall className="text-xl mt-0.5 shrink-0" style={{ color: "#ff8c00" }} />
            <div>
              <p className="font-semibold text-xs text-gray-800">Contact</p>
              <p className="text-xs text-gray-500">{contact}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MdEmail className="text-xl mt-0.5 shrink-0" style={{ color: "#2e7d32" }} />
            <div>
              <p className="font-semibold text-xs text-gray-800">Email</p>
              <p className="text-xs text-gray-500 break-words">{email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MdAccessTime className="text-xl mt-0.5 shrink-0" style={{ color: "#2e7d32" }} />
            <div>
              <p className="font-semibold text-xs text-gray-800">Working Hours</p>
              <p className="text-xs text-gray-500">{hours}</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href={`tel:${contact}`}
          className="mt-5 flex items-center justify-center gap-2 w-full text-white text-sm font-semibold py-2.5 rounded-lg"
          style={{
            background: hovered ? "#e65100" : "#ff8c00",
            transform: hovered ? "translateY(-2px)" : "translateY(0)",
            boxShadow: hovered ? "0 6px 20px rgba(255,140,0,0.35)" : "none",
            transition: "background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
          }}
        >
          <IoCall />
          Contact {city}
        </a>
      </div>
    </div>
  );
};

// ─── Branches Section ──────────────────────────────────────────────────────────
const BranchesSection = () => {
  const [headingRef, headingInView] = useInView(0.2);

  return (
    <section className="py-14" style={{ background: "#f9f5f0" }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div
          ref={headingRef}
          className="text-center mb-12"
          style={{
            opacity: headingInView ? 1 : 0,
            transform: headingInView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our &nbsp;Branches
          </h2>
          <div className="mx-auto mt-3 h-[2px] w-52 rounded-full bg-gradient-to-r from-orange-500 to-transparent" />
          <p className="text-gray-500 mt-3">
            Serving students across Uttar Pradesh from prime locations
          </p>
        </div>

        {/* Cards — all 3 in one row */}
        <div
          className="flex flex-wrap justify-center gap-5"
          style={{ alignItems: "stretch" }}
        >
          {branches.map((branch, i) => (
            <BranchCard key={branch.city} {...branch} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default BranchesSection;
