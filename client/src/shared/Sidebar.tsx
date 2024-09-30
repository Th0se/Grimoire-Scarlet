/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DownloadButton: React.FunctionComponent = () => {
    const data = sessionStorage.getItem('saveFile');

    const handleDownload = () => {
        if (data) {
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Grimoire_Scarlet_save.json';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert('No data to download');
        }
    };
    return (
        <button
            onClick={handleDownload}
            className='btn btn-secondary btn-outline'
        >
            Download save data
        </button>
    );
};

const UploadButton: React.FunctionComponent = () => {
    const [saveFile, setSaveFile] = useState<null | File>(null);
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const file = event.target.files?.[0];
        if (file) {
            setSaveFile(file);
        }
    };
    const handleUpload = (event: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();
        const reader = new FileReader();
        if (saveFile) {
            reader.onload = (event) => {
                const fileContent = event.target?.result;
                if (typeof fileContent === 'string') {
                    sessionStorage.setItem('saveFile', fileContent);
                }
            };
            reader.readAsText(saveFile);
        }
        alert('File uploaded');
    };

    return (
        <div className='grid grid-cols-1 gap-1'>
            <input
                type='file'
                onChange={handleInput}
            />
            <button
                onClick={handleUpload}
                className='btn btn-secondary btn-outline'
            >
                Upload save data
            </button>
        </div>
    );
};

const WriteButton: React.FunctionComponent = () => {
    return (
        <Link
            to='/write'
            className='btn btn-primary btn-outline'
        >
            New entry
        </Link>
    );
};

const BookButton: React.FunctionComponent = () => {
    return (
        <Link
            to='/entries'
            className='btn btn-primary btn-outline'
        >
            Book
        </Link>
    );
};

const Sidebar: React.FunctionComponent = () => {
    return (
        <div
            id='sidebar'
            className='grid grid-rows-3 bg-neutral h-screen p-4'
        >
            <div className='row-start-1 grid grid-rows-2 p-2'>
                <WriteButton />
                <BookButton />
            </div>
            <div className='row-start-3 grid grid-rows-3 p-2'>
                <DownloadButton />
                <UploadButton />
            </div>
        </div>
    );
};

export default Sidebar;
