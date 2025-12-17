"use client";

import { Fab, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import clsx from "clsx";

interface LanguageIconProps {
  handleChangeLanguage: (lang: string) => void;
  language: string;
}

const PREFIX = "SocialIcons";

const classes = {
  icons: `${PREFIX}-icons`,
  fab: `${PREFIX}-fab`,
};

const StyledIconButton = styled(Stack)(({ theme }) => ({
  [`&.${classes.icons}`]: {
    position: "fixed",
    right: 10,
    bottom: 10,
    zIndex: 100,
  },
  [`& .${classes.fab}`]: {
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.9)",
  },
}));

const LanguageIcon = ({
  handleChangeLanguage,
  language,
}: LanguageIconProps) => {
  return (
    <StyledIconButton
      spacing={2}
      className={clsx(classes.icons)}
    >
      <Fab
        aria-label="Change language"
        color="secondary"
        onClick={() => handleChangeLanguage(language)}
        className={classes.fab}
      >
        <Typography fontSize={20} 
          sx={{
            color:(th) => th.palette.secondary.contrastText
          }}
        >
          {language}
        </Typography>
      </Fab>
    </StyledIconButton>
  );
};

export default LanguageIcon;
