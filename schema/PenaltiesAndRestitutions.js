cube(`PenaltiesAndRestitutions`, {
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
    RegAlertsAgencynames: {
      relationship: `hasMany`,
      sql: `${CUBE}._id = ${RegAlertsAgencynames}._id`
    }
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [tenantid, created, updated]
    },
    amount: {
      type: `sum`,
      sql: `COALESCE(${CUBE}.\`info.penaltyAmount.value\` + ${CUBE}.\`info.RestitutionAmount.value\`,  ${CUBE}.\`info.RestitutionAmount.value\` , ${CUBE}.\`info.penaltyAmount.value\` , 0) `
    }
  },

  dimensions: {
    _id: {
      sql: `_id`,
      type: `string`,
      primaryKey: true
    },
    created: {
      sql: `created`,
      type: `time`
    },
    currency: {
      sql: `COALESCE(${CUBE}.\`info.penaltyAmount.currency\` , "$")`,
      type: `string`
    },
    effectiveDate: {
      sql: `${CUBE}.\`effectiveDate\``,
      type: `time`
    },
    updated: {
      sql: `updated`,
      type: `time`
    },
    archived: {
      sql: `archived`,
      type: `string`
    },
    tenantid: {
      sql: `${CUBE}.\`tenantId\``,
      type: `string`
    }
  }
});
