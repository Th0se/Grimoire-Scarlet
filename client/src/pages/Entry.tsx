/** @format */

import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import SaveItem from '../shared/Types';

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

    return <div dangerouslySetInnerHTML={{ __html: entry.content }}></div>;
};

export default Entry;
