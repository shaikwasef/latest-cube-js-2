cube(`EnforcementActionsReport`, {
  sql: `SELECT * FROM \`RegHub\`.reg_alerts where \`RegHub\`.reg_alerts.archived=0 and \`RegHub\`.reg_alerts.alertCategory='EA'`,

  refreshKey: {
    every: `1 minute`,
  },

  joins: {
    tenants: {
      relationship: `belongsTo`,
      sql: `TRIM(CONVERT(${CUBE}.\`tenantid\`, CHAR)) = TRIM(CONVERT(${tenants}.tenantId, CHAR))`,
    },
    users: {
      relationship: `belongsTo`,
      sql: `TRIM(CONVERT(${CUBE}.\`owner\`, CHAR)) = TRIM(CONVERT(${users}._id, CHAR))`,
    },
    RegAlertsAgencynames: {
      relationship: `hasMany`,
      sql: `${CUBE}._id = ${RegAlertsAgencynames}._id`,
    },
    RegAlerts: {
      relationship: `hasMany`,
      sql: `${CUBE}._id = ${RegAlerts}._id`,
    },
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [tenantid],
    },
    AggregatedPenalties: {
      sql: `COALESCE(${CUBE}.\`info.penaltyAmount.value\` + ${CUBE}.\`info.restitutionAmount.value\`, ${CUBE}.\`info.restitutionAmount.value\`, ${CUBE}.\`info.penaltyAmount.value\` , 0) `,
      type: `sum`,
      format: `currency`,
      meta: {
        sql: `${CUBE}.\`info.penaltyAmount.currency\``,
      },
    },
  },

  segments: {
    filterEnforcementActions: {
      sql: `${CUBE}.\`alertCategory\` = 'EA'`,
    },
  },

  dimensions: {
    _id: {
      sql: `_id`,
      type: `string`,
      primaryKey: true,
    },
    effectiveDate: {
      sql: `${CUBE}.\`effectiveDate\``,
      type: `time`,
    },
    currency: {
      sql: `COALESCE(${CUBE}.\`info.penaltyAmount.currency\` , "$")`,
      type: `string`,
    },
    tenantid: {
      sql: `${CUBE}.\`tenantId\``,
      type: `string`,
    },
  },
});
