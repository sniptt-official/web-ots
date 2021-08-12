import { useTheme } from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import Box from "@material-ui/core/Box"
import { default as MuiDrawer } from "@material-ui/core/Drawer"
import Link from "@material-ui/core/Link"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Toolbar from "@material-ui/core/Toolbar"
import React from "react"

import LogoIcon from "~/components/icons/Logo"
import type { NavItem } from "~/types"

type Props = {
  items: Array<NavItem>
  open: boolean
  onClose: () => void
}

const Drawer = (props: Props): JSX.Element => {
  const { items, open, onClose } = props
  const theme = useTheme()

  const drawer = (
    <div>
      <AppBar position="sticky" color="inherit" elevation={0}>
        <Box boxShadow="rgba(255, 255, 255, 0.1) 0px 1px 0px 0px">
          <Toolbar>
            <Box width={116} height="2rem" position="relative">
              <Link href="/" color="textPrimary">
                <LogoIcon />
              </Link>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>

      <List>
        {items.map((item, index) => (
          <ListItem button key={index}>
            {item.label && <ListItemText primary={item.label} />}
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <MuiDrawer
      variant="temporary"
      anchor={theme.direction === "rtl" ? "right" : "left"}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      {drawer}
    </MuiDrawer>
  )
}

export default Drawer
