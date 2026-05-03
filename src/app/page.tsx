import { Layout } from "@/components/layout/Layout";
import { Roadmap } from "@/components/roadmap/Roadmap";
import { Chatbot } from "@/components/chatbot/Chatbot";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col gap-24">
        {/* Hero Section */}
        <section className="pt-20 pb-10 text-center flex flex-col items-center justify-center min-h-[60vh]">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium tracking-wide">
            Your Guide to Democracy
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Navigate the <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
              Election Process
            </span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Empowering voters with clear, step-by-step guidance and AI-driven assistance to ensure every voice is heard in the democratic process.
          </p>
          <div className="flex gap-4 items-center">
            <a href="#roadmap" className="px-8 py-4 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]">
              View the Roadmap
            </a>
            <a href="#assistant" className="px-8 py-4 rounded-xl bg-white/5 text-white font-medium hover:bg-white/10 transition-all border border-white/10">
              Ask AI Assistant
            </a>
          </div>
        </section>

        <Roadmap />
        <Chatbot />
      </div>
    </Layout>
  );
}
