import { Box, Container, useTheme } from '@mui/material'
import AppleIcon from '@mui/icons-material/Apple'
import GoogleIcon from '@mui/icons-material/Google'
import React from 'react'

const APPS = [
  {
    href: 'ios',
    icon: <AppleIcon sx={{ fontSize: 60, color: '#fff' }} />,
    label: { ar: 'آب ستور', en: 'App Store' },
    bg: 'linear-gradient(135deg, #1C1C1E, #3A3A3C)',
  },
  {
    href: 'android',
    icon: <GoogleIcon sx={{ fontSize: 60, color: '#fff' }} />,
    label: { ar: 'جوجل بلاي', en: 'Google Play' },
    bg: 'linear-gradient(135deg, #01875F, #34A853)',
  },
]

const Apps = ({
  ios,
  android,
}: {
  ios: string
  android: string
}) => {
  const theme = useTheme()
  const isArabic = theme.direction === 'rtl'
  const urls: Record<string, string> = { ios, android }

  return (
    <Box>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
          {APPS.map((app, index) => (
            <Box
              key={index}
              component="a"
              href={urls[app.href]}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.75,
                textDecoration: 'none',
                animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both`,
                '@keyframes fadeInUp': {
                  from: { opacity: 0, transform: 'translateY(20px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: '22px',
                  backgroundImage: app.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  '&:hover': {
                    transform: 'scale(1.08)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  },
                  '&:active': { transform: 'scale(0.94)' },
                }}
              >
                {app.icon}
              </Box>
              <Box
                component="span"
                sx={{
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  color: 'text.secondary',
                  textAlign: 'center',
                }}
              >
                {isArabic ? app.label.ar : app.label.en}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default Apps
