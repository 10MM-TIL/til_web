export type GrassAreaProps = {
  title: string;
  onClick: (value: string) => void;
  onClickNext: () => void;
  onClickPrev: () => void;
  data: GrassStackedData;
};

// key 이름 수정 필요할듯?
export type GrassStackedKey = string;
export type GrassStackedData = {
  [T in GrassStackedKey]: string[];
};
