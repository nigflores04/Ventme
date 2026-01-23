"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card";
// import { Upload, MessageSquare, Palette, Zap, Users, Star, Image, Layers } from "lucide-react";

const features = [
  {
    // icon: Upload,
    title: "Image Reference Upload",
    description: "Upload any interior image as a starting point for your AI-generated design transformation.",
    color: "text-red-500 bg-red-50"
  },
  {
    // icon: Zap,
    title: "Real-time Generation",
    description: "Get professional-quality interior designs in seconds with our advanced AI processing.",
    color: "text-blue-500 bg-blue-50"
  },
  {
    // icon: Users,
    title: "Team Collaboration",
    description: "Share designs with team members and clients for seamless collaboration and feedback.",
    color: "text-green-500 bg-green-50"
  },
  {
    // icon: Star,
    title: "Style Tracking",
    description: "Monitor design preferences and maintain consistency across all your projects.",
    color: "text-yellow-500 bg-yellow-50"
  },
  {
    // icon: Layers,
    title: "Multiple Variations",
    description: "Generate multiple design options from a single reference to explore different possibilities.",
    color: "text-purple-500 bg-purple-50"
  },
  {
    // icon: Palette,
    title: "Style Customization",
    description: "Choose from dozens of design styles and customize colors, textures, and materials.",
    color: "text-orange-500 bg-orange-50"
  },
  {
    // icon: MessageSquare,
    title: "Smart Prompts",
    description: "Describe your vision in natural language and watch AI interpret your preferences.",
    color: "text-pink-500 bg-pink-50"
  },
  {
    // icon: Image,
    title: "High-Res Exports",
    description: "Download professional-quality images and detailed furniture lists for implementation.",
    color: "text-indigo-500 bg-indigo-50"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mb-4">
            Our Features
          </div>
          <h2 className="text-3xl sm:text-4xl mb-4 max-w-2xl mx-auto">
            We do it for the love of the Game. (Interior Design)
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Streamline your design projects with our powerful features and gain insights with comprehensive design performance metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-200 text-center p-6">
              <CardContent className="p-0">
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  {/* <feature.icon className="h-6 w-6" /> */}
                </div>
                <CardTitle className="text-lg mb-3">{feature.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            DesignAI offers comprehensive interior design solutions for businesses of all sizes.
          </p>
        </div>
      </div>
    </section>
  );
}