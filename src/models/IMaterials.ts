export interface IMaterials {
    _id: string;
    title: string;
    description: string;
    author: string;
    discipline: string;
    materialType: string;
    contentType: string;
    contentUrl?: string;
    previewImageUrl: string;
    downloadCount: number;
    createdAt : Date
  }
  