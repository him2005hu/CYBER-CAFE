/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Printer, 
  Copy, 
  Globe, 
  FileText, 
  Smartphone, 
  CreditCard, 
  MapPin, 
  Phone, 
  Clock,
  Mail,
  CheckCircle2,
  X,
  ChevronRight
} from "lucide-react";

const rechargePlans = {
  Jio: [
    { price: "₹239", validity: "28 Days", data: "1.5GB/Day", benefits: "Unlimited Voice" },
    { price: "₹299", validity: "28 Days", data: "2GB/Day", benefits: "Unlimited Voice" },
    { price: "₹666", validity: "84 Days", data: "1.5GB/Day", benefits: "Unlimited Voice" },
    { price: "₹2999", validity: "365 Days", data: "2.5GB/Day", benefits: "Unlimited Voice" },
  ],
  Airtel: [
    { price: "₹265", validity: "28 Days", data: "1GB/Day", benefits: "Unlimited Voice" },
    { price: "₹299", validity: "28 Days", data: "1.5GB/Day", benefits: "Unlimited Voice" },
    { price: "₹719", validity: "84 Days", data: "1.5GB/Day", benefits: "Unlimited Voice" },
    { price: "₹3359", validity: "365 Days", data: "2.5GB/Day", benefits: "Disney+ Hotstar" },
  ],
  Vi: [
    { price: "₹269", validity: "28 Days", data: "1GB/Day", benefits: "Unlimited Voice" },
    { price: "₹299", validity: "28 Days", data: "1.5GB/Day", benefits: "Binge All Night" },
    { price: "₹719", validity: "84 Days", data: "1.5GB/Day", benefits: "Binge All Night" },
    { price: "₹3099", validity: "365 Days", data: "2GB/Day", benefits: "Disney+ Hotstar" },
  ],
  BSNL: [
    { price: "₹107", validity: "35 Days", data: "3GB Total", benefits: "200 Mins Voice" },
    { price: "₹197", validity: "70 Days", data: "2GB/Day", benefits: "Unlimited Voice" },
    { price: "₹397", validity: "150 Days", data: "2GB/Day", benefits: "Unlimited Voice" },
    { price: "₹1999", validity: "365 Days", data: "600GB Total", benefits: "Unlimited Voice" },
  ]
};

const billServices = {
  Electricity: [
    { provider: "UPPCL (Urban)", state: "Uttar Pradesh" },
    { provider: "UPPCL (Rural)", state: "Uttar Pradesh" },
    { provider: "BSES Yamuna", state: "Delhi" },
    { provider: "BSES Rajdhani", state: "Delhi" },
    { provider: "Tata Power", state: "Delhi" },
  ],
  Water: [
    { provider: "Delhi Jal Board", state: "Delhi" },
    { provider: "UP Jal Nigam", state: "Uttar Pradesh" },
    { provider: "Municipal Corporation", state: "Local" },
  ],
  "Dish / DTH": [
    { provider: "Tata Play", plans: "Starting ₹150" },
    { provider: "Airtel Digital TV", plans: "Starting ₹200" },
    { provider: "Dish TV", plans: "Starting ₹180" },
    { provider: "Videocon d2h", plans: "Starting ₹170" },
    { provider: "Sun Direct", plans: "Starting ₹140" },
  ]
};

const otherServices = [
  { title: "PAN Card", desc: "New application or correction in existing PAN card." },
  { title: "Aadhar Services", desc: "Aadhar card print and basic update assistance." },
  { title: "Voter ID", desc: "New Voter ID registration and correction." },
  { title: "Passport", desc: "Online application and appointment booking." },
  { title: "Ration Card", desc: "New application and unit addition/deletion." },
  { title: "Certificates", desc: "Income, Caste, and Domicile certificate applications." },
  { title: "Travel Booking", desc: "Train (IRCTC), Flight, and Bus ticket bookings." },
  { title: "Insurance", desc: "Life and Vehicle insurance premium payments." },
];

