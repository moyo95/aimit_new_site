// hooks/useUserRole.ts
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/apolloClient";

const GET_CURRENT_USER = gql`
  query {
    viewer {
      id
      roles
      name
    }
  }
`;

export const useUserRole = () => {
  const { data: session, status } = useSession();
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const fetchRole = async () => {
      if (status === "authenticated" && session?.accessToken) {
        try {
          const client = getClient(session.accessToken as string);
          const { data } = await client.query({ query: GET_CURRENT_USER });
          setRoles(data.viewer.roles);
        } catch (err) {
          console.error("ロール取得失敗:", err);
        }
      }
    };
    fetchRole();
  }, [session, status]);

  return roles;
};
