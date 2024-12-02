import { Typography } from "@mui/material";

const LabelValue = ({ label, value, labelColor = "secondary" }) => {
    return (
      <div>
        <Typography variant="body1" component="span" color={labelColor}>
          {`${label} : `}
        </Typography>
        <Typography variant="body2" component="span">
          {value}
        </Typography>
      </div>
    );
  };

export default LabelValue;