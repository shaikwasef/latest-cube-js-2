cube(`RegAlertsEnforcementActions`, {
  sql: `SELECT * FROM \`RegHub\`.reg_alerts where \`RegHub\`.reg_alerts.archived=0 and \`RegHub\`.reg_alerts.alertCategory ='EA'`,

  refreshKey: {
    every: `1 minute`,
  },

  joins: {
    RegAlertsAgencynames: {
      relationship: `belongsTo`,
      sql: `${CUBE}.\`_id\` = ${RegAlertsAgencynames}._id`,
    },
    users: {
      relationship: `belongsTo`,
      sql: `TRIM(CONVERT(${CUBE}.\`owner\`, CHAR)) = TRIM(CONVERT(${users}._id, CHAR))`,
    },
    tenants: {
      relationship: `belongsTo`,
      sql: `TRIM(CONVERT(${CUBE}.\`tenantid\`, CHAR)) = TRIM(CONVERT(${tenants}.tenantId, CHAR))`,
    },
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [tenantId],
    },
  },

  dimensions: {
    _id: {
      sql: `_id`,
      type: `string`,
      primaryKey: true,
    },
    owner: {
      sql: `TRIM(CONVERT(owner, CHAR))`,
      type: `string`,
    },
    tenantId: {
      sql: `${CUBE}.\`tenantId\``,
      type: `string`,
    },
  },

  dataSource: `default`,
});
