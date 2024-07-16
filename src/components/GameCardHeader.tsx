import { FunctionComponent } from "react";

export type GameCardHeaderType = {
  className?: string;
};

const GameCardHeader: FunctionComponent<GameCardHeaderType> = ({
  className = "",
}) => {
  return (
    <div
      className={`rounded-[32.12px] bg-darkslategray overflow-hidden flex flex-col items-center justify-start pt-[123px] pb-[122px] pr-5 pl-[21px] box-border gap-[14px] max-w-full z-[2] text-left text-5xl text-color-border-button-outline-normal font-r-16 ${className}`}
    >
      <div className="flex flex-row items-start justify-start py-0 pr-[53px] pl-[51px] box-border max-w-[50%]">
        <img className="h-14 w-[44.8px] relative" alt="" src="/vector-2.svg" />
      </div>
      <h3 className="m-0 relative text-inherit leading-[29px] font-normal font-inherit inline-block max-w-[50%] mq450:text-lgi mq450:leading-[23px]">
        Coming Soon
      </h3>
    </div>
  );
};

export default GameCardHeader;
