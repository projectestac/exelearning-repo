/*!
 *  File    : components/CardsMosaic.js
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

/**
 * Component for displaying a mosaic of project cards
 * @component
 * @param {object} params 
 */
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