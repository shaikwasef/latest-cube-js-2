cube(`RegRisks`, {
  sql: `SELECT * FROM \`RegHub\`.risks`,
  extends: users,
  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [risks, _id]
    }
  },

  dimensions: {
    _id: {
      sql: `${CUBE}.\`_id\``,
      type: `string`,
      primaryKey: true
    },
    risks: {
      sql: `${CUBE}.\`id\``,
      type: `string`,
      title: `risks`
    }
  },

  dataSource: `default`
});
