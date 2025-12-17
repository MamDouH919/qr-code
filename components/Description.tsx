import { Container, Typography } from "@mui/material"

const Description = ({
    description
}: {
    description: string
}) => {
    return (
        <Container>
            <Typography
                variant="h6"
                color="text.secondary"
                textAlign={"center"}
            >
                {description}
            </Typography>
        </Container>
    )
}

export default Description