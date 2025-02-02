export interface BaseItem {
   type: string;
   name: string;
}

export interface FileItem extends BaseItem {
   type: string;
   added: string;
}

export interface FolderItem extends BaseItem {
   type: 'folder';
   files: FileItem[];
   added: string;
}

export type FileSystemItem = FileItem | FolderItem;