const formServices = [
  { title: "UPSC Forms", desc: "IAS, IPS, NDA, CDS and other Civil Services applications." },
  { title: "SSC / Staff Selection", desc: "CGL, CHSL, MTS and GD Constable registrations." },
  { title: "Railway (RRB)", desc: "NTPC, Group D and ALP recruitment forms." },
  { title: "Banking (IBPS/SBI)", desc: "PO, Clerk and Specialist Officer applications." },
  { title: "State Govt Jobs", desc: "UPSSSC, Police, and Teaching job forms." },
  { title: "Admission Forms", desc: "CUET, JEE, NEET and University entrance forms." },
];

const internetProviders = [
  { name: "SITI Network", speed: "Up to 100 Mbps", price: "₹400/mo", tech: "Fiber" },
  { name: "Airtel Xstream", speed: "Up to 1 Gbps", price: "Starts ₹499", tech: "Fiber" },
  { name: "JioFiber", speed: "Up to 1 Gbps", price: "Starts ₹399", tech: "Fiber" },
  { name: "Excitel", speed: "Up to 400 Mbps", price: "Starts ₹449", tech: "Fiber" },
  { name: "BSNL Bharat Fiber", speed: "Up to 300 Mbps", price: "Starts ₹329", tech: "Fiber" },
];

const photocopyDetails = [
  { type: "B&W Single Side", price: "₹2 per page", desc: "Standard black and white copy." },
  { type: "B&W Double Side", price: "₹3 per page", desc: "Both sides black and white copy." },
  { type: "Bulk Copying", price: "Contact for Quote", desc: "Discounted rates for 100+ copies." },
];

const printingDetails = [
  { size: "A4 Size", type: "B&W / Color", desc: "Standard document printing." },
  { size: "Legal Size", type: "B&W / Color", desc: "For legal documents and affidavits." },
  { size: "A3 Size", type: "B&W / Color", desc: "For posters and large charts." },
  { size: "Photo Printing", type: "Glossy Paper", desc: "High-quality passport and 4x6 photos." },
];

const services = [
  {
    icon: <Printer className="w-6 h-6" />,
    title: "Printing & Scanning",
    description: "High-quality color and B&W printing, scanning, and document digitization."
  },
  {
    icon: <Copy className="w-6 h-6" />,
    title: "Photocopy",
    description: "Fast and affordable photocopying services for all your documents."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "High-Speed Internet",
    description: "Powered by SITI Network. Blazing fast 100 Mbps speed at just ₹400."
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Online Form Filling",
    description: "Assistance with government forms, job applications, and exam registrations."
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile Recharges",
    description: "Instant recharges for all major telecom operators and DTH services."
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Bill Payments",
    description: "Electricity, Water, and DTH (Dish) bill payment services."
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Other Services",
    description: "PAN, Aadhar, Voter ID, Passport, and more digital assistance."
  }
];

