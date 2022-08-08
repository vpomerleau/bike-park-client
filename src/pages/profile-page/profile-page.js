import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { PageLayout } from "../../components/page-layout/page-layout";
import {
  Avatar,
  Box,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import "./profile-page.scss";

export const ProfilePage = () => {
  const { user } = useAuth0();

  if (!user) {
    return null;
  }

  return (
    <PageLayout>
      <div className="profile__container">
        <div className="profile">
          <Box
            sx={{
              backgroundColor: "primary.dark",
              color: "white",
              my: "1rem",
              p: "1rem",
              textAlign: "right",
            }}>
            <Typography variant="h4" component="h1">
              Rider Profile
            </Typography>
          </Box>
          <Paper sx={{ px: "1rem", py: "2rem" }}>
            <form>
              <Typography variant="h5" component="h2" sx={{mb:'2rem'}}>Personal information</Typography>
              <Grid container>
                <Grid item xs={8}>
                  <Stack spacing={3}>
                    <TextField
                      id="outlined-read-only-input"
                      label="Rider Name"
                      defaultValue={user.name}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Nickname"
                      defaultValue={user.nickname}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Email"
                      defaultValue={user.email}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Avatar
                    src={user.picture}
                    sx={{ mx:'auto', width: "10rem", height: "10rem" }}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </div>
      </div>
    </PageLayout>
  );
};
