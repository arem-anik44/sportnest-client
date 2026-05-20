import Banner from "@/components/home/Banner";
import FeaturedFacilities from "@/components/home/FeaturedFacilities";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <Banner />
      <FeaturedFacilities />
      <WhyChooseUs />
    </main>
  );
}
