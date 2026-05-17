import HeroSlider from "@/Components/Heros/HeroSlider";
import Image from "next/image";

export default function Home() {
  return (
    <div className="my-10 flex flex-col space-y-2">
      
      <HeroSlider />

      <h2 className="text-red-500 font-semibold text-2xl">Trending Ideas </h2>
    </div>
  );
}
