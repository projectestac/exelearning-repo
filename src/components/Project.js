import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { mergeClasses } from '../utils';
import ShareButtons from './ShareButtons';
import { Button, IconButton, Typography } from '@material-ui/core';
import { PlayArrow, PlayCircleFilled, CloudDownload, ArrowBack } from '@material-ui/icons';
import ReactMarkdown from 'react-markdown';
import ccLogo from '../assets/cclogo.png';

const useStyles = makeStyles(theme => ({
  root: {
  },
  title: {
    color: `${theme.palette.primary.dark}`,
  },
  //subtitle: {
  //  color: 'unset !important',
  //},
  backBtn: {
    marginBottom: '1rem',
  },
  cover: {
    minWidth: '96px',
    minHeight: '96px',
    maxWidth: '100%',
    maxHeight: '300px',
  },
  btnContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  overlayBtn: {
    position: 'absolute',
    opacity: '20%',
    height: '10rem',
    width: '10rem',
    "& svg": {
      fontSize: 96,
    },
    "&:hover": {
      opacity: '90%',
    },
  },
  mainBlock: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '11pt',
    "& li": {
      marginBottom: '1rem',
    },
    [theme.breakpoints.up('sm')]: {
      width: '80%',
    },
    //"& h1, h2, h3, h4, h5, h6, a": {
    //  color: 'unset !important',
    //}
  },
  dataCard: {
    borderCollapse: 'collapse',
    minWidth: '80%',
    maxWidth: '800px',
    marginTop: '2rem',
    marginBottom: '1.5rem',
    lineHeight: '1.5',
    "& td": {
      border: 'none',
      borderBottom: '1px solid lightgray',
      borderTop: '1px solid lightgray',
      padding: '0.5rem',
      paddingLeft: 0,
    },
    "& td:first-child": {
      width: '9rem',
      fontWeight: 'bold',
      paddingRight: '8pt',
      verticalAlign: 'top',
    },
  },
  cclogo: {
    float: 'left',
    marginRight: '0.9rem',
    opacity: .7,
  },
  cctext: {
    fontSize: '9pt',
  },
  related: {
    margin: 0,
    paddingLeft: 0,
    listStyleType: 'none',
  },
  buttons: {
    display: 'flex',
    flexWrap: 'wrap',
    "& a,button": {
      marginRight: '1rem',
      marginBottom: '1rem',
    }
  },
  leftIcon: {
    marginRight: '0.5rem',
  },
}));

function Project({ project, setProjectID, settings, t, ...props }) {

  // eslint-disable-next-line no-unused-vars
  const { area, datadecreacio, autoria, descripcio, idioma, elp, etapa, etiquetes, id, imatge, llicencia, linkllicencia = '', recurs, scorm, titol } = project;
  const classes = mergeClasses(props, useStyles());

  return (
    <div {...props} className={classes.root}>
      <Button className={classes.backBtn} onClick={() => setProjectID(null)}>
        <ArrowBack className={classes['leftIcon']} />
        {t('title')}
      </Button>
      <Typography variant="h1" className={classes.title}>{titol}</Typography>
      <Typography variant="subtitle1" className={classes.subtitle}>{autoria}</Typography>
      <ShareButtons {...{ settings, t, ...project, link: window.location.href }} />
      <div className={classes.mainBlock}>
        {imatge &&
          <div className={classes.btnContainer}>
            <img src={imatge} className={classes.cover} alt={t('cover_alt')} />
            <IconButton
              className={classes.overlayBtn}
              color="primary"
              href={recurs} target="_BLANK"
              title={t('prj_launch_tooltip')}
            >
              <PlayArrow />
            </IconButton>
          </div>
        }
        <ReactMarkdown className={classes.description}>{descripcio}</ReactMarkdown>
      </div>
      <table className={classes.dataCard}>
        <tbody>
          <tr>
            <td>{t('prj_authors')}:</td>
            <td>{autoria}</td>
          </tr>
          <tr>
            <td>{t('prj_languages')}:</td>
            <td>{idioma}</td>
          </tr>
          <tr>
            <td>{t('prj_levels')}:</td>
            <td>{etapa}</td>
          </tr>
          <tr>
            <td>{t('prj_subjects')}:</td>
            <td>{area}</td>
          </tr>
          <tr>
            <td>{t('prj_tags')}:</td>
            <td>{etiquetes}</td>
          </tr>
          <tr>
            <td>{t('prj_date')}:</td>
            <td>{datadecreacio}</td>
          </tr>
          <tr>
            <td>{t('prj_license')}:</td>
            <td>
              {linkllicencia.startsWith('https://creativecommons.org') && <img className={classes.cclogo} src={ccLogo} alt="Creative Commons" />}
              <div className={classes.cctext}><a href={linkllicencia} target="_BLANK" rel="noreferrer">{llicencia}</a></div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlayCircleFilled />}
          href={recurs}
          target="_BLANK"
          title={t('prj_launch_tooltip')}
        >
          {t('prj_launch')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudDownload />}
          href={elp}
          target="_BLANK"
          title={t('prj_elp_tooltip')}
        >
          {t('prj_elp')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudDownload />}
          href={scorm}
          target="_BLANK"
          title={t('prj_scorm_tooltip')}
        >
          {t('prj_scorm')}
        </Button>
      </div>
    </div>
  );
}

export default Project;
