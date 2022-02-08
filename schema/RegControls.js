cube(`RegControls`, {
  sql: `SELECT * FROM \`RegHub\`.controls`,
  extends: users,
  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [controls, _id]
    }
  },

  dimensions: {
    controls: {
      sql: `${CUBE}.\`id\``,
      type: `string`,
      title: `Controls`
    },
    _id: {
      sql: `${CUBE}.\`_id\``,
      type: `string`,
      primaryKey: true
    }
  },

  dataSource: `default`
});
