/*!
 *  File    : components/SelectProjects.js
 *  Created : 2021-07-14
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

import React, { useState } from 'react';
import Fuse from 'fuse.js';
import { makeStyles } from '@material-ui/core/styles';
import { mergeClasses, getTextTokens, isStopWord } from '../utils';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';

// Fuse.js options
// See: https://fusejs.io/
const FUSE_OPTIONS = {
  isCaseSensitive: false,
  includeScore: false,
  includeMatches: false,
  minMatchCharLength: 2,
  shouldSort: true,
  findAllMatches: false,
  location: 0,
  threshold: 0.2,
  // Provide a big distance to avoid null matches!
  // distance: 4,
  distance: 100000,
  useExtendedSearch: false,
  tokenize: true,
  matchAllTokens: true,
  maxPatternLength: 32,
};

const fuseEngine = {};

function getFuseEngine(lang, projects) {
  if (!fuseEngine[lang] && projects?.length) {
    fuseEngine[lang] = new Fuse(
      projects
        .map(({ id, titol, autoria, descripcio, area, etapa, etiquetes }) => ({
          id,
          titol,
          autoria,
          tokens: getTextTokens([titol, autoria, descripcio, area, etapa, etiquetes].join(' '), lang),
        })),
      { ...FUSE_OPTIONS, keys: ['tokens'] }
    );
  }
  return fuseEngine[lang];
}

const useStyles = makeStyles(_theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1rem 0.5rem',
  },
  label: {
    flexBasis: '100%',
    marginLeft: '0.5rem',
    marginBottom: '0.5rem',
  },
  formControl: {
    marginRight: '0.5rem',
    marginLeft: '0.5rem',
    width: '10rem',
    flexGrow: 1,
    maxWidth: '21rem',
  },
}));

function SelectProjects({ settings, t, projects, filters, setFilters, ...props }) {

  const classes = mergeClasses(props, useStyles());
  const [query, setQuery] = useState(filters?.text || '');
  const { lang } = settings;

  const handleChange = ev => {
    ev.preventDefault();
    const { target: { name, value } } = ev;
    setFilters({ ...filters, [name]: value === 'all' ? '' : value })
  }

  const handleEnterSearch = ev => {
    if (ev.type === 'click' || ev.key === 'Enter') {
      ev.preventDefault();
      if (query && !isStopWord(query, lang)) {
        const fuse = getFuseEngine(lang, projects);
        const textMatches = fuse.search(query).map(match => match.item.id);
        setFilters({ ...filters, text: query, textMatches });
      }
      else
        setFilters({ ...filters, text: '', textMatches: [] });
    }
  }

  return (
    <div className={classes.root} >
      <Typography color="textSecondary" className={classes['label']}>{t('prj_filter')}</Typography>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-lang-label">{t('prj_language')}</InputLabel>
        <NativeSelect
          id="select-lang-label"
          name="language"
          value={filters?.language || ''}
          onChange={handleChange}>
          {t('lang_codes').split('|').map((code) => <option key={code} value={code}>{code === 'all' ? '' : t(`lang_${code}`)}</option>)}
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-subj-label">{t('prj_subject')}</InputLabel>
        <NativeSelect
          id="select-subj-label"
          name="subject"
          value={filters?.subject || ''}
          onChange={handleChange}>
          {t('subj_codes').split('|').map((code) => <option key={code} value={code}>{code === 'all' ? '' : t(`subj_${code}`)}</option>)}
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-level-label">{t('prj_level')}</InputLabel>
        <NativeSelect
          id="select-level-label"
          name="level"
          value={filters?.level || ''}
          onChange={handleChange}>
          {t('level_codes').split('|').map((code) => <option key={code} value={code}>{code === 'all' ? '' : t(`level_${code}`)}</option>)}
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          label={t('prj_text')}
          value={query}
          onChange={({ target: { value } }) => setQuery(value)}
          onKeyPress={handleEnterSearch}
          InputProps={{
            endAdornment:
              <InputAdornment position="end">
                <IconButton
                  aria-label={t('search')}
                  title={t('search')}
                  onClick={handleEnterSearch}
                  edge="end"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
          }}
        />
      </FormControl>
    </div>
  );
}

export default SelectProjects;