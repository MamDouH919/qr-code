import { PersonAdd } from '@mui/icons-material';
import { Button, Stack, useTheme } from '@mui/material';
import React, { useState } from 'react';

const translations = {
    en: {
        addToYourContacts: "Add to your contacts",
    },
    ar: {
        addToYourContacts: "أضف إلى جهات الاتصال الخاصة بك",
    },
}

async function imageUrlToBase64(url: string) {
    const res = await fetch(url);
    const blob = await res.blob();

    return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve((reader.result as string).split(',')[1]);
        };
        reader.readAsDataURL(blob);
    });
}

const SaveContact = ({
    name,
    phoneNumbers,
    links,
    photoUrl = "",
    role,
}: {
    name: string;
    phoneNumbers: string[];
    links: string[];
    photoUrl: string;
    role: string;
}) => {
    const theme = useTheme();
    const language = theme.direction === 'rtl' ? 'ar' : 'en';


    // const handleSaveContact = async () => {
    //     const base64Image = await imageUrlToBase64(photoUrl);
    //     const vcard = `BEGIN:VCARD
    //         VERSION:4.0
    //         FN:${name}
    //         ROLE:${role}
    //         TITLE:${role}

    //         ${phoneNumbers.map((phoneNumber) => `TEL;TYPE=CELL:${phoneNumber}`).join('\n')}
    //         ${links.map((link) => `URL:${link}`).join('\n')}
    //         PHOTO;ENCODING=b;TYPE=JPEG:${base64Image}
    //         END:VCARD`;
    //     const blob = new Blob([vcard], { type: 'text/vcard' });
    //     const url = URL.createObjectURL(blob);

    //     // Create a temporary link element to trigger the download
    //     const newLink = document.createElement('a');
    //     newLink.download = `${name}.vcf`;
    //     newLink.href = url;
    //     newLink.click();

    //     // Clean up the URL object after use
    //     URL.revokeObjectURL(url);
    // };

    const handleSaveContact = async () => {
        const isAndroid = /Android/i.test(navigator.userAgent);

        let photoLine = "";

        // Only iOS safely supports PHOTO in vCard from browser
        if (!isAndroid && photoUrl) {
            try {
                const base64Image = await imageUrlToBase64(photoUrl);
                photoLine = `PHOTO;ENCODING=b;TYPE=JPEG:${base64Image}`;
            } catch {
                // silently ignore image errors
            }
        }

        const vcardLines = [
            "BEGIN:VCARD",
            isAndroid ? "VERSION:3.0" : "VERSION:4.0",
            `N:${name};;;;`,
            `FN:${name}`,
            role ? `TITLE:${role}` : "",
            role ? `ROLE:${role}` : "",

            ...phoneNumbers.map(
                (phone) => `TEL;TYPE=CELL,VOICE:${phone}`
            ),

            ...links.map((link) => `URL:${link}`),

            photoLine,
            "END:VCARD",
        ].filter(Boolean);

        // IMPORTANT: Android requires CRLF
        const vcard = vcardLines.join("\r\n");

        const blob = new Blob([vcard], {
            type: "text/vcard;charset=utf-8",
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${name}.vcf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    };


    return (
        <Stack direction="row" spacing={1} justifyContent={"center"}>
            <Button
                onClick={handleSaveContact}
                variant="contained"
                color="primary"
                startIcon={<PersonAdd />}
            >
                {translations[language].addToYourContacts}
            </Button>
        </Stack>
    );
};

export default SaveContact;
