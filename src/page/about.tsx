import React, { useEffect, useState } from 'react';
import { about } from '../api/homeApi';

export default function Recipe() {

    const [aboutText, setAboutText] = useState<string>();
    useEffect(() => {
        async function getAboutText() {
            const result = await about();
            if (result && result.data) {
                setAboutText(result.data);
            }
        }
        getAboutText();
    }, [setAboutText]);

    return (
        <>
            <h5>{aboutText}</h5>
        </>
    );
}