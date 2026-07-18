import HeroContainer from "@/containers/home/HeroContainer";
import AboutContainer from "@/containers/home/AboutContainer";
import Skills from "@/components/sections/Skills";
import MyExpertise from "@/components/sections/MyExpertise";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import WorkExperience from "@/components/sections/WorkExperience";
import ProfessionalCredentials from "@/components/sections/ProfessionalCredentials";
import Contact from "@/components/sections/Contact";

import FloatingNavbar from "@/components/ui/FloatingNavbar";

const page = () => {
  console.log("Testing production......");

  return (
    <main className="h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth relative">
      <FloatingNavbar />
      <HeroContainer />
      <AboutContainer />
      <Skills />
      <MyExpertise />
      <FeaturedProjects />
      <WorkExperience />
      <ProfessionalCredentials />
      <Contact />
    </main>
  );
};

export default page;
