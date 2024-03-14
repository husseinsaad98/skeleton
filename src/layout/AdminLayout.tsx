import SideBar from "./sideBar";
import TopBar from "./topBar";
export default function AdminLayout(props: LayoutProps) {
  return (
    <div>
      <TopBar />
      <SideBar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14"> {props.children}</div>
      </div>
    </div>
  );
}
interface LayoutProps {
  children: React.ReactNode;
  background?: string;
}
