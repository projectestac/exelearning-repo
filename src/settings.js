/* global process */

export const mainFont = ['Roboto', 'Arial', '"sans-serif"'].join(',');
export const titleFont = ['"Open Sans"', 'Arial', '"sans-serif"'].join(',');
export const DEFAULT_THEME = {
  palette: {
    // primary: { main: '#1976D2', contrastText: '#ffffff' },
    primary: { main: '#1976d2' },
    //secondary: { main: '#AED581', contrastText: '#004D40' },
    secondary: { main: '#fbc02d' },
    //error: red,
  },
  typography: {
    fontFamily: mainFont,
    fontDisplay: 'swap',
    h1: {
      fontFamily: titleFont,
      fontWeight: 700,
      fontSize: '3rem',
      //marginBottom: '1rem',
    },
    h2: {
      fontFamily: titleFont,
      fontWeight: 700,
      fontSize: '2rem',
      //marginBottom: '0.8rem',
    },
    h3: {
      fontFamily: titleFont,
      fontWeight: 700,
      fontSize: '1.5rem',
      marginBottom: '0.6rem',
    },
    body3: {
      fontFamily: mainFont,
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
  },
  drawerWidth: '14rem',
};

export const DEFAULT_SETTINGS = {
  csv: process.env.CSV_URL || '',
  theme: DEFAULT_THEME,
  lang: 'ca',
  projectKey: process.env.PROJECT_KEY || 'eXePrj',
  langKey: process.env.LANG_KEY || 'lang',
  langDefault: process.env.LANG_DEFAULT || 'ca',
  shareSites: { twitter: true, facebook: true, telegram: true, whatsapp: true, pinterest: true, email: true, classroom: true },
  shareMeta: { hash: 'eXeLearning,edu', via: 'xtec' },
  facebookId: process.env.FACEBOOK_ID || 'xxx',
  logo: process.env.LOGO || '',
  displayTitle: process.env.DISPLAY_TITLE === 'false' ? false : true,
  displaySubtitle: process.env.DISPLAY_SUBTITLE === 'false' ? false : true,
}

export default DEFAULT_SETTINGS;
