import type { Category } from "../types/category";

export async function getCategories(): Promise<Category[]> {
  return [
    {
      id: 1,
      name: "Books",
      description: "Scientific books and monographs",
      icon: "BookOpen",
      status: true,
      displayOrder: 1,
    },
    {
      id: 2,
      name: "Journals",
      description: "Peer-reviewed journals",
      icon: "Library",
      status: true,
      displayOrder: 2,
    },
    {
      id: 3,
      name: "Magazines",
      description: "Monthly & Quarterly publications",
      icon: "Newspaper",
      status: true,
      displayOrder: 3,
    },
    {
      id: 4,
      name: "Research",
      description: "Research articles",
      icon: "FileText",
      status: true,
      displayOrder: 4,
    },
    {
      id: 5,
      name: "Other Publications",
      description: "Reports and proceedings",
      icon: "ScrollText",
      status: true,
      displayOrder: 5,
    },
  ];
}
