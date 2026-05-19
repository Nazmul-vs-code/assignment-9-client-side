import CategoryCharts from "@/components/CategoryCharts";
import HeroSlider from "@/components/Heros/HeroSlider";
import Section2ForHome from "@/components/Section2ForHome";
import TrendingIdeas from "@/components/TrendingIdeas";
import Image from "next/image";

export default function Home() {
  return (
    <div className="my-10 flex flex-col space-y-2">

      <HeroSlider />


      <TrendingIdeas />

      <div className="w-full max-w-lg mx-auto bg-base-100 border border-base-200 shadow-xl rounded-3xl p-6 md:p-8 mt-10 transition-all duration-300 hover:shadow-2xl">
        {/* Clean, Modern Section Header */}
        <div className="mb-6 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-1">
            Data Metrics
          </span>
          <h2 className="font-extrabold text-2xl md:text-3xl text-base-content tracking-tight">
            Idea Distribution
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mt-2 mx-auto sm:mx-0"></div>
        </div>

        {/* Dynamic Chart Integration Area */}
        <div className="flex justify-center items-center w-full">
          <CategoryCharts />
        </div>
      </div>

      <div>
        <Section2ForHome />
      </div>
    </div>
  );
}
