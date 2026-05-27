import HeroCard from "../components/landing/HeroCard";
import Navbar from "../components/landing/Navbar";

export default function Home() {
  return (
    <main className="flex-1">
      <div className="landing-namespace page">
        <Navbar />
        <HeroCard />
      </div>
    </main>
  );
}
