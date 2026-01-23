export interface GenerateDesignDto {
    image: File;
    prompt: string;
    roomType: string;
    stylePreset?: string;
    projectId?:string
}

export interface DesignResultInterface {
  id: string;
  output: string;
  prompt: string;
  reference: string;
  room_type: string | null;
  status: string;
  style_preset: string | null;
  user: string;
}

export interface ProjectDto {
  name: string;
  description: string;
  referenceImage: string;
  prompt: string;
  roomType: string;
  stylePreset: string;
}


export interface DesignBarProps {
  values: any;
  setFieldValue: (field: string, value: any) => void;
}
