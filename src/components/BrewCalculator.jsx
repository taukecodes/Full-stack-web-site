import React, { useState, useEffect } from 'react';
import { BREW_RECIPES } from '../data/reviewsData';
import { useCart } from '../context/CartContext';
import { Sliders, Play, Pause, RotateCcw, Clock, Thermometer, Droplets, Check, Copy, Sparkles, Scale } from 'lucide-react';

export default function BrewCalculator() {
  const { showToast } = useCart();
  const [selectedRecipeId, setSelectedRecipeId] = useState('v60');
  const activeRecipe = BREW_RECIPES.find((r) => r.id === selectedRecipeId) || BREW_RECIPES[0];

  const [coffeeDose, setCoffeeDose] = useState(activeRecipe.defaultDose);
  
  // Timer state
  const [timerRunning, setTimerRunning] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  // When switching recipe, reset dose and timer
  const handleSelectRecipe = (id) => {
    setSelectedRecipeId(id);
    const newRecipe = BREW_RECIPES.find((r) => r.id === id);
    if (newRecipe) {
      setCoffeeDose(newRecipe.defaultDose);
    }
    setTimerRunning(false);
    setSecondsElapsed(0);
  };

  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else if (!timerRunning && secondsElapsed !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning, secondsElapsed]);

  const handleResetTimer = () => {
    setTimerRunning(false);
    setSecondsElapsed(0);
  };

  // Calculations
  const calculatedWater = Math.round(coffeeDose * activeRecipe.ratioMultiplier * 10) / 10;
  const isEspresso = activeRecipe.id === 'espresso';

  // Format timer MM:SS
  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Dynamic step recalculation based on actual dose
  const getDynamicSteps = () => {
    const bloomAmount = Math.round(coffeeDose * 3);
    const totalWater = calculatedWater;

    if (activeRecipe.id === 'v60') {
      const firstPour = Math.round(totalWater * 0.6);
      return [
        {
          time: '0:00 – 0:45',
          title: 'Bloom & Degas',
          amount: `${bloomAmount}g water`,
          desc: 'Pour in rapid concentric spirals. Swirl gently once to saturate every dry pocket.'
        },
        {
          time: '0:45 – 1:15',
          title: 'First Main Pour',
          amount: `Pour up to ${firstPour}g`,
          desc: 'Gentle steady pour in center, expanding outward without wetting paper walls.'
        },
        {
          time: '1:15 – 1:45',
          title: 'Finishing Pour',
          amount: `Pour up to ${totalWater}g`,
          desc: 'Raise water level gently. Keep flow rate steady at 4-5 grams per second.'
        },
        {
          time: '1:45 – 3:00',
          title: 'Drawdown & Swirl',
          amount: 'Gravity Drain',
          desc: 'One slow swirl to wash grounds down from filter ridges into a flat, level bed.'
        }
      ];
    }

    if (activeRecipe.id === 'aeropress') {
      return [
        {
          time: '0:00 – 0:15',
          title: 'Initial Wetting',
          amount: `${bloomAmount}g water`,
          desc: 'Invert chamber. Dose coffee, add water rapidly, stir 5 brisk rotations.'
        },
        {
          time: '0:15 – 0:45',
          title: 'Fill Chamber',
          amount: `Top to ${totalWater}g`,
          desc: 'Add remaining water, stir once to break the crust.'
        },
        {
          time: '0:45 – 1:45',
          title: 'Immersion Steep',
          amount: 'Cap Locked',
          desc: 'Screw filter cap on with rinsed paper. Rest while flavor compounds dissolve.'
        },
        {
          time: '1:45 – 2:15',
          title: 'Plunge',
          amount: 'Smooth 30s press',
          desc: 'Invert onto carafe. Press slowly downward, halting at the first hissing sound.'
        }
      ];
    }

    if (activeRecipe.id === 'chemex') {
      const secondPourTarget = Math.round(totalWater * 0.65);
      return [
        {
          time: '0:00 – 0:45',
          title: 'Generous Bloom',
          amount: `${bloomAmount}g water`,
          desc: 'Evenly saturate the thick Chemex bed. Allow CO2 bubbles to erupt.'
        },
        {
          time: '0:45 – 1:45',
          title: 'Body Pour',
          amount: `Pour up to ${secondPourTarget}g`,
          desc: 'Pour in tight spiral circles. Maintain a steady water column.'
        },
        {
          time: '1:45 – 2:45',
          title: 'Target Yield Pour',
          amount: `Pour up to ${totalWater}g`,
          desc: 'Top up gently to final scale weight.'
        },
        {
          time: '2:45 – 4:15',
          title: 'Drawdown',
          amount: 'Clarified filter',
          desc: 'Allow clean drop through triple-layer paper. Discard filter bed.'
        }
      ];
    }

    if (activeRecipe.id === 'espresso') {
      return [
        {
          time: 'Puck Prep',
          title: 'Distribute & Level',
          amount: `${coffeeDose.toFixed(1)}g dry dose`,
          desc: 'De-clump with WDT needles. Tamp with level 25-30 lbs firm pressure.'
        },
        {
          time: '0:00 – 0:06',
          title: 'Pre-infusion',
          amount: 'Saturate cake',
          desc: 'Low-pressure soak so water penetrates the entire puck evenly.'
        },
        {
          time: '0:07 – 0:28',
          title: 'Full 9-Bar Extraction',
          amount: `${totalWater.toFixed(1)}g liquid yield`,
          desc: 'Thick, honey-like viscous stream pouring into demitasse cup.'
        },
        {
          time: 'Serve',
          title: 'Integrate & Sip',
          amount: 'Stir 3 times',
          desc: 'Stir the crema with a demitasse spoon to combine dense bottom layers.'
        }
      ];
    }

    // Default: French Press
    return [
      {
        time: '0:00 – 0:30',
        title: 'Total Water Pour',
        amount: `${totalWater}g water (95°C)`,
        desc: 'Pour all water aggressively over coarse grounds to ensure full saturation.'
      },
      {
        time: '0:30 – 4:00',
        title: 'Rest & Steep',
        amount: 'Uncovered',
        desc: 'Leave completely untouched while floating crust steeps.'
      },
      {
        time: '4:00 – 4:30',
        title: 'Break Crust & Skim',
        amount: 'Stir 3x',
        desc: 'Break the top crust so grounds sink. Skim off white foam and chaff.'
      },
      {
        time: '4:30 – 6:00',
        title: 'Decant',
        amount: 'Plunge to surface',
        desc: 'Insert filter mesh just beneath surface without compressing grounds. Pour smoothly.'
      }
    ];
  };

  const copyRecipe = () => {
    const text = `Kalo & Crumb Brew Guide: ${activeRecipe.name}
Coffee Dose: ${coffeeDose}g
Target Water: ${calculatedWater}g (${activeRecipe.ratio})
Water Temp: ${activeRecipe.waterTemp}
Grind Size: ${activeRecipe.grindSize}
Target Time: ${activeRecipe.targetTime}
Sensory Focus: ${activeRecipe.sensoryGoal}`;

    navigator.clipboard.writeText(text);
    showToast('Brew recipe parameters copied to clipboard!', 'success');
  };

  const steps = getDynamicSteps();

  return (
    <section id="brew-calculator" className="py-16 md:py-24 bg-[#FAF7F2] border-y border-[#DED8CE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#B85021] mb-2">
            <Sliders size={14} />
            <span>Precision Extraction Instrument</span>
          </div>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1715] tracking-tight">
            Interactive Brew Ratio Calculator
          </h2>
          <p className="mt-3 text-sm text-[#5E5852] leading-relaxed">
            Dial in exact coffee mass and water volumes tailored to your device. Specialty coffee thrives on gravimetric precision, not guesswork.
          </p>
        </div>

        {/* Brewing Method Selector Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {BREW_RECIPES.map((recipe) => (
            <button
              key={recipe.id}
              onClick={() => handleSelectRecipe(recipe.id)}
              className={`text-xs uppercase tracking-wider font-semibold px-4 py-2.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                selectedRecipeId === recipe.id
                  ? 'bg-[#1A1715] text-[#FAF7F2] shadow-sm'
                  : 'bg-[#EFE9DE] text-[#5E5852] hover:bg-[#E5DFD3] border border-[#DED8CE]'
              }`}
            >
              {recipe.name.split(' (')[0]}
            </button>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Dials & Metrics */}
          <div className="lg:col-span-5 bg-[#F7F4EE] rounded-2xl p-6 sm:p-8 border border-[#DED8CE] shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#DED8CE]">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#8C847C] font-semibold block">
                  Selected Device
                </span>
                <h3 className="font-serif-editorial text-2xl font-semibold text-[#1A1715]">
                  {activeRecipe.name}
                </h3>
              </div>
              <span className="font-mono-tabular text-sm font-bold bg-[#EADFC9] text-[#1A1715] px-3 py-1 rounded-full border border-[#D8CEBC]">
                {activeRecipe.ratio}
              </span>
            </div>

            {/* Dose Slider Control */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#5E5852] flex items-center gap-1.5">
                  <Scale size={14} className="text-[#B85021]" />
                  <span>Coffee Dose (Dry Grounds)</span>
                </label>
                <span className="font-mono-tabular text-xl font-bold text-[#1A1715]">
                  {coffeeDose}g
                </span>
              </div>

              <input
                type="range"
                min={activeRecipe.minDose}
                max={activeRecipe.maxDose}
                step={isEspresso ? 0.5 : 1}
                value={coffeeDose}
                onChange={(e) => setCoffeeDose(parseFloat(e.target.value))}
                className="w-full accent-[#B85021] cursor-pointer h-2 bg-[#DED8CE] rounded-lg"
              />

              <div className="flex justify-between text-[11px] font-mono-tabular text-[#8C847C] mt-1">
                <span>{activeRecipe.minDose}g</span>
                <span>Adjust mass</span>
                <span>{activeRecipe.maxDose}g</span>
              </div>
            </div>

            {/* Calculated Output Matrix */}
            <div className="mt-8 pt-6 border-t border-[#DED8CE] grid grid-cols-2 gap-4">
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#DED8CE]">
                <span className="text-[10px] uppercase tracking-wider text-[#8C847C] font-medium block">
                  {isEspresso ? 'Liquid Espresso Yield' : 'Target Water Mass'}
                </span>
                <span className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#B85021] block mt-1">
                  {calculatedWater}g
                </span>
                <span className="text-[11px] text-[#5E5852]">
                  {isEspresso ? '~1.3 fl oz' : `~${Math.round(calculatedWater / 30)} oz`}
                </span>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#DED8CE]">
                <span className="text-[10px] uppercase tracking-wider text-[#8C847C] font-medium block">
                  Ideal Water Temp
                </span>
                <span className="font-mono-tabular text-xl sm:text-2xl font-bold text-[#1A1715] block mt-1">
                  {activeRecipe.waterTemp.split(' ')[0]}
                </span>
                <span className="text-[11px] text-[#5E5852]">
                  Off-boil rest 45s
                </span>
              </div>
            </div>

            {/* Brewing Technical Parameters */}
            <div className="mt-6 space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#E8E2D8]">
                <span className="text-[#8C847C] font-medium flex items-center gap-1.5">
                  <Thermometer size={13} className="text-[#B85021]" />
                  Grind Profile:
                </span>
                <span className="font-medium text-[#1A1715] text-right">{activeRecipe.grindSize}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-[#E8E2D8]">
                <span className="text-[#8C847C] font-medium flex items-center gap-1.5">
                  <Clock size={13} className="text-[#B85021]" />
                  Target Drawdown:
                </span>
                <span className="font-mono-tabular font-medium text-[#1A1715]">{activeRecipe.targetTime}</span>
              </div>

              <div className="flex justify-between py-1.5">
                <span className="text-[#8C847C] font-medium">Sensory Focus:</span>
                <span className="font-medium text-[#1A1715] text-right max-w-xs">{activeRecipe.sensoryGoal}</span>
              </div>
            </div>

            {/* Copy Recipe Button */}
            <button
              onClick={copyRecipe}
              className="mt-6 w-full py-2.5 px-4 rounded-lg border border-[#DED8CE] bg-[#FAF7F2] hover:bg-[#EFE9DE] text-xs font-semibold text-[#1A1715] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Copy size={14} />
              <span>Copy Recipe to Clipboard</span>
            </button>

          </div>

          {/* Right Column: Step-by-Step Pour Timeline & Live Timer */}
          <div className="lg:col-span-7 bg-[#F7F4EE] rounded-2xl p-6 sm:p-8 border border-[#DED8CE] shadow-xs flex flex-col justify-between">
            
            <div>
              {/* Header with Stopwatch */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DED8CE]">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#8C847C] font-semibold block">
                    Routine Timeline
                  </span>
                  <h4 className="font-serif-editorial text-2xl font-semibold text-[#1A1715]">
                    Pour Schedule &amp; Execution
                  </h4>
                </div>

                {/* Live Brewing Stopwatch */}
                <div className="flex items-center gap-3 bg-[#FAF7F2] p-2 sm:px-4 rounded-xl border border-[#DED8CE]">
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C847C] block font-mono">
                      Brew Stopwatch
                    </span>
                    <span className="font-mono-tabular text-2xl font-bold text-[#1A1715]">
                      {formatTime(secondsElapsed)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setTimerRunning(!timerRunning)}
                      className={`p-2 rounded-lg text-white transition-colors cursor-pointer ${
                        timerRunning ? 'bg-[#9E4319]' : 'bg-[#1A1715] hover:bg-[#B85021]'
                      }`}
                      aria-label={timerRunning ? "Pause timer" : "Start timer"}
                    >
                      {timerRunning ? <Pause size={15} /> : <Play size={15} />}
                    </button>
                    <button
                      onClick={handleResetTimer}
                      className="p-2 rounded-lg text-[#5E5852] hover:text-[#1A1715] hover:bg-[#EFE9DE] transition-colors cursor-pointer"
                      aria-label="Reset timer"
                    >
                      <RotateCcw size={15} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Steps Timeline */}
              <div className="mt-6 space-y-4">
                {steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] hover:border-[#DED8CE] transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#1A1715] text-[#FAF7F2] font-mono-tabular text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      0{idx + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h5 className="text-sm font-semibold text-[#1A1715]">
                          {step.title}
                        </h5>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono-tabular font-bold text-[#B85021]">
                            {step.amount}
                          </span>
                          <span className="text-[11px] font-mono-tabular text-[#8C847C] bg-[#EFE9DE] px-2 py-0.5 rounded">
                            {step.time}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-[#5E5852] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Advice */}
            <div className="mt-8 pt-4 border-t border-[#DED8CE] flex items-center justify-between text-xs text-[#8C847C]">
              <span>Filter tip: {activeRecipe.filterType}</span>
              <span className="font-mono-tabular text-[#B85021]">Calibrated on Loring drum</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
