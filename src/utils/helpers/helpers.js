const status = {
  Ok: 200,
  Updated: 201,
  Created: 201,
  Unauthorized: 401,
  Not_found: 404,
  Request_Timeout: 408,
  Conflict: 409,
  Internal_Server_Error: 500,
};

const messagesVersions = {
  successCreate: 'Created new version',
  successAll: 'Recovered all versions',
  errorAll: 'Failed recovered all versions',
  errorSingle: 'Failed recovered a version',
  errorMultiple: 'Failed recovered multiple versions',
  successSingle: 'Recovered version',
  successMultiple: 'Recovered multiple versions',
  notFound: 'Not found',
  successUpdate: 'Version updated',
  errorDelete: 'Failed to deleted version',
  deleted: 'Deleted Version',
};

module.exports = {
  status,
  messagesVersions,
};
