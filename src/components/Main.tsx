import { FunctionComponent } from "react";

export type MainType = {
  className?: string;
};

const Main: FunctionComponent<MainType> = ({ className = "" }) => {
  return (
    <header
      className={`bg-purple-med overflow-hidden flex flex-row items-end justify-start py-[8.5px] pr-6 pl-0 box-border gap-[69px] top-[0] z-[99] sticky max-w-full text-left text-xs text-white-primary font-text-2-strong mq1250:gap-[34px] mq450:gap-[17px] ${className}`}
    >
      <div className="w-[250px] flex flex-row items-center justify-center relative">
        <div className="w-[87px] flex flex-col items-center justify-center py-0 px-4 box-border">
          <img
            className="self-stretch h-[43px] relative max-w-full overflow-hidden shrink-0"
            loading="lazy"
            alt=""
            src="/logo.svg"
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="self-stretch flex flex-row items-center justify-start py-spacing-1 px-spacing-2">
            <div className="h-6 w-8 hidden flex-row items-start justify-start py-0 px-1 box-border">
              <img
                className="h-6 w-6 relative overflow-hidden shrink-0 hidden"
                alt=""
                src="/plus.svg"
              />
            </div>
            <div className="h-10 w-12 hidden flex-row items-center justify-start py-0 px-spacing-1 box-border">
              <img
                className="h-10 w-10 relative rounded-radius-3xl hidden"
                alt=""
                src="/avatar.svg"
              />
            </div>
            <div className="flex-1 flex flex-col items-start justify-start py-0 pr-5 pl-spacing-2 text-sm font-space-grotesk">
              <div className="relative leading-[24px] inline-block min-w-[113px] whitespace-nowrap">
                Heads Up Games
              </div>
              <div className="w-[88px] relative text-xs leading-[20px] text-color-text-secondary hidden whitespace-nowrap">
                Play to win big!
              </div>
            </div>
            <div className="self-stretch w-[59px] hidden flex-row items-start justify-start py-0 pr-spacing-2 pl-0 box-border text-color-text-accent-orange">
              <div className="self-stretch rounded-radius-3xl bg-color-background-accent-orange hidden flex-row items-center justify-start py-spacing-1 px-spacing-2">
                <img
                  className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
                  alt=""
                  src="/plus.svg"
                />
                <div className="self-stretch flex flex-row items-start justify-start py-0 px-spacing-05">
                  <div className="self-stretch relative leading-[16px]">
                    Pro
                  </div>
                </div>
                <img
                  className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
                  alt=""
                  src="/plus.svg"
                />
              </div>
            </div>
            <div className="h-4 w-[38px] hidden flex-row items-start justify-start py-0 pr-spacing-2 pl-0 box-border">
              <div className="rounded-radius-3xl bg-color-background-button-primary-gray-disabled hidden flex-row items-center justify-center py-spacing-05 pr-spacing-4 pl-spacing-05">
                <div className="h-3 w-3 relative rounded-[50%] bg-background-bg-primary" />
              </div>
            </div>
            <div className="self-stretch w-[57px] hidden flex-row items-start justify-start py-0 pr-spacing-2 pl-0 box-border text-color-text-secondary">
              <div className="rounded-radius-3xl hidden flex-row items-center justify-center py-0 px-[7px] border-[1px] border-solid border-color-background-button-primary-gray-disabled">
                <div className="relative leading-[24px]">⌥⌘K</div>
              </div>
            </div>
            <div className="h-6 w-7 hidden flex-row items-start justify-start py-0 pr-spacing-1 pl-0 box-border">
              <img
                className="h-6 w-6 relative overflow-hidden shrink-0 hidden"
                alt=""
                src="/chevronright.svg"
              />
            </div>
          </div>
        </div>
        <div className="absolute !m-[0] right-[-36px] bottom-[11.5px] text-base leading-[120%] font-r-16 inline-block min-w-[44px] z-[1]">
          Home
        </div>
      </div>
      <nav className="m-0 w-[1182px] flex flex-col items-start justify-end pt-0 px-0 pb-[11.5px] box-border max-w-full mq1575:hidden">
        <nav className="m-0 w-[266px] flex flex-row items-start justify-between gap-[20px] text-left text-base text-white-primary font-r-16">
          <div className="relative leading-[120%] inline-block min-w-[52px]">
            Games
          </div>
          <div className="relative leading-[120%] inline-block min-w-[94px]">
            Leaderboard
          </div>
          <div className="relative leading-[120%] inline-block min-w-[54px]">
            Quests
          </div>
        </nav>
      </nav>
      <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[1.5px]">
        <button className="cursor-pointer py-1.5 px-[11px] bg-purple-med shadow-[0px_1px_2px_rgba(18,_18,_23,_0.05)] rounded-radius-md overflow-hidden flex flex-row items-start justify-start gap-[4px] border-[1px] border-solid border-color-border-button-outline-normal">
          <img
            className="h-6 w-6 relative overflow-hidden shrink-0 hidden min-h-[24px]"
            alt=""
            src="/plus.svg"
          />
          <div className="flex flex-row items-start justify-start py-0 px-spacing-1">
            <a className="[text-decoration:none] relative text-sm leading-[24px] font-medium font-text-2-strong text-background-bg-primary text-left inline-block min-w-[102px] whitespace-nowrap">
              Connect Wallet
            </a>
          </div>
          <img
            className="h-6 w-6 relative overflow-hidden shrink-0 hidden min-h-[24px]"
            alt=""
            src="/plus.svg"
          />
        </button>
      </div>
    </header>
  );
};

export default Main;
