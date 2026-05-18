import HeroSlider from "@/Components/Heros/HeroSlider";
import TrendingIdeas from "@/Components/TrendingIdeas";
import Image from "next/image";

export default function Home() {
  return (
    <div className="my-10 flex flex-col space-y-2">
      
      <HeroSlider />

      
      <TrendingIdeas />
    </div>
  );
}
