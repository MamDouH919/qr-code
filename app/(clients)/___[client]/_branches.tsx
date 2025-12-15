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
    Stack
} from '@mui/material';
import {
    Phone,
    MapPin,
    MessageCircle,
    Search,
    Navigation,
    Copy,
    Check
} from 'lucide-react';

const branches = [
    {
        branchName: "شبين",
        phone: ["+201550141552"],
        location: "https://www.google.com/maps?q=30.311933517456055,31.313459396362305&z=17&hl=en",
        whatsApp: ["+201550141552"]
    },
    {
        branchName: "ابوزعبل",
        phone: ["+201022683220"],
        location: "https://www.google.com/maps?q=%D9%85%D8%B1%D9%83%D8%B2+%D8%B9%D8%B1%D8%A8+%D9%83%D9%84%D9%8A%D9%86%D9%83+Arab+Cinic+%D8%AF.%D8%A3%D8%AD%D9%85%D8%AF+%D9%86%D8%A7%D8%B5%D8%B1%D8%8C+%D8%A3%D8%A8%D9%88+%D8%B2%D8%B9%D8%A8%D9%84%D8%8C+%D8%A7%D9%84%D8%AE%D8%A7%D9%86%D9%83%D8%A9%D8%8C+%D8%A3%D8%A8%D9%88%D8%B2%D8%B9%D8%A8%D9%84,+Al-Qalyubia+Governorate&ftid=0x1458132c423f2e4d:0xd769a6a26e7837c4&entry=gps&lucs=,94207360,47071704,47069508,47084304,94206604&g_st=iw",
        whatsApp: ["+201022683220"]
    },
    {
        branchName: "العبور",
        phone: ["+201000380234"],
        location: "https://maps.app.goo.gl/6ZNzRUs7kyvXaDJe8?g_st=com.google.maps.preview.copy",
        whatsApp: ["+201000380234"]
    },
    {
        branchName: "ميت غمر",
        phone: ["+201060094332"],
        location: "https://www.google.com/maps/place/P7C4%2B255+Arab+clinic+-+%D8%A3%D8%B1%D8%A7%D8%A8+%D9%83%D9%84%D9%8A%D9%86%D9%83,+El-Gaish,+Madinet+Mit+Ghamr+(Include+Daqados),+Mit+Ghamr,+Dakahlia+Governorate+7511324%E2%80%AD/data=!4m2!3m1!1s0x14f7c14c5374a34f:0xee7c1acbd66cfd01?utm_source=mstt_1&entry=gps&lucs=,94206287,47075915&g_ep=CAESCjExLjExMi4xMDIYACDXggMqEiw5NDIwNjI4Nyw0NzA3NTkxNUICRUc%3D",
        whatsApp: ["+201060094332"]
    },
    {
        branchName: "السنطة",
        phone: ["+201009960086", "+201144239659"],
        location: "https://www.google.com/maps/place/30%C2%B043'30.6%22N+31%C2%B007'19.0%22E/@30.7251701,31.1193695,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.7251701!4d31.1219444?hl=en&entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D",
        whatsApp: ["+201009960086", "+201144239659"]
    }
];

export default function BranchLocations() {
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedPhone, setCopiedPhone] = useState(null);

    const filteredBranches = branches.filter(branch =>
        branch.branchName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCopyPhone = (phone) => {
        navigator.clipboard.writeText(phone);
        setCopiedPhone(phone);
        setTimeout(() => setCopiedPhone(null), 2000);
    };

    const handleCall = (phone) => {
        window.open(`tel:${phone}`, '_self');
    };

    const handleWhatsApp = (phone) => {
        window.open(`https://wa.me/${phone.replace(/\+/g, '')}`, '_blank');
    };

    const handleLocation = (location) => {
        window.open(location, '_blank');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                py: 4,
                direction: 'rtl'
            }}
        >
            <Container>
                {/* Branch Cards */}
                <Grid container spacing={3}>
                    {filteredBranches.map((branch, index) => (
                        <Grid size={{ xs: 12 }} key={index}>
                            <Fade in timeout={300 + index * 100}>
                                <Card
                                    sx={{
                                        borderRadius: 4,
                                    }}
                                >
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
                                                <MapPin size={24} color="#667eea" />
                                                {branch.branchName}
                                            </Typography>
                                            <Chip
                                                label="متاح الآن"
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
                                                أرقام الهاتف
                                            </Typography>
                                            <Stack spacing={1}>
                                                {branch.phone.map((phone, idx) => (
                                                    <Box
                                                        key={idx}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 1,
                                                            p: 1.5,
                                                            backgroundColor: '#f7fafc',
                                                            borderRadius: 2,
                                                            justifyContent: 'space-between'
                                                        }}
                                                    >
                                                        <Stack direction="row" spacing={1}>
                                                            <Phone size={18} color="#667eea" />
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    color: '#2d3748',
                                                                    direction: 'ltr',
                                                                    textAlign: 'right'
                                                                }}
                                                            >
                                                                {phone}
                                                            </Typography>
                                                        </Stack>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleCopyPhone(phone)}
                                                            sx={{
                                                                color: copiedPhone === phone ? '#48bb78' : '#667eea',
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                                                },
                                                            }}
                                                        >
                                                            {copiedPhone === phone ? <Check size={16} /> : <Copy size={16} />}
                                                        </IconButton>
                                                    </Box>
                                                ))}
                                            </Stack>
                                        </Box>

                                        {/* Action Buttons */}
                                        <Grid container spacing={1.5}>
                                            <Grid size={{ xs: 4 }}>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    onClick={() => handleCall(branch.phone[0])}
                                                    sx={{
                                                        backgroundColor: '#667eea',
                                                        borderRadius: 2,
                                                        py: 1.5,
                                                        textTransform: 'none',
                                                        fontWeight: 600,
                                                        '&:hover': {
                                                            backgroundColor: '#5568d3',
                                                        },
                                                    }}
                                                    endIcon={<Phone size={18} />}
                                                >
                                                    اتصال
                                                </Button>
                                            </Grid>
                                            <Grid size={{ xs: 4 }}>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    onClick={() => handleWhatsApp(branch.whatsApp[0])}
                                                    sx={{
                                                        backgroundColor: '#25D366',
                                                        borderRadius: 2,
                                                        py: 1.5,
                                                        textTransform: 'none',
                                                        fontWeight: 600,
                                                        '&:hover': {
                                                            backgroundColor: '#20BA5A',
                                                        },
                                                    }}
                                                    startIcon={<MessageCircle size={18} />}
                                                >
                                                    واتساب
                                                </Button>
                                            </Grid>
                                            <Grid size={{ xs: 4 }}>
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    onClick={() => handleLocation(branch.location)}
                                                    sx={{
                                                        borderColor: '#667eea',
                                                        color: '#667eea',
                                                        borderRadius: 2,
                                                        py: 1.5,
                                                        textTransform: 'none',
                                                        fontWeight: 600,
                                                        '&:hover': {
                                                            borderColor: '#5568d3',
                                                            backgroundColor: 'rgba(102, 126, 234, 0.04)',
                                                        },
                                                    }}
                                                    startIcon={<Navigation size={18} />}
                                                >
                                                    موقع
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>

                {/* Empty State */}
                {filteredBranches.length === 0 && (
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 8,
                            backgroundColor: 'white',
                            borderRadius: 4,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        }}
                    >
                        <Search size={64} color="#cbd5e0" />
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#718096',
                                mt: 2
                            }}
                        >
                            لم يتم العثور على فروع
                        </Typography>
                    </Box>
                )}
            </Container>
        </Box>
    );
}