import React, { useEffect, useState } from 'react';
import { home } from '../api/homeApi';

export default function Home() {

    const [homeText, setHomeText] = useState<string>();
    useEffect(() => {
        async function getHomeText() {
            const result = await home();
            if (result && result.data) {
                setHomeText(result.data);
            }
        }
        getHomeText();
    }, [setHomeText]);

    return (
        <>
            <h5>{homeText}</h5>
        </>
    );
}