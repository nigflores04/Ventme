"use client";
import { useEffect, useState } from "react";
import { getSubscriptionsPlans, verifyPayment } from "@/api/subscriptions";
import { Header } from "@/components/Header";
import PricingCard from "@/components/PricingCard";
import { useQuery } from "@tanstack/react-query";
import { FiCheck } from "react-icons/fi";
import { PlanInterface } from "@/interface/plans";
import { Skeleton } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Footer } from "@/components/Footer";
import { buildEventParams } from "@/lib/helpers";
import { useSelector } from "react-redux";
import { selectUserState } from "@/store/selectors/userSelectors";
import { useIpAddress } from "@/hooks/useIpAddress";
import { trackEvent } from "@/api/analytics";

const Pricing = () => {
  const params = useSearchParams();
  const reference = params.get("reference");
  const router = useRouter();
  const { user } = useSelector(selectUserState);
  // console.log(reference);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly"
  );
  const { ipAddress } = useIpAddress();
  const {
    data: plans,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["plans"],
    queryFn: () => getSubscriptionsPlans(),
  });

  // const {
  //   mutate: mutateVerifyPayment,
  //   isPending: isVerifyPaymentLoading,
  //   error: verifyPaymentError,
  // } = useMutation({
  //   mutationFn: () => verifyPayment(reference!),
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  // Generate features based on credits (you can customize this logic)
  const generateFeatures = (credits: number) => [
    { name: "Dashboard Access", included: true },
    { name: "Customer Support", included: true },
    { name: `${credits} requests`, included: credits > 0 },
    { name: "High Resolution Downloads", included: credits >= 100 },
    { name: "Priority Processing", included: credits >= 500 },
    { name: "Commercial License", included: credits >= 1000 },
  ];

  const logEvent = async () => {
    const params = await buildEventParams(`Purchase`, {
      email: user?.email || null,
      phone: null,
      clientIpAddress: ipAddress,
      clientUserAgent:
        typeof navigator !== "undefined" ? navigator.userAgent : null,
    });

    trackEvent(params);
  };
  useEffect(() => {
    if (reference) {
      toast.promise(verifyPayment(reference), {
        loading: "Verifying payment...",
        success: <b>Payment Successful. More request credits added .</b>,
        error: <b>Could not verify payment.</b>,
      });

      logEvent();

      // router.push("/design");
    }
  }, [reference, router]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <Header />

      {/* <Modal opened={opened} onClose={close} title="Authentication" centered>
 
      </Modal> */}

      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Simple & <em className="italic">transparent</em> pricing
        </h1>
        <p className="text-xl text-gray-600 mb-8">for different design needs</p>

        {/* Billing Toggle */}
        <div
          className="inline-flex bg-gray-100 rounded-lg p-1 mb-12"
          style={{
            display: "none",
          }}
        >
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${billingCycle === "monthly"
              ? "bg-white text-black shadow-sm"
              : "text-gray-600 hover:text-black"
              }`}
          >
            Monthly billing
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${billingCycle === "annual"
              ? "bg-white text-black shadow-sm"
              : "text-gray-600 hover:text-black"
              }`}
          >
            Annual billing
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeletons
            <>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-200 p-8"
                >
                  <Skeleton height={24} width="60%" mb="md" />
                  <Skeleton height={48} width="40%" mb="lg" />
                  <Skeleton height={40} width="100%" mb="lg" />
                  <Skeleton height={16} width="80%" mb="md" />
                  <div className="space-y-3">
                    {[...Array(5)].map((_, j) => (
                      <Skeleton key={j} height={16} width="90%" />
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : error ? (
            // Error state
            <div className="col-span-3 text-center py-12">
              <p className="text-red-600 mb-4">Failed to load pricing plans</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          ) : (
            // Render all plans from API
            plans?.map((plan: PlanInterface) => (
              <PricingCard
                key={plan.plan}
                id={plan.plan}
                title={`${plan.plan}`}
                description={plan.description}
                price={plan.price}
                features={generateFeatures(plan.credits)}
                buttonText="Get started"
                popular={plan.popular}
              />
            ))
          )}
        </div>
      </div>

      {/* Individual Credit Purchase Section */}
      <div className="bg-black py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Individual</h3>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Purchase a flexible amount of <br />
                credits for your needs
              </h2>

              <ul className="space-y-3 text-white">
                <li className="flex items-center gap-3">
                  <FiCheck className="w-5 h-5 text-green-400" />
                  <span>₦100 per credit</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiCheck className="w-5 h-5 text-green-400" />
                  <span>No subscription required</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiCheck className="w-5 h-5 text-green-400" />
                  <span>Credits never expire</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiCheck className="w-5 h-5 text-green-400" />
                  <span className="font-medium">
                    Buy exactly what you need
                  </span>
                </li>
              </ul>
            </div>

            {/* Right Content - Pricing Card */}
            <div className="bg-gray-800 rounded-xl p-6 min-w-[300px]">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium">
                  FLEXIBLE
                </span>
                <span className="text-gray-400 text-sm">
                  ₦100/credit
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-white">₦</span>
                  <input
                    type="number"
                    placeholder="1000"
                    className="text-4xl font-bold bg-transparent text-white border-none outline-none w-32"
                    min="100"
                    step="100"
                  />
                </div>
                <span className="text-gray-400 text-sm">Enter amount (minimum ₦100)</span>
              </div>

              <div className="text-sm text-gray-400 mb-6">
                <p>• ₦100 = 1 credit</p>
                <p>• Minimum purchase: ₦100 (1 credit)</p>
                <p>• Credits never expire</p>
              </div>

              <button className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 px-4 rounded-lg transition-colors">
                Purchase Credits
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">FAQs</h2>
            <p className="text-gray-600">
              Some questions we get asked the most
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg">
              <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="text-black font-medium">
                  What are the different pricing plans available for Nonlinear
                  Calendar?
                </span>
                <span className="text-gray-400 text-xl">+</span>
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg">
              <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="text-black font-medium">
                  What features are included in the Starter plan?
                </span>
                <span className="text-gray-400 text-xl">+</span>
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg">
              <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="text-black font-medium">
                  What additional features do I get with the Basic plan compared
                  to the Starter plan?
                </span>
                <span className="text-gray-400 text-xl">+</span>
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg">
              <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="text-black font-medium">
                  What features are exclusive to the Premium plan?
                </span>
                <span className="text-gray-400 text-xl">+</span>
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg">
              <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="text-black font-medium">
                  Do you offer any discounts for annual payments?
                </span>
                <span className="text-gray-400 text-xl">+</span>
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg">
              <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="text-black font-medium">
                  Can I change my pricing plan at any time?
                </span>
                <span className="text-gray-400 text-xl">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      <script
        dangerouslySetInnerHTML={{
          __html: `
            fbq('track', 'ViewPricing');
            `,
        }}
      />
    </div>
  );
};

export default Pricing;
