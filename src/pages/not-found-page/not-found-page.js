import React from "react";
import { Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PageLayout } from "../../components/page-layout/page-layout";
import { useHistory } from "react-router-dom";

export const NotFoundPage = () => {
  const history = useHistory();

  return (
    <PageLayout>
      <Container sx={{ maxWidth: "80em", mx: "auto", my: "3rem" }}>
        <Typography variant="h2" component="p" textAlign={"center"}>
          Uh-oh, we're off trail.
        </Typography>
        <Container sx={{textAlign:'center',my:'3rem'}}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={history.goBack}>
            Go Back
          </Button>
        </Container>
      </Container>
    </PageLayout>
  );
};
