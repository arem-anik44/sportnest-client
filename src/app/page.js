import Banner from "@/components/home/Banner";
import FeaturedFacilities from "@/components/home/FeaturedFacilities";

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <Banner />
      <FeaturedFacilities />
    </main>
  );
}
