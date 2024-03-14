import React, { useState } from "react";
import {
  EuiProvider,
  EuiSuperDatePicker,
  OnTimeChangeProps,
} from "@elastic/eui";
import { CustomQuickSelectRenderOptions } from "@elastic/eui/src/components/date_picker/super_date_picker/quick_select_popover/quick_select_popover";
import { useSelector } from "react-redux";
import { SuperDatePicker } from "../store/date";
import { useDispatch } from "react-redux";
import { setStart, setEnd } from "../store/date";

const customQuickSelectRender: (
  options: CustomQuickSelectRenderOptions
) => React.ReactNode = ({
  quickSelect,
  commonlyUsedRanges,
  recentlyUsedRanges,
  refreshInterval,
  customQuickSelectPanels,
}) => (
    <>
      {customQuickSelectPanels}
      {commonlyUsedRanges}
      {recentlyUsedRanges}
      {quickSelect}
      {refreshInterval}
    </>
  );

export default () => {
  const date: SuperDatePicker = useSelector((state: any) => state.date);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const onTimeChange = ({ start, end, isQuickSelection, isInvalid, label }: OnTimeChangeProps) => {
    console.log(start, end, isQuickSelection, isInvalid, label)
    dispatch(setStart(start));
    dispatch(setEnd(end));
  };

  return (
    <EuiProvider colorMode="light">
      <EuiSuperDatePicker
        width="full"
        customQuickSelectRender={customQuickSelectRender}
        isLoading={isLoading}
        start={date.start}
        end={date.end}
        onTimeChange={onTimeChange}
      />
    </EuiProvider>
  );
};
