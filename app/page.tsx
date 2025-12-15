"use client"
import React, { useMemo } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    TextField,
    Grid,
    Chip,
    Rating,
    Paper,
    ThemeProvider,
    useTheme,
    CssBaseline,
    Avatar,
} from '@mui/material';
import {
    QrCode2,
    Smartphone,
    People,
    Bolt,
    CheckCircle,
    ArrowForward,
    Security,
    Schedule,
    BarChart,
    Language,
    Palette,
    Download,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/lib/create-emotion-cache';
import getTheme from '@/lib/theme';
import Image from 'next/image';
import CustomerImagesSection from '@/components/Customers';



export const HeroSection = styled(Box)(({ theme }) => ({
    background: `linear-gradient(
    135deg,
    ${theme.palette.primary.main}15 0%,
    ${theme.palette.secondary.main}10 100%
  )`,
    padding: '80px 0',
}));

export const FeatureIcon = styled(Box)(({ theme }) => ({
    width: 64,
    height: 64,
    background: `${theme.palette.primary.main}15`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
}));

export const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    border: '2px solid transparent',
    transition: 'all 0.3s ease',

    '&:hover': {
        borderColor: `${theme.palette.primary.main}33`,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    },
}));

interface PricingCardProps {
    featured?: boolean;
}

export const PricingCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'featured',
})<PricingCardProps>(({ theme, featured }) => ({
    height: '100%',
    position: 'relative',
    border: `2px solid ${featured ? theme.palette.primary.main : 'transparent'
        }`,
    transition: 'all 0.3s ease',
    overflow: 'visible',
    '&:hover': {
        borderColor: `${theme.palette.primary.main}33`,
    },
}));

export const PopularBadge = styled(Chip)(({ theme }) => ({
    position: 'absolute',
    top: -16,
    left: '50%',
    transform: 'translateX(-50%)',
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
}));
export const ImagePlaceholder = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    background: `linear-gradient(
    135deg,
    ${theme.palette.primary.main}15 0%,
    ${theme.palette.secondary.main}10 100%
  )`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const Footer = styled(Box)(({ theme }) => ({
    background: theme.palette.primary.main,
    padding: '48px 0',
}));


