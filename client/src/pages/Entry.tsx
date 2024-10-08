/** @format */

import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import SaveItem from '../shared/Types';
import Sidebar from '../shared/Sidebar';
import Footer from '../shared/Footer';

interface DeleteButtonProps {
    onClick: (
        e: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>
    ) => void;
}

const DeleteButton: React.FunctionComponent<DeleteButtonProps> = ({
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            className='btn btn-warning btn-xs md:btn-sm btn-outline'
        >
            Delete
        </button>
    );
};

const Entry: React.FunctionComponent = () => {
    const { documentTitle } = useParams<{ documentTitle: string }>();
    const saveFile = sessionStorage.getItem('saveFile');
    const [entry, setEntry] = useState<SaveItem>({
        title: '',
        content: '',
        date: '',
    });

    useEffect(() => {
        if (saveFile && documentTitle) {
            const entries = new Map(JSON.parse(saveFile));
            if (entries.has(documentTitle)) {
                setEntry(entries.get(documentTitle) as SaveItem);
            }
        }
    }, [documentTitle, saveFile]);
    const handleDelete = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        if (saveFile && documentTitle) {
            const entries = new Map(JSON.parse(saveFile));
            if (entries.has(documentTitle)) {
                entries.delete(documentTitle);
                sessionStorage.setItem(
                    'saveFile',
                    JSON.stringify(Array.from(entries.entries()))
                );
                alert('Entry deleted');
            }
        }
    };

    return (
        <div data-theme='coffee'>
            <main className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6'>
                <Sidebar />
                <div className='col-span-2 md:col-span-4 lg:col-span-5 p-4 grid grid-rows-10 gap-2'>
                    <div className='py-2 grid md:grid-cols-10 gap-4'>
                        <div className='col-span-9'>
                            <p
                                className='text-title font-bold text-3xl text-center tracking-wider border-b-2 border-accent'
                                title='click to open a command console.'
                            >
                                {entry.title}
                            </p>
                        </div>
                        {/* 
                            If in the future an edit button is to be added, do it here.
                        */}
                        <div className='flex justify-end'>
                            <DeleteButton onClick={handleDelete} />
                        </div>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{ __html: entry.content }}
                        className='text-body row-span-9 leading-loose tracking-wide px-2 h-5/6 overflow-y-scroll'
                    ></div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Entry;
