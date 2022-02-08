cube(`RegHarmonizedActionType`, {
  sql: `SELECT * FROM \`RegHub\`.\`reg_alerts_info_harmonizedActionType\``,

  joins: {
    RegAlertsEnforcementActions: {
      relationship: `belongsTo`,
      sql: `${CUBE}.\`_id\` = ${RegAlertsEnforcementActions}._id`,
    },
  },

  preAggregations: {
    harmonizedRollup: {
      sqlAlias: `hGroll`,
      external: true,
      measures: [CUBE.count],
      dimensions: [CUBE._id, CUBE.harmonizedActionType],
    },
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [harmonizedActionType, _id],
    },
  },

  dimensions: {
    harmonizedActionType: {
      sql: `${CUBE}.\`info.harmonizedActionType\``,
      type: `string`,
      title: `harmonizedActionType`,
    },
    _id: {
      sql: `${CUBE}.\`_id\``,
      type: `string`,
      primaryKey: true,
    },
  },

  dataSource: `default`,
});
