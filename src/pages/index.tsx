import dynamic from "next/dynamic";

const DashboardApp = dynamic(() => import("@/components/DashboardApp"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="mx-auto max-w-xl p-8">
      <h2 className="text-lg font-semibold text-gray-900">Remote2</h2>
      <DashboardApp />
    </div>
  );
}
