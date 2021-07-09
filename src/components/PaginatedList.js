/*!
 *  File    : components/PaginatedList.js
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

import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { mergeClasses } from '../utils';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import TablePagination from '@material-ui/core/TablePagination';

const DEFAULT_ITEMS_PER_PAGE = 10;

const useStyles = makeStyles(_theme => ({
  spacer: {
    display: 'none',
  },
  toolbar: {
    flexFlow: 'wrap',
    paddingLeft: '0',
  },
}));

/**
 * Component for displaying the list of current projects
 * @component
 * @param {object} params
 */
function PaginatedList({ projects, setProjectID, settings: _settings, t, ...props }) {

  const classes = mergeClasses(props, useStyles());
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  useEffect(() => setPage(0), [projects]);

  return (
    <div {...props}>
      <List dense>
        {projects
          .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
          .map((project, n) => (
            <ListItem button key={n} className={classes.listElements} onClick={() => setProjectID(project.id)}>
              <ListItemAvatar>
                <Avatar variant="square" alt={project.titol} src={project.imatge} />
              </ListItemAvatar>
              <ListItemText primary={project.titol} secondary={project.autoria} />
            </ListItem>
          ))}
      </List>
      <TablePagination
        classes={{ spacer: classes.spacer, toolbar: classes.toolbar }}
        component="nav"
        page={page}
        rowsPerPage={itemsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100]}
        onRowsPerPageChange={ev => setItemsPerPage(ev.target.value)}
        count={projects.length}
        onPageChange={(_ev, p) => setPage(p)}
        labelDisplayedRows={({ from, to, count }) => { t('results_count', { from, to, count }) }}
        labelRowsPerPage={t('results_per_page')}
        backIconButtonText={t('results_page_prev')}
        nextIconButtonText={t('results_page_next')}
      />
    </div>
  );
}

export default PaginatedList;
