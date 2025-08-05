// /app/careers/page.tsx
import { FaLaptopCode, FaUsers, FaPalette, FaRocket } from 'react-icons/fa';
import Link from 'next/link';

export default function CareersPage() {
  return (
    <main className="bg-[#F9F4F8] text-[#4A154B] min-h-screen py-16 px-6 pt-25">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Join Our Journey 🚀</h1>
        <p className="text-lg text-[#6E4B75] max-w-2xl mx-auto">
          At ZC, we're redefining how people shop online. Join our team of dreamers, builders, and go-getters who are shaping the future of eCommerce.
        </p>
        <Link href="#roles">
          <button className="mt-6 bg-[#4A154B] text-white px-6 py-2 rounded-full hover:bg-[#6E4B75] transition">
            View Open Roles
          </button>
        </Link>
      </section>

      {/* Why Join Us */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-6 text-center">Why ZenCart?</h2>
        <div className="grid md:grid-cols-4 gap-6 text-center text-sm">
          {[
            { icon: <FaRocket />, title: 'Fast Growth', desc: 'Be part of a rapidly growing digital brand.' },
            { icon: <FaLaptopCode />, title: 'Tech-first', desc: 'Work with modern stacks and smart people.' },
            { icon: <FaPalette />, title: 'Creative Freedom', desc: 'Your ideas are not just heard—they’re built.' },
            { icon: <FaUsers />, title: 'Diverse Team', desc: 'Work with teammates from all walks of life.' },
          ].map(({ icon, title, desc }, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
              <div className="text-3xl mb-3 text-[#A97BA5]">{icon}</div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-[#4A154B]/80">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Roles */}
      <section id="roles" className="mb-20">
        <h2 className="text-2xl font-bold mb-6 text-center pt-24">Open Positions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'Frontend Developer',
              type: 'Full-time · Remote',
              desc: 'Build stunning interfaces with React and Tailwind.',
            },
            {
              title: 'UI/UX Designer',
              type: 'Contract · Hybrid',
              desc: 'Design delightful shopping experiences for millions.',
            },
            {
              title: 'Marketing Strategist',
              type: 'Full-time · Onsite',
              desc: 'Plan campaigns that inspire and convert.',
            },
            {
              title: 'Customer Support Lead',
              type: 'Full-time · Remote',
              desc: 'Lead the team that keeps our customers smiling.',
            },
          ].map((job, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
              <p className="text-xs text-[#4A154B]/70 mb-3">{job.type}</p>
              <p className="mb-4">{job.desc}</p>
              <Link
                href={`mailto:careers@zencart.com?subject=Application for ${encodeURIComponent(
                  job.title
                )}`}
                className="text-sm text-[#A97BA5] font-medium hover:underline"
              >
                Apply Now →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Culture Section */}
      <section className="mb-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Our Culture</h2>
        <p className="text-[#4A154B]/70 max-w-xl mx-auto mb-8">
          We celebrate innovation, ownership, and fun. From team hackathons to online shopping contests—every day is a new vibe.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {['Collaborative', 'Inclusive', 'Transparent', 'Customer-first'].map((value, i) => (
            <span
              key={i}
              className="bg-[#EDE1ED] text-[#4A154B] px-4 py-2 rounded-full text-sm font-medium"
            >
              {value}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h3 className="text-xl font-semibold mb-2">Didn't find a role that fits?</h3>
        <p className="text-[#4A154B]/70 mb-4">We’re always looking for passionate people.</p>
        <Link
          href="mailto:careers@zencartstore.com"
          className="bg-[#4A154B] text-white px-6 py-2 rounded-full inline-block hover:bg-[#6E4B75] transition"
        >
          Email Us Your Profile
        </Link>
      </section>
    </main>
  );
}
