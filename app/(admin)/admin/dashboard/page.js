
import { Breadcrumb } from "@/components/Breadcrumb";
import CountOverview from "@/components/CountOverview";


const Dashboard = () => {
  const breadcrumbItems = [

    { label: "Dashboard", href: "/admin/dashboard" },

  ];
  return (
    <div >
      <Breadcrumb items={breadcrumbItems} />
      <div className="mt-6">
        <h1 className="text-2xl font-bold">Profile Page</h1>
        <p className="mt-2 text-gray-600">
          This is the Dashboard page content. The breadcrumb above shows the navigation path.
        </p>
        <div className="mt-10 flex  lg:flex-nowrap flex-wrap gap-10">
          <CountOverview />
        </div>
      </div>
    </div>
  );
}

export default Dashboard


