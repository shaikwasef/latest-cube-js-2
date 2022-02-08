cube(`RegulationsImpacted`, {
  sql: `SELECT * FROM \`RegHub\`.reg_alerts where \`RegHub\`.reg_alerts.archived=0 and \`RegHub\`.reg_alerts.alertCategory='EA'`,

  refreshKey: {
    every: `1 minute`
  },

  joins: {
    tenants: {
      relationship: `belongsTo`,
      sql: `TRIM(CONVERT(${CUBE}.\`tenantid\`, CHAR)) = TRIM(CONVERT(${tenants}.tenantId, CHAR))`
    },
    users: {
      relationship: `belongsTo`,
      sql: `TRIM(CONVERT(${CUBE}.\`owner\`, CHAR)) = TRIM(CONVERT(${users}._id, CHAR))`
    },
    RegRegulations: {
      relationship: `hasMany`,
      sql: `${CUBE}._id = ${RegRegulations}._id`
    }
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [tenantid]
    }
  },

  dimensions: {
    _id: {
      sql: `_id`,
      type: `string`,
      primaryKey: true
    },
    effectiveDate: {
      sql: `${CUBE}.\`effectiveDate\``,
      type: `time`
    },
    currency: {
      sql: `${CUBE}.\`info.penaltyAmount.currency\``,
      type: `string`
    },
    tenantid: {
      sql: `${CUBE}.\`tenantId\``,
      type: `string`
    }
  }
});
