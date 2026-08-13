"use client";

import React, { useLayoutEffect, useMemo, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Chip,
    Container,
    CssBaseline,
    Grid,
    InputAdornment,
    Stack,
    TextField,
    ThemeProvider,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
    styled,
} from "@mui/material";
import { Search, Visibility, TrendingUp, Today, Storefront } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

import EmotionRegistry from "@/lib/emotion-registry";
import getTheme from "@/lib/theme";

export type CustomerRow = {
    id: string;
    name: string;
    src: string | null;
    total: number;
    today: number;
    week: number;
    /** Visits per day for the last week, oldest first. */
    trend: number[];
};

type Props = {
    customers: CustomerRow[];
    /** Day the numbers were read on, YYYY-MM-DD in Cairo time. */
    day: string;
};

const CustomerCard = styled(Card)(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    border: "2px solid transparent",
    transition: "all 0.3s ease",
    "&:hover": {
        borderColor: `${theme.palette.primary.main}55`,
        transform: "translateY(-4px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
    },
}));

const SummaryCard = styled(Card)({
    height: "100%",
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "20px 24px",
});

/** A tiny bar chart of the last week — enough to spot a dead page at a glance. */
const Sparkline = ({ trend, days }: { trend: number[]; days: string[] }) => {
    const peak = Math.max(...trend, 1);

    return (
        <Box sx={{ display: "flex", alignItems: "flex-end", gap: 0.5, height: 34, mt: 2 }}>
            {trend.map((value, index) => (
                <Tooltip key={days[index]} title={`${days[index]}: ${value}`} arrow>
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: 0,
                            height: `${Math.max((value / peak) * 100, 6)}%`,
                            borderRadius: 0.5,
                            bgcolor: value ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.12)",
                        }}
                    />
                </Tooltip>
            ))}
        </Box>
    );
};

