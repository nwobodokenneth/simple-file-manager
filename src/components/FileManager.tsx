import React, { useState } from 'react';
import {FileSystemItem, FolderItem} from '../types';
import {mockData} from "../store/mockData";
import {Folder, FileText, Film, Search} from "react-feather"



const FileManager: React.FC = () => {
   const [history, setHistory] = useState<FileSystemItem[][]>([]);
   const [currentItems, setCurrentItems] = useState<FileSystemItem[]>(mockData);
   const [filterText, setFilterText] = useState('');
   const [currentFolderName, setCurrentFolderNAme] = useState('');


   const handleFolderClick = (folder: FolderItem) => {
      setHistory([...history, currentItems]);
      setCurrentItems(folder.files);
      setCurrentFolderNAme(folder.name)
   };

   const fileType = {
      mov: <Film/>,
      folder: <Folder/>
   }

   const handleBackClick = () => {
      if (history.length === 0) return;
      const previousItems = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentItems(previousItems);
   };

   const filteredItems = currentItems.filter((item: FileSystemItem) =>
      item.name?.toLowerCase().includes(filterText.trim().toLowerCase())
   );


   return (
      <div className="w-3/5 mx-auto p-6">
         <div className={'mb-3'}>
            <span className="text-3xl font-bold text-gray-800 mb-4">File Manager</span>
            {history.length > 0 && (
               <span className="text-3xl font-thin text-gray-800 mb-4"> / {currentFolderName}</span>
            )}
         </div>

         <div className="flex gap-6">
            {history.length > 0 && (
               <button
                  onClick={handleBackClick}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
               >
                  Back
               </button>
            )}
            <input
               type="text"
               placeholder="Filter by filename"
               value={filterText}
               onChange={(e) => setFilterText(e.target.value)}
               className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

         </div>
         <div className={'space-y-4'}>
            {filteredItems.length === 0 ? (
               <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-gray-200 rounded-lg mt-4">
                  <Search/>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                     No file found
                  </h3>
                  <p className="text-gray-500 max-w-prose">
                     {filterText ? (
                        <>
                           No items match "<span className="text-gray-700 font-medium">{filterText}</span>".
                           Try adjusting your search terms.
                        </>
                     ) : (
                        "This folder is empty. Upload a file or check another folder."
                     )}
                  </p>
               </div>
            ) : (
               filteredItems.map((item:any, index) => (
                     <div
                        key={index}
                     >
                        <div className={`${item.type === 'folder' && 'cursor-pointer'} p-10 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors mt-10`}
                             onClick={item.type === 'folder' ? () => handleFolderClick(item) : undefined}
                        >
                           <div className="flex items-center gap-4">
                              {fileType[item.type] ?? <FileText/>}
                              <span className={`${item.type === 'folder' && 'hover:underline underline-offset-4'} flex-grow text-gray-900`}>{item.name}{`${item.type !== "folder" ? `.${item.type}` : ''}`}</span>
                              <span className="text-sm text-gray-500">
                                    {new Date(item.added).toLocaleDateString('en-GB', {
                                       day: 'numeric',
                                       month: 'short',
                                       year: 'numeric'
                                    })}
                        </span>
                           </div>
                        </div>
                     </div>
                  ))
            )}
         </div>

      </div>
   );
};

export default FileManager;
