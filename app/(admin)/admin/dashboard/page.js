
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


        <div className="mt-10 flex  lg:flex-nowrap flex-wrap gap-10">
          <CountOverview />
        </div>
      </div>
    </div>
  );
}

export default Dashboard


