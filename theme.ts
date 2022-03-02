// import { createTheme } from '@material-ui/core';
//
// export const theme = createTheme({
//   props: {
//     MuiButtonBase: {
//       disableRipple: true,
//     },
//   },
//   palette: {
//     primary: {
//       main: '#4683d9',
//     },
//     secondary:{
//       main:'#fff'
//     }
//   },
//   overrides: {
//     MuiPaper: {
//       rounded: {
//         borderRadius: 8,
//       },
//     },
//     MuiPopover: {},
//     MuiIconButton:{},
//     MuiButton: {
//       root: {
//         borderRadius: '8px',
//         textTransform: 'inherit',
//         fontSize: 16,
//         transition: 'none',
//         '&:active': {
//           boxShadow:
//             '0 1px 1px rgb(0 0 0 / 15%), 0 4px 7px rgb(0 0 0 / 0%), 0 -1px 0 rgb(0 0 0 / 5%), -1px 0 0 rgb(0 0 0 / 5%), 1px 0 0 rgb(0 0 0 / 5%) !important',
//           transform: 'translateY(1px)',
//         },
//       },
//       contained: {
//         backgroundColor: 'white',
//         boxShadow:
//           '0 1px 1px rgb(0 0 0 / 15%), 0 4px 7px rgb(0 0 0 / 5%), 0 -1px 0 rgb(0 0 0 / 5%), -1px 0 0 rgb(0 0 0 / 5%), 1px 0 0 rgb(0 0 0 / 5%)',
//         '&:hover': {
//           backgroundColor: 'white',
//           boxShadow:
//             '0 1px 1px rgb(0 0 0 / 18%), 0 4px 7px rgb(0 0 0 / 8%), 0 -1px 0 rgb(0 0 0 / 8%), -1px 0 0 rgb(0 0 0 / 8%), 1px 0 0 rgb(0 0 0 / 15%)',
//         },
//       },
//       containedPrimary: {
//         backgroundColor: '#4683d9',
//         '&:hover': {
//           backgroundColor: '#437CCE',
//         },
//       },
//     },
//   },
// });

import {createTheme} from '@mui/material/styles'
import {red} from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(29, 161, 242)',
      dark: 'rgb(26, 145, 218)',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
       root:{
         border:'1px solid #000'
       }
      },
    },
    MuiIconButton:{
      styleOverrides:{
        root: {
          borderRadius: 32,
          fontSize:'inherit',
          color:'#fff'
        }
      }
    },
    MuiTab:{
      styleOverrides:{
        root:{
          width:'25%',
          textTransform:'none'
        }
      }
    },
    MuiFilledInput:{
      styleOverrides:{
        root: {
          borderRadius: 132,
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 15
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          marginBottom: 8
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgb(204, 214, 221)',
          marginBottom: 10,
          padding: '10px 15px',

        },
      }
    }
  }
})
