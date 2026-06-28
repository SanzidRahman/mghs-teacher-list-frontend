import NoticeBar from "../components/NoticeBar";
import HeadTeacher from "@/components/HeadTeacher";
import QuickLinks from "@/components/QuickLinks";
import Footer from "@/components/Footer";


export default function HomePage() {
  return (
    <main className="max-w-[1200px] mx-auto bg-white shadow-lg min-h-screen mt-2">
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-6 p-4 ">
        <div className="lg:col-span-8 col-span-12">
          <NoticeBar />
        </div>
        <div className="lg:col-span-4 col-span-12 space-y-4">
          <HeadTeacher />
          <QuickLinks />
        </div>
      </div>
      <Footer />
    </main>
  );
}