import { Box, Container, Grid } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const Apps = ({
  ios,
  android,
}: {
  ios: string
  android: string
}) => {
  return (
    <Box>
      <Container>
        <Grid container>
          <Grid size={{ xs: 6 }}>
            <Box
              component="a"
              href={ios}
              target="_blank"
              rel="noopener noreferrer"
              display="block"
              position="relative"
              width="100%"
              height={60}
            >
              <Image
                src="/app-store.png"
                alt="app-store"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Box
              component="a"
              href={android}
              target="_blank"
              rel="noopener noreferrer"
              display="block"
              position="relative"
              width="100%"
              height={60}
            >
              <Image
                src="/google-play.png"
                alt="google-play"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Apps
