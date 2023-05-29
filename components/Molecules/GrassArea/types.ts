export type GrassAreaProps = {
  title: string;
  onClick: (value: string) => void;
  onClickNext: () => void;
  onClickPrev: () => void;
  data: GrassStackedData;
};

// key 이름 수정 필요할듯?
type GrassStackedKey = '1' | '2' | '3' | '4' | '5';
export type GrassStackedData = {
  [T in GrassStackedKey]: string[];
};
