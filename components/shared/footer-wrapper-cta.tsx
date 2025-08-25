import { type ReactNode } from "react";
import FooterCta from "./footer-cta";

export default function FooterWrapperCta({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-screen h-fit flex flex-col gap-4 bg-primary">
      <div>
        <FooterCta />
      </div>
      <div className="p-2 md:p-3">{children}</div>
    </div>
  );
}
