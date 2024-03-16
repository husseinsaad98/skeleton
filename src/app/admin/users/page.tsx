import DataGrid from "@/components/grid/dataGrid";
import AdminLayout from "@/layout/adminLayout";

export default function UsersOverview() {
  return (
    <AdminLayout>
      <div className="max-w-screen-xl bg-white m-auto card">
        <DataGrid />
      </div>
    </AdminLayout>
  );
}
