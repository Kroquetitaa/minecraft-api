const status = {
  Ok: 200,
  Accepted: 202,
  Updated: 201,
  Created: 201,
  Unauthorized: 401,
  Not_found: 404,
  Request_Timeout: 408,
  Conflict: 409,
  Internal_Server_Error: 500,
};

const messages = {
  successCreate: (message) => `Created new ${message}`,
  successAll: (message) => `Recovered all ${message}`,
  errorAll: (message) => `Failed recovered all ${message}`,
  errorSingle: (message) => `Failed recovered a ${message}`,
  errorMultiple: (message) => `Failed recovered multiple ${message}`,
  successSingle: (message) => `Recovered ${message}`,
  successMultiple: (message) => `Recovered multiple ${message}`,
  succesFilter: () => `Recovered values`,
  errorFilter: () => `Failed to recovered filter values`,
  notFound: (message) => `${message} not found`,
  successUpdate: (message) => `${message} updated`,
  errorUpdate: (message) => `Failed updated ${message}`,
  errorDelete: (message) => `Failed to deleted ${message}`,
  deleted: (message) => `Deleted ${message}`,
};

module.exports = {
  status,
  messages,
};
