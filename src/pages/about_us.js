import { Facebook, FacebookRounded, GitHub, Instagram, aedIn, Twitter, WhatsApp } from "@mui/icons-material";
import { Card, Container, Divider, Stack, Typography } from "@mui/material";
import { a } from "react-router-dom";
import { lespa } from "../assets/members/index.js";

const AboutUs = () => {
  const members = [
    {
      id: "Lespa",
      name: "Mbah Lesky Tagwang",
      matricule: "UBa21PB015",
      photo: lespa,
      bio: "Infor about me",
      partPlayed: "UI/UX Designer, Front End Developer",
      handlers: {
        whatsapp: "https://wa.me/message/VQKGTZCTFZUAA1",
        instagram: "iamlespa",
        facebook: "IamLespa",
        twitter: "IamLespa",
        github: "MLesky",
        aedin: "in/mbah-lesky",
      },
    },
    // add your data above this line
  ];

  return (
    <Container maxWidth="lg">
      <Stack
        padding={2}
        flexWrap="wrap"
        justifyContent="center"
        direction="row"
      >
        {members.map((member) => (
          <Card elevation={10} sx={{ margin: 2, padding: 1, width: "275px" }}>
            <img src={member.photo} alt={member.id} width="100%" />
            <Typography variant="h6" paddingY={1} sx={{ fontSize: "15px", fontWeight: "bold" }}>
              {member.name}
            </Typography>
            <Divider />
            <Typography
              paddingY={0.2}
              variant="h6"
              sx={{ fontSize: "14px", fontWeight: "bold" }}
            >
              {member.matricule}
            </Typography>
            <Typography paddingY={0.2} sx={{ fontSize: "11px" }}>
              {member.bio}
            </Typography>
            <Typography
              paddingY={0.2}
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
                fontStyle: "italic",
                marginBottom: 1,
              }}
            >
              {member.partPlayed}
            </Typography>
            <Divider />

            {member.handlers === undefined ? (
              <div></div>
            ) : (
              <Stack direction="row" spacing={1} padding={1} justifyContent="end">
                  {member.handlers.whatsapp !== undefined && (
                  <a href={member.handlers.whatsapp} target="_blank">
                    <WhatsApp color="primary" />
                  </a>
                )}
                {member.handlers.facebook !== undefined && (
                  <a href={"https://www.facebook.com/" + member.handlers.facebook} target="_blank">
                    <FacebookRounded color="primary" />
                  </a>
                )}
                {member.handlers.github !== undefined && (
                  <a href={"https://github.com/" + member.handlers.github} target="_blank">
                    <GitHub color="primary" />
                  </a>
                )}
                {member.handlers.twitter !== undefined && (
                  <a href={"https://twitter.com/" + member.handlers.twitter} target="_blank">
                    <Twitter color="primary" />
                  </a>
                )}
                {member.handlers.linkedin !== undefined && (
                  <a href={"https://www.linkedin.com/" + member.handlers.linkedin} target="_blank">
                    <aedIn color="primary" />
                  </a>
                )}
                {member.handlers.instagram !== undefined && (
                  <a href={"https://www.instagram.com/" + member.handlers.instagram} target="_blank">
                    <Instagram color="primary" />
                  </a>
                )}
              </Stack>
            )}
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default AboutUs;
