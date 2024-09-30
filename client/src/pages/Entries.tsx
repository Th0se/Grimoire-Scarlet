/** @format */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SaveItem from '../shared/Types';

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
        <div>
            {entries.map((entry) => (
                <div key={entry[1].title}>
                    <Link to={'/entries/' + entry[1].title}>
                        {entry[1].title}
                    </Link>
                    <p>{entry[1].date}</p>
                </div>
            ))}
        </div>
    );
};

export default Entries;
