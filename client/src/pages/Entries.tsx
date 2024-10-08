/** @format */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SaveItem from '../shared/Types';
import Sidebar from '../shared/Sidebar';
import Footer from '../shared/Footer';

interface EntryItemProps {
    item: SaveItem;
}

const EntryItem: React.FunctionComponent<EntryItemProps> = ({ item }) => {
    return (
        <div className='border-2 border-neutral p-2 bg-base-200 hover:bg-neutral leading-relaxed'>
            <Link
                to={'/entries/' + item.title}
                className='link link-accent link-hover font-bold text-title'
            >
                {item.title}
            </Link>
            <div className='text-sm text-time mt-2'>
                <p>{item.date.substring(0, 10)}</p>
                <p>{item.date.substring(11, 19)}</p>
                <p>UTC{item.date.substring(23, 29)}</p>
            </div>
        </div>
    );
};

const Entries: React.FunctionComponent = () => {
    const saveFile = sessionStorage.getItem('saveFile');
    const [entries, setEntries] = useState<[string, SaveItem][]>([]);

    useEffect(() => {
        if (saveFile) {
            const parsedEntries: [string, SaveItem][] = Array.from(
                new Map(JSON.parse(saveFile))
            );
            setEntries(parsedEntries);
        }
    }, [saveFile]);

    return (
        <div data-theme='coffee'>
            <main className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6'>
                <Sidebar />
                <div className='entries overflow-y-scroll p-4'>
                    {entries.map((entry) => (
                        <EntryItem
                            item={entry[1]}
                            key={entry[0]}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Entries;
