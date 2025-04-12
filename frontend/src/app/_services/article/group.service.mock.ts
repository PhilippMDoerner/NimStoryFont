import { PermissionGroup } from "src/app/_models/auth";

export const dummyGroups: PermissionGroup[] = [
  {
    url: "https://example.com/group1",
    name: "Group 1",
    permissions: ["read", "write"],
    id: 1,
  },
  {
    url: "https://example.com/group2",
    name: "Group 2",
    permissions: ["read", "delete"],
    id: 2,
  },
  {
    url: "https://example.com/group3",
    name: "Group 3",
    permissions: ["write", "execute"],
    id: 3,
  },
  {
    url: "https://example.com/admin",
    name: "Admin",
    permissions: ["read", "write", "delete", "execute"],
    id: 4,
  },
  {
    url: "https://example.com/guest",
    name: "Guest",
    permissions: ["read"],
    id: 5,
  },
  {
    url: "https://example.com/member",
    name: "Member",
    permissions: ["read", "write"],
    id: 6,
  },
];
