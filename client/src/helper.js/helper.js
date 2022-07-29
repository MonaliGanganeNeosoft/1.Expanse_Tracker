import _ from "loadsh";

export function getSum(transaction, type) {
  let sum = _(transaction)
    .groupBy("type")
    .map((objs, key) => {
      if (!type) return _.sumBy(objs, "amount"); //[300,350,5000]
      return {
        type: key,
        color: objs[0].color,
        total: _.sumBy(objs, "amount"),
      };
    })
    .value();
  return sum;
  //   console.log(sum);
}
export function getLabels(transaction) {
  let amountSum = getSum(transaction, "type");
  let Total = _.sum(getSum(transaction));

  let percent = _(amountSum)
    .map((objs) => _.assign(objs, { percent: (100 * objs.total) / Total }))
    .value();

  return percent;
}
export function chart_Data(transaction, custom) {
  let bg = _.map(transaction, (a) => a.color);
  bg = _.uniq(bg);
  console.log(bg);
  let dataValue = getSum(transaction);
  const config = {
    data: {
      datasets: [
        {
          //   label: "My First Dataset",
          //   data: [300, 50, 100],
          data: dataValue,
          //   backgroundColor: [
          //     "rgb(255, 99, 132)",
          //     "rgb(54, 162, 235)",
          //     "rgb(255, 205, 86)",
          //   ],
          backgroundColor: bg,
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 115,
    },
  };
  return custom ?? config;
}
export function getTotal(transaction) {
  return _.sum(getSum(transaction));
}
