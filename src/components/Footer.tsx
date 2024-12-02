import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import MegaIcon from "./MegaIcon"

export default function Footer() {
    return (
        <Box sx={{
            height: "100px",
            mt: 10,
            color: "primary.contrastText",
            py: 2,
            px: 3,
            textAlign: "center",
        }}>


            <Box display="flex" justifyContent="center" p={2}>
                <Typography variant="h6">
                    {"Made with <3 by GP Web Team"}
                    <MegaIcon color="white" />
                </Typography>
            </Box>
        </Box>
    )
}

