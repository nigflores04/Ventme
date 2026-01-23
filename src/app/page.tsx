"use client";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Button from "@/components/ui/button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import FeatureCard from "@/components/ui/feature-card";
import HowItWorksStep from "@/components/ui/steps";
import {
  FiMonitor,
  FiEdit3,
  FiLayers,
  FiCamera,
  FiDownload,
  FiArrowRight,
} from "react-icons/fi";
import HowItWorksStepNew from "@/components/ui/step";
import { BiUpload } from "react-icons/bi";
import { GiSparkles } from "react-icons/gi";
import NewsletterForm from "@/components/NewsletterForm";
import GallerySlider from "@/components/GallerySlider";
import { buildEventParams } from "@/lib/helpers";
import { trackEvent } from "@/api/analytics";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserState } from "@/store/selectors/userSelectors";
import { useIpAddress } from "@/hooks/useIpAddress";

export default function App() {
  const { user } = useSelector(selectUserState);
  const { ipAddress, isLoading } = useIpAddress();

  useEffect(() => {
    const handleTrackEvent = async () => {
      if (!ipAddress || isLoading) return;

      const params = await buildEventParams("LandingPageView", {
        email: user?.email || null,
        phone: null,
        clientIpAddress: ipAddress,
        clientUserAgent:
          typeof navigator !== "undefined" ? navigator.userAgent : null,
      });

      trackEvent(params);
    };

    if (ipAddress && !isLoading) {
      handleTrackEvent();
    }
  }, [ipAddress, isLoading, user]);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="min-h-screen">
          {/* Hero Section */}
          <main className="max-w-7xl mx-auto px-6 pt-42 pb-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">
                Design. Generate. Transform.
              </h1>
              <p className="text-xl md:text-3xl text-muted-foreground font-light">
                Transform Your Space with AI-Powered Interior Design. For
                homeowners, designers, and realtors.
              </p>
            </div>

            <div className="w-full h-96 md:h-[500px] lg:h-[600px] bg-muted overflow-hidden rounded-2xl flex items-center justify-center">
              <Image
                src="https://images.unsplash.com/photo-1705321963943-de94bb3f0dd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbiUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzU1NzEyNTc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt=""
                width={100}
                height={100}
                className="w-full h-full object-cover"
                unoptimized
                quality={100}
              />
            </div>
          </main>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="space-y-6">
            <FeatureCard
              title="AI-powered instant designs"
              description="Upload your space, enter a prompt, and see it reimagined in seconds."
              imagePosition="right"
              image="/images/two.png"
            />

            {/* <FeatureCard
              title="Easy for all skill levels"
              description="Beginners and pros can effortlessly create beautiful designs."
              imagePosition="left"
              image="/images/four.png"
            /> */}
            <FeatureCard
              title="Realistic results."
              description="High-quality, visual outputs you can share, present, or implement—styled for how you actually live and work."
              imagePosition="left"
              image="/images/four.png"
            />
            {/* <FeatureCard
              title="Smart prompts"
              description="Describe your vision in words—our engine brings it to life with styles, colors, and layouts."
              imagePosition="left"
              image="/images/four.png"
            /> */}

            <FeatureCard
              title="Smart prompts."
              description="Describe your vision in words—our engine brings it to life with styles, colors, and layouts."
              imagePosition="right"
              image="/images/seven.jpg"
            />
            {/* <FeatureCard
              title="Client-ready, affordable exports"
              description="Download your newly styled space for clients with just one click."
              imagePosition="right"
              image="/images/seven.jpg"
            /> */}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-16" id="howitworks">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How it works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <HowItWorksStepNew
              title="Create an account"
              description="No credit card. Sign up and start creating."
              // title="Upload your image or choose a base style"
              // description="Upload your favorite photo or start with a style template. Our
              //     AI will use it as the base to craft your perfect interior."
              image="/images/illustration.jpg"
              stepNumber={1}
            >
              <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                <BiUpload className="w-6 h-6 text-primary" color="black" />
              </div>
            </HowItWorksStepNew>

            {/* Arrow between steps - hidden on mobile */}
            {/* <div className="hidden md:flex items-center justify-center -mx-6 lg:-mx-8"> */}
            {/* <ArrowRight className="w-6 h-6 text-muted-foreground" /> */}
            {/* </div> */}

            {/* Step 2 */}

            <HowItWorksStepNew
              title="Upload image & pick your style"
              description="Choose from a wide range of styles and options to customize your space"
              image="/images/virender.jpg"
              stepNumber={2}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">M</span>
                    </div>
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">S</span>
                    </div>
                    <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">V</span>
                    </div>
                    <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">B</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                <GiSparkles className="w-6 h-6 text-primary" />
              </div>
            </HowItWorksStepNew>

            {/* Arrow between steps - hidden on mobile */}
            {/* <div className="hidden md:flex items-center justify-center -mx-6 lg:-mx-8"> */}
            {/* <ArrowRight className="w-6 h-6 text-muted-foreground" /> */}
            {/* </div> */}

            {/* Step 3 */}

            <HowItWorksStepNew
              title="Export and share directly"
              description="Quickly export your designs and share with clients & collaborators"
              image="/images/kam-idris.jpg"
              stepNumber={3}
            >
              <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                <FiDownload className="w-6 h-6 text-primary" />
              </div>
            </HowItWorksStepNew>
          </div>
          <div className="grid md:grid-cols-3 gap-8 hidden">
            <HowItWorksStep
              stepNumber={1}
              title="Create an account"
              description="No credit card needed. No complicated setup. Just sign up and start creating."
              backgroundColor="bg-lime-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gray-400"></div>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
                  <span className="text-sm font-medium">Sign up</span>
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-blue-500"></div>
                </div>
              </div>
            </HowItWorksStep>

            <HowItWorksStep
              stepNumber={2}
              title="Design your space your way."
              description="Pick a style or use your own image, edit every corner, make it uniquely yours."
              backgroundColor="bg-gray-50"
            >
              <div className="flex items-center gap-6 w-full">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <FiMonitor className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <FiEdit3 className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <FiLayers className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <FiCamera className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <FiDownload className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">
                    Bedroom Design Preview
                  </span>
                </div>
              </div>
            </HowItWorksStep>

            <HowItWorksStep
              stepNumber={3}
              title="Deliver Stunning Spaces in Minutes"
              description="Generate photorealistic renders in under few seconds. Share visuals your clients will love faster than ever."
              backgroundColor="bg-orange-400"
            >
              <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">
                  Rendered Bedroom Preview
                </span>
              </div>
            </HowItWorksStep>
          </div>
        </section>

        {/* Gallery Carousel Section */}

        <GallerySlider />

        <section className="max-w-7xl mx-auto px-6 py-16 mb-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-foreground">
                {/* <span className="">Transform any room</span>{" "}
                <span className="text-black">with just one photo</span> */}
                {/* Design your space from a single photo  */}
                Try it now - transform any room in seconds
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-center mx-auto  max-w-xl">
                From living rooms to workspaces, reimagine your space with
                instant, AI-powered design
              </p>
              <Link href="/design">
                <Button className=" text-white px-8 py-3 rounded-full text-lg font-medium flex items-center gap-2 mx-auto lg:mx-0">
                  Try it now
                  <FiArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Right Visual Demo */}
            <div className="flex-1 relative hidden">
              <div className="flex items-center gap-6">
                {/* Before Image */}
                <div className="relative">
                  <div className="w-48 h-36 bg-gray-200 rounded-xl overflow-hidden">
                    <Image
                      src="/images/eight.jpg"
                      alt="Room before transformation"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-0.5 bg-blue-400 relative">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-t-2 border-b-2 border-l-blue-400 border-t-transparent border-b-transparent"></div>
                  </div>
                </div>

                {/* After Image with Badge */}
                <div className="relative">
                  <div className="w-48 h-36 bg-gray-200 rounded-xl overflow-hidden">
                    <Image
                      src="/images/eight.jpg"
                      width={100}
                      height={100}
                      alt="Room after transformation"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Instantly Redesign Badge */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2 border">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      Instantly Redesign
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <FeaturesSection /> */}
        {/* <AudienceSection /> */}

        <section className="max-w-7xl mx-auto  relative mb-5">
          <NewsletterForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}
