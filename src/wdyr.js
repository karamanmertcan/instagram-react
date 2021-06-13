import React from 'react';

const whyDidYouRender = require('@welldone-software/why-did-you-render');
whyDidYouRender(React, {
  onlyLogs: true,
  trackAllPureComponents: true
});
