export const dynamic = "force-dynamic",
  dynamicParams = "true",
  revalidate = 0;

import DataGrid from "@/components/grid/dataGrid";
import { FieldConfig } from "@/components/grid/gridModels";
import AdminLayout from "@/layout/adminLayout";
import app from "../../../db";
async function getNotes() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/users/records?page=1&perpage=30"
  );
  const data = await res.json();
  return data?.items as any[];
}
export default async function UsersOverview() {
  const users = await app.usersCollection.getUsers();
  console.log(users);
  const columns: FieldConfig[] = [
    {
      field: "user",
      headerName: "User",
      type: "string",
    },
    {
      field: "role",
      headerName: "Role",
      type: "object",
    },
    {
      field: "plan",
      headerName: "Plan",
      type: "string",
    },
    {
      field: "billing",
      headerName: "Billing",
      type: "string",
    },
    {
      field: "status",
      headerName: "Status",
      type: "string",
    },
    {
      field: "grade",
      headerName: "Grade",
      type: "number",
    },
    {
      field: "action",
      headerName: "Actions",
      type: "action",
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-screen-xl bg-white m-auto card">
        <DataGrid columns={columns} data={users} />
      </div>
    </AdminLayout>
  );
}
