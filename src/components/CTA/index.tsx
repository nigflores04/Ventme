"use client";
import  Button  from "../ui/button";
import { Card, CardContent } from "../ui/Card";
// import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-12 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="space-y-4">
                <div className="flex justify-center">
                  {/* <Sparkles className="h-12 w-12 text-primary" /> */}
                </div>
                <h2 className="text-3xl sm:text-4xl">
                  Ready to Transform Your Space?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Join thousands of homeowners, designers, and companies who are already creating stunning interiors with AI. Start your free trial today.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  Start Free Trial
                  {/* <ArrowRight className="h-4 w-4" /> */}
                </Button>
                <Button variant="outline" size="lg">
                  Schedule Demo
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}