cube(`RegMapStatus`, {
  sql: `SELECT * FROM \`RegHub\`.reg_map_status`,

  joins: {
    tenants: {
      relationship: `belongsTo`,
      sql: `TRIM(CONVERT(${CUBE}.\`tenantid\`, CHAR)) = TRIM(CONVERT(${tenants}.tenantId, CHAR))`,
    },
    users: {
      relationship: `belongsTo`,
      sql: `TRIM(CONVERT(${CUBE}.\`owner\`, CHAR)) = TRIM(CONVERT(${users}._id, CHAR))`,
    },
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [status, _id],
    },
  },

  segments: {
    riskType: {
      sql: `${CUBE}.\`srcType\` = 'Risk'`,
    },
    controlType: {
      sql: `${CUBE}.\`srcType\` = 'Control'`,
    },
    taskType: {
      sql: `${CUBE}.\`srcType\` = 'Task'`,
    },
  },

  dimensions: {
    _id: {
      sql: `${CUBE}.\`_id\``,
      type: `string`,
      primaryKey: true,
    },
    status: {
      sql: `${CUBE}.\`status\` `,
      type: `string`,
      title: `Status`,
    },
  },
  dataSource: `default`,
});
