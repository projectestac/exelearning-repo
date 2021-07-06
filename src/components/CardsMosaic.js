import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { mergeClasses } from '../utils';
import ProjectCard from './ProjectCard';

const useStyles = makeStyles(_theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
    gridGap: '1rem',
    "& a:link": {
      textDecoration: 'none',
    }
  },
}));

export default function CardsMosaic({ projects, setProjectID, settings, t, ...props }) {
  const classes = mergeClasses(props, useStyles());
  return (
    <div className={classes.root}>
      {projects.map((project, n) => (
        <ProjectCard key={n} {...{ project, setProjectID, settings, t }} />
      ))}
    </div>
  );
}