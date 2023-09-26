module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/find',
    handler: 'property.find',
    config: {
      policies: [],
      auth:false,
    },  
  },  
  {
    method: 'GET',
    path: '/findNibe',
    handler: 'property.findNibe',
    config: {
      policies: [],
      auth:false,
    },  
  },
    {
    method: 'DELETE',
    path: '/delete/:id',
    handler: 'property.delete',
    config: {
      policies: [],
      auth:false,
    },
  },
  {
    method: 'POST',
    path: '/create',
    handler: 'property.create',
    config: {
      policies: [],
      auth:false,
    },
  },
  {
    method: 'PUT',
    path: '/update/:id',
    handler: 'property.update',
    config: {
      policies: [],
      auth:false,
    },
  },
  {
    method: 'POST',
    path: '/toggle/:id',
    handler: 'property.toggle',
    config: {
      policies: [],
      auth:false,
    },
  },
];
