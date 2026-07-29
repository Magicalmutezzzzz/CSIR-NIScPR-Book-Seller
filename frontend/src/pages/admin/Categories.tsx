import AdminEmptyPage from "./AdminEmptyPage";

export default function Categories() {
  return <AdminEmptyPage title="Categories" description="Categories are assigned directly while adding a publication. A dedicated category manager can be connected to the backend later." actionLabel="Add publication" actionPath="/admin/publications/add" />;
}
