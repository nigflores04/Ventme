import { subscribeToPlan } from "@/api/subscriptions";
import Button  from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiCheck } from "react-icons/fi";
import { buildEventParams, convertKoboToNGN } from "@/lib/helpers";
import { trackEvent } from "@/api/analytics";
import { selectUserState } from "@/store/selectors/userSelectors";
import { useSelector } from "react-redux";
import { useIpAddress } from "@/hooks/useIpAddress";

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingCardProps {
  id: string;
  title: string;
  description: string;
  price: number; // Raw price in kobo
  features: PricingFeature[];
  buttonText: string;
  popular?: boolean;
}

const PricingCard = ({
  id,
  title,
  description,
  price,
  features,
  buttonText,
  popular = false,
}: PricingCardProps) => {
  const { user } = useSelector(selectUserState);
  const { ipAddress } = useIpAddress();

  const { mutate, isPending } = useMutation({
    mutationFn: () => subscribeToPlan(id),
    onSuccess: (res) => {
      window.open(res.redirect_url, "_self");
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to subscribe to plan"
      );
    },
  });

  const initializePayment = async () => {
    const params = await buildEventParams(`InitializePayment_${title}_plan`, {
      email: user?.email || null,
      phone: null,
      clientIpAddress: ipAddress,
      clientUserAgent:
        typeof navigator !== "undefined" ? navigator.userAgent : null,
    });

    trackEvent(params);

    if (title?.toLowerCase() === "free") {
      toast.success("Free plan does not require payment");
      return;
    }

    mutate();
  };
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 p-8 relative ${
        popular ? "ring-2 ring-black" : ""
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium">
            Most popular
          </span>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-black mb-6 capitalize">
          {title}
        </h3>

        <div className="mb-6">
          <span className="text-5xl font-bold text-black">
            {convertKoboToNGN(price)}
          </span>
          {price > 0 && <span className="text-gray-500 ml-1">per month</span>}
        </div>

        <Button
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            popular
              ? "bg-black text-white hover:bg-gray-800"
              : " text-black hover:bg-gray-200"
          }`}
          isLoading={isPending}
          onClick={() => initializePayment()}
        >
          {buttonText}
        </Button>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-black mb-4 uppercase tracking-wide">
          FEATURES
        </h4>
        <p className="text-sm text-gray-600 mb-4">{description}</p>

        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <FiCheck
                className={`w-4 h-4 ${
                  feature.included ? "text-black" : "text-gray-300"
                }`}
              />
              <span
                className={`text-sm ${
                  feature.included ? "text-black" : "text-gray-400"
                }`}
              >
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard
