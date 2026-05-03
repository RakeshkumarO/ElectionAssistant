"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, FileText, MapPin, Inbox, ChevronRight } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Registration",
    icon: FileText,
    description: "Ensure you are registered to vote before the deadline. Check your local state guidelines for specific dates and required documentation.",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/50",
  },
  {
    id: 2,
    title: "Verification",
    icon: CheckCircle2,
    description: "Verify your voter status and polling location online. Make sure your name and address match your ID exactly.",
    color: "bg-amber-500/20 text-amber-400 border-amber-500/50",
  },
  {
    id: 3,
    title: "Polling",
    icon: MapPin,
    description: "Arrive at your designated polling station on Election Day. Bring acceptable identification if required by your state.",
    color: "bg-purple-500/20 text-purple-400 border-purple-500/50",
  },
  {
    id: 4,
    title: "Counting",
    icon: Inbox,
    description: "Your vote is securely cast and counted by election officials. Results are certified after all ballots are processed.",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/50",
  }
];

export function Roadmap() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id="roadmap" className="my-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
          The Voting Process
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          Understand every step of the election process, from registering to casting your final ballot.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start relative">
        {/* Desktop Connecting Line */}
        <div className="hidden md:block absolute top-[4.5rem] left-[10%] right-[10%] h-0.5 bg-white/10 -z-10" />

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;
          const isPast = activeStep > step.id;

          return (
            <div 
              key={step.id} 
              className="flex-1 w-full relative group cursor-pointer"
              onClick={() => setActiveStep(step.id)}
              role="button"
              tabIndex={0}
              aria-current={isActive ? "step" : undefined}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveStep(step.id);
                  e.preventDefault();
                }
              }}
            >
              <div className="flex md:flex-col items-center gap-4 md:gap-6">
                <div 
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 relative bg-black
                    ${isActive ? step.color + ' scale-110 shadow-[0_0_30px_-5px_currentColor]' : 
                      isPast ? 'bg-white/10 border-white/20 text-white/50' : 'bg-neutral-900 border-white/10 text-neutral-500'}
                  `}
                >
                  <Icon className="w-8 h-8" />
                  {isPast && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-black flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Mobile connecting line */}
                {index !== steps.length - 1 && (
                  <div className="md:hidden w-0.5 h-12 bg-white/10 absolute left-8 top-16 -z-10" />
                )}

                <div className="flex-1 md:text-center">
                  <h3 className={`text-lg font-semibold mb-1 transition-colors ${isActive ? 'text-white' : 'text-neutral-400'}`}>
                    {step.title}
                  </h3>
                  <div className="md:hidden">
                     <AnimatePresence>
                        {isActive && (
                          <motion.p 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="text-sm text-neutral-400 overflow-hidden"
                          >
                            {step.description}
                          </motion.p>
                        )}
                     </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Active Description Panel */}
      <div className="hidden md:block mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-white/10 text-white">
                {React.createElement(steps[activeStep - 1].icon, { className: "w-6 h-6" })}
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-white">
                  Step {activeStep}: {steps[activeStep - 1].title}
                </h4>
                <p className="text-neutral-300 leading-relaxed text-lg">
                  {steps[activeStep - 1].description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
