/** @format */

import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// eslint-disable-next-line react-refresh/only-export-components
const Write = lazy(() => import('./pages/Write'));
// eslint-disable-next-line react-refresh/only-export-components
const Entries = lazy(() => import('./pages/Entries'));
// eslint-disable-next-line react-refresh/only-export-components
const Entry = lazy(() => import('./pages/Entry'));

const router = createBrowserRouter([
    { path: '/write', element: <Write /> },
    { path: '/entries', element: <Entries /> },
    { path: '/entries/:documentTitle', element: <Entry /> },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
        </Suspense>
    </StrictMode>
);
