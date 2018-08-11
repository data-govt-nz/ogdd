import quasiEquals from 'utils/quasi-equals';
/**
  * Prepare data for time series plots (react-vis) and ScreenReaderDataTable
  * - react-vis requires x and y coordinates
  * - ScreenReaderDataTable requires column and row identifiers
  *
  * @param {object} data the data
  * @param {object} surveys the different dates
  * @param {object} [rowID] row identifier
  * @return the modified HTML string
  * @author [tmfrnz](https://github.com/tmfrnz)
  */
export default function preparePlotData(data, surveys, rowID) {
  return data
    .reduce((memo, datum) => {
      const survey = surveys.find((item) => quasiEquals(datum.get('survey_id'), item.get('survey_id')));
      return survey
        ? memo.concat([{
          x: new Date(survey.get('date')).getTime(),
          y: datum.get('value'),
          column: survey.get('survey_id'),
          row: rowID || datum.get('answer'),
        }])
        : memo;
    }, []);
}
