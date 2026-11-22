import React from 'react';
import { Flame, ShieldCheck, Award, Leaf, Wind, CheckCircle2 } from 'lucide-react';

const PRINCIPLES = [
  {
    step: "01",
    title: "Direct-Trade Farm Gate Pricing",
    subtitle: "65–120% Above C-Market Benchmarks",
    desc: "We refuse anonymous commodity brokers. Every lot in our cupping room is traced to an identifiable smallholder collective or family washing station, guaranteeing financial security for seasonal pickers and regenerative soil management.",
    metric: "100% Traceable Lots",
    icon: Leaf
  },
  {
    step: "02",
    title: "Single-Pass Clean Convection Roasting",
    subtitle: "Loring S15 Kestrel Drum",
    desc: "Traditional cast-iron drums rely on heavy conductive contact and recirculated smoke, causing scorched bean faces and acrid bitterness. Our Loring roaster wraps each bean in pure, oxygen-calibrated convective heat, preserving volatile fruit florals.",
    metric: "Zero Scorched Chaff",
    icon: Wind
  },
  {
    step: "03",
    title: "Tri-Stage Cupping & Agtron Indexing",
    subtitle: "Q-Grader Sensory Protocol",
    desc: "No batch leaves our dock without rigorous quality control. We cup every roast curve at 12 hours, 48 hours, and 7 days post-roast. Beans are ground and spectrophotometer-measured for precise whole-bean to ground color equilibrium.",
    metric: "Agtron ±1.5 Precision",
    icon: Award
  },
  {
    step: "04",
    title: "Nitrogen-Purged Barrier Packaging",
    subtitle: "Peak Freshness for 60+ Days",
    desc: "Oxygen is the enemy of delicate terpenes. Our matte paper pouches feature high-barrier metallized compostable linings and one-way degassing valves, flushed with inert food-grade nitrogen at packaging to suspend oxidation until your first pour.",
    metric: "<0.5% Residual Oxygen",
    icon: ShieldCheck
  }
];

export default function RoastProcess() {
  return (
    <section id="craft-process" className="py-16 md:py-24 border-b border-[#DED8CE] bg-[#F7F4EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#B85021] mb-2">
            <Flame size={14} />
            <span>The Roastery Discipline</span>
          </div>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1715] tracking-tight">
            How we coax sweetness from the green bean.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5E5852] leading-relaxed">
            Great roasting does not impose heavy carbon or smoke flavors upon the seed. It acts as an transparent lens, revealing the soil, sunlight, and careful processing of the farmer.
          </p>
        </div>

        {/* 4-Column Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRINCIPLES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[#FAF7F2] rounded-xl p-6 border border-[#DED8CE] flex flex-col justify-between hover:border-[#B85021] hover:shadow-xs transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono-tabular text-sm font-bold text-[#8C847C] bg-[#EFE9DE] px-2.5 py-1 rounded">
                      {item.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#EFE9DE] text-[#B85021] flex items-center justify-center">
                      <Icon size={16} />
                    </div>
                  </div>

                  <h3 className="font-serif-editorial text-xl font-semibold text-[#1A1715] leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-[11px] font-semibold text-[#B85021] uppercase tracking-wider mt-1 mb-3">
                    {item.subtitle}
                  </p>

                  <p className="text-xs text-[#5E5852] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8E2D8] flex items-center justify-between text-xs">
                  <span className="text-[#8C847C]">Discipline Benchmark</span>
                  <span className="font-mono-tabular font-bold text-[#1A1715]">
                    {item.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quote banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#EFE9DE] border border-[#DED8CE] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-3xl">
            <p className="font-serif-editorial text-lg sm:text-xl text-[#1A1715] italic leading-relaxed">
              &ldquo;Specialty coffee is a chain of custody. If the picker harvested at peak Brix, the wet mill sorted rigorously, and the container arrived moisture-locked, our sole obligation at the drum is not to ruin what took an entire year of rain and sun to create.&rdquo;
            </p>
            <span className="block mt-2 text-xs font-semibold uppercase tracking-wider text-[#B85021]">
              — Micah Thorne, Head Roaster &amp; Co-Founder
            </span>
          </div>

          <div className="shrink-0 flex items-center gap-2 bg-[#FAF7F2] px-4 py-2.5 rounded-xl border border-[#DED8CE] text-xs font-semibold text-[#1A1715]">
            <CheckCircle2 size={16} className="text-[#3D5948]" />
            <span>SCA Specialty Certified</span>
          </div>
        </div>

      </div>
    </section>
  );
}
