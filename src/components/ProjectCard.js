import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Card } from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';
import { mergeClasses } from '../utils';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: '20rem',
    cursor: 'pointer',
  },
  cardContent: {
    position: 'relative',
    height: '10rem',
  },
  title: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '0.5rem 3rem 0.5rem 0.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: theme.palette.grey[800],
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  language: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    padding: '0.15rem 0.15rem 0.3rem 0.1rem',
    margin: '0.4rem',
    display: 'inline-block',
    borderRadius: '4px',
    minWidth: '1.5rem',
    lineHeight: '1rem',
    textAlign: 'center',
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.primary.contrastText,
  },
  playBtn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: '0.4rem',
  },
  cardBottom: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '9pt',
    padding: '0.5rem',
  },
}));

function ProjectCard({ project, setProjectID, t, children, ...props }) {
  const classes = mergeClasses(props, useStyles());
  // eslint-disable-next-line no-unused-vars
  const { area, datadecreacio, autoria, descripcio, idioma, elp, etapa, etiquetes, id, imatge, llicencia, linkllicencia, recurs, scorm, titol } = project;
  const [raised, setRaised] = useState(false);

  return (
    <Card
      className={classes['card']}
      onMouseOver={() => setRaised(true)}
      onMouseOut={() => setRaised(false)}
      elevation={raised ? 8 : 1}
      onClick={ev => {
        ev.preventDefault();
        setProjectID(id);
      }}
    >
      <div className={classes['cardContent']} style={{ background: `no-repeat center/150% url(${imatge})` }}>
        {idioma && <span className={classes['language']}>{idioma}</span>}
        <div className={classes['title']}>{titol}</div>
        <Fab
          className={classes['playBtn']}
          color="primary"
          size="small"
          onClick={ev => {
            ev.preventDefault();
            window.open(recurs, '_BLANK');
          }}
          title={t('prj_launch')}
        >
          <PlayArrow />
        </Fab>
      </div>
      <div className={classes['cardBottom']}>
        {children || autoria}
      </div>
    </Card>
  );
}

export default ProjectCard;
