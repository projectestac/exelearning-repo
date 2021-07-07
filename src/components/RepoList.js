import React, { useState } from 'react';
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
    color: theme.palette.primary.dark,
  },
  subtitle: {},
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

function RepoList({ projects, setProjectID, settings, listMode, setListMode, t, ...props }) {

  const { logo = "", displayTitle, displaySubtitle } = settings;
  const classes = mergeClasses(props, useStyles());

  return (
    <div {...props} className={classes.root}>
      {displayTitle && <Typography variant="h1" className={classes.title}>{t('title')}</Typography>}
      {displaySubtitle && <Typography variant="subtitle1" className={classes.subtitle}>{t('description')}</Typography>}
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