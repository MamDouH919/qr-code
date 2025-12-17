import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Container,
    Typography,
    IconButton,
    Chip,
    Grid,
    TextField,
    InputAdornment,
    Fade,
    Divider,
    Button,
    Stack,
    Paper,
    useTheme,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import {
    MapPin,
    MessageCircle,
    Search,
    Navigation,
    Check
} from 'lucide-react';
import { CopyAll, Done, LocationOnOutlined, Phone, PhoneOutlined, Remove, WhatsApp } from '@mui/icons-material';
import Link from 'next/link';


type BranchNumber = {
    number: string;
    type: string[];
}

type Branch = {
    branchName: {
        ar: string;
        en: string;
    };
    numbers: BranchNumber[];
    location?: string;
}

const translations = {
    ar: {
        "close": "إغلاق",
        "call": "اتصال",
        "whatsapp": "واتساب",
        "location": "موقع",
        "copy": "نسخ",
        "copied": "تم النسخ",
        "availableNow": "متاح الآن",
        "contactUs": "تواصل معنا",
        "phoneNumbers": "أرقام الهاتف",
    },
    en: {
        "close": "Close",
        "call": "Call",
        "whatsapp": "WhatsApp",
        "location": "Location",
        "copy": "Copy",
        "copied": "Copied",
        "availableNow": "Available Now",
        "contactUs": "Contact Us",
        "phoneNumbers": "Phone Numbers",
    }
}

export default function BranchLocations({
    branches,
    splitCode,
}: {
    branches: Branch[],
    splitCode: string,
}) {
    const theme = useTheme();
    const isArabic = theme.direction === 'rtl';
    const translationsData = theme.direction === 'rtl' ? translations.ar : translations.en;
    const [open, setOpen] = useState(false);
    const [numbers, setNumbers] = useState<string[]>([]);
    const [typeOfContact, setTypeOfContact] = useState<string>('mobile');
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

    const handleCopyPhone = (phone: string) => {
        navigator.clipboard.writeText(phone);
        setCopiedPhone(phone);
        setTimeout(() => setCopiedPhone(null), 2000);
    };

    const handleLocation = (location: string) => {
        window.open(location, '_blank');
    };

    return (
        <Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {translationsData.contactUs}
                </DialogTitle>
                <DialogContent>

                    <Stack spacing={1} pt={2}>
                        {numbers.map((number, idx) => (
                            <Link key={idx} href={typeOfContact === 'mobile' ? `tel:${number}` : `https://wa.me/${number.replace(/\+/g, '')}`} target="_blank">
                                <Button
                                    variant="outlined"
                                    color='primary'
                                    fullWidth
                                    endIcon={typeOfContact === 'mobile' ? <PhoneOutlined /> : <WhatsApp />}
                                >
                                    {number.replace(splitCode, '')}
                                </Button>
                            </Link>
                        ))}
                    </Stack>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        {translationsData.close}
                    </Button>
                </DialogActions>
            </Dialog>
            <Container>
                <Grid container spacing={3}>
                    {branches.map((branch, index) => (
                        <Grid size={{ xs: 12 }} key={index}>
                            <Fade in timeout={300 + index * 100}>
                                <Paper>
                                    <CardContent sx={{ p: 3 }}>
                                        {/* Branch Name */}
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                mb: 3
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    fontWeight: 700,

                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1
                                                }}
                                            >
                                                <LocationOnOutlined fontSize='medium' color='primary' />
                                                {isArabic ? branch.branchName.ar : branch.branchName.en}
                                            </Typography>
                                            <Chip
                                                label={translationsData.availableNow}
                                                size="small"
                                                sx={{
                                                    backgroundColor: '#48bb78',
                                                    color: 'white',
                                                    fontWeight: 600
                                                }}
                                            />
                                        </Box>

                                        <Divider sx={{ mb: 2 }} />

                                        {/* Phone Numbers */}
                                        <Box sx={{ mb: 2 }}>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{

                                                    mb: 1,
                                                    fontWeight: 600
                                                }}
                                            >
                                                {translationsData.phoneNumbers}
                                            </Typography>
                                            <Stack spacing={1}>
                                                <List>
                                                    {branch.numbers.map((phone, idx) => (
                                                        <ListItem key={idx}
                                                            sx={{
                                                                p: 0,
                                                                py: 1,
                                                            }}
                                                            secondaryAction={
                                                                <IconButton
                                                                    edge="end"
                                                                    aria-label="delete"
                                                                    onClick={() => handleCopyPhone(phone.number)}
                                                                >
                                                                    {copiedPhone === phone.number ? <Done /> : <CopyAll />}
                                                                </IconButton>
                                                            }
                                                        >
                                                            <ListItemIcon
                                                                sx={{
                                                                    color: (theme) => theme.palette.primary.main,
                                                                    minWidth: 25,
                                                                }}
                                                            >
                                                                <Remove />
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={phone.number.replace(splitCode, '')}
                                                            />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Stack>
                                        </Box>

                                        {/* Action Buttons */}
                                        <Grid container spacing={1.5}>
                                            <Grid size={{ xs: 6 }}>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    color='info'
                                                    onClick={() => {
                                                        handleOpen();
                                                        setTypeOfContact('mobile');
                                                        setNumbers(branch.numbers.filter((number) => number.type.includes('mobile')).map((number) => number.number));
                                                    }}
                                                    startIcon={<PhoneOutlined />}
                                                >
                                                    {translationsData.call}
                                                </Button>
                                            </Grid>
                                            <Grid size={{ xs: 6 }}>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    color='success'
                                                    onClick={() => {
                                                        handleOpen();
                                                        setTypeOfContact('whatsApp');
                                                        setNumbers(branch.numbers.filter((number) => number.type.includes('whatsApp')).map((number) => number.number));
                                                    }}
                                                    startIcon={<WhatsApp />}
                                                >
                                                    {translationsData.whatsapp}
                                                </Button>
                                            </Grid>
                                            {branch.location &&
                                                <Grid size={{ xs: 12 }}>
                                                    <Button
                                                        fullWidth
                                                        variant="outlined"
                                                        onClick={() => handleLocation(branch?.location ?? "")}
                                                        color='primary'
                                                        startIcon={<Navigation size={18} />}
                                                    >
                                                        {translationsData.location}
                                                    </Button>
                                                </Grid>
                                            }
                                        </Grid>
                                    </CardContent>
                                </Paper>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}