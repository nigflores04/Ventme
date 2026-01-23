"use client";
// import { ImageWithFallback } from "../ImageWithFallback";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card";
import Button from "../ui/button";
// import { Home, Users, Building } from "lucide-react";

const audiences = [
  {
    // icon: Home,
    title: "Homeowners",
    description: "Transform your living space without the high cost of hiring a professional designer. Get instant design ideas and visualize changes before making any purchases.",
    image: "https://images.unsplash.com/photo-1704428382616-d8c65fdd76f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYmVkcm9vbSUyMGRlc2lnbnxlbnwxfHx8fDE3NTU2ODM2MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    features: ["Room makeovers", "Color palette suggestions", "Furniture placement", "Budget-friendly options"]
  },
  {
    // icon: Users,
    title: "Interior Designers",
    description: "Accelerate your workflow with AI-powered concept generation. Create multiple design variations quickly and focus more time on client relationships.",
    image: "https://images.unsplash.com/photo-1643906256051-51b92ae8d3f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMGRlc2lnbmVyJTIwd29ya2luZyUyMGNvbXB1dGVyfGVufDF8fHx8MTc1NTczNjA2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    features: ["Rapid prototyping", "Client presentations", "Style exploration", "Workflow optimization"]
  },
  {
    // icon: Building,
    title: "Design Companies",
    description: "Scale your design services and handle more projects simultaneously. Empower your team with AI tools that enhance creativity and productivity.",
    image: "https://images.unsplash.com/photo-1680210849773-f97a41c6b7ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBtb2Rlcm58ZW58MXx8fHwxNzU1Njc5NTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    features: ["Team collaboration", "Brand consistency", "Project management", "Client onboarding"]
  }
];

export function AudienceSection() {
  const scrollToWaitlist = () => {
    const waitlistSection = document.querySelector('#waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl mb-4">
            Designed for Everyone in Interior Design
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you&apos;re redesigning your home or managing a design business, our AI adapts to your needs.
          </p>
        </div>

        <div className="space-y-16">
          {audiences.map((audience, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <Card className="border-none shadow-none bg-transparent p-0">
                  <CardHeader className="px-0 pt-0">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        {/* <audience.icon className="h-6 w-6 text-primary" /> */}
                      </div>
                      <CardTitle className="text-2xl">{audience.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="px-0">
                    <CardDescription className="text-lg mb-6">
                      {audience.description}
                    </CardDescription>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {audience.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button className="gap-2" onClick={scrollToWaitlist}>
                      Join Waitlist
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  {/* <ImageWithFallback
                    src={audience.image}
                    alt={`${audience.title} using interior design tool`}
                    className="w-full h-full object-cover"
                  /> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}