import { FunctionComponent } from "react";
import Main from "../components/Main";
import QuestCard from "../components/QuestCard";
import GameCardHeader from "../components/GameCardHeader";

const Home: FunctionComponent = () => {
  return (
    <div className="w-full relative bg-gray-100 overflow-hidden flex flex-col items-start justify-start gap-[51px] leading-[normal] tracking-[normal] text-left text-base text-background-bg-primary font-r-16 mq450:gap-[25px]">
      <main className="w-[3702.6px] h-[2079.5px] absolute !m-[0] right-[-1000.3px] bottom-[-1034px] z-[1]">
        <img
          className="absolute top-[53.7px] left-[39px] w-[3663.6px] h-[2013.6px] object-cover"
          alt=""
          src="/image-8@2x.png"
        />
        <section className="absolute h-full top-[0px] bottom-[0px] left-[0px] [backdrop-filter:blur(38.81px)] bg-gray-200 w-[3646.5px] z-[1]" />
      </main>
      <Main />
      <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
        <div className="h-[896px] w-[1262px] flex flex-col items-start justify-start pt-0 px-0 pb-[582px] box-border gap-[32px] max-w-full mq825:gap-[16px] mq825:pb-[246px] mq825:box-border mq1250:h-auto mq1250:pb-[378px] mq1250:box-border mq450:pb-40 mq450:box-border">
          <QuestCard />
          <div className="self-stretch flex flex-row items-start justify-start py-0 px-[67px] box-border max-w-full shrink-0 mq1250:pl-[33px] mq1250:pr-[33px] mq1250:box-border">
            <div className="flex-1 flex flex-col items-start justify-start gap-[27px] shrink-0 max-w-full">
              <b className="relative leading-[120%] inline-block min-w-[115px] z-[2]">
                Explore Games
              </b>
              <div className="self-stretch flex flex-col items-start justify-start gap-[63px] min-h-[1050px] max-w-full text-[32px] font-monument-extended mq825:gap-[16px] mq1250:gap-[31px]">
                <div className="self-stretch grid flex-row items-start justify-start gap-[48px] max-w-full grid-cols-[repeat(3,_minmax(258px,_1fr))] mq825:gap-[24px] mq825:grid-cols-[minmax(258px,_1fr)] mq1250:justify-center mq1250:grid-cols-[repeat(2,_minmax(258px,_447px))]">
                  <div className="h-[344px] relative rounded-[32.12px] bg-darkblue overflow-hidden max-w-full z-[2]">
                    <div className="absolute top-[-6.7px] left-[-117.8px] w-[1545.8px] h-[456.4px]">
                      <div className="absolute top-[456.4px] left-[1844.5px] rounded-[32.12px] w-[1726.7px] h-[449.7px] [transform:_rotate(180deg)] [transform-origin:0_0]" />
                      <div className="absolute top-[0px] left-[0px] [filter:blur(267.7px)] rounded-[50%] bg-darkorchid w-[543.4px] h-[154.8px] z-[1]" />
                    </div>
                    <div className="absolute top-[0px] left-[-91.8px] w-[527.6px] flex flex-col items-start justify-end pt-[209px] pb-[24.6px] pr-5 pl-[115px] box-border gap-[5.4px]">
                      <img
                        className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-cover z-[2]"
                        alt=""
                        src="/image-10@2x.png"
                      />
                      <h1 className="m-0 w-[284.9px] relative text-inherit leading-[120%] font-normal font-inherit inline-block min-h-[76px] z-[3] mq825:text-[26px] mq825:leading-[31px] mq450:text-lgi mq450:leading-[23px]">
                        Realm of Aces
                      </h1>
                      <h3 className="m-0 relative text-5xl leading-[29px] font-normal font-r-16 z-[3] mq450:text-lgi mq450:leading-[23px]">
                        Heads Up Poker
                      </h3>
                    </div>
                  </div>
                  <GameCardHeader />
                  <GameCardHeader />
                </div>
                <div className="self-stretch h-[97px] rounded-3xl bg-purple-med box-border overflow-hidden shrink-0 flex flex-row items-start justify-start pt-[42px] pb-[54px] pr-[62px] pl-[63px] max-w-full z-[2] text-29xl border-[1px] border-solid border-darkslateblue mq825:pt-[27px] mq825:pb-[35px] mq825:box-border mq1250:h-auto mq1250:pl-[31px] mq1250:pr-[31px] mq1250:box-border">
                  <div className="flex-1 flex flex-col items-start justify-start py-0 pr-1 pl-0 box-border gap-[47px] max-w-full shrink-0 mq825:gap-[23px]">
                    <h1 className="m-0 w-[124px] relative text-inherit leading-[58px] font-normal font-inherit inline-block mq825:text-19xl mq825:leading-[46px] mq450:text-10xl mq450:leading-[35px]">
                      FAQ
                    </h1>
                    <div className="self-stretch flex flex-row items-start justify-start max-w-full text-lg font-text-2-strong">
                      <div className="flex-1 flex flex-row items-start justify-start max-w-full">
                        <div className="flex-1 flex flex-col items-center justify-start max-w-full">
                          <div className="self-stretch flex flex-row items-start justify-start max-w-full">
                            <div className="flex-1 flex flex-col items-start justify-start gap-[14px] max-w-full">
                              <div className="self-stretch rounded-lg flex flex-col items-start justify-start max-w-full">
                                <div className="self-stretch rounded-lg box-border flex flex-col items-start justify-start py-4 px-[23px] gap-[18px] max-w-full border-[1px] border-solid border-darkslateblue">
                                  <div className="self-stretch flex flex-row flex-wrap items-center justify-start gap-[16px] max-w-full">
                                    <div className="flex-1 flex flex-row items-start justify-start max-w-full mq1250:min-w-full">
                                      <b className="h-[22px] flex-1 relative leading-[120%] flex items-center max-w-full">
                                        Where can I watch?
                                      </b>
                                    </div>
                                    <div className="flex flex-row items-start justify-start">
                                      <img
                                        className="h-4 w-4 relative overflow-hidden shrink-0"
                                        alt=""
                                        src="/-icon--chevrondown.svg"
                                      />
                                    </div>
                                  </div>
                                  <div className="self-stretch flex flex-col items-start justify-start text-color-background-button-primary-gray-disabled">
                                    <div className="self-stretch h-[50px] relative leading-[140%] whitespace-pre-wrap inline-block">
                                      Nibh quisque suscipit fermentum netus
                                      nulla cras porttitor euismod nulla. Orci,
                                      dictumst nec aliquet id ullamcorper
                                      venenatis. Fermentum sulla craspor ttitore
                                      ismod nulla.
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="self-stretch rounded-lg flex flex-col items-start justify-start max-w-full">
                                <div className="self-stretch rounded-lg box-border flex flex-row items-center justify-start py-4 px-[23px] max-w-full border-[1px] border-solid border-darkslateblue">
                                  <div className="flex-1 flex flex-row flex-wrap items-center justify-start gap-[16px] max-w-full">
                                    <div className="flex-1 flex flex-row items-start justify-start max-w-full mq1250:min-w-full">
                                      <b className="h-[22px] flex-1 relative leading-[120%] flex items-center max-w-full">
                                        Where can I watch?
                                      </b>
                                    </div>
                                    <div className="flex flex-row items-start justify-start">
                                      <img
                                        className="h-4 w-4 relative overflow-hidden shrink-0"
                                        alt=""
                                        src="/-icon--chevronright.svg"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="self-stretch rounded-lg flex flex-col items-start justify-start max-w-full">
                                <div className="self-stretch rounded-lg box-border flex flex-row items-center justify-start py-4 px-[23px] max-w-full border-[1px] border-solid border-darkslateblue">
                                  <div className="flex-1 flex flex-row flex-wrap items-center justify-start gap-[16px] max-w-full">
                                    <div className="flex-1 flex flex-row items-start justify-start max-w-full mq1250:min-w-full">
                                      <b className="h-[22px] flex-1 relative leading-[120%] flex items-center max-w-full">
                                        Where can I watch?
                                      </b>
                                    </div>
                                    <div className="flex flex-row items-start justify-start">
                                      <img
                                        className="h-4 w-4 relative overflow-hidden shrink-0"
                                        alt=""
                                        src="/-icon--chevronright-1.svg"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="self-stretch rounded-lg flex flex-col items-start justify-start max-w-full">
                                <div className="self-stretch rounded-lg box-border flex flex-row items-center justify-start py-4 px-[23px] max-w-full border-[1px] border-solid border-darkslateblue">
                                  <div className="flex-1 flex flex-row flex-wrap items-center justify-start gap-[16px] max-w-full">
                                    <div className="flex-1 flex flex-row items-start justify-start max-w-full mq1250:min-w-full">
                                      <b className="h-[22px] flex-1 relative leading-[120%] flex items-center max-w-full">
                                        Where can I watch?
                                      </b>
                                    </div>
                                    <div className="flex flex-row items-start justify-start">
                                      <img
                                        className="h-4 w-4 relative overflow-hidden shrink-0"
                                        alt=""
                                        src="/-icon--chevronright-2.svg"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="self-stretch rounded-2xl flex flex-col items-start justify-start max-w-full">
                                <div className="self-stretch rounded-lg box-border flex flex-row items-center justify-start py-4 px-[23px] max-w-full border-[1px] border-solid border-darkslateblue">
                                  <div className="flex-1 flex flex-row flex-wrap items-center justify-start gap-[16px] max-w-full">
                                    <div className="flex-1 flex flex-row items-start justify-start max-w-full mq1250:min-w-full">
                                      <b className="h-[22px] flex-1 relative leading-[120%] flex items-center max-w-full">
                                        Where can I watch?
                                      </b>
                                    </div>
                                    <div className="flex flex-row items-start justify-start">
                                      <img
                                        className="h-4 w-4 relative overflow-hidden shrink-0"
                                        alt=""
                                        src="/-icon--chevronright-3.svg"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="w-[720px] rounded-2xl hidden flex-col items-start justify-start max-w-full text-text-txt-primary">
                                <div className="self-stretch rounded-2xl bg-background-bg-primary flex flex-row items-center justify-start py-[18px] px-6 box-border max-w-full">
                                  <div className="flex-1 flex flex-row flex-wrap items-center justify-start gap-[16px] max-w-full">
                                    <div className="flex-1 flex flex-row items-start justify-start max-w-full mq825:min-w-full">
                                      <b className="h-[22px] flex-1 relative leading-[120%] flex items-center max-w-full">
                                        Where can I watch?
                                      </b>
                                    </div>
                                    <div className="flex flex-row items-start justify-start">
                                      <img
                                        className="h-4 w-4 relative overflow-hidden shrink-0"
                                        alt=""
                                        src="/-icon--chevronright-4.svg"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="w-[720px] rounded-2xl hidden flex-col items-start justify-start max-w-full text-text-txt-primary">
                                <div className="self-stretch rounded-2xl bg-background-bg-primary flex flex-row items-center justify-start py-[18px] px-6 box-border max-w-full">
                                  <div className="flex-1 flex flex-row flex-wrap items-center justify-start gap-[16px] max-w-full">
                                    <div className="flex-1 flex flex-row items-start justify-start max-w-full mq825:min-w-full">
                                      <b className="h-[22px] flex-1 relative leading-[120%] flex items-center max-w-full">
                                        Where can I watch?
                                      </b>
                                    </div>
                                    <div className="flex flex-row items-start justify-start">
                                      <img
                                        className="h-4 w-4 relative overflow-hidden shrink-0"
                                        alt=""
                                        src="/-icon--chevronright-5.svg"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
