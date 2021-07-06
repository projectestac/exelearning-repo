import React, { useState, useEffect } from 'react';
import { loadData } from './utils/data';
import { updateHistoryState } from './utils';
import { useTranslation } from 'react-i18next';
import MainContainer from './components/MainContainer';
import RepoList from './components/RepoList';
import Project from './components/Project';

function App({ settings }) {

  const { t } = useTranslation();
  const { csv, projectKey } = settings;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [project, setProject] = useState(null);

  const findProject = (id, projects = data) => id && projects && projects.find(d => d.id === id) || null;

  useEffect(() => {
    loadData(csv)
      .then(projects => {
        setData(projects)
        const searchParams = new URLSearchParams(window.location.search);
        const requestedPrj = searchParams.get(projectKey);
        const prj = findProject(requestedPrj, projects);
        if (requestedPrj && !prj)
          console.error(`Requested unknown project ID: ${requestedPrj}`);
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
        setLoading(false)
      });
  }, [csv]);

  function setProjectID(id) {
    if (data) {
      const prj = findProject(id);
      if (id && !prj) {
        console.error(`Requested unknown project ID: ${id}`);
        return;
      }
      updateHistoryState(prj, projectKey);
      setProject(prj);
    }
  }

  return (
    <MainContainer {...{ settings }}>
      {
        loading && <p>Loading...</p> ||
        error && <p>{error.toLocaleString()}</p> ||
        project && <Project {...{ project, setProjectID, settings, t }} /> ||
        data && <RepoList {...{ projects: data, setProjectID, settings, t }} />
      }
    </MainContainer>
  );
}

export default App;
