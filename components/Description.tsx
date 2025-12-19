import { Box, Container, Typography } from "@mui/material"

const Description = ({
    description
}: {
    description: string
}) => {
    return (
        <Box>
            <Container>
                <Typography
                    variant="h6"
                    color="text.secondary"
                    textAlign={"center"}
                >
                    {description}
                </Typography>
            </Container>
        </Box>
    )
}

export default Description