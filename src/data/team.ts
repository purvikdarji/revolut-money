// src/data/team.ts
// Additional team members – empty by default; add entries to show the section.
// Fields marked null are hidden in the UI until filled.

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleGu?: string;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  photoSrc: string | null; // e.g. "/team/member.jpg"
  bio: string | null;
  bioGu?: string | null;
}

/** Add more team members here. The section only renders when length > 0. */
export const additionalTeamMembers: TeamMember[] = [
  // Example:
  // {
  //   id: "tm-2",
  //   name: "Priya Shah",
  //   role: "Senior Loan Advisor",
  //   phone: "+919999999999",
  //   whatsapp: "919999999999",
  //   email: null,
  //   photoSrc: "/team/priya.jpg",
  //   bio: null,
  // }
];
