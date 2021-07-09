/*!
 *  File    : components/Project.js
 *  Created : 2021-07-06
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  eXeLearning repo
 *  Embeddable front-end for a repository of eXeLearning resources
 *  https://projectes.xtec.cat/exelearning
 *
 *  @source https://github.com/projectestac/exelearning-repo
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2021 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.2 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 *  @module
 */

import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { mergeClasses } from '../utils';
import ShareButtons from './ShareButtons';
import { Button, IconButton, Typography } from '@material-ui/core';
import { PlayArrow, PlayCircleFilled, CloudDownload, ArrowBack } from '@material-ui/icons';
import ReactMarkdown from 'react-markdown';
import ccLogo from '../assets/cclogo.png';

const useStyles = makeStyles(theme => ({
  title: {
    color: `${theme.palette.primary.dark}`,
  },
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

/**
 * Component for displaying a single eXeLearning project
 * @component
 * @param {object} params
 */
function Project({ project, setProjectID, settings, t, ...props }) {

  const { area, datadecreacio, autoria, descripcio, idioma, elp, etapa, etiquetes, imatge, llicencia, linkllicencia = '', recurs, scorm, titol } = project;
  const classes = mergeClasses(props, useStyles());

  return (
    <div {...props}>
      <Button className={classes.backBtn} onClick={() => setProjectID(null)}>
        <ArrowBack className={classes.leftIcon} />
        {t('title')}
      </Button>
      <Typography variant="h1" className={classes.title}>{titol}</Typography>
      <Typography variant="subtitle1">{autoria}</Typography>
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
