"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/global/custom-modal";
import { useModal } from "@/providers/ModalProvider";
import { CheckCircle2 } from "lucide-react"; // Added for a "Verified" feel

interface PricingCardProps {
  features: string[];
  buttonCta: string;
  title: string;
  description: string;
  amt: string;
  duration: string;
  highlightTitle: string;
  highlightDescription: string;
  customerId: string;
  prices: any[];
  isPlanExists: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  amt,
  buttonCta,
  description,
  duration,
  features,
  highlightDescription,
  highlightTitle,
  title,
}) => {
  const { setOpen } = useModal();

  const handleShowDetails = async () => {
    setOpen(
      <CustomModal
        title={`${title} Details`}
        subHeading="Review the features included in this tier."
      >
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Stratos is currently an open-access platform. You have full permission to use all 
            features included in the {title} tier without any subscription requirements.
          </p>
          <ul className="space-y-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CustomModal>
    );
  };

  return (
    <Card className="flex flex-col justify-between lg:w-1/3 border-2 transition-all hover:border-primary/50">
      <div>
        <CardHeader className="flex flex-col lg:items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold">{amt}</span>
            <small className="text-sm font-light text-muted-foreground">
              {duration}
            </small>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                {feature}
              </li>
              ))}
            </ul>
        </CardContent>
      </div>
      <CardFooter className="mt-auto">
        <Card className="w-full bg-muted/50 border-none">
          <div className="flex flex-col p-4 gap-4">
            <div>
              <p className="font-semibold text-sm">{highlightTitle}</p>
              <p className="text-xs text-muted-foreground">
                {highlightDescription}
              </p>
            </div>
            <Button 
              variant={title === "Unlimited Saas" ? "default" : "outline"}
              className="w-full" 
              onClick={handleShowDetails}
            >
              {buttonCta}
            </Button>
          </div>
        </Card>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;