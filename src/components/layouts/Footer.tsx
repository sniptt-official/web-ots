import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import { useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React from "react"

import GithubIcon from "~/components/icons/Github"
import LogoIcon from "~/components/icons/Logo"
import config from "~/config"

export type Props = {
  links: Array<LinkSection>
}

export type LinkSection = {
  title: string
  items: Array<LinkItem>
}

type LinkItem = {
  label: string
  href?: string
  to?: string
}

const Footer = (props: Props): JSX.Element => {
  const { links } = props

  const theme = useTheme()

  return (
    <Box bgcolor={theme.palette.background.paper} component="footer">
      <Container disableGutters>
        <Box py={13} px={2}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <LogoIcon height={24} width={77} />

              <Box mb={2} mt={3} color="info.main">
                <Typography style={{ fontSize: 18 }}>
                  {config.tagline}
                </Typography>
              </Box>

              <Button
                size="small"
                variant="contained"
                color="secondary"
                href={config.githubUrl}
                disableElevation
                startIcon={<GithubIcon width={20} height={20} />}
              >
                Star us on GitHub
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container>
                {links.map((linkSecton, i) => (
                  <Grid key={i} item xs>
                    <List dense>
                      <Box mb={2}>
                        <Typography
                          variant="h6"
                          style={{
                            fontSize: 18,
                            fontWeight: theme.typography.fontWeightBold,
                          }}
                        >
                          {linkSecton.title}
                        </Typography>
                      </Box>

                      {linkSecton.items?.map((item, i) => (
                        <ListItem key={i} disableGutters>
                          <Box mb="0.6rem">
                            <Link
                              color="textPrimary"
                              variant="body1"
                              underline="none"
                              {...(item.href != null
                                ? {
                                    href: item.href,
                                    rel: "noopener noreferrer",
                                    target: "_blank",
                                  }
                                : { href: item.to })}
                            >
                              {item.label}
                            </Link>
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Box
        display="flex"
        height={86}
        borderTop={1}
        justifyContent="center"
        alignItems="center"
        borderColor={theme.palette.grey[100]}
      >
        <Container>
          <Box display="flex" justifyContent="space-between">
            <Box color="info.main" pr={4}>
              <Typography style={{ fontSize: 18 }}>
                Made with 💜&nbsp;&nbsp;by <strong>Sniptt</strong> team
              </Typography>
            </Box>
            <Box color="info.main" pl={4}>
              <Typography style={{ fontSize: 18 }}>
                &copy; Sniptt. All Rights Reserved.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Footer
