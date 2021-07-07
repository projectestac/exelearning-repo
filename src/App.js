import React, { useState, useEffect } from 'react';
import { loadData } from './utils/data';
import { updateHistoryState } from './utils';
import { useTranslation } from 'react-i18next';
import MainContainer from './components/MainContainer';
import RepoList from './components/RepoList';
import Project from './components/Project';
import Alert from '@material-ui/lab/Alert';

function App({ settings }) {

  const { t } = useTranslation();
  const { csv, projectKey } = settings;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [project, setProject] = useState(null);
  const [listMode, setListMode] = useState(false);

  const findProject = (id, projects = data) => id && projects && projects.find(d => d.id === id) || null;

  useEffect(() => {
    loadData(csv)
      .then(projects => {
        setData(projects)
        const searchParams = new URLSearchParams(window.location.search);
        const requestedPrj = searchParams.get(projectKey);
        const prj = findProject(requestedPrj, projects);
        if (requestedPrj && !prj)
          setError(new Error(t('error_unknown_id', { id: requestedPrj })));
        setProject(prj);
        updateHistoryState(prj, projectKey, true);
        window.addEventListener('popstate', ev => {
          const { state } = ev;
          if (state && Object.keys(state).includes(projectKey)) {
            ev.preventDefault();
            setProject(findProject(state[projectKey], projects));
          }
        });
      })
      .catch(err => setError(err))
      .finally(() => {
        setLoading(false);
      });
  }, [csv]);

  function setProjectID(id, replace = false) {
    if (data) {
      const prj = findProject(id);
      if (id && !prj) {
        setProject(null);
        setError(new Error(t('error_unknown_id', { id })));
        return;
      }
      updateHistoryState(prj, projectKey, replace);
      setProject(prj);
    }
  }

  return (
    <MainContainer {...{ settings }}>
      {
        loading && <Alert severity="info">{t('loading')}</Alert> ||
        error && <Alert severity="error">{error.toLocaleString()}</Alert> ||
        project && <Project {...{ project, setProjectID, settings, t }} /> ||
        data && <RepoList {...{ projects: data, setProjectID, settings, listMode, setListMode, t }} />
      }
    </MainContainer>
  );
}

export default App;
