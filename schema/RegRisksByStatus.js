cube(`RegRisksByStatus`, {
  sql: `SELECT * FROM \`RegHub\`.reg_config_status_risk`,

  joins: {
    RegMapStatus: {
      relationship: `belongsTo`,
      sql: `${CUBE.riskId} = ${RegMapStatus.status}`
    }
  },

  dimensions: {
    riskStatus: {
      sql: `${CUBE}.\`status.risk.name\``,
      type: `string`,
      title: `Status`
    },
    riskId: {
      sql: `${CUBE}.\`status.risk.id\``,
      type: `string`,
      primaryKey: true,
      shown: true
    }
  },
  dataSource: `default`
});
