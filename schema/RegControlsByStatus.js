cube(`RegControlsBystatus`, {
  sql: `SELECT * FROM \`RegHub\`.reg_config_status_control`,

  joins: {
    RegMapStatus: {
      relationship: `belongsTo`,
      sql: `${CUBE.controlId} = ${RegMapStatus.status}`
    }
  },
  dimensions: {
    controlStatus: {
      sql: `${CUBE}.\`status.control.name\``,
      type: `string`,
      title: `Status`
    },
    controlId: {
      sql: `${CUBE}.\`status.control.id\``,
      type: `string`,
      primaryKey: true,
      shown: true
    }
  },
  dataSource: `default`
});
