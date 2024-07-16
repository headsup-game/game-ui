import { FunctionComponent } from "react";

export type QuestCardType = {
  className?: string;
};

const QuestCard: FunctionComponent<QuestCardType> = ({ className = "" }) => {
  return (
    <div
      className={`flex flex-row items-start justify-start gap-[19px] shrink-0 max-w-full text-left text-sm text-background-bg-primary font-r-16 ${className}`}
    >
      <div className="h-[181px] flex flex-col items-start justify-start pt-[133px] px-0 pb-0 box-border">
        <div className="w-[54px] h-[54px] rounded-radius-border-radius-12 bg-gray-400 box-border overflow-hidden shrink-0 flex flex-row items-center justify-center py-3 px-4 z-[2] border-[3px] border-solid border-gray-300">
          <img
            className="h-[14.3px] w-[8.7px] relative"
            loading="lazy"
            alt=""
            src="/vector.svg"
          />
        </div>
      </div>
      <div className="h-[314px] w-[1128px] rounded-3xl overflow-hidden shrink-0 flex flex-col items-start justify-start relative max-w-[calc(100%_-_134px)] z-[2]">
        <img
          className="w-[872px] h-[462px] absolute !m-[0] right-[-88px] bottom-[-148px] object-contain z-[1]"
          alt=""
          src="/progress-background@2x.png"
        />
        <div className="w-[1290px] flex flex-col items-start justify-start pt-[43px] px-16 pb-[70px] box-border relative gap-[63px] shrink-0 max-w-[115%] mq825:gap-[31px] mq825:pl-8 mq825:pr-8 mq825:box-border mq450:gap-[16px]">
          <div className="w-full h-full absolute !m-[0] top-[336px] right-[-1290px] bottom-[-336px] left-[1290px] rounded-3xl bg-darkblue [transform:_rotate(180deg)] [transform-origin:0_0]" />
          <div className="w-[406px] h-[115.7px] absolute !m-[0] top-[-5px] left-[-88px] [filter:blur(200px)] rounded-[50%] bg-darkorchid z-[1]" />
          <div className="w-[644px] flex flex-col items-start justify-start gap-[18px] max-w-full z-[2]">
            <div className="self-stretch flex flex-col items-start justify-start">
              <div className="self-stretch flex flex-col items-start justify-start">
                <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
                  <div className="relative leading-[17px] inline-block min-w-[103px]">
                    0/10 Completed
                  </div>
                  <h1 className="m-0 self-stretch relative text-29xl leading-[58px] font-normal font-monument-extended mq825:text-19xl mq825:leading-[46px] mq450:text-10xl mq450:leading-[35px]">
                    THE ARCANE TRIALS
                  </h1>
                </div>
              </div>
              <div className="relative text-base leading-[120%]">
                Play 10 rounds of Realm of Aces
              </div>
            </div>
            <div className="rounded-radius-md overflow-hidden flex flex-row items-center justify-center py-1.5 px-[11px] gap-[4px] text-base border-[1px] border-solid border-background-bg-primary">
              <img
                className="h-6 w-6 relative overflow-hidden shrink-0 hidden min-h-[24px]"
                alt=""
                src="/plus.svg"
              />
              <div className="flex flex-row items-start justify-start py-0 px-spacing-1">
                <div className="relative leading-[24px] font-medium inline-block min-w-[123px]">
                  Complete Quest
                </div>
              </div>
              <img
                className="h-6 w-6 relative overflow-hidden shrink-0 hidden min-h-[24px]"
                alt=""
                src="/plus.svg"
              />
            </div>
          </div>
          <div className="h-0 flex flex-row items-start justify-start pt-0 px-0 pb-0 box-border gap-[16px] max-w-full z-[2]">
            <img
              className="h-1 w-[151px] relative"
              loading="lazy"
              alt=""
              src="/vector-3.svg"
            />
            <img
              className="h-1 w-[151px] relative"
              alt=""
              src="/quest-image-content.svg"
            />
            <img
              className="h-1 w-[151px] relative"
              loading="lazy"
              alt=""
              src="/quest-image-content.svg"
            />
          </div>
        </div>
      </div>
      <div className="h-[181px] flex flex-col items-start justify-start pt-[133px] px-0 pb-0 box-border">
        <div className="w-[54px] h-[54px] rounded-radius-border-radius-12 bg-gray-400 box-border overflow-hidden shrink-0 flex flex-row items-center justify-center py-3 px-4 [transform:_rotate(180deg)] z-[2] border-[3px] border-solid border-gray-300">
          <img
            className="h-[14.3px] w-[8.7px] relative [transform:_rotate(-180deg)]"
            alt=""
            src="/vector-1.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestCard;