export default function QRGeneratorLanding() {
    const cache = useMemo(() => createEmotionCache(false), []);
    const theme = useMemo(() => getTheme({
        backgroundDefault: "#000",
        backgroundPaper: "#1b1a1a",
        primaryColor: "#4f4e4e",
        secondaryColor: "#4f4e4e",
        dir: "ltr"
    }), []);

    return (
        <CacheProvider value={cache}>
            <ThemeProvider
                theme={theme}
            >
                <CssBaseline />
                <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
                    {/* Hero Section */}
                    <HeroSection>
                        <Container maxWidth="lg">
                            <Box sx={{ textAlign: 'center', mb: 8 }}>
                                <Chip
                                    icon={<Bolt />}
                                    label="Professional QR Solutions"
                                    color='primary'
                                // sx={{ mb: 3, bgcolor: `${theme.primary}15`, color: theme.primary }}
                                />

                                <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                                    Custom QR Codes for Your
                                    <Typography component="span" color="primary" variant="h2" fontWeight="bold">
                                        {' '}Digital Presence
                                    </Typography>
                                </Typography>

                                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
                                    Create personalized client pages and generate custom QR codes that showcase your business details, social media, and contact information. Perfect for business cards, restaurants, and shops.
                                </Typography>

                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 4 }}>
                                    <Button variant="contained" size="large" endIcon={<ArrowForward />}>
                                        Get Your QR Now
                                    </Button>
                                    <Button variant="outlined" size="large">
                                        View Examples
                                    </Button>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
                                    {['No Setup Required', 'Mobile Optimized', 'Instant Generation'].map((text) => (
                                        <Box key={text} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <CheckCircle sx={{ fontSize: 20 }} color='primary' />
                                            <Typography variant="body2" color="text.secondary">{text}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Container>
                    </HeroSection>

                    {/* How It Works */}
                    <Container maxWidth="lg" sx={{ py: 10 }}>
                        <Box sx={{ textAlign: 'center', mb: 8 }}>
                            <Typography variant="h3" gutterBottom fontWeight="bold">How It Works</Typography>
                            <Typography variant="h6" color="text.secondary">
                                Get your custom QR code in three simple steps
                            </Typography>
                        </Box>

                        <Grid container spacing={4}>
                            {[
                                { icon: <People />, title: '1. Share Your Details', desc: 'Provide your business information, contact details, social media links, and any images you want to include on your personalized page.' },
                                { icon: <Smartphone />, title: '2. We Create Your Page', desc: 'Our system automatically generates a beautiful, mobile-friendly page with all your information perfectly organized and optimized.' },
                                { icon: <QrCode2 />, title: '3. Get Your QR Code', desc: 'Receive your custom QR code that links directly to your page. Use it on business cards, flyers, or anywhere you want to share your information.' },
                            ].map((step) => (
                                <Grid size={{ xs: 12, md: 4 }} key={step.title}>
                                    <StyledCard>
                                        <CardContent sx={{ textAlign: 'center', p: 4 }}>
                                            <FeatureIcon>{React.cloneElement(step.icon, { sx: { fontSize: 32 } })}</FeatureIcon>
                                            <Typography variant="h6" gutterBottom fontWeight="bold">{step.title}</Typography>
                                            <Typography color="text.secondary">{step.desc}</Typography>
                                        </CardContent>
                                    </StyledCard>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>

                    {/* Examples Gallery */}
                    <Container maxWidth="lg" sx={{ py: 10 }}>
                        <Box sx={{ textAlign: 'center', mb: 8 }}>
                            <Typography variant="h3" gutterBottom fontWeight="bold">QR Code Examples</Typography>
                            <Typography variant="h6" color="text.secondary">
                                See how our custom QR codes look in real-world applications
                            </Typography>
                        </Box>

                        <Grid container spacing={4}>
                            {[
                                {
                                    title: 'Restaurant Business Card',
                                    desc: 'Elegant design featuring menu access, social media links, and contact information',
                                    image: 'elegant-business-card-with-qr-code-for-restaurant.jpg'
                                },
                                {
                                    title: 'Retail Store Display',
                                    desc: 'Table tent showcasing product information, online store, and customer reviews',
                                    image: 'modern-retail-store-table-tent-with-qr-code-displa.jpg'
                                },
                                {
                                    title: 'Event Networking',
                                    desc: 'Conference badge design with instant contact sharing and LinkedIn integration',
                                    image: 'professional-networking-event-badge-with-qr-code.jpg'
                                },
                            ].map((example) => (
                                <Grid size={{ xs: 12, md: 4 }} key={example.title}>
                                    <StyledCard>
                                        <Box sx={{ position: 'relative', aspectRatio: '1/1', width: '100%' }}>
                                            <Image
                                                src={example.image}
                                                alt={example.title}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </Box>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                                {example.title}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                {example.desc}
                                            </Typography>
                                        </CardContent>
                                    </StyledCard>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>

                    {/* Industries */}
                    <Box sx={{ py: 10 }}>
                        <Container maxWidth="lg">
                            <Box sx={{ textAlign: 'center', mb: 8 }}>
                                <Typography variant="h3" gutterBottom fontWeight="bold">Industries We Serve</Typography>
                                <Typography variant="h6" color="text.secondary">
                                    Trusted by businesses across various industries for their digital presence needs
                                </Typography>
                            </Box>

                            <Grid container spacing={3}>
                                {[
                                    { title: 'Restaurants', desc: 'Digital menus, social media, and contact info', src: "/modern-restaurant-interior-with-customers-scanning.jpg" },
                                    { title: 'Retail', desc: 'Product info, online stores, and promotions', src: "/retail-clothing-store-with-qr-code-displays-and-sh.jpg" },
                                    { title: 'Healthcare', desc: 'Patient forms, contact info, and services', src: "/professional-healthcare-clinic-waiting-room-with-q.jpg" },
                                    { title: 'Real Estate', desc: 'Property details, virtual tours, and contact', src: "/modern-real-estate-office-with-qr-codes-for-proper.jpg" },
                                ].map((industry) => (
                                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={industry.title}>
                                        <StyledCard>
                                            <Box sx={{ position: 'relative', aspectRatio: '16/9', width: '100%' }}>
                                                <Image
                                                    src={industry.src}
                                                    alt={industry.title}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                    sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 25vw"
                                                />
                                            </Box>
                                            <CardContent sx={{ textAlign: 'center' }}>
                                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                                    {industry.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {industry.desc}
                                                </Typography>
                                            </CardContent>
                                        </StyledCard>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </Box>

                    {/* Benefits */}
                    <Container maxWidth="lg" sx={{ py: 10 }}>
                        <Box sx={{ textAlign: 'center', mb: 8 }}>
                            <Typography variant="h3" gutterBottom fontWeight="bold">
                                Why Choose Our QR Codes?
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Advanced features that set us apart from the competition
                            </Typography>
                        </Box>

                        <Grid container spacing={6} alignItems="center">
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    {[
                                        { icon: <CheckCircle />, title: 'Mobile-First Design', desc: 'Every page is optimized for mobile devices, ensuring your customers have a perfect experience on any screen size.' },
                                        { icon: <Bolt />, title: 'Lightning Fast', desc: 'Our pages load instantly, keeping your customers engaged and reducing bounce rates significantly.' },
                                        { icon: <People />, title: 'Analytics Included', desc: 'Track scans, visitor behavior, and engagement metrics to understand your audience better.' },
                                    ].map((benefit) => (
                                        <Box key={benefit.title} sx={{ display: 'flex', gap: 2 }}>
                                            <Box sx={{ width: 48, height: 48, bgcolor: (theme) => `${theme.palette.primary.main}15`, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <Avatar>
                                                    {React.cloneElement(benefit.icon, { sx: { color: "#000" } })}
                                                </Avatar>
                                            </Box>
                                            <Box>
                                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                                    {benefit.title}
                                                </Typography>
                                                <Typography color="text.secondary">
                                                    {benefit.desc}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box sx={{ position: 'relative', aspectRatio: '1/1', borderRadius: 4, overflow: 'hidden' }}>
                                    <Image
                                        src="/smartphone-displaying-beautiful-qr-code-landing-pa.jpg"
                                        alt="QR Code features on mobile device"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        sizes="(max-width: 960px) 100vw, 50vw"
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>

                    {/* Pricing */}
                    <Container maxWidth="lg" sx={{ py: 10 }}>
                        <Box sx={{ textAlign: 'center', mb: 8 }}>
                            <Typography variant="h3" gutterBottom fontWeight="bold">Simple, Transparent Pricing</Typography>
                            <Typography variant="h6" color="text.secondary">
                                Choose the perfect plan for your needs. No hidden fees, no surprises.
                            </Typography>
                        </Box>

                        <Grid container spacing={4} sx={{ maxWidth: 1200, mx: 'auto' }}>
                            {[
                                { title: 'Basic', price: '$19', desc: 'Perfect for individuals', features: ['1 Custom QR Code', 'Mobile-Optimized Page', 'Basic Analytics', 'Email Support'], featured: false },
                                { title: 'Professional', price: '$39', desc: 'Best for businesses', features: ['5 Custom QR Codes', 'Advanced Analytics', 'Custom Branding', 'Priority Support', 'Social Media Integration'], featured: true },
                                { title: 'Enterprise', price: '$99', desc: 'For large organizations', features: ['Unlimited QR Codes', 'White-Label Solution', 'API Access', 'Dedicated Support', 'Custom Integrations'], featured: false },
                            ].map((plan) => (
                                <Grid size={{ xs: 12, md: 4 }} key={plan.title}>
                                    <PricingCard featured={plan.featured}>
                                        {plan.featured && <PopularBadge label="Most Popular" />}
                                        <CardContent sx={{ textAlign: 'center', p: 4 }}>
                                            <Typography variant="h5" gutterBottom fontWeight="bold">{plan.title}</Typography>
                                            <Typography variant="h3" fontWeight="bold" sx={{ my: 2 }}>{plan.price}</Typography>
                                            <Typography color="text.secondary" gutterBottom>{plan.desc}</Typography>

                                            <Box sx={{ my: 3 }}>
                                                {plan.features.map((feature) => (
                                                    <Box key={feature} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                                        <CheckCircle sx={{ fontSize: 20 }} color='primary' />
                                                        <Typography variant="body2">{feature}</Typography>
                                                    </Box>
                                                ))}
                                            </Box>

                                            <Button variant="contained" fullWidth size="large">
                                                {plan.title === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                                            </Button>
                                        </CardContent>
                                    </PricingCard>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>

                    {/* Advanced Features */}
                    <Box sx={{ bgcolor: (theme) => theme.palette.background.default, py: 10 }}>
                        <Container maxWidth="lg">
                            <Box sx={{ textAlign: 'center', mb: 8 }}>
                                <Typography variant="h3" gutterBottom fontWeight="bold">Advanced Features</Typography>
                                <Typography variant="h6" color="text.secondary">
                                    Powerful tools to maximize your QR code effectiveness
                                </Typography>
                            </Box>

                            <Grid container spacing={4}>
                                {[
                                    { icon: <BarChart />, title: 'Real-Time Analytics', desc: 'Track scans, locations, devices, and user behavior with detailed analytics dashboards and reports.' },
                                    { icon: <Palette />, title: 'Custom Design', desc: 'Personalize your QR codes with custom colors, logos, and branding to match your business identity.' },
                                    { icon: <Security />, title: 'Security & Privacy', desc: 'Enterprise-grade security with SSL encryption, password protection, and privacy-compliant analytics.' },
                                    { icon: <Language />, title: 'Multi-Language Support', desc: 'Create pages in multiple languages to reach global audiences and provide localized experiences.' },
                                    { icon: <Download />, title: 'Bulk Export', desc: 'Download QR codes in various formats (PNG, SVG, PDF) and sizes for print and digital use.' },
                                    { icon: <Schedule />, title: 'Dynamic Updates', desc: 'Update your page content anytime without changing the QR code. Perfect for menus and promotions.' },
                                ].map((feature) => (
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={feature.title}>
                                        <StyledCard>
                                            <CardContent sx={{ textAlign: 'center', p: 4 }}>
                                                <FeatureIcon>{React.cloneElement(feature.icon, { sx: { fontSize: 32, color: (theme: any) => "#fff" } })}</FeatureIcon>
                                                <Typography variant="h6" gutterBottom fontWeight="bold">{feature.title}</Typography>
                                                <Typography color="text.secondary">{feature.desc}</Typography>
                                            </CardContent>
                                        </StyledCard>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </Box>

                    <CustomerImagesSection />

                    {/* Testimonials */}
                    {/* <Container maxWidth="lg" sx={{ py: 10 }}>
                        <Box sx={{ textAlign: 'center', mb: 8 }}>
                            <Typography variant="h3" gutterBottom fontWeight="bold">What Our Clients Say</Typography>
                            <Typography variant="h6" color="text.secondary">Join thousands of satisfied customers</Typography>
                        </Box>

                        <Grid container spacing={4}>
                            {[
                                { name: 'Sarah Chen', role: 'Owner, Bella Vista Restaurant', text: 'This QR code solution transformed how we share our restaurant information. Customers love the instant access to our menu and social media!' },
                                { name: 'Michael Rodriguez', role: 'Marketing Director, TechFlow', text: 'Perfect for networking events. Instead of fumbling with business cards, I just show my QR code and people have all my information instantly.' },
                                { name: 'Emma Thompson', role: 'Boutique Owner, Style & Grace', text: 'The setup was incredibly easy and the results look so professional. Our customers frequently compliment our modern approach to sharing information.' },
                            ].map((testimonial) => (
                                <Grid size={{ xs: 12, md: 4 }} key={testimonial.name}>
                                    <StyledCard>
                                        <CardContent sx={{ p: 3 }}>
                                            <Rating value={5} readOnly sx={{ mb: 2 }} />
                                            <Typography color="text.secondary" paragraph>"{testimonial.text}"</Typography>
                                            <Typography variant="subtitle1" fontWeight="bold">{testimonial.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">{testimonial.role}</Typography>
                                        </CardContent>
                                    </StyledCard>
                                </Grid>
                            ))}
                        </Grid>
                    </Container> */}

                    {/* Contact Form */}
                    {/* <Box sx={{ py: 10 }}>
                        <Container maxWidth="md">
                            <Box sx={{ textAlign: 'center', mb: 6 }}>
                                <Typography variant="h3" gutterBottom fontWeight="bold">Get Started Today</Typography>
                                <Typography variant="h6" color="text.secondary">
                                    Fill out the form below and we'll create your custom QR code within 24 hours
                                </Typography>
                            </Box>

                            <Paper elevation={0} sx={{ p: 4, border: '2px solid', borderColor: 'divider' }}>
                                <Typography variant="h5" align="center" gutterBottom fontWeight="bold">Order Your Custom QR Code</Typography>
                                <Typography align="center" color="text.secondary" paragraph>
                                    Provide your information and we'll handle the rest
                                </Typography>

                                <Box sx={{ mt: 4 }}>
                                    <Grid container spacing={3}>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <TextField fullWidth label="Full Name" required />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <TextField fullWidth label="Business/Organization Name" />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <TextField fullWidth label="Email Address" type="email" required />
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <TextField fullWidth label="Phone Number" required />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <TextField fullWidth label="Address" />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <TextField fullWidth label="Social Media Links" multiline rows={3} placeholder="Instagram: @yourhandle&#10;Facebook: facebook.com/yourpage" />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <TextField fullWidth label="Additional Information" multiline rows={3} placeholder="Any special requests, preferred colors, or additional details..." />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <Button variant="contained" fullWidth size="large" endIcon={<ArrowForward />}>
                                                Create My QR Code - $29
                                            </Button>
                                        </Grid>
                                    </Grid>

                                    <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mt: 2 }}>
                                        * Required fields. Your QR code will be delivered within 24 hours via email.
                                    </Typography>
                                </Box>
                            </Paper>
                        </Container>
                    </Box> */}

                    {/* Footer */}
                    <Footer>
                        <Container maxWidth="lg">
                            <Grid container spacing={4}>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <QrCode2 sx={{ fontSize: 32 }} />
                                        <Typography variant="h6" fontWeight="bold">QR Pro</Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        Professional QR code solutions for modern businesses and individuals.
                                    </Typography>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                                    <Typography variant="h6" gutterBottom fontWeight="bold">Services</Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, opacity: 0.8 }}>
                                        <Typography variant="body2">Custom QR Codes</Typography>
                                        <Typography variant="body2">Digital Business Cards</Typography>
                                        <Typography variant="body2">Restaurant Menus</Typography>
                                        <Typography variant="body2">Event Networking</Typography>
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                                    <Typography variant="h6" gutterBottom fontWeight="bold">Support</Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, opacity: 0.8 }}>
                                        <Typography variant="body2">Help Center</Typography>
                                        <Typography variant="body2">Contact Us</Typography>
                                        <Typography variant="body2">Privacy Policy</Typography>
                                        <Typography variant="body2">Terms of Service</Typography>
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                                    <Typography variant="h6" gutterBottom fontWeight="bold">Contact</Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, opacity: 0.8 }}>
                                        <Typography variant="body2">hello@qrpro.com</Typography>
                                        <Typography variant="body2">+1 (555) 123-4567</Typography>
                                        <Typography variant="body2">Available 9 AM - 6 PM EST</Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', mt: 6, pt: 4, textAlign: 'center', opacity: 0.6 }}>
                                <Typography variant="body2">
                                    © 2024 QR Pro. All rights reserved. Built with modern web technologies for optimal performance.
                                </Typography>
                            </Box>
                        </Container>
                    </Footer>
                </Box>
            </ThemeProvider>
        </CacheProvider>
    );
}