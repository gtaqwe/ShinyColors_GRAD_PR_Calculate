const statusBaseUp = [0, 3, 7, 12, 26, 44, 68, 96, 128, 144, 160, 176, 192, 208, 224, 240, 256];
const spBaseUp = [0, 2, 4, 7, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 100];
const fanNumBaseUp = [
  0, 500, 1000, 2000, 3000, 4000, 5000, 7000, 9000, 12000, 15000, 18000, 21000, 25000, 30000, 40000,
  50000,
];
const fanSatBaseUp = [0, 1, 2, 4, 8, 12, 18, 24, 30, 35, 40, 45, 50, 55, 60, 65, 70];

$().ready(function () {
  resetInsight();
});

/**
 * 히라메키 수 초기화
 */
function resetInsight() {
  [...Array(5).keys()].forEach((pos) => {
    $(`#InsightInput_${pos}`).val(0);
  });

  setResultTable();
}

/**
 * 히라메키 수 변경 버튼의 처리
 */
function setInsightCount(pos, num) {
  var newVal = Number($(`#InsightInput_${pos}`).val()) + num;
  var min = $(`#InsightInput_${pos}`).attr("min");
  var max = $(`#InsightInput_${pos}`).attr("max");

  // min <= starNum <= max 가 되도록 조정
  var setStarNum = newVal;
  setStarNum = setStarNum > max ? max : setStarNum;
  setStarNum = setStarNum < min ? min : setStarNum;

  // Input 폼에 보정된 히라메키 수를 입력
  $(`#InsightInput_${pos}`).val(setStarNum);

  setResultTable();
}

function setResultTable() {
  let baseStat = [0, 0, 0, 0, 10, 1000, 2];
  let inputInsight = {
    vo: $("#InsightInput_0").val(),
    vo_add: false,
    da: $("#InsightInput_1").val(),
    da_add: false,
    vi: $("#InsightInput_2").val(),
    vi_add: false,
    me: $("#InsightInput_3").val(),
    ssr: $("#InsightInput_4").val(),
  };
  let obj = { vo: 0, da: 0, vi: 0, me: 0, sp: 0, fanNum: 0, fanSat: 0 };
  let pos = $(':radio[name="pr"]:checked').val();

  if (pos == 1) {
    inputInsight.vo_add = true;
    baseStat[0] = 8;
  } else if (pos == 2) {
    inputInsight.da_add = true;
    baseStat[1] = 8;
  } else if (pos == 3) {
    inputInsight.vi_add = true;
    baseStat[2] = 8;
  }
  $("#PROMOTION").html(
    $("<img>", {
      src: `./img/assets/promotions${pos}.png`,
    })
  );

  obj.vo = baseStat[0] + Math.ceil(statusBaseUp[inputInsight.vo] * (inputInsight.vo_add ? 1.8 : 1));
  obj.da = baseStat[1] + Math.ceil(statusBaseUp[inputInsight.da] * (inputInsight.da_add ? 1.8 : 1));
  obj.vi = baseStat[2] + Math.ceil(statusBaseUp[inputInsight.vi] * (inputInsight.vi_add ? 1.8 : 1));
  obj.me = baseStat[3] + Math.ceil(statusBaseUp[inputInsight.me] * 1.2);
  obj.sp =
    baseStat[4] +
    Math.ceil(
      spBaseUp[inputInsight.vo] * 1 +
        spBaseUp[inputInsight.da] * 1 +
        spBaseUp[inputInsight.vi] * 1 +
        spBaseUp[inputInsight.me] * 1 +
        spBaseUp[inputInsight.ssr] * 5
    );
  obj.fanNum =
    baseStat[5] +
    Math.ceil(fanNumBaseUp[inputInsight.vo] * (inputInsight.vo_add ? 1.8 : 1)) +
    Math.ceil(fanNumBaseUp[inputInsight.da] * (inputInsight.da_add ? 1.8 : 1)) +
    Math.ceil(fanNumBaseUp[inputInsight.vi] * (inputInsight.vi_add ? 1.8 : 1)) +
    fanNumBaseUp[inputInsight.me] * 1 +
    fanNumBaseUp[inputInsight.ssr] * 1;

  obj.fanSat =
    baseStat[6] +
    Math.ceil(fanSatBaseUp[inputInsight.vo] * (inputInsight.vo_add ? 1.2 : 1)) +
    Math.ceil(fanSatBaseUp[inputInsight.da] * (inputInsight.da_add ? 1.2 : 1)) +
    Math.ceil(fanSatBaseUp[inputInsight.vi] * (inputInsight.vi_add ? 1.2 : 1)) +
    fanSatBaseUp[inputInsight.me] * 1 +
    Math.ceil(fanSatBaseUp[inputInsight.ssr] * 2.5);

  $("#Vo_Result").text(obj.vo);
  $("#Da_Result").text(obj.da);
  $("#Vi_Result").text(obj.vi);
  $("#Me_Result").text(obj.me);
  $("#SP_Result").text(obj.sp);
  $("#FanNumber_Result").text(obj.fanNum);
  $("#FanSatisfaction_Result").text(obj.fanSat);
}
