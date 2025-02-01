// components/DocumentBrowser.tsx
import React, { useState } from 'react';
import { File, FolderItem } from '../types';
import {mockData} from "../store/mockData";



const FileManager: React.FC = () => {
   const [history, setHistory] = useState<File[][]>([]);
   const [currentItems, setCurrentItems] = useState<File[]>(mockData);
   const [filterText, setFilterText] = useState('');

   const handleFolderClick = (folder: FolderItem) => {
      setHistory([...history, currentItems]);
      setCurrentItems(folder.files);
   };

   const handleBackClick = () => {
      if (history.length === 0) return;
      const previousItems = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentItems(previousItems);
   };

   const filteredItems = currentItems.filter(item =>
      item.name.toLowerCase().includes(filterText.toLowerCase())
   );

   return (
      <div className="w-3/5 mx-auto p-6">
         <div>File Manager</div>
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

            {filteredItems.map((item, index) => (
               <div
                  key={index}
                  className="p-10 cursor-pointer border border-gray-200 rounded-md hover:bg-gray-50 transition-colors mt-10"
               >
                  {item.type === 'folder' ? (
                     <button
                        onClick={() => handleFolderClick(item)}
                        className="w-full text-left flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                     >
                        <span className="text-xl">📁</span>
                        <span className="font-medium text-gray-700">{item.name}</span>
                     </button>
                  ) : (
                     <div className="flex items-center gap-4">
                                <span className="w-16 font-medium text-sm text-gray-500 uppercase">
                                    {item.type}
                                </span>
                        <span className="flex-grow text-gray-900">{item.name}</span>
                        <span className="text-sm text-gray-500">
                                    {new Date(item.added).toLocaleDateString('en-GB', {
                                       day: 'numeric',
                                       month: 'short',
                                       year: 'numeric'
                                    })}
                                </span>
                     </div>
                  )}
               </div>
            ))}
      </div>
   );
};

export default FileManager;
