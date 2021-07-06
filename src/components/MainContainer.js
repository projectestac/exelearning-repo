import React, { useEffect } from 'react';
import merge from 'lodash/merge';
import { DEFAULT_THEME, mainFont } from '../settings';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: style => ({
    padding: '1rem',
    fontFamily: mainFont,
    ...style,
  }),
});

let theme = responsiveFontSizes(createMuiTheme(DEFAULT_THEME, {}));

export default function MainContainer({ settings, children }) {
  // Rebuild theme with specific settings
  useEffect(() => {
    theme = responsiveFontSizes(createMuiTheme(merge(DEFAULT_THEME, settings.theme)), {});
  }, [settings.theme]);
  const styles = useStyles(settings['rootStyle']);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.root}>{children}</div>
    </ThemeProvider>
  );
}
