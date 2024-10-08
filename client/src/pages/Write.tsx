/** @format */

import React, { useState } from 'react';
import Editor from '../shared/Editor';
import SaveItem from '../shared/Types';
import { DateTime } from 'luxon';
import Sidebar from '../shared/Sidebar';
import Footer from '../shared/Footer';

const Write: React.FunctionComponent = () => {
    const [content, setContent] = useState<string>('<p>Placeholder entry.</p>');
    const [title, setTitle] = useState<string>('');
    const saveFile = sessionStorage.getItem('saveFile');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTitle(e.target.value);
    };
    const logger = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        /*
            Saving entries is done with `Map` because it is more scalable than a simple array of objects.
            The title is used as the key for the sake of simplicity, as creating an id for every entry is unfeasible.
            The title and the date should not be changed after creation to prevent disorder.
        */
        if (saveFile) {
            const save = new Map(JSON.parse(saveFile));
            if (save.has(title)) {
                const currentItem: SaveItem = save.get(title) as SaveItem;
                save.set(title, { title, content, date: currentItem.date });
            } else {
                save.set(title, {
                    title,
                    content,
                    date: DateTime.now().toISO(),
                });
            }
            sessionStorage.setItem(
                'saveFile',
                JSON.stringify(Array.from(save.entries()))
            );
        } else {
            const date = DateTime.now().toISO();
            const save = new Map();
            save.set(title, { title, content, date });
            sessionStorage.setItem(
                'saveFile',
                JSON.stringify(Array.from(save.entries()))
            );
        }
        alert('Entry saved');
    };

    return (
        <div data-theme='coffee'>
            <main className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6'>
                <Sidebar />
                <div className='col-span-2 md:col-span-4 lg:col-span-5 flex h-screen flex-col p-4 gap-4'>
                    <form>
                        <label className='form-control'>
                            <div className='label'>
                                <span className='label-text text-info'>
                                    Entry title
                                </span>
                                <span className='label-text-alt text-info'>
                                    Title is case sensitive
                                </span>
                            </div>
                            <input
                                type='text'
                                value={title}
                                onChange={handleTitleChange}
                            />
                            <div className='label'>
                                <span className='label-text text-warning'>
                                    Warning: you cannot change the title once
                                    you've saved it.
                                </span>
                            </div>
                        </label>
                    </form>
                    <div className='overflow-y-scroll'>
                        <Editor
                            content={content}
                            setContent={setContent}
                        />
                    </div>
                    <button
                        onClick={logger}
                        className='btn btn-primary text-UI'
                    >
                        Log
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Write;
