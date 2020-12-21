import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import DoneAllIcon from '@material-ui/icons/DoneAll'

interface termCheckboxProps {
  className: string
  termString: string
}

function TermCheckbox({
  className,
  termString,
}: termCheckboxProps): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const setActiveText = `Set all ${termString} courses active`
  const setInactiveText = `Set all ${termString} courses inactive`

  return (
    <div className={className}>
      <IconButton
        size="small"
        aria-controls="term-check-all"
        aria-haspopup="true"
        onClick={handleOpen}>
        <DoneAllIcon color="primary" />
      </IconButton>
      <Menu
        id="term-check-all"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem onClick={handleClose}> {setActiveText} </MenuItem>
        <MenuItem onClick={handleClose}> {setInactiveText} </MenuItem>
      </Menu>
    </div>
  )
}

export default TermCheckbox
