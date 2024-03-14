import { Box, Button, Fade, MenuItem, Modal, Select } from "@mui/material";
import React, { useState } from "react";
import { apiClient } from "../../../../api/client";
import { SuperDatePicker } from "../../../../store/date";
import { useSelector } from "react-redux";
import { mixinTimeRange } from "../../../../utils/object";
import ReactJson from 'react-json-view'
import jp from 'jsonpath';
import { VisualizationConfigProps, VisualizationType } from "../../../../components/visualization/visualization";
import LoadingButton from '@mui/lab/LoadingButton';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import VisualizationConfig from "../../../../components/visualization/visualization-config";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CreateVisualization: React.FC = () => {
  const [dsl, setDsl] = useState("");
  const [searchLoading, setSearchLoading] = useState(false)
  const [showSearch, setShowSearch] = useState(false);
  const date: SuperDatePicker = useSelector((state: any) => state.date);
  const [obj, setObj] = useState<any>({});
  const dslObj = React.useMemo(() => {
    try {
      const obj = JSON.parse(dsl);
      return obj
    } catch (e) {
      return null
    }
  }, [dsl])
  const search = () => {
    setSearchLoading(true);
    const mixined = mixinTimeRange(dslObj, date);
    apiClient.searchWithIndex("*:*", mixined).then((res: any) => {
      setObj(res)
      setShowSearch(true);
    }).finally(() => {
      setSearchLoading(false);
    })
  }
  const [visualizationType, setVisualizationType] = React.useState(VisualizationType.Value);
  return (
    <div style={{ height: `100%` }}>
      <div style={{ height: 48 }}>
        <Select
          style={{ height: 48 }}
          value={visualizationType}
          onChange={(e) => { setVisualizationType(e.target.value as VisualizationType) }}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={VisualizationType.Value}>Value</MenuItem>
          <MenuItem value={VisualizationType.Table}>Table</MenuItem>
        </Select>
        <LoadingButton
          loadingPosition="start"
          startIcon={<ScreenSearchDesktopIcon />}
          loading={searchLoading} onClick={() => search()}>Search</LoadingButton>
      </div>
      <div style={{ display: "flex", height: "calc(100% - 48px)" }}>
        <div style={{ width: "50%" }}>
          <textarea style={{ width: `100%`, resize: "none", height: `100%` }} value={dsl} onChange={(e) => setDsl(e.target.value)}></textarea>
        </div>
        <div style={{ width: "50%" }}>
          <div>
            <VisualizationConfig dsl={dslObj} visualizationType={visualizationType} />
            {/* <TextField
              style={{ width: 300 }}
              value={jsonPath}
              onChange={(e) => setJsonPath(e.target.value)}
              id="standard-basic" label="Standard" variant="standard" />
            <Button onClick={() => parse()}>Parse</Button> */}
          </div>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showSearch}
        onClose={() => setShowSearch(false)}
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={showSearch}>
          <Box sx={style}>
            <ReactJson src={obj} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default CreateVisualization;