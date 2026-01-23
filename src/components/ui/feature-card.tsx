import Image from "next/image"

interface FeatureCardProps {
  title: string
  description: string
  imagePosition?: "left" | "right"
  image: string
}

const FeatureCard = ({ title, description, imagePosition = "right", image }: FeatureCardProps) => {
  return (
 <div
      className={`flex flex-col md:flex-row gap-12 items-center ${
        imagePosition === "left" ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex-1">
      <div className="max-w-[450px]">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">{title}</h2>
        <p className="text-lg md:text-[22px] text-gray-400 md:font-medium leading-relaxed">{description}</p>
      </div>
      </div>
      <div className="flex-1 h-[50vh]  bg-gray-100 rounded-2xl overflow-hidden">
        <Image src={image} alt="" width={100} height={100} className="w-full h-full object-cover" unoptimized quality={100}/>
      </div>
    </div>
  )
}

export default FeatureCard