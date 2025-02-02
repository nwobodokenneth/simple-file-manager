import {render,screen, fireEvent, act} from '@testing-library/react'
import FileManager from "../components/FileManager";
import '@testing-library/jest-dom';
import { mockData } from '../store/mockData';
import {FolderItem, FileSystemItem} from "../types";



beforeEach(() => {
   render(<FileManager />);
});

const getFileName = (item:Pick<FileSystemItem, 'name'|'type'>):string => {
   return item.name + (item.type!== "folder"? `.${item.type}` : '');
}

describe('File Manager', () => {
   it('renders the FileManger component correctly', () => {
      // Check if page title is rendered
      expect(screen.getByText('File Manager')).toBeInTheDocument();
   });
   it('renders initial mock data', () => {
      mockData.forEach(item => {
         const name = getFileName(item)
         expect(screen.getByText(name)).toBeInTheDocument();
      });
   });
   it('filters files by name', async () => {
      const input = screen.getByPlaceholderText('Filter by filename') as HTMLInputElement;

      const name = getFileName(mockData[0])
      await act(async () => {
         fireEvent.change(input, {target: {value: mockData[0].name}});
      });

      expect(screen.getByText(name)).toBeInTheDocument();
   });

   it('navigates into a folder when clicked', () => {
      const folder = mockData.find(item => item.type === 'folder') as FolderItem;
      if (!folder) throw new Error('No folder found in mockData');
      const name = getFileName(folder)

      const folderButton = screen.getByText(name);
      fireEvent.click(folderButton);

      folder.files.forEach(subItem => {
         const name = getFileName(subItem)
         expect(screen.getByText(name)).toBeInTheDocument();
      });
   });
   it('navigates back to previous directory', () => {

      const folder = mockData.find(item => item.type === 'folder') as FolderItem;
      if (!folder) throw new Error('No folder found in mockData');
      const name = getFileName(folder)

      const folderButton = screen.getByText(name);
      fireEvent.click(folderButton);

      const backButton = screen.getByText('File Manager');
      fireEvent.click(backButton);

      mockData.forEach(item => {
         const name = getFileName(item)

         expect(screen.getByText(name)).toBeInTheDocument();
      });
   });
})
