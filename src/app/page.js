import Banner from "@/components/home/Banner";
import FeaturedFacilities from "@/components/home/FeaturedFacilities";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <Banner />
      <FeaturedFacilities />
      <WhyChooseUs />
      <HowItWorks />
    </main>
  );
}
