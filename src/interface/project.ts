export interface ProjectInterface {
  createdAt: string;
  description: string;
  generationCount: number;
  generations: DesginGenerationInterface[];
  id: string;
  isActive: boolean;
  name: string;
  prompt: string;
  referenceImage: string;
  room_type: string;
  style_preset: string;
  updatedAt: string;
  userId: string;
}

export interface ProjectsResponse {
  projects: ProjectInterface[];
  total: number;
  page: number;
  limit: number;
}

export interface ProjectFilters {
  status?: 'all' | 'active' | 'draft' | 'completed';
  search?: string;
  sortBy?: 'title' | 'createdAt' | 'updatedAt' | 'views' | 'likes';
  sortOrder?: 'asc' | 'desc';
}

export interface DesginGenerationInterface {
  id: string;
  output: string;
  prompt: string;
  reference: string;
  room_type: string;
  status: string;
  style_preset: string;
  user: string;
}
