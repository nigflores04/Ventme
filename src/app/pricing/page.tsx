"use client";
import { useEffect, useState } from "react";
import { getSubscriptionsPlans, verifyPayment, getIndividualPlan } from "@/api/subscriptions";
import { Header } from "@/components/Header";
import PricingCard from "@/components/PricingCard";
import { useQuery } from "@tanstack/react-query";
import { FiCheck } from "react-icons/fi";
import { PlanInterface, IndividualPlanInterface } from "@/interface/plans";
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

  const {
    data: individualPlan,
    isLoading: isIndividualLoading,
  } = useQuery({
    queryKey: ["individualPlan"],
    queryFn: () => getIndividualPlan(),
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
              {[...Array(4)].map((_, i) => (
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
            <div className="col-span-full text-center py-12">
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
                features={plan.features}
                buttonText="Get started"
                popular={plan.popular}
              />
            ))
          )}
        </div>
      </div>

      {/* Individual Credit Purchase Section */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {isIndividualLoading ? (
          <Skeleton height={300} />
        ) : individualPlan ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="flex flex-col md:flex-row items-start justify-between gap-8">
              {/* Left Content */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-black mb-6 capitalize">
                  {individualPlan.name}
                </h3>

                <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
                  {individualPlan.description}
                </h2>

                <ul className="space-y-3">
                  {individualPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <FiCheck className={`w-4 h-4 ${feature.included ? 'text-black' : 'text-gray-300'}`} />
                      <span className={`text-sm ${feature.included ? 'text-black' : 'text-gray-400'}`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Content - Pricing Input */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 min-w-[300px]">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                    FLEXIBLE
                  </span>
                  <span className="text-gray-600 text-sm">
                    ₦{(individualPlan.price_per_credit / 100).toLocaleString()}/credit
                  </span>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-black">₦</span>
                    <input
                      type="number"
                      placeholder={(individualPlan.minimum_amount / 100).toString()}
                      className="text-4xl font-bold bg-transparent text-black border-none outline-none w-32"
                      min={individualPlan.minimum_amount / 100}
                      step={individualPlan.price_per_credit / 100}
                    />
                  </div>
                  <span className="text-gray-600 text-sm">
                    Enter amount (minimum ₦{(individualPlan.minimum_amount / 100).toLocaleString()})
                  </span>
                </div>

                <div className="text-sm text-gray-600 mb-6">
                  <p>• ₦{(individualPlan.price_per_credit / 100).toLocaleString()} = 1 credit</p>
                  <p>• Minimum purchase: ₦{(individualPlan.minimum_amount / 100).toLocaleString()} ({individualPlan.minimum_credits} credit{individualPlan.minimum_credits > 1 ? 's' : ''})</p>
                  <p>• Credits never expire</p>
                </div>

                <button className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                  Purchase Credits
                </button>
              </div>
            </div>
          </div>
        ) : null}
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
