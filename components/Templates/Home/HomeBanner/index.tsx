import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IconChecked } from '@/assets/svgs/Home/IconChecked';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import * as Styled from './styles';
import { homeSwiperCustom } from './styles';

const HomeBanner = () => {
  return (
    <Styled.HomeBanner>
      <Styled.SwiperContainer>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ enabled: true, clickable: true }}
          navigation={{ enabled: false }}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
          }}
          loop={true}
          css={homeSwiperCustom}
          breakpoints={{
            1194: {
              navigation: { enabled: true },
              pagination: { enabled: true, clickable: true },
            },
          }}
        >
          <SwiperSlide>
            <Styled.SwiperSlideContainer>
              <Styled.SwiperSlideContent>
                <Styled.SlideTitle>브릭로그, 이렇게 활용하세요 </Styled.SlideTitle>
                <Styled.SwiperSlide1DescContent>
                  <Styled.Slide1Desc>
                    <div>
                      <IconChecked></IconChecked>
                    </div>
                    <div>
                      꾸준히 성장하는 사람이 되고 싶나요?
                      <br />
                      회고를 통해 부족한 부분을
                      <br />
                      명확히 파악하고 개선하세요
                    </div>
                  </Styled.Slide1Desc>
                  <Styled.Slide1Desc>
                    <div>
                      <IconChecked></IconChecked>
                    </div>
                    <div>
                      회고를 얼마나 꾸준히 작성했는지
                      <br />
                      브릭으로 확인하고, 작성한 회고를 공유해 서로의 레슨런을 나눌 수 있어요
                    </div>
                  </Styled.Slide1Desc>
                </Styled.SwiperSlide1DescContent>
              </Styled.SwiperSlideContent>
              <Styled.SwiperSlide1Img></Styled.SwiperSlide1Img>
            </Styled.SwiperSlideContainer>
          </SwiperSlide>
          <SwiperSlide>
            <Styled.SwiperSlideContainer>
              <Styled.SwiperSlideContent>
                <Styled.SlideTitle>💡 5초 안에 회고 등록하기</Styled.SlideTitle>
                <Styled.SwiperSlide2DescContent>
                  <Styled.SwiperSlide2Ul>
                    <div>
                      <IconChecked />
                      원하는 회고 템플릿을 선택하세요. 매 번 다른 질문을 물어보는 랜덤 템플릿도 있어요!
                    </div>
                    <div>
                      <IconChecked />
                      3개의 질문에 답변하며 하루를 기록하세요. 1개 이상 기록하면 저장할 수 있어요.
                    </div>
                    <div>
                      <IconChecked />
                      회고 기록이 등록되었어요! 오늘 날짜의 브릭이 채워질거에요.
                    </div>
                  </Styled.SwiperSlide2Ul>
                </Styled.SwiperSlide2DescContent>
              </Styled.SwiperSlideContent>
              <Styled.SwiperSlide2Img></Styled.SwiperSlide2Img>
            </Styled.SwiperSlideContainer>
          </SwiperSlide>
        </Swiper>
      </Styled.SwiperContainer>
    </Styled.HomeBanner>
  );
};

export default HomeBanner;
