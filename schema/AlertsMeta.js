cube(`AlertsMeta`, {
  sql: `SELECT * FROM \`RegHub\`.alerts_meta`,
  joins: {
    tenants: {
      relationship: `belongsTo`,
      sql: `TRIM(CONVERT(${AlertsMeta.tenantId}, CHAR)) = TRIM(CONVERT( ${tenants}.tenantId, CHAR))`
    }
  },

  preAggregations: {
    alertsByRegulations: {
      type: `rollup`,
      measureReferences: [AlertsMeta.alertsGroupCount],
      dimensionReferences: [tenants.tenantId, AlertsMeta.alertgrpName],
      external: true,
      scheduledRefresh: true
    }
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [alertGrpId, alertgrpName, tenantId, created, updated]
    },
    alertsGroupCount: {
      type: "number",
      sql: `totalAlerts`
    }
  },

  dimensions: {
    alertGrpId: {
      sql: `${CUBE}.\`alertGrpId\``,
      type: `string`
    },
    alertgrpName: {
      sql: `${CUBE}.\`alertGrpName\``,
      type: `string`
    },
    tenantId: {
      sql: `TRIM(CONVERT(${CUBE}.\`tenantId\`,CHAR))`,
      type: `string`,
      primaryKey: true,
      shown: true
    },
    created: {
      sql: `created`,
      type: `time`
    },
    updated: {
      sql: `updated`,
      type: `time`
    }
  },

  dataSource: `default`
});
