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
  root: {
  },
  spacer: {
    display: 'none',
  },
  toolbar: {
    flexFlow: 'wrap',
    paddingLeft: '0',
  },
}));

function PaginatedList({ projects, setProjectID, settings: _settings, t, ...props }) {

  const classes = mergeClasses(props, useStyles());
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  useEffect(() => setPage(0), [projects]);

  return (
    <div {...props} className={classes.root}>
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