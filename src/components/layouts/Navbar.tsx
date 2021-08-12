import AppBar from "@material-ui/core/AppBar"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import Link from "@material-ui/core/Link"
import Toolbar from "@material-ui/core/Toolbar"
import React, { useState } from "react"

import NavDrawer from "~/components/elements/Drawer"
import LogoIcon from "~/components/icons/Logo"
import MenuIcon from "~/components/icons/Menu"
import useSiteContext from "~/hooks/useSiteContext"
import type { NavItem } from "~/types"

// If split links by left/right.
// if position is unspecified, fallback to right.
function splitNavItemsByPosition(items: Array<NavItem>) {
  const leftItems = items.filter(
    (item) => (item.position ?? "right") === "left",
  )
  const rightItems = items.filter(
    (item) => (item.position ?? "right") === "right",
  )

  return {
    leftItems,
    rightItems,
  }
}

const Navbar = (): JSX.Element => {
  const { navbar } = useSiteContext()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const { leftItems, rightItems } = splitNavItemsByPosition(navbar.items)

  const getLinkProps = (item: NavItem) =>
    item.href
      ? {
          href: item.href,
          target: "_blank",
          // Links to cross-origin destinations are unsafe.
          // See https://web.dev/external-anchors-use-rel-noopener/.
          rel: "noopener noreferrer",
        }
      : {
          href: item.to,
        }

  return (
    <AppBar position="sticky" color="default" elevation={0} component="nav">
      <NavDrawer
        items={navbar.items}
        open={mobileOpen}
        onClose={handleDrawerToggle}
      />

      <Box
        sx={{
          boxShadow: "rgba(255, 255, 255, 0.1) 0px 1px 0px 0px",
        }}
      >
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Grid container spacing={6} alignItems="center">
            <Grid item>
              <Box width={116} height="2rem" position="relative">
                <Link href="/" color="textPrimary">
                  <LogoIcon />
                </Link>
              </Box>
            </Grid>

            <Hidden smDown>
              <Grid item xs>
                <Grid container spacing={6} alignItems="center">
                  {leftItems.map((item, i) => (
                    <Grid item key={i}>
                      <Link
                        style={{ fontSize: 18 }}
                        color="textPrimary"
                        underline="none"
                        {...getLinkProps(item)}
                      >
                        {item.label}
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Hidden>

            <Hidden smDown>
              <Grid item xs>
                <Grid
                  container
                  spacing={6}
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  {rightItems.map((item, i) => {
                    const IconComponent = item.icon

                    return (
                      <Grid item key={i}>
                        {item.label && (
                          <Link
                            style={{ fontSize: 18 }}
                            color="textPrimary"
                            underline="none"
                            {...getLinkProps(item)}
                          >
                            {item.label}
                          </Link>
                        )}
                        {IconComponent && (
                          <IconButton {...getLinkProps(item)}>
                            <IconComponent />
                          </IconButton>
                        )}
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
        </Toolbar>
      </Box>
    </AppBar>
  )
}

export default Navbar
