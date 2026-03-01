import { Table, SectionHeader } from "@dasjideepak/mf-shared-ui";
import type { DummyUser } from "@/hooks/useUsers";

interface UsersPageProps {
  users: DummyUser[];
  usersLoading: boolean;
}

export function UsersPage({ users, usersLoading }: UsersPageProps) {
  const rows = users.map((u) => ({
    id: u.id,
    name: `${u.firstName} ${u.lastName}`,
    email: u.email,
    age: u.age,
    gender: u.gender,
    phone: u.phone,
    company: u.company.name,
  }));

  return (
    <div className="space-y-6">
      <SectionHeader
        title="User Management"
        description="Full list of platform users fetched inside remote2."
      />
      <Table
        columns={[
          { key: "id", header: "ID" },
          { key: "name", header: "Name" },
          { key: "email", header: "Email" },
          { key: "age", header: "Age" },
          { key: "gender", header: "Gender" },
          { key: "phone", header: "Phone" },
          { key: "company", header: "Company" },
        ]}
        rows={rows}
        loading={usersLoading}
        emptyMessage="No users found"
      />
    </div>
  );
}
