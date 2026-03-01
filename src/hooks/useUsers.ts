import { useEffect, useState } from "react";

export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  phone: string;
  image: string;
  company: { name: string; title: string };
}

interface UsersResponse {
  users: DummyUser[];
  total: number;
  skip: number;
  limit: number;
}

const REQUEST_TIMEOUT_MS = 6000;
const REMOTE_SKIP = 20;
const FALLBACK_USERS: DummyUser[] = [
  {
    id: 2001,
    firstName: "Ethan",
    lastName: "Brooks",
    email: "ethan.brooks@example.com",
    age: 36,
    gender: "male",
    phone: "+1-555-0201",
    image: "https://i.pravatar.cc/150?img=21",
    company: { name: "Wayne Corp", title: "Operations Manager" },
  },
  {
    id: 2002,
    firstName: "Sophia",
    lastName: "Reed",
    email: "sophia.reed@example.com",
    age: 32,
    gender: "female",
    phone: "+1-555-0202",
    image: "https://i.pravatar.cc/150?img=22",
    company: { name: "Stark Industries", title: "HR Partner" },
  },
  {
    id: 2003,
    firstName: "Lucas",
    lastName: "Turner",
    email: "lucas.turner@example.com",
    age: 40,
    gender: "male",
    phone: "+1-555-0203",
    image: "https://i.pravatar.cc/150?img=23",
    company: { name: "Oscorp", title: "Security Lead" },
  },
  {
    id: 2004,
    firstName: "Olivia",
    lastName: "Morris",
    email: "olivia.morris@example.com",
    age: 30,
    gender: "female",
    phone: "+1-555-0204",
    image: "https://i.pravatar.cc/150?img=24",
    company: { name: "Hooli", title: "Program Manager" },
  },
  {
    id: 2005,
    firstName: "James",
    lastName: "Foster",
    email: "james.foster@example.com",
    age: 38,
    gender: "male",
    phone: "+1-555-0205",
    image: "https://i.pravatar.cc/150?img=25",
    company: { name: "Pied Piper", title: "System Administrator" },
  },
];

export function useUsers(limit = 10) {
  const [users, setUsers] = useState<DummyUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const loadUsers = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://dummyjson.com/users?limit=${limit}&skip=${REMOTE_SKIP}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = (await res.json()) as UsersResponse;
        if (cancelled) return;
        setUsers(data.users);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setUsers(FALLBACK_USERS.slice(0, limit));
        setError(
          `Using fallback users: ${
            err instanceof Error ? err.message : "request failed"
          }`
        );
      } finally {
        clearTimeout(timeoutId);
        if (!cancelled) setLoading(false);
      }
    };

    void loadUsers();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [limit]);

  return { users, loading, error };
}
