import YearsCarousel from '../../YearsCarousel/YearsCarousel';

const History = ({ data }) => {
  //console.log('hdata', data)
  const yearHighlights =
    data?.yearHighlights?.nodes?.sort((a, b) => {
      if (a.yearHighlights?.year !== b.yearHighlights?.year) {
        return +a.yearHighlights?.year - +b.yearHighlights?.year;
      }

      return a.yearHighlights?.heading < b.yearHighlights?.heading ? -1 : 1;
    }) ?? [];

  return (
    <YearsCarousel data={yearHighlights} name="yearHighlights" asc={true} />
  );
};

export default History;
