import { auth } from "@/lib/auth";
import { getAllTenants } from "@/lib/actions/tenant.action";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        redirect("/login");
    }

    // If user already has profiles, redirect to admin
    const tenants = (await getAllTenants()) ?? [];
    if (tenants.length > 0) {
        const primary = tenants.find((t) => t.isPrimary) ?? tenants[0];
        redirect(`/admin/${primary.username}/breezies`);
    }

    return <>{children}</>;
}
