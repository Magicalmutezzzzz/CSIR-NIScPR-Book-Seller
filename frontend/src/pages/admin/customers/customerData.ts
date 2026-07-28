export interface Customer {
  id: number;
  customerId: string;

  name: string;
  email: string;
  phone: string;

  institution: string;

  type: "Institution" | "Individual";

  orders: number;

  totalSpent: number;

  lastOrder: string;

  joined: string;

  state: string;

  status: "Active" | "Inactive" | "Blocked";

  avatar: string;
}

export const demoCustomers: Customer[] = [
  {
    id: 1,
    customerId: "CUS-1001",
    name: "Indian Institute of Technology Delhi",
    email: "library@iitd.ac.in",
    phone: "9876543210",
    institution: "IIT Delhi",
    type: "Institution",
    orders: 18,
    totalSpent: 185000,
    lastOrder: "21 Jul 2026",
    joined: "12 Jan 2025",
    state: "Delhi",
    status: "Active",
    avatar: "https://placehold.co/100x100",
  },

  {
    id: 2,
    customerId: "CUS-1002",
    name: "National Institute of Immunology",
    email: "purchase@nii.ac.in",
    phone: "9898989898",
    institution: "NII",
    type: "Institution",
    orders: 12,
    totalSpent: 122500,
    lastOrder: "20 Jul 2026",
    joined: "04 Feb 2025",
    state: "Delhi",
    status: "Active",
    avatar: "https://placehold.co/100x100",
  },

  {
    id: 3,
    customerId: "CUS-1003",
    name: "CSIR-IIP",
    email: "books@iip.res.in",
    phone: "9988776655",
    institution: "CSIR-IIP",
    type: "Institution",
    orders: 9,
    totalSpent: 86500,
    lastOrder: "17 Jul 2026",
    joined: "16 Mar 2025",
    state: "Uttarakhand",
    status: "Active",
    avatar: "https://placehold.co/100x100",
  },

  {
    id: 4,
    customerId: "CUS-1004",
    name: "Ramesh Kumar",
    email: "ramesh@gmail.com",
    phone: "9871234567",
    institution: "-",
    type: "Individual",
    orders: 4,
    totalSpent: 7250,
    lastOrder: "15 Jul 2026",
    joined: "11 Apr 2026",
    state: "Uttar Pradesh",
    status: "Active",
    avatar: "https://placehold.co/100x100",
  },

  {
    id: 5,
    customerId: "CUS-1005",
    name: "AIIMS New Delhi",
    email: "library@aiims.edu",
    phone: "9811111111",
    institution: "AIIMS",
    type: "Institution",
    orders: 15,
    totalSpent: 146500,
    lastOrder: "12 Jul 2026",
    joined: "20 Jan 2025",
    state: "Delhi",
    status: "Active",
    avatar: "https://placehold.co/100x100",
  },

  {
    id: 6,
    customerId: "CUS-1006",
    name: "Priya Sharma",
    email: "priya@gmail.com",
    phone: "9822222222",
    institution: "-",
    type: "Individual",
    orders: 2,
    totalSpent: 1800,
    lastOrder: "10 Jul 2026",
    joined: "18 May 2026",
    state: "Maharashtra",
    status: "Inactive",
    avatar: "https://placehold.co/100x100",
  },

  {
    id: 7,
    customerId: "CUS-1007",
    name: "Banaras Hindu University",
    email: "central.library@bhu.ac.in",
    phone: "9833333333",
    institution: "BHU",
    type: "Institution",
    orders: 11,
    totalSpent: 96500,
    lastOrder: "08 Jul 2026",
    joined: "09 Feb 2025",
    state: "Uttar Pradesh",
    status: "Active",
    avatar: "https://placehold.co/100x100",
  },

  {
    id: 8,
    customerId: "CUS-1008",
    name: "Anjali Verma",
    email: "anjali@gmail.com",
    phone: "9844444444",
    institution: "-",
    type: "Individual",
    orders: 1,
    totalSpent: 950,
    lastOrder: "05 Jul 2026",
    joined: "01 Jun 2026",
    state: "Delhi",
    status: "Blocked",
    avatar: "https://placehold.co/100x100",
  },

  {
    id: 9,
    customerId: "CUS-1009",
    name: "IISc Bangalore",
    email: "library@iisc.ac.in",
    phone: "9855555555",
    institution: "IISc",
    type: "Institution",
    orders: 14,
    totalSpent: 158900,
    lastOrder: "03 Jul 2026",
    joined: "28 Dec 2024",
    state: "Karnataka",
    status: "Active",
    avatar: "https://placehold.co/100x100",
  },

  {
    id: 10,
    customerId: "CUS-1010",
    name: "Neha Gupta",
    email: "nehagupta@gmail.com",
    phone: "9866666666",
    institution: "-",
    type: "Individual",
    orders: 5,
    totalSpent: 12400,
    lastOrder: "01 Jul 2026",
    joined: "15 Mar 2026",
    state: "Rajasthan",
    status: "Active",
    avatar: "https://placehold.co/100x100",
  },
];