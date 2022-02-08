cube(`RegAlertsAgencynames`, {
  sql: `SELECT * FROM \`RegHub\`.\`reg_alerts_agencyNames\``,

  joins: {
    RegHarmonizedActionType: {
      relationship: `hasMany`,
      sql: `${CUBE._id} = ${RegHarmonizedActionType._id}`,
    },
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [agencyNames, _id],
    },
  },

  preAggregations: {
    agencyRollup: {
      sqlAlias: `aGroll`,
      external: true,
      measures: [CUBE.count],
      dimensions: [CUBE._id, CUBE.agencyNames],
    },
    agencyActionTypeRollUp: {
      sqlAlias: `HAGroll`,
      external: true,
      measures: [CUBE.count],
      dimensions: [
        CUBE.agencyNames,
        RegHarmonizedActionType.harmonizedActionType,
      ],
    },
  },

  dimensions: {
    agencyNames: {
      sql: `${CUBE}.\`agencyNames\``,
      type: `string`,
      title: `agencyNames`,
    },
    _id: {
      sql: `${CUBE}.\`_id\``,
      type: `string`,
      primaryKey: true,
    },
  },

  dataSource: `default`,
});
