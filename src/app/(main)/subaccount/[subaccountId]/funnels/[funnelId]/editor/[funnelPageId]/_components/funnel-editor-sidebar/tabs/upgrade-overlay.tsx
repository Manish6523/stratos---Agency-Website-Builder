import { Lock, Sparkles } from "lucide-react";
import Link from "next/link";

type Props = {
  feature: string;
};

export default function UpgradeOverlay({ feature }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 text-center h-full min-h-[300px]">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
        <Lock className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold">Upgrade Required</h3>
      <p className="text-sm text-muted-foreground max-w-[240px]">
        The <span className="font-medium text-foreground">{feature}</span>{" "}
        feature is available on the <strong>Basic</strong> plan and above.
        Upgrade your subscription to unlock it.
      </p>
      <Link
        href="/agency/billing"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        <Sparkles className="w-4 h-4" />
        Upgrade Now
      </Link>
    </div>
  );
}
