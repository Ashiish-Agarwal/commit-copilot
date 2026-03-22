
import Navbar from "~/components/Navbar";
import Hero from "~/components/Hero";
import HowItWorks from "~/components/How-it-works";
import Features from "~/components/features";
import { Terminal, FAQ, CTABand, Footer } from "~/components/section";
import { Pricing } from "~/components/pricing";
import getSessioncheck from "~/lib/action";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getSessioncheck();
  if(session){
    redirect("/dashboard");
  }
  return (
    <main className="relative bg-dark text-white min-h-screen overflow-x-hidden">
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,135,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glow orbs */}
      <div className="fixed top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(0,255,135,.08), transparent 70%)", filter: "blur(80px)" }} />
      <div className="fixed bottom-0 right-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(0,200,100,.06), transparent 70%)", filter: "blur(80px)" }} />

      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Terminal />
      <Pricing />
      <FAQ />
      <CTABand />
      <Footer />
    </main>
  );
}