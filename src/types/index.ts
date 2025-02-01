// types/types.ts
export interface FileItem {
   type: string;
   name: string;
   added: string;
}

export interface FolderItem {
   type: 'folder';
   name: string;
   files: File[];
}

export type File = FileItem | FolderItem;