const Summary = ({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) => (
    <SummaryCard>
        <Box
            sx={{
                width: 48,
                height: 48,
                flexShrink: 0,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: (theme) => `${theme.palette.primary.main}25`,
            }}
        >
            {icon}
        </Box>
        <Box>
            <Typography variant="h4" fontWeight="bold" lineHeight={1.2}>
                {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {label}
            </Typography>
        </Box>
    </SummaryCard>
);

const CustomersDashboard = ({ customers, day }: Props) => {
    const theme = useMemo(
        () =>
            getTheme({
                backgroundDefault: "#000",
                backgroundPaper: "#1b1a1a",
                primaryColor: "#4f4e4e",
                secondaryColor: "#4f4e4e",
                dir: "ltr",
            }),
        []
    );

    useLayoutEffect(() => {
        document.documentElement.setAttribute("dir", "ltr");
    }, []);

    const [query, setQuery] = useState("");
    const [sort, setSort] = useState<"visits" | "name">("visits");

    // The last week of day labels, oldest first — matches the trend arrays.
    const days = useMemo(() => {
        const [year, month, date] = day.split("-").map(Number);
        const length = customers[0]?.trend.length ?? 0;
        return Array.from({ length }, (_, index) =>
            new Date(Date.UTC(year, month - 1, date - (length - 1 - index)))
                .toISOString()
                .slice(0, 10)
        );
    }, [day, customers]);

    const visible = useMemo(() => {
        const needle = query.trim().toLowerCase();
        const filtered = needle
            ? customers.filter(
                (customer) =>
                    customer.name.toLowerCase().includes(needle) ||
                    customer.id.includes(needle)
            )
            : customers;

        return [...filtered].sort((a, b) =>
            sort === "name"
                ? a.name.localeCompare(b.name)
                : b.total - a.total || a.name.localeCompare(b.name)
        );
    }, [customers, query, sort]);

    const totals = useMemo(
        () =>
            customers.reduce(
                (sum, customer) => ({
                    visits: sum.visits + customer.total,
                    today: sum.today + customer.today,
                    week: sum.week + customer.week,
                }),
                { visits: 0, today: 0, week: 0 }
            ),
        [customers]
    );

    const format = (value: number) => value.toLocaleString("en-US");

    return (
        <EmotionRegistry>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: { xs: 5, md: 8 } }}>
                    <Container maxWidth="lg">
                        <Box sx={{ mb: { xs: 4, md: 6 } }}>
                            <Typography variant="h3" fontWeight="bold" gutterBottom>
                                Customers
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Every client page and how many people it has reached.
                            </Typography>
                        </Box>

                        <Grid container spacing={3} sx={{ mb: { xs: 4, md: 6 } }}>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Summary
                                    icon={<Storefront color="primary" />}
                                    label="Customers"
                                    value={format(customers.length)}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Summary
                                    icon={<Visibility color="primary" />}
                                    label="Total visits"
                                    value={format(totals.visits)}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Summary
                                    icon={<TrendingUp color="primary" />}
                                    label="New in 7 days"
                                    value={format(totals.week)}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Summary
                                    icon={<Today color="primary" />}
                                    label={`New today (${day})`}
                                    value={format(totals.today)}
                                />
                            </Grid>
                        </Grid>

                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}
                            alignItems={{ sm: "center" }}
                            justifyContent="space-between"
                            sx={{ mb: 3 }}
                        >
                            <TextField
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search customers"
                                sx={{ maxWidth: { sm: 320 }, width: "100%" }}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search fontSize="small" />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />

                            <ToggleButtonGroup
                                value={sort}
                                exclusive
                                size="small"
                                onChange={(_, value) => value && setSort(value)}
                            >
                                <ToggleButton value="visits">Most visited</ToggleButton>
                                <ToggleButton value="name">Name</ToggleButton>
                            </ToggleButtonGroup>
                        </Stack>

                        <Grid container spacing={3}>
                            {visible.map((customer) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={customer.id}>
                                    <CustomerCard>
                                        <Link
                                            href={`/${customer.id}`}
                                            style={{ textDecoration: "none", color: "inherit" }}
                                        >
                                            <Box
                                                sx={{
                                                    position: "relative",
                                                    aspectRatio: "16/9",
                                                    width: "100%",
                                                    bgcolor: "rgba(255,255,255,0.04)",
                                                }}
                                            >
                                                {customer.src ? (
                                                    <Image
                                                        src={customer.src}
                                                        alt={customer.name}
                                                        fill
                                                        // Contained, not cropped — logos carry the name.
                                                        style={{ objectFit: "contain", padding: 12 }}
                                                        sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                                                    />
                                                ) : (
                                                    <Box
                                                        sx={{
                                                            height: "100%",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <Storefront sx={{ fontSize: 40, opacity: 0.4 }} />
                                                    </Box>
                                                )}

                                                {/* Visits badge, same shape as the one on the client pages. */}
                                                <Box
                                                    sx={{
                                                        position: "absolute",
                                                        top: 10,
                                                        left: 10,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 0.75,
                                                        px: 1.25,
                                                        py: 0.75,
                                                        borderRadius: 999,
                                                        direction: "ltr",
                                                        color: "#fff",
                                                        fontSize: 13,
                                                        fontWeight: 700,
                                                        lineHeight: 1,
                                                        background: "rgba(17, 17, 17, 0.6)",
                                                        backdropFilter: "blur(8px)",
                                                        border: "1px solid rgba(255,255,255,0.18)",
                                                    }}
                                                >
                                                    <Visibility sx={{ fontSize: 15 }} />
                                                    {format(customer.total)}
                                                </Box>
                                            </Box>
                                        </Link>

                                        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                                            <Typography variant="h6" fontWeight="bold" noWrap title={customer.name}>
                                                {customer.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                /{customer.id}
                                            </Typography>

                                            <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: "wrap", gap: 1 }}>
                                                <Chip
                                                    size="small"
                                                    icon={<Visibility sx={{ fontSize: 16 }} />}
                                                    label={`${format(customer.total)} ${customer.total === 1 ? "visit" : "visits"}`}
                                                    color="primary"
                                                />
                                                <Chip
                                                    size="small"
                                                    variant="outlined"
                                                    label={`${format(customer.week)} new this week`}
                                                />
                                                <Chip
                                                    size="small"
                                                    variant="outlined"
                                                    label={`${format(customer.today)} new today`}
                                                />
                                            </Stack>

                                            <Box sx={{ mt: "auto" }}>
                                                <Sparkline trend={customer.trend} days={days} />
                                            </Box>
                                        </CardContent>
                                    </CustomerCard>
                                </Grid>
                            ))}
                        </Grid>

                        {visible.length === 0 && (
                            <Typography color="text.secondary" sx={{ py: 6, textAlign: "center" }}>
                                No customer matches “{query}”.
                            </Typography>
                        )}
                    </Container>
                </Box>
            </ThemeProvider>
        </EmotionRegistry>
    );
};

export default CustomersDashboard;
