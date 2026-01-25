export interface PlanFeature {
    name: string
    included: boolean
}

export interface PlanInterface {
    credits: number
    description: string
    plan: string
    popular: boolean
    price: number
    features: PlanFeature[]
}

export interface IndividualPlanInterface {
    name: string
    price_per_credit: number
    minimum_credits: number
    minimum_amount: number
    description: string
    features: PlanFeature[]
}