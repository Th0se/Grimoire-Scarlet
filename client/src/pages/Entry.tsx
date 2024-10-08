/** @format */

import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import SaveItem from '../shared/Types';
import Sidebar from '../shared/Sidebar';
import Footer from '../shared/Footer';

const Entry: React.FunctionComponent = () => {
    const { documentTitle } = useParams<{ documentTitle: string }>();
    const saveFile = sessionStorage.getItem('saveFile');
    const [entry, setEntry] = useState<SaveItem>({
        title: '',
        content: '',
        date: '',
    });

    useEffect(() => {
        if (saveFile) {
            const entries = new Map(JSON.parse(saveFile));
            if (entries.has(documentTitle)) {
                setEntry(entries.get(documentTitle) as SaveItem);
            }
        }
    }, [documentTitle, saveFile]);

    return (
        <div data-theme='coffee'>
            <main className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6'>
                <Sidebar />
                <div className='col-span-2 md:col-span-4 lg:col-span-5 p-4 grid grid-rows-10 gap-2'>
                    <div className='py-2'>
                        <p className='text-title font-bold text-3xl text-center tracking-wider'>
                            {entry.title}
                        </p>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{ __html: entry.content }}
                        className='text-body row-span-9 leading-loose tracking-wide px-2'
                    ></div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Entry;
