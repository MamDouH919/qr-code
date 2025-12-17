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


    const handleSaveContact = async () => {
        const base64Image = await imageUrlToBase64(photoUrl);
        const vcard = `BEGIN:VCARD
VERSION:4.0
FN:${name}
ROLE:${role}
TITLE:${role}

${phoneNumbers.map((phoneNumber) => `TEL;TYPE=CELL:${phoneNumber}`).join('\n')}
${links.map((link) => `URL:${link}`).join('\n')}
PHOTO;ENCODING=b;TYPE=JPEG:${base64Image}
END:VCARD`;
        const blob = new Blob([vcard], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);

        // Create a temporary link element to trigger the download
        const newLink = document.createElement('a');
        newLink.download = `${name}.vcf`;
        newLink.href = url;
        newLink.click();

        // Clean up the URL object after use
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
