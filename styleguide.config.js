module.exports = {
  require: ['babel-polyfill'],
  sections: [
    {
      name: 'Index.js',
      description: 'Kick off the React application',
      content: 'docs/index.md',
    },
    {
      name: 'React components',
      sections: [
        {
          name: 'Containers',
          description: '_Smart_ React components, often connected to Redux store',
          components: [
            'src/containers/**/index.js',
          ],
        },
        {
          name: 'Components',
          description: '_Dumb_ React components, not connected to Redux store',
          components: [
            'src/components/**/index.js',
          ],
        },
        {
          name: 'Styled components',
          description: '_Presentational_ components',
          components: [
            'src/styles/**/*.js',
          ],
        },
      ],
    },
    {
      name: 'Redux functions',
      description: 'Redux functions for managing state',
      sections: [
        {
          name: 'Actions',
          description: 'Dispatched for updating application store and kick off side-effects',
          content: 'docs/App_actions.md',
        },
        {
          name: 'Reducers',
          description: 'Update application store in response to actions',
          content: 'docs/App_sagas.md',
        },
        {
          name: 'Store',
          description: 'Set up the application store',
          content: 'docs/store.md',
        },
        {
          name: 'Selectors',
          description: 'Select data from application store',
          content: 'docs/App_selectors.md',
        },
        {
          name: 'Sagas',
          description: 'Manage application side effects',
          content: 'docs/App_sagas.md',
        },
      ],
    },
    {
      name: 'Utilities',
      content: 'docs/utils.md',
    },
  ],
};
