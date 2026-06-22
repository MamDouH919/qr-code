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
    whatsAppGroup?: {
        title: string;
        link: string;
    }[]
    customNumbers?: {
        title: string;
        link: string;
    }[]
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
        "whatsappGroup": "مجموعة واتساب",
        "approvals": "موافقات",
        "clinics": "عيادات",
        "group1": "جروب التجميل والليزر",
        "group2": "الجروب العام",
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
        "whatsappGroup": "WhatsApp Group",
        "approvals": "Approvals",
        "clinics": "Clinics",
        "group1": "Beauty and Laser Group",
        "group2": "General Group",
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
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 4,
                            overflow: 'hidden',
                        },
                    },
                }}
            >
                <DialogTitle
                    id="alert-dialog-title"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontWeight: 700,
                        background: (theme) =>
                            `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        color: 'common.white',
                        py: 2,
                    }}
                >
                    {typeOfContact === 'mobile' ? <PhoneOutlined /> : <WhatsApp />}
                    {translationsData.contactUs}
                </DialogTitle>
                <DialogContent sx={{ pb: 1 }}>

                    <Stack spacing={1.25} pt={2.5}>
                        {numbers.map((number, idx) => (
                            <Link key={idx} href={typeOfContact === 'mobile' ? `tel:${number}` : `https://wa.me/${number.replace(/\+/g, '')}`} target="_blank">
                                <Button
                                    variant="outlined"
                                    color={typeOfContact === 'mobile' ? 'info' : 'success'}
                                    fullWidth
                                    size="large"
                                    endIcon={typeOfContact === 'mobile' ? <PhoneOutlined /> : <WhatsApp />}
                                    sx={{
                                        borderRadius: 3,
                                        py: 1.25,
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        borderWidth: 2,
                                        '&:hover': { borderWidth: 2 },
                                    }}
                                >
                                    {number.replace(splitCode, '')}
                                </Button>
                            </Link>
                        ))}
                    </Stack>

                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={handleClose} color="inherit" sx={{ borderRadius: 2 }}>
                        {translationsData.close}
                    </Button>
                </DialogActions>
            </Dialog>
            <Container>
                <Grid container spacing={3}>
                    {branches.map((branch, index) => (
                        <Grid size={{ xs: 12 }} key={index}>
                            <Fade in timeout={300 + index * 100}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        borderRadius: 4,
                                        overflow: 'hidden',
                                        position: 'relative',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            insetInlineStart: 0,
                                            top: 0,
                                            bottom: 0,
                                            width: 5,
                                            background: (theme) =>
                                                `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                        },
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 12px 28px rgba(0,0,0,0.10)',
                                        },
                                    }}
                                >
                                    <CardContent sx={{ p: 3 }}>
                                        {/* Branch Name */}
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                gap: 1,
                                                mb: 2.5
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
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: '50%',
                                                        bgcolor: (theme) => `${theme.palette.primary.main}1A`,
                                                        color: 'primary.main',
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <LocationOnOutlined fontSize='medium' />
                                                </Box>
                                                {isArabic ? branch.branchName.ar : branch.branchName.en}
                                            </Typography>
                                            <Chip
                                                icon={
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: '50%',
                                                            bgcolor: 'common.white',
                                                            ml: '8px !important',
                                                            animation: 'pulse 1.6s ease-in-out infinite',
                                                            '@keyframes pulse': {
                                                                '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                                                                '50%': { opacity: 0.4, transform: 'scale(0.7)' },
                                                            },
                                                        }}
                                                    />
                                                }
                                                label={translationsData.availableNow}
                                                size="small"
                                                sx={{
                                                    backgroundColor: '#48bb78',
                                                    color: 'white',
                                                    fontWeight: 600,
                                                    flexShrink: 0,
                                                    '& .MuiChip-label': { px: 1 },
                                                }}
                                            />
                                        </Box>

                                        <Divider sx={{ mb: 2 }} />

                                        {/* Phone Numbers */}
                                        <Box sx={{ mb: 2 }}>
                                            {!!branch.numbers.length && <Typography
                                                variant="subtitle2"
                                                sx={{

                                                    mb: 1,
                                                    fontWeight: 600
                                                }}
                                            >
                                                {translationsData.phoneNumbers}
                                            </Typography>}
                                            <Stack spacing={1}>
                                                <List sx={{ py: 0 }}>
                                                    {branch.numbers.map((phone, idx) => (
                                                        <ListItem key={idx}
                                                            sx={{
                                                                px: 1.5,
                                                                py: 0.75,
                                                                mb: 1,
                                                                borderRadius: 2.5,
                                                                bgcolor: 'action.hover',
                                                                transition: 'background-color 0.2s ease',
                                                                '&:last-of-type': { mb: 0 },
                                                                '&:hover': {
                                                                    bgcolor: (theme) => `${theme.palette.primary.main}14`,
                                                                },
                                                            }}
                                                            secondaryAction={
                                                                <IconButton
                                                                    edge="end"
                                                                    aria-label="copy"
                                                                    size="small"
                                                                    onClick={() => handleCopyPhone(phone.number)}
                                                                    sx={{
                                                                        color: copiedPhone === phone.number ? 'success.main' : 'text.secondary',
                                                                    }}
                                                                >
                                                                    {copiedPhone === phone.number ? <Done fontSize="small" /> : <CopyAll fontSize="small" />}
                                                                </IconButton>
                                                            }
                                                        >
                                                            <ListItemIcon
                                                                sx={{
                                                                    color: (theme) => theme.palette.primary.main,
                                                                    minWidth: 32,
                                                                }}
                                                            >
                                                                <PhoneOutlined fontSize="small" />
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={phone.number.replace(splitCode, '')}
                                                                slotProps={{
                                                                    primary: {
                                                                        sx: { fontWeight: 600, letterSpacing: '0.02em' },
                                                                    },
                                                                }}
                                                            />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Stack>
                                        </Box>

                                        {/* Action Buttons */}
                                        <Grid
                                            container
                                            spacing={1.5}
                                            sx={{
                                                '& .MuiButton-root': {
                                                    borderRadius: 3,
                                                    py: 1,
                                                    fontWeight: 600,
                                                    textTransform: 'none',
                                                    boxShadow: 'none',
                                                    '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
                                                },
                                            }}
                                        >
                                            {branch.numbers.some((number) => number.type.includes('mobile')) &&
                                                <Grid size={{ xs: branch.numbers.some((number) => number.type.includes('whatsApp')) ? 6 : 12 }}>
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
                                                </Grid>}
                                            {branch.numbers.some((number) => number.type.includes('whatsApp')) &&
                                                <Grid size={{ xs: branch.numbers.some((number) => number.type.includes('mobile')) ? 6 : 12 }}>
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
                                                </Grid>}
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
                                            {branch.whatsAppGroup?.map((group, gIdx) => (
                                                <Grid size={{ xs: 12 }} key={gIdx}>
                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        color='success'
                                                        component="a"
                                                        href={group.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        startIcon={<WhatsApp />}
                                                    >
                                                        {translationsData[group.title as keyof typeof translationsData]}
                                                    </Button>
                                                </Grid>
                                            ))}
                                            {branch.customNumbers?.map((number, gIdx) => (
                                                <Grid size={{ xs: 12 }} key={gIdx}>
                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        color='info'
                                                        component="a"
                                                        href={number.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        startIcon={<Phone />}
                                                    >
                                                        {translationsData[number.title as keyof typeof translationsData]}
                                                    </Button>
                                                </Grid>
                                            ))}
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