/*!
 *  File    : components/RepoList.js
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
import PaginatedList from './PaginatedList';
import CardsMosaic from './CardsMosaic';
import { Typography } from '@material-ui/core';
import { List, ViewComfy } from '@material-ui/icons';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    '&h1': {
      fontSize: '12pt',
    },
  },
  title: {
    color: `${theme.palette.primary.dark}`,
  },
  selectProjects: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  infoBar: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  viewMode: {
    background: 'transparent',
  },
  projectCount: {
    flexGrow: 1,
    marginLeft: '1rem',
    textAlign: 'right',
  }
}));

/**
 * Main repo component. Allows to switch between 'list' or 'card mosaic' modes
 * TODO: Add search box
 * @component
 * @param {object} params 
 */
function RepoList({ projects, setProjectID, settings, listMode, setListMode, t, ...props }) {

  const { logo = "", displayTitle, displaySubtitle } = settings;
  const classes = mergeClasses(props, useStyles());

  return (
    <div {...props} className={classes.root}>
      {displayTitle && <Typography variant="h1" className={classes.title}>{t('title')}</Typography>}
      {displaySubtitle && <Typography variant="subtitle1">{t('description')}</Typography>}
      <ShareButtons {...{ settings, t, titol: t('title'), descripcio: t('description'), imatge: logo, link: window.location.href }} />
      <div className={classes['infoBar']}>
        <ToggleButtonGroup
          className={classes['viewMode']}
          size="small"
          value={listMode}
          exclusive
          onChange={() => setListMode(!listMode)}
          aria-label={t('view_mode')}
        >
          <ToggleButton value={false} title={t('view_mode_cards')}>
            <ViewComfy />
          </ToggleButton>
          <ToggleButton value={true} title={t('view_mode_list')}>
            <List />
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography variant="body2" className={classes['projectCount']}>{t('projects_count', { count: projects.length })}</Typography>
      </div>
      {(listMode && <PaginatedList {...{ projects, setProjectID, settings, t }} />)
        || <CardsMosaic {...{ projects, setProjectID, settings, t }} />
      }
    </div >
  );
}

export default RepoList;