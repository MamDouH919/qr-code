import { WhatsApp } from '@mui/icons-material';
import { Avatar, Box, Button, Container, Divider, Paper, Stack, TextField, Typography } from '@mui/material'
import Image from 'next/image';
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

const DrDaliaForm = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<{ name: string, phone: string }>(
        {
            defaultValues: {
                name: "",
                phone: ""
            }
        }
    );

    const onSubmit = async (data: { name: string, phone: string }) => {
        const message = `
مرحبًا دكتورة داليا،
حابب أحجز كشف.
الاسم: ${data.name}
رقم الموبايل: ${data.phone}
إمتى أقرب معاد متاح؟
`;
        const encoded = encodeURIComponent(message);
        window.open(
            `https://wa.me/201067710688?text=${encoded}`,
            "_blank"
        );

        // Reset with explicit empty values and keepErrors: false
        reset({
            name: "",
            phone: ""
        }, {
            keepErrors: false,
            keepDirty: false,
            keepIsSubmitted: false,
            keepTouched: false,
            keepIsValid: false,
            keepSubmitCount: false
        });
    };

    return (
        <Box>
            <Container>
                <Divider />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2} alignItems={"center"} my={2}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            أحجز كشف
                        </Typography>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Field is required" }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={"Name"}
                                    fullWidth
                                    error={!!errors.name}
                                    helperText={errors.name?.message as string}
                                    value={field.value || ""} // Ensure controlled value
                                />
                            )}
                        />

                        <Controller
                            name="phone"
                            control={control}
                            rules={{
                                required: "Field is required",
                                pattern: {
                                    value: /^[0-9+\-\s()]+$/,
                                    message: 'Invalid phone number'
                                }
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={"Phone Number"}
                                    fullWidth
                                    error={!!errors.phone}
                                    helperText={errors.phone?.message as string}
                                    value={field.value || ""} // Ensure controlled value
                                />
                            )}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{ mt: 1 }}
                        >
                            Send Message
                        </Button>
                    </Stack>
                </form>
                <Divider />
                <Stack my={2} spacing={2}>
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent={"center"}
                        component={Paper}
                        p={1}
                        alignItems={"center"}
                    // bgcolor={(th) => th.palette.primary.main}
                    >
                        <Typography variant="h6" component="h2" gutterBottom>
                            طريقة الدفع
                        </Typography>
                        <Avatar sx={{ background: "#fff", width: 80, height: 40 }}>
                            <Image
                                src="/instaPay.webp"
                                alt="Dr. Dalia A. Abdulrahman"
                                fill
                                style={{ objectFit: "contain", objectPosition: "center" }}
                            />
                        </Avatar>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={2}
                        dir='rtl'
                        component={Paper}
                        p={1}
                        alignItems={"center"}
                    // bgcolor={(th) => th.palette.primary.main}
                    >
                        <Avatar sx={{ background: "#fff", width: 80, height: 40 }}>
                            <WhatsApp />
                        </Avatar>
                        <Typography variant="h6" component="h2" gutterBottom>
                            الأستشارة الاونلاين
                        </Typography>
                    </Stack>
                </Stack>
                <Divider />
            </Container>
        </Box>
    )
}

export default DrDaliaForm