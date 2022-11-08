import { useState } from 'react'
import {  Button, Dialog, DialogActions, DialogContent,
DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

export default function FavoritesDialog({ handleClick, initFavState}) {
  const [open, setOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState({initFavState})
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <div className="dialog-wrapper">
      
    </div>
  )
}