export default function App() {
  const [selectedOperator, setSelectedOperator] = useState<keyof typeof rechargePlans | null>(null);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  
  const [selectedBillType, setSelectedBillType] = useState<keyof typeof billServices | null>(null);
  const [showBillModal, setShowBillModal] = useState(false);
  
  const [showOtherModal, setShowOtherModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showInternetModal, setShowInternetModal] = useState(false);
  const [showPhotocopyModal, setShowPhotocopyModal] = useState(false);
  const [showPrintingModal, setShowPrintingModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative overflow-x-hidden perspective-1000">
      {/* Holi Border Design */}
      <div className="holi-border-frame"></div>
      <div className="holi-dot-border">
        <div className="holi-dot-row">
          <div className="holi-dot bg-pink-500 animate-pulse"></div>
          <div className="holi-dot bg-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="holi-dot bg-emerald-500 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="holi-dot bg-orange-500 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="holi-dot bg-pink-500 animate-pulse"></div>
          <div className="holi-dot bg-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="holi-dot bg-emerald-500 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="holi-dot bg-orange-500 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
        <div className="holi-dot-row">
          <div className="holi-dot bg-pink-500 animate-pulse"></div>
          <div className="holi-dot bg-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="holi-dot bg-emerald-500 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="holi-dot bg-orange-500 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="holi-dot bg-pink-500 animate-pulse"></div>
          <div className="holi-dot bg-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="holi-dot bg-emerald-500 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="holi-dot bg-orange-500 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>

      {/* Background Holi Watermarks */}
      <div className="holi-watermark-bg text-pink-500 top-40 -left-20 -rotate-12">BURA NA MANO</div>
      <div className="holi-watermark-bg text-yellow-500 top-[60%] -right-20 rotate-12">HOLI HAI</div>
      <div className="holi-watermark-bg text-emerald-500 bottom-40 left-10 -rotate-6">COLORS OF JOY</div>
      <div className="holi-watermark-bg text-orange-500 top-1/4 left-1/2 -translate-x-1/2 opacity-[0.02]">AK CYBER</div>

      {/* Holi Splashes */}
      <div className="holi-splash w-64 h-64 bg-pink-400 top-20 -left-20 animate-float"></div>
      <div className="holi-splash w-80 h-80 bg-yellow-300 top-1/3 -right-20 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="holi-splash w-72 h-72 bg-emerald-400 bottom-20 left-1/4 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="holi-splash w-96 h-96 bg-orange-400 top-1/2 left-1/2 -translate-x-1/2 animate-float" style={{ animationDelay: '3s' }}></div>

      {/* Scrolling Discount Banner */}
      <div className="bg-gradient-to-r from-pink-600 via-yellow-500 to-emerald-600 text-white py-2 overflow-hidden whitespace-nowrap border-b border-white/20 relative z-50">
        <div className="inline-block animate-marquee">
          <span className="mx-8 font-black uppercase tracking-[0.3em] text-sm">🎨 HAPPY HOLI • 10% DISCOUNT • CELEBRATE WITH COLORS • 10% DISCOUNT • HAPPY HOLI • 10% DISCOUNT • CELEBRATE WITH COLORS • 10% DISCOUNT</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Globe className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-indigo-900">AK SRIVASTAV</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Home</a>
              <a href="#services" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Services</a>
              <a href="#contact" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Contact</a>
            </div>
            <a 
              href="tel:9354114810" 
              className="bg-indigo-600 text-white px-4 py-2 rounded-full font-medium hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Phone size={18} />
              <span className="hidden sm:inline">Call Now</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
                Your Digital Partner in Khora
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                AK SRIVASTAV <br />
                <span className="text-indigo-600 italic font-serif tracking-widest drop-shadow-md">CYBER CAFE</span>
              </h1>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                Providing reliable digital services since years. From high-speed internet to 
                professional document handling, we are your one-stop shop for all cyber needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a 
                  href="#services" 
                  className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all text-center"
                >
                  Explore Services
                </a>
                <a 
                  href="#contact" 
                  className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all text-center"
                >
                  Visit Us Today
                </a>
              </div>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="text-4xl font-serif italic font-black text-indigo-600 mt-12 border-t-2 border-indigo-100 pt-4 inline-block tracking-tighter"
              >
                AK CYBER
              </motion.p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end self-end pb-4 preserve-3d animate-3d"
            >
              <div className="relative w-full max-w-[320px]">
                {/* Unique Tagline Badge */}
                <motion.div 
                  initial={{ rotate: -10, scale: 0 }}
                  animate={{ rotate: -5, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.8 }}
                  className="absolute -top-4 -right-2 z-20 bg-yellow-400 text-indigo-900 font-black px-3 py-1 rounded-full shadow-lg border-2 border-white transform -rotate-6 text-[10px] sm:text-xs"
                >
                  UNIQUE! ✨
                </motion.div>

                <div className="relative rounded-lg overflow-hidden shadow-xl border-2 border-white bg-slate-200 aspect-square">
                  <img 
                    src="https://picsum.photos/seed/copy-center/400/400" 
                    alt="AK Cyber Cafe Printer Station" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-indigo-900/10 flex items-end p-3">
                    <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-indigo-600">
                      PRINTER STATION
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Premium Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We offer a wide range of services to help you with your daily digital tasks efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  y: -10, 
                  rotateY: 10, 
                  rotateX: -5,
                  scale: 1.05 
                }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => {
                  if (service.title === "Mobile Recharges") {
                    setShowRechargeModal(true);
                  } else if (service.title === "Bill Payments") {
                    setShowBillModal(true);
                  } else if (service.title === "Other Services") {
                    setShowOtherModal(true);
                  } else if (service.title === "Online Form Filling") {
                    setShowFormModal(true);
                  } else if (service.title === "High-Speed Internet") {
                    setShowInternetModal(true);
                  } else if (service.title === "Photocopy") {
                    setShowPhotocopyModal(true);
                  } else if (service.title === "Printing & Scanning") {
                    setShowPrintingModal(true);
                  }
                }}
                className={`p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-2xl transition-all group cursor-pointer preserve-3d`}
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WiFi Plans Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">SITI Network WiFi Plans</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Get the best-in-class high-speed fiber internet for your home and office.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-3xl shadow-xl border-2 border-indigo-100 overflow-hidden relative"
            >
              <div className="bg-indigo-600 p-6 text-center text-white">
                <h3 className="text-xl font-bold uppercase tracking-widest">Super Fast Plan</h3>
                <div className="mt-4 flex justify-center items-baseline">
                  <span className="text-5xl font-extrabold tracking-tight">₹400</span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                    <span className="text-slate-700 font-medium">100 Mbps Unlimited Data</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                    <span className="text-slate-700 font-medium">SITI Network Fiber Technology</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                    <span className="text-slate-700 font-medium">Low Latency for Gaming</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                    <span className="text-slate-700 font-medium">24/7 Technical Support</span>
                  </li>
                </ul>
                <a 
                  href="tel:9354114810"
                  className="block w-full py-4 bg-indigo-600 text-white text-center rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                  Get Connection Now
                </a>
              </div>
              {/* SITI Logo Placeholder */}
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-tighter">
                SITI NETWORK
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Why Choose AK Srivastav?</h2>
              <div className="space-y-6">
                {[
                  "Fast & Reliable High-Speed Internet",
                  "Professional Document Assistance",
                  "Affordable Pricing for All Services",
                  "Centrally Located in Khora Colony",
                  "Friendly & Helpful Staff Support"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle2 className="text-emerald-400 flex-shrink-0" />
                    <span className="text-lg text-indigo-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-indigo-800/50 rounded-3xl border border-indigo-700/50 overflow-hidden flex items-center justify-center p-8">
                <div className="text-center">
                  <Globe size={80} className="mx-auto mb-6 text-indigo-400 opacity-50" />
                  <p className="text-2xl font-serif italic text-indigo-200">
                    "Committed to providing the best digital experience to our community."
                  </p>
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl text-slate-900 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <CheckCircle2 className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-xl">100%</p>
                    <p className="text-sm text-slate-500">Customer Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Watermarked Document Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-500 mb-2"
            >
              Holi Special Offer!
            </motion.h2>
            <p className="text-slate-600">Celebrate the festival of colors with AK Srivastav Cyber Cafe.</p>
          </div>
          
          <div className="max-w-2xl mx-auto relative bg-white border-4 border-pink-100 p-12 rounded-3xl shadow-2xl overflow-hidden">
            {/* Holi Watermarks */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.08] rotate-[-25deg] select-none">
              <div className="flex flex-col items-center">
                <span className="text-8xl font-black text-pink-600 whitespace-nowrap">HAPPY HOLI</span>
                <span className="text-6xl font-black text-orange-500 whitespace-nowrap">AK CYBER</span>
              </div>
            </div>
            
            <div className="relative z-10 border-2 border-dashed border-pink-200 p-8 rounded-2xl bg-white/80 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-serif italic font-bold text-pink-600">AK SRIVASTAV</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">Holi Celebration Edition</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-orange-600">FESTIVAL VOUCHER</p>
                  <p className="text-xs text-slate-400">Valid during Holi Week</p>
                </div>
              </div>
              
              <div className="space-y-6 text-center py-8">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full font-black text-4xl shadow-lg"
                >
                  10% OFF
                </motion.div>
                <p className="text-slate-700 font-medium text-lg">
                  Bring colors to your digital life! Get a flat 10% discount on all 
                  services. Just show this colorful voucher at our shop.
                </p>
              </div>
              
              <div className="mt-12 pt-8 border-t border-pink-50 flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] text-pink-400 uppercase font-bold">Location</p>
                  <p className="text-xs font-medium">21 NO Water Tank, Khora Colony</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button 
                    onClick={() => window.print()} 
                    className="bg-pink-50 hover:bg-pink-100 text-pink-600 p-3 rounded-full transition-colors shadow-sm"
                    title="Print Holi Voucher"
                  >
                    <Printer size={20} />
                  </button>
                  <p className="text-[10px] text-pink-400 uppercase font-bold">Festival Seal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Get In Touch</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm flex-shrink-0">
                    <MapPin />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Our Address</h4>
                    <p className="text-slate-600">21 NO WATER TANK, KHORA COLONY, G. Z. B</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm flex-shrink-0">
                    <Phone />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phone Number</h4>
                    <p className="text-slate-600">+91 9354114810</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm flex-shrink-0">
                    <Clock />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Business Hours</h4>
                    <p className="text-slate-600">Mon - Sat: 9:00 AM - 9:00 PM</p>
                    <p className="text-slate-600">Sunday: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              <form 
                className="space-y-4" 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name');
                  const phone = formData.get('phone');
                  const service = formData.get('service');
                  const message = formData.get('message');
                  
                  // Construct WhatsApp message
                  const whatsappText = `Hello AK Srivastav Cyber Cafe! %0A%0AMy Name: ${name}%0APhone: ${phone}%0AService: ${service}%0AMessage: ${message}`;
                  const whatsappUrl = `https://wa.me/919354114810?text=${whatsappText}`;
                  
                  // Open WhatsApp
                  window.open(whatsappUrl, '_blank');
                  alert("Redirecting to WhatsApp to send your message...");
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <input name="name" type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <input name="phone" type="tel" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" placeholder="Your Phone" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Service Required</label>
                  <select name="service" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all">
                    <option>Printing / Scanning</option>
                    <option>Photocopy</option>
                    <option>Internet Usage</option>
                    <option>Form Filling</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <textarea name="message" rows={4} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2">
                  <Mail size={18} />
                  Send via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        {/* Printing Modal */}
        <AnimatePresence>
          {showPrintingModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowPrintingModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-600 text-white">
                  <div>
                    <h3 className="text-2xl font-bold">Printing & Scanning</h3>
                    <p className="text-indigo-100 text-sm">A4, Legal, A3 and Photo Printing</p>
                  </div>
                  <button onClick={() => setShowPrintingModal(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>
                <div className="p-6 overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {printingDetails.map((item, i) => (
                      <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-indigo-200 transition-all">
                        <h4 className="text-xl font-bold text-slate-900 mb-1">{item.size}</h4>
                        <p className="text-indigo-600 font-bold text-sm mb-2">{item.type}</p>
                        <p className="text-sm text-slate-600 mb-6">{item.desc}</p>
                        <button 
                          onClick={() => {
                            const text = `I want to print on ${item.size} paper.`;
                            window.open(`https://wa.me/919354114810?text=${encodeURIComponent(text)}`, '_blank');
                          }}
                          className="w-full py-3 bg-white border border-indigo-100 text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                        >
                          Send File for Print
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Photocopy Modal */}
        <AnimatePresence>
          {showPhotocopyModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowPhotocopyModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-800 text-white">
                  <div>
                    <h3 className="text-2xl font-bold">Photocopy Services</h3>
                    <p className="text-slate-300 text-sm">High-speed Black & White copying</p>
                  </div>
                  <button onClick={() => setShowPhotocopyModal(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>
                <div className="p-6 overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {photocopyDetails.map((item, i) => (
                      <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-slate-400 transition-all">
                        <h4 className="text-xl font-bold text-slate-900 mb-1">{item.type}</h4>
                        <p className="text-slate-800 font-bold text-lg mb-2">{item.price}</p>
                        <p className="text-sm text-slate-600 mb-6">{item.desc}</p>
                        <button 
                          onClick={() => {
                            const text = `I need ${item.type} photocopy service.`;
                            window.open(`https://wa.me/919354114810?text=${encodeURIComponent(text)}`, '_blank');
                          }}
                          className="w-full py-3 bg-white border border-slate-300 text-slate-800 rounded-xl text-sm font-bold hover:bg-slate-800 hover:text-white transition-all shadow-sm"
                        >
                          Enquire Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Internet Providers Modal */}
        <AnimatePresence>
          {showInternetModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowInternetModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-blue-600 text-white">
                  <div>
                    <h3 className="text-2xl font-bold">High-Speed Internet Providers</h3>
                    <p className="text-blue-100 text-sm">Fiber connections for Home & Office</p>
                  </div>
                  <button onClick={() => setShowInternetModal(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>
                <div className="p-6 overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {internetProviders.map((item, i) => (
                      <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-blue-200 transition-all">
                        <h4 className="text-xl font-bold text-slate-900 mb-1">{item.name}</h4>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-blue-600 font-bold text-sm">{item.speed}</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold">{item.tech}</span>
                        </div>
                        <p className="text-lg font-black text-slate-800 mb-6">{item.price}</p>
                        <button 
                          onClick={() => {
                            const text = `I am interested in ${item.name} high-speed internet connection.`;
                            window.open(`https://wa.me/919354114810?text=${encodeURIComponent(text)}`, '_blank');
                          }}
                          className="w-full py-3 bg-white border border-blue-100 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        >
                          Book Connection
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Online Form Filling Modal */}
        <AnimatePresence>
          {showFormModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowFormModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-purple-600 text-white">
                  <div>
                    <h3 className="text-2xl font-bold">Online Form Filling</h3>
                    <p className="text-purple-100 text-sm">UPSC, SSC, Railway and Government Forms</p>
                  </div>
                  <button onClick={() => setShowFormModal(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>
                <div className="p-6 overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {formServices.map((item, i) => (
                      <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-purple-200 transition-all">
                        <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                        <p className="text-sm text-slate-600 mb-6">{item.desc}</p>
                        <button 
                          onClick={() => {
                            const text = `I need help with filling ${item.title}.`;
                            window.open(`https://wa.me/919354114810?text=${encodeURIComponent(text)}`, '_blank');
                          }}
                          className="w-full py-3 bg-white border border-purple-100 text-purple-600 rounded-xl text-sm font-bold hover:bg-purple-600 hover:text-white transition-all shadow-sm"
                        >
                          Fill Form Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bill Payments Modal */}
        <AnimatePresence>
          {showBillModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowBillModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-emerald-600 text-white">
                  <div>
                    <h3 className="text-2xl font-bold">Bill Payments</h3>
                    <p className="text-emerald-100 text-sm">Pay Electricity, Water, and DTH bills instantly</p>
                  </div>
                  <button 
                    onClick={() => setShowBillModal(false)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                  <div className="w-full md:w-64 bg-slate-50 border-r border-slate-100 p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
                    {(Object.keys(billServices) as Array<keyof typeof billServices>).map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedBillType(type)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all whitespace-nowrap md:whitespace-normal ${
                          selectedBillType === type 
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" 
                            : "bg-white text-slate-600 hover:bg-emerald-50"
                        }`}
                      >
                        <span>{type}</span>
                        <ChevronRight size={16} className={selectedBillType === type ? "opacity-100" : "opacity-0"} />
                      </button>
                    ))}
                  </div>

                  <div className="flex-1 p-6 overflow-y-auto">
                    {!selectedBillType ? (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                        <CreditCard size={48} className="mb-4 opacity-20" />
                        <p className="text-lg">Please select a bill category <br /> to see available providers.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {billServices[selectedBillType].map((bill, i) => (
                          <div key={i} className="p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:border-emerald-200 transition-all group">
                            <h4 className="text-lg font-bold text-slate-900 mb-1">{bill.provider}</h4>
                            <p className="text-sm text-slate-500 mb-4">{bill.state || bill.plans}</p>
                            <button 
                              onClick={() => {
                                const text = `I want to pay my ${selectedBillType} bill for ${bill.provider}.`;
                                window.open(`https://wa.me/919354114810?text=${encodeURIComponent(text)}`, '_blank');
                              }}
                              className="w-full py-2 bg-white border border-emerald-100 text-emerald-600 rounded-lg text-sm font-bold hover:bg-emerald-600 hover:text-white transition-all"
                            >
                              Pay Now
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Other Services Modal */}
        <AnimatePresence>
          {showOtherModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowOtherModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-orange-500 text-white">
                  <div>
                    <h3 className="text-2xl font-bold">Other Digital Services</h3>
                    <p className="text-orange-100 text-sm">Government forms, Travel, and more</p>
                  </div>
                  <button 
                    onClick={() => setShowOtherModal(false)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherServices.map((service, i) => (
                      <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-orange-200 transition-all">
                        <h4 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h4>
                        <p className="text-sm text-slate-600 mb-6">{service.desc}</p>
                        <button 
                          onClick={() => {
                            const text = `I need help with ${service.title} service.`;
                            window.open(`https://wa.me/919354114810?text=${encodeURIComponent(text)}`, '_blank');
                          }}
                          className="w-full py-3 bg-white border border-orange-100 text-orange-600 rounded-xl text-sm font-bold hover:bg-orange-500 hover:text-white transition-all shadow-sm"
                        >
                          Enquire Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recharge Plans Modal */}
        <AnimatePresence>
          {showRechargeModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowRechargeModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-600 text-white">
                  <div>
                    <h3 className="text-2xl font-bold">Mobile Recharge Plans</h3>
                    <p className="text-indigo-100 text-sm">Select an operator to see latest plans</p>
                  </div>
                  <button 
                    onClick={() => setShowRechargeModal(false)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                  {/* Operator Sidebar */}
                  <div className="w-full md:w-64 bg-slate-50 border-r border-slate-100 p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
                    {(Object.keys(rechargePlans) as Array<keyof typeof rechargePlans>).map((op) => (
                      <button
                        key={op}
                        onClick={() => setSelectedOperator(op)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all whitespace-nowrap md:whitespace-normal ${
                          selectedOperator === op 
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                            : "bg-white text-slate-600 hover:bg-indigo-50"
                        }`}
                      >
                        <span>{op}</span>
                        <ChevronRight size={16} className={selectedOperator === op ? "opacity-100" : "opacity-0"} />
                      </button>
                    ))}
                  </div>

                  {/* Plans Content */}
                  <div className="flex-1 p-6 overflow-y-auto">
                    {!selectedOperator ? (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                        <Smartphone size={48} className="mb-4 opacity-20" />
                        <p className="text-lg">Please select a telecom operator <br /> to view available recharge plans.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {rechargePlans[selectedOperator].map((plan, i) => (
                          <div key={i} className="p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:border-indigo-200 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                              <span className="text-2xl font-black text-indigo-600">{plan.price}</span>
                              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold">{plan.validity}</span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Globe size={14} className="text-indigo-400" />
                                <span className="font-bold">{plan.data}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <CheckCircle2 size={14} className="text-emerald-500" />
                                <span>{plan.benefits}</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => {
                                const text = `I want to recharge ${selectedOperator} plan for ${plan.price}.`;
                                window.open(`https://wa.me/919354114810?text=${encodeURIComponent(text)}`, '_blank');
                              }}
                              className="w-full mt-4 py-2 bg-white border border-indigo-100 text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-600 hover:text-white transition-all"
                            >
                              Recharge Now
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Globe className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">AK SRIVASTAV</span>
            </div>
            
            <p className="text-sm">
              © {new Date().getFullYear()} AK Srivastav Cyber Cafe. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
