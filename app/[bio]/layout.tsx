import BioFooter from "@/components/shared/bio/footer/footer";

export default function BioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center w-full max-w-full md:max-w-2xl mx-auto">
      {children}
      <BioFooter user={{ name: "Anshul" }} />
    </div>
  );
}
