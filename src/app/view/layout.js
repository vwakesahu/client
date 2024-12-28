import LeftSidebar from "@/components/dashboard/left-sidebar";
import RightSidebar from "@/components/dashboard/right-sidebar";
import { FHEWrapper } from "@/fhevm/fheWrapper";

export default function ExploreLayout({ children }) {
  return (
    <FHEWrapper>
      <div className="h-screen flex bg-[#FBF8F6] w-full">
        {/* LEFT SIDEBAR */}
        <div className="min-h-full p-4">
          <div className="w-28 bg-[#F3EBE5] border h-full rounded-3xl overflow-auto scrollbar-hide">
            <div className="h-full w-full"><LeftSidebar /></div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="min-h-full w-full p-4">
          <div className="w-full overflow-auto h-full scrollbar-hide">
            {children}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        {/* <div className="min-h-full p-4">
          <div className="w-[400px] bg-[#F3EBE5] border h-full rounded-3xl overflow-auto scrollbar-hide">
            <div className="h-full"><RightSidebar /></div>
          </div>
        </div> */}
      </div>
    </FHEWrapper>
  );
}
