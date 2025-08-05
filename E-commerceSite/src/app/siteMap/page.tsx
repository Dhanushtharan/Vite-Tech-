'use client';

import { FaMapMarkerAlt, FaClock, FaBuilding, FaIndustry } from 'react-icons/fa';

export default function BranchPage() {
  return (
    <main className="bg-[#F9F4F8] text-[#4A154B] min-h-screen py-16 px-6 pt-24">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">ZenCart Headquarters 🏢</h1>
        <p className="text-lg text-[#6E4B75] max-w-2xl mx-auto">
          Visit our main branch – the heart of everything from strategy and design to packaging and logistics.
        </p>
      </section>

      {/* Map */}
      <section className="mb-16 max-w-5xl mx-auto">
        <div className="rounded-xl overflow-hidden shadow-lg border border-[#e4d2e9]">
          <iframe
            title="Zencart Headquarters Location"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCsyR6-TAS1Oxk2BHlAHNCzWntW5upPrKk&q=Chennai,Tamil+Nadu,India"
          />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
        <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
          <FaMapMarkerAlt className="text-[#A97BA5] text-3xl mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-1">Main Office</h3>
            <p className="text-sm opacity-90">
              ZenCart Pvt. Ltd.  
              42, Phoenix Tech Park, Velachery, Chennai, Tamil Nadu - 600042
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
          <FaClock className="text-[#A97BA5] text-3xl mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-1">Working Hours</h3>
            <p className="text-sm opacity-90">
              Monday – Friday: 9 AM – 6 PM <br />
              Saturday: 10 AM – 4 PM <br />
              Sunday: Closed
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
          <FaBuilding className="text-[#A97BA5] text-3xl mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-1">Departments</h3>
            <p className="text-sm opacity-90">
              Design, Tech, Sales, Support, Marketing, Finance, Logistics
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
          <FaIndustry className="text-[#A97BA5] text-3xl mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-1">Production Unit</h3>
            <p className="text-sm opacity-90">
              State-of-the-art fulfillment center located in Sriperumbudur, Tamil Nadu.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h3 className="text-xl font-semibold mb-2">Want to partner or visit?</h3>
        <p className="text-[#4A154B]/70 mb-4">Reach out at <a href="mailto:contact@zencart.com" className="underline hover:text-[#A97BA5]">contact@zencartstore.com</a></p>
      </section>
    </main>
  );
}
