import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { mergeClasses } from '../utils';
import ShareButtons from './ShareButtons';
import PaginatedList from './PaginatedList';
import CardsMosaic from './CardsMosaic';
import { Typography } from '@material-ui/core';
import { List, ViewComfy } from '@material-ui/icons';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';

const useStyles = makeStyles(_theme => ({
  root: {
    '&h1': {
      fontSize: '12pt',
    },
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
  }
}));

function RepoList({ projects, setProjectID, settings, t, ...props }) {

  const { logo = "", displayTitle, displaySubtitle } = settings;
  const classes = mergeClasses(props, useStyles());
  const [listMode, setListMode] = useState(false);

  return (
    <div {...props} className={classes.root}>
      {displayTitle && <Typography variant="h1">{t('title')}</Typography>}
      {displaySubtitle && <Typography variant="subtitle1">{t('description')}</Typography>}
      <ShareButtons {...{ settings, t, titol: t('title'), descripcio: t('description'), imatge: logo, link: window.location.href }} />
      <div className={classes['infoBar']}>
        <Typography variant="body2" className={classes['projectCount']}>{t('projects_count', { count: projects.length })}</Typography>
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
      </div>
      {(listMode && <PaginatedList {...{ projects, setProjectID, settings, t }} />)
        || <CardsMosaic {...{ projects, setProjectID, settings, t }} />
      }
    </div >
  );
}

export default RepoList;