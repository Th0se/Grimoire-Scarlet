/** @format */

import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Add css for snow theme

const Editor: React.FunctionComponent<{
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}> = ({ content, setContent }) => {
    const { quill, quillRef } = useQuill();

    useEffect(() => {
        if (quill) {
            // Set initial value
            quill.clipboard.dangerouslyPasteHTML(content);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (quill && content) {
            // Update `content` state with the new content whenever the editor content changes.
            quill.on('text-change', () => {
                setContent(quill.root.innerHTML);
            });
        }
    }, [content, quill, setContent]);

    return (
        <div className='h-screen'>
            <div ref={quillRef} />
        </div>
    );
};

export default Editor;